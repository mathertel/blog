---
title:  Draft posts and controlled publishing
description: How to mark unfinished posts as drafts and control the time of publishing
created: 2025-04-11
image: "/2025/draft.png"
imageAlt: "A rubber stamp with word draft"
tags:
  - "eleventy"
---

Creating posts on a blog project often is not just a one shot publishing situation.

Typically new content may be collected over days while another post is finished or ideas of a later post get collected.

Of course this can be done outside the eleventy project by using some mechanisms later posts can be prepared and links and images can be created in the right environment.

Here I show how to use 2 separate mechanisms to marking markdown files as drafts and control the publishing:

* marking posts as draft.
* distinguish between normal builds for authoring and the production build for publishing.


## Marking as Draft

As proposed by several other articles a `draft` [metadata attribute](./0703-11ty-metadata.md) can be added to any page.  When set
to `true` the page should not be part of the official published set of posts and should not appear in any of the lists.

as an alternate approach the path of the file is reflected as well. When there is a `draft`as substring in the path the files or the complete folder is also excluded in the production build.


 The core concept is to use two front matter keys — permalink and eleventyExcludeFromCollections — to hide pages from users and then computed data with environment variables to automatically toggle visibility depending on the environment.


## Production environment switch

While acting as an author and writing posts the eleventy build and server process should include all draft material
to support immediate feedback on the writing.

Before publishing new posts a switch is required so only the non-draft material is processed and the production version can be verified (and fixed).

Switching between these working modes can be done by setting the environment variable `ELEVENTY_ENV` to `prod`.

in the package json this can be added to some handful task definitions:

``` json
{
  ...
  "scripts": {
    "clean": "rmdir /S /Q _site",
    "build:prod": "set ELEVENTY_ENV=prod & npx @11ty/eleventy",
    "serve:prod": "set ELEVENTY_ENV=prod & npx @11ty/eleventy --serve --incremental",
  }
}
```

The environment variable can be reflected on startup by some scripting lines in `eleventy.js` to create a global variable
named `isProduction` that is set to true for production builds:

``` js
  // support `prod` environment not publishing drafts 
  const prodVariable = process.env.ELEVENTY_ENV;
  console.log(`Environment: ${prodVariable ? prodVariable : 'not set'}`);
  eleventyConfig.addGlobalData('isProduction', 
    (prodVariable && (prodVariable.trim().toLowerCase() === 'prod')));
```

For production builds the 2 [Metadata Attributes](./0703-11ty-metadata.md) `eleventyExcludeFromCollections` and `permalink` must
be overwritten to exclude the files.  This can be implemented in Eleventy by adding a calculation script for these
[Metadata Attributes](./0703-11ty-metadata.md) in the file `src.11tydata.js` in the `src` folder:  

``` js
export default function(globals) {

  // in production mode the draft files are not included in the build
  function toBePublished(data) {
    let processPage = true;

    if (globals.isProduction) {
      if (data.draft) processPage = false;
      if (data.page.inputPath.toLowerCase().indexOf('draft') >= 0) processPage = false;
    }
    return (processPage);
  } // toBePublished

  return {
    eleventyComputed: {
      eleventyExcludeFromCollections: function(data) {
        if (toBePublished(data))
          return (data.eleventyExcludeFromCollections);
        return (true);
      },

      permalink: function(data) {
        if (toBePublished(data))
          return data.permalink
        return (false);
      }
    }
  }
}
```


## See also

* [Metadata Attributes](./0703-11ty-metadata.md)
* <https://coderweekend.com/posts/setup-environments-in-eleventy/>
* <https://jkc.codes/blog/creating-drafts-in-eleventy/>
