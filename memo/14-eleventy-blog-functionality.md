---
title: Eleventy Blog Functionality
created: 2025-01-23
modified: 2025-01-23
tags: ["blog", "eleventy", "nodejs"]
---

Eleventy is a framework used to implement and deliver static HTML websites.  It generates these websites from templates
and Markdown documents.

The power of this framework Is the data to automation capability.  That exists.  Templates.  Documents metadata.  And
several useful mechanisms like.  Automated refactoring of HTML.

The framework itself is built to support.  Via creating content.  And as a delivered result.  Only HTML.  Pages.  And
other artifacts are bundled together for a website that.  Can be delivered by static delivery.  That makes hosting these
resulting websites quite easy.  You can use services like Github Pages.  Or any hosting based on the Apache or NGinx Web
server.  This.  Fast rendered results because the server do not need to execute any scripting or templating engine.  All
is prepared during the creation of the resulting website.

After several attempts in using these kind of web servers I adopted eleventy for Documenting public.  Open source
projects.

To use the framework as a blogging application There is a template from eleventy available called the
eleventy-base-blog.  This you can fount in source code on Github at: <https://github.com/11ty/eleventy-base-blog>.

You can use it out of the box to start blocking immediately.  However, some aspects of a blocking web application are
not covered and I like to.  Publish here.  The mechanisms I have added to that application.


## Handling Publishing and Modification Dates


To use eleventy several customizations can be made to simplify maintaining the blog. This is a list of modification I use:


## Posts ordered by date - descending

Content in blogs usually are written independently most of the time and usually get presented in the order of their creation date.

Eleventy can do this by creating an array of all posts that exist in the `src` folder and sort them according to the
created date.  This is done programatically by a setup script in the `eleventy.js` file.  You can find the following
code fragment:

``` js
eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/**/*.md")
      .sort((a, b) => b.data.created - a.data.created);
  });
```

Every time eleventy starts, this script is executed and will create a collection named `posts` ordered by the created date in descending order.

The when creating the html pages for markdown this collection is used for iteration.


## Simplify output structure

By default eleventy will create a unique folder and a index.html file for every input file.  To simplify this you can
specify how the output filenames will be created.  The feature is called `permalink`:

``` txt
permalink: "{{ page.filePathStem }}.htm"
```

## Create a web application naming schema

When hosting more than one content source or application on a domain a prefix is required in the filenames and the
internal links.

Eleventy will always absolute paths in the output files and a prefix for the blog files needs to be added.  A
`pathPrefix` can be specified on the command line or in the eleventy configuration file:

``` js
  return {
    pathPrefix: "/blog/",
    ...
  }
```

This configuration requires the bundeled `EleventyHtmlBasePlugin` to be enabled too.  You will find the following lines
in the `.elevent.js` configuration file.

``` js
{
  import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
  ...

 eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    extensions: "htm,html"
  });
}
```

The development server will sho this on the output as well:

``` txt
[11ty] Server at http://localhost:8080/blog/
```


## Creating a complete short list

To create files that are not of the type blog post a html implementation with integrated liquid commands can be used.
This example will create a very simple list of all existing posts from the `posts` collection:

``` txt
---
title: Blog Posts
layout: base
---

<ul>
{% for post in collections.posts reversed %}
<li><a href="{{post.url}}">{{ post.data.title }}</a> - {{ post.data.created }}</li>
{% endfor %}
</ul>
```


## See also

* [Collection of posts](https://tinytip.co/tips/eleventy-collection-by-glob/)


##

