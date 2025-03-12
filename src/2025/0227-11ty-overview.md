---
title: Eleventy for Blog
created: 2025-02-27
image: "/2025/11ty-ballon.png"
imageAlt: "Eleventy with red ballon."
tags:
  - "eleventy"
description: >  
  I have used several site generators and web sites for project documentation during the past years
  and found a solution for my blogging activities based on the static site generator
  [eleventy](https://www.11ty.dev/).
---

In contrast to my previous blog engine (blogger) the static site generators allow hosting on various web server platforms and
with some effort can be hosted on my own web site that also has other content and applications.

## The Plan

* Blog posts can be written in markdown a simple but powerful documentation solution.
* All the maintenance tasks to complete the web sites are automated.
* Deployment can be done to any public web server that dan deliver static files.  This includes especially
  [GitHub Pages](https://docs.github.com/en/pages) a free hosting solution comming with GitHub that any public project
  can use.  I also use it for the [HomeDing Documentation](https://homeding.github.io/) with a slightly different
  configuration that better fits to project documentation.
* The blog will be available on my web server using the root <https://www.mathertel.de/blog>.

## The Blog web site features in short

* The Home Page shows the summaries of the latest blog entries.
* Navigation forward and backwards by providing links on every page.
* Metadata driven organization and publishing
* Blog entries can be categorized by using tags.
* Archived / Outdated posts
* Draft posts, not yet to be published
* Development and Production mode for static site creation.


## Prerequisites

Node.js >= version 18 must be installed.  You do not need to know Node.js or JavaScript.  You simply need the SDK
installed to provide you with npm to setup the project.  You can get the Node SDK for your system here:
<https://nodejs.org/en/>

You should however have some knowledge of HTML, CSS, and JavaScript.  You do not need to be an expert, just comfortable
using them.  In terms of HTML and CSS, Eleventy has zero impact on what you use and how you write your templates.  It
doesn't care.  In terms of JavaScript, the same applies to what you build, but if you know a bit of JavaScript, Eleventy
will be easier to configure and extend.  If you need help with that, check MDN Web Docs or search for further articles
on eleventy.  - There are plenty.

A Git client if you want to start with a clone of a repository but you can also download the zip right from the repository.
I personally use Visual Studio Code for editing and executing the npm task. Also debugging of the .eleventy.js file is possible.

<!-- The complete solution is available on GitHub at <https://github.com/mathertel/blog-template>. -->

Eleventy is incredibly simple to use.  If you like to read more about it have a look at the documentation: <https://www.11ty.dev/docs/>


## Setup the eleventy-base-blog

There are some starter projects available on <https://www.11ty.dev/docs/starter/> where you can find the eleventy-base-blog.

Sourcecode and instructions to setup can be found in [github.com/11ty/eleventy-base-blog](https://github.com/11ty/eleventy-base-blog)


## Further adaptions required

* The design of the created web site out-of-thebox can be inspected at <https://demo-base-blog.11ty.dev/>.  It is still
  poor and finbishing the layouts consumes quiet some time.

* The solution has chosen `nunjucks` as the main template engine. This is the better choice over `liquid` that is used by default.

** Eleventy creates a folder and a index.html file instead of a filename with a good naming. This can be changed by configuration and some filtering.

* The metadata needs some extended handling of creation and modification date.

* The archive mechanism needed some upgrade.


## See also

* <https://www.11ty.dev/docs/starter/>
* <https://github.com/11ty/eleventy-base-blog>
* <https://demo-base-blog.11ty.dev/>
* <https://docs.github.com/en/pages>
