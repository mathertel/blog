---
title: Filenames and Links
created: 2025-03-03
image: "/2025/11ty-links.png"
imageAlt: "A hyperlink tag with ballon"
tags: 
  - "eleventy"
description: >  
  How to change the original behavior of 11ty for using the real filenames in markdown.
---

Eleventy comes with powerful transformation and templating engines.  Understanding the processing steps is helpful to
know where to make configurations. However the links to files in the same project are not direct. 

## Default Output Configuration

By default, Eleventy generates HTML files from markdown files by creating a folder for each markdown file and placing an
`index.html` file inside it.

The `markdown-it` library handles the conversion from markdown to HTML and can be configured to adjust or extend its
behavior.

If a layout file is present, it surrounds the content to create a common page layout.  This step uses the Liquid or
Nunjucks templating engine to combine layout, data, and content.  These templating engines offer configuration options
and can handle data with some level of scripting.

Eleventy documentation suggests to use links in your markdown sources should be specified without a final extension,
like this:

```md
See also: [configuration](/src/configuration)
```

This is because the `markdown-it` library does not change links and simply copies them into the HTML tags without
further configuration.

However when you link to markdown files using the full filename like `[configuration](/src/configuration.md)` as it is
the default in some editors and IDEs the resulting link is broken and cannot be resolved by the server.


## Creating Meaningful Filenames

Meaningful filenames ensure that URLs contain final resource identifiers and do not rely on the default file mechanism
in folders.  This can improve web server processing and search engine relevance.

You can specify how the final filename will be calculated in templates and pages.  In the layout file, the `permalink`
attribute is set to the path of the markdown file without an extension, followed by ".htm".  This naming convention will
be used in this project.

```md
permalink: "{{ "{{ page.filePathStem }}.htm" }}
```

To correct the links in the resulting HTML files all links in the generated htm files must be 
adjusted and the ending `.md` must be replaced by `.htm`.

This can be done by the `markdown-it-replace-link` library or the (not fully documented) function `addUrlTransform` of the `htmlTransformer` util. This is the resulting code:

``` javascript
// Modify all URLs pointing to .md files in all .htm output in your project
eleventyConfig.htmlTransformer.addUrlTransform(
  "htm", // file typed to be transformed 
  
  /**
   * transform internal links to markdown fils to the final url using the htm format.
   * @this {object}
   * @param {string} url given url in the document
   */
  function(url) {
    let lUrl = url.toLowerCase();
    if ((! lUrl.startsWith('http')) && (lUrl.endsWith('.md'))) {
      return(url.substring(0, url.length-2) + 'htm');
    }  
    return (url);
  },
  {
    priority: -1, // run at the end of all transformations.
  }
);
```


## Development Server Configuration

The built-in web server searches for an `index.html` file by default when a folder is addressed by the URL.  This can be
changed with:

```js
eleventyConfig.setServerOptions({
  indexFileName: "index.htm",
});
```

