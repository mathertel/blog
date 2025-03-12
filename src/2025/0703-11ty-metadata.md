---
title: Metadata for Posts
description: Details about the Metadata usage.
created: 2025-03-07
image: "/2025/11ty-metadata.png"
imageAlt: "Tag with ballon."
tags:
  - "eleventy"
draft: true
---

The attributes added to a post's content are called metadata.  They help organize and structure content in an
Eleventy-based project.

As mentioned in the [Eleventy Overview Post](./0227-11ty-overview.md), blog posts follow a unified document approach by
including metadata in each post.  This forms the basis for implementing the typical structure and functionality of
blogs.

While eleventy supports already many attributes out of the box or within the starter projects on github there is still
room for improvement.


## Eleventy Standard Attributes

The following **standard** metadata attributes are used as supported by eleventy using the pages' YAML data:

{% termlist %}

{% term "title" %} Instead of adding the title in the first line of the markdown document, it can be written in the
header.  This simplifies displaying the title in the list of posts.  Do not use another title line in the content.  {%
endterm %}

{% term "layout" %} Defines the name of the layout file used to create the output file.  Layout files can be found in
the `src/_includes` folder.  The `post` layout is defined as the default as most of the content will use this template.
{%endterm%}

{% term "tags" %} A list of words classifying the post.  Tags are shown in the post and can be used to find other posts
covering the same topic.  {%endterm%}

{% term "eleventyExcludeFromCollections" %} This attribute is built into eleventy can can be used to exclude a page from
any collection.  It is used for special pages like `about.htm`.  {%endterm%}

{% endtermlist %}

## Extra Attributes supporting blogging

The following **extra** metadata attributes are used :

{% termlist %}

{% term "description" %} A sentence summarizing the article.  {%endterm%}

{% term "created" %} The date when the post was first published.  This is used to display posts in descending
order.{%endterm%}

{% term "modified" %} The date when the post was last updated.  This also controls when to archive the post.
{%endterm%}

{% term "draft" %} Setting the `draft` attribute to `false` will exclude the post from beeing created in the production
build.  This is useful for preparing articles before publishing.{%endterm%}

{% term "outdated" %} Setting this attribute to `true` will exclude the post from the list of posts shown on the blog
homepage.  It will still appear in the complete list of posts.  This attribute also triggers the display of an outdated
marker on the page.{%endterm%}

{% term "image" %} The image illustating the post. {%endterm%}

{% term "imageAlt" %} The textual description of the image. {%endterm%}

{% term "archiveDate" %} The date when the post was retired and will be shown in the list of archived posts.{%endterm%}

{% term "changeFreq" %} The frequency of change reported in the sitemap.{%endterm%}

{% endtermlist %}

In the post markdown file, the metadata attributes are specified in a front matter block surrounded by lines of `---`,
like this:

```txt
---
title: Metadata for Posts
description:  
created: 2025-03-23
tags:
  - "eleventy"
  - "nodejs"
---
```

Eleventy has a built-in mechanism to apply default metadata values at the folder level.  The default values for metadata
attributes are specified in a data file named `src.11tydata.json` in the `src` folder.

## More to come

* Using date attributes in ordering and sitemap
* Archive Mechanism
* The Posts Collection
* Extending the HTML Time Element by using [Single-File web Components (SFC)](/2025/0228-sfc-concept.md)

## See also

* [Eleventy Overview Post](/2025/0227-11ty-overview.md)
* [Exclude special content](https://www.11ty.dev/docs/collections/#how-to-exclude-content-from-collections)*
