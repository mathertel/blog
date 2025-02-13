---
title: Metadata
created: 2025-01-23
tags: ["blog", "nodejs"]
---

{% include './toc.njk' %}

The attributes added to a post's content are called metadata.  They help organize and structure content in an
Eleventy-based project.

As mentioned in the overview, blog posts follow a unified document approach by including metadata in each post.  This
forms the basis for implementing the typical structure and functionality of blogs.

The following metadata attributes are used:

{% termlist %}

{% term "layout" %}
  Defines the name of the layout file used to create the output file.
  Layout files can be found in the `src/_includes` folder.
{% endterm %}

{% term "outdated" %}
  Setting this attribute to `false` will exclude the post from the list of posts shown on the blog
  homepage.  It will still appear in the complete list of posts.  This attribute also triggers the display of an
  outdated marker on the page.
{% endterm %}

{% term "created" %}
  The date when the post was first published.  This is used to display posts in descending order.
{% endterm %}

{% term "modified" %}
  The date when the post was last updated.  This also controls when to archive the post.
{% endterm %}

{% term "title" %}
  Instead of adding the title in the first line of the markdown document, it can be written in the header.
  This simplifies displaying the title in the list of posts.  Do not use another title line in the content.
{% endterm %}

{% term "abstract" %}
  A sentence summarizing the article.  The abstract can also be extracted from the content.
{% endterm %}

{% term "tags" %}
  A list of words classifying the post.  Tags are shown in the post and can be used to find other posts
  covering the same topic.
{% endterm %}

{% term "eleventyExcludeFromCollections" %}
  This attribute is built into eleventy can can be used to exclude a page from any collection. It is used for special pages like `about.htm`.
{% endterm %}

{% endtermlist %}

Eleventy has a built-in mechanism to apply default metadata values at the folder level.  The default values for metadata
attributes are specified in a data file named `src.11tydata.json` in the `src` folder.

Example:

```json
{
  "title": "title-no-set",
  "layout": "post",
  "created": 0,
  "updated": null,
  "outdated": false,
  "tags": []
}
```

In the post markdown file, the metadata attributes are specified in a front matter block surrounded by lines of `---`,
like this:

```txt
---
title: Overview
created: 2025-01-23
modified: 2025-01-23
tags: ["blog", "eleventy", "nodejs"]
---
```

## See also

* Archive
* Exclude special content
* The Posts Collection
