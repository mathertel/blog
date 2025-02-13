---
title: Filenames and Links
created: 2025-01-24
tags: ["blog"]
---

{% include './toc.njk' %}

Eleventy comes with powerful transformation and templating engines.  Understanding the processing steps is helpful to
know where to make configurations.

## Default Output Configuration

By default, Eleventy generates HTML files from markdown files by creating a folder for each markdown file and placing an
`index.html` file inside it.

The `markdown-it` library handles the conversion from markdown to HTML and can be configured to adjust or extend its
behavior.

If a layout file is present, it surrounds the content to create a common page layout.  This step uses the Liquid or
Nunjucks templating engine to combine layout, data, and content.  These templating engines offer configuration options
and can handle data with some level of scripting.

Links in your markdown sources should be specified without a final extension, like this:

```md
See also: [configuration](/src/configuration)
```

This is because the `markdown-it` library does not change links and simply copies them into the HTML tags without
further configuration.


## Creating Meaningful Filenames

Meaningful filenames ensure that URLs contain final resource identifiers and do not rely on the default file mechanism
in folders.  This can improve web server processing and search engine relevance.

You can specify how the final filename will be calculated in templates and pages.  In the layout file, the `permalink`
attribute is set to the path of the markdown file without an extension, followed by ".htm".  This naming convention will
be used in this project.

```md
permalink: "{{ page.filePathStem }}.htm"
```

To correct the links in the resulting HTML files, use the `markdown-it-replace-link` library to replace `.md` with `.htm`.

Install the library with:

```sh
npm install markdown-it-replace-link -D
```

Configure the `markdown-it` library with a script to adjust the final name to our naming convention:

```js
import markdownIt from "markdown-it";
import mdReplaceLink from "markdown-it-replace-link";

const mdLibrary = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
  replaceLink: link => link.replace(/(^\/[^.]*)\.md$/, "$1.htm"),
});
eleventyConfig.setLibrary("md", mdLibrary);
mdLibrary.use(mdReplaceLink);
```

## Development Server Configuration

The built-in web server searches for an `index.html` file by default when a folder is addressed by the URL.  This can be
changed with:

```js
eleventyConfig.setServerOptions({
  indexFileName: "index.htm",
});
```

