---
title: Eleventy - Overview
created: 2025-01-18
tags: ["blog", "nodejs"]
description: >  
  I have used several site generators and web sites for project documentation during the past years
  and found a solution for my blogging activities based on the static site generator
  [eleventy](https://www.11ty.dev/).
---

{% include './toc.njk' %}

## The Plan


* Blog posts can be written in markdown a simple but powerful documentation solution.
* All the maintenance tasks to complete the web sites are automated.
* Deployment can be done to any public web server that dan deliver static files.  This includes especially
  [github pages](https://docs.github.com/en/pages) a free hosting solution comming with GitHub that any public project
  can use.  I also use it for the [HomeDing documentation](https://homeding.github.io/) with a slightly different
  configuration that better fits to project documentation.

The blog will be available on my web server using the root <https://www.mathertel.de/blog>.


## The Blog web site features in short

* The Home Page shows the summaries of the last 8 blog entries.
* Navigation forward and backwards by providing links on every page.
* Metadata driven organization and publishing
* Blog entries can be categorized by using tags.
* Archived and outdated posts


## Prerequisites

Node.js >= version 18 must be installed.  You do not need to know Node.js or JavaScript.  You simply need the SDK installed to provide you with npm to setup the project. You can get the Node SDK for your system here:
<https://nodejs.org/en/>

You should however have some knowledge of HTML, CSS, and JavaScript.  You do not need to be an expert, just comfortable
using them.  In terms of HTML and CSS, Eleventy has zero impact on what you use and how you write your templates.  It
doesn't care.  In terms of JavaScript, the same applies to what you build, but if you know a bit of JavaScript, Eleventy
will be easier to configure and extend.  If you need help with that, check MDN Web Docs or search for further articles
on eleventy.  - There are plenty.

A Git client if you want to start with a clone of a repository but you can also download the zip right from the repository.
The complete solution is available on GitHub at <https://github.com/mathertel/blog-template>.

Eleventy is incredibly simple to use.  If you like to read more about it have a look at the documentation: <https://www.11ty.dev/docs/>

## Step by Step instructions

* [Set Up Node.js on a Linux Computer](/2024/03-setup-linux-nodejs.md)
* [Keep node.js and libraries up to date](/2024/05-nodejs-update.md)
* [Set Up Visual Studio Code (VSCode)](/2024/10-setup-vscode.md)
* [Optimize VSCode for Authoring](/2024/11-writing-with-vscode.md)
* [Eleventy Basic Setup](./12-eleventy-setup.md)
* [Metadata of Content](./20-metadata.md)
* [Eleventy Blog Functionality](../../memo/14-eleventy-blog-functionality.md)
