---
title: Eleventy Setup
created: 2025-01-20
tags: ["blog", "nodejs"]
---

{% include './toc.njk' %}

Eleventy is used as a local Node.js project containing content in markdown, liquid and nunjucks, images and more. The functionality
os provided by eleventy on the command line or through npm tasks.

The project starts by creating an empty folder (blog) where the blog project files are saved.  This can be done easily
with the `npm` tool comming with node.js:

```cmd
md blog
cd blog
npm init -y
npm install --save-dev @11ty/eleventy -D
```

This results in some files in the folder that are required for the project configuration like `package.json` and a folder named `node_modules`
that contains the eleventy library and libraries eleventy uses (about 160). As of this writing the version 3.0.0. will be used.
Not small but it can do a lot.

run `npx @11ty/eleventy --version` or `npx @11ty/eleventy --help` to verify the installation up to here.

The resulting configuration file `package.json` is not final - I explain more below.

As a first test you can just create a folder named `src` and place some files inside "index.md" and "hello.md"

index.md:

``` md
# Index

This is Home.

[Hello](hello)
```

hello.md:

``` md
# Hello

Saying hello to you...
```

The run `npx @11ty/eleventy --serve --input=src` and open <http://localhost:8080/> in the browser to verify.


## Changes in Package.json

Some changes must be mad to the package.json file. Or just use the package.json file form the blog-setup project.

Make sure we use the new module loader in node.js:

``` json
{
  ...
  "type": "module",
}
```

Add useful scripts for development purpose:

``` json
{
  ...
  "scripts": {
    "build": "npx @11ty/eleventy",
    "serve": "npx @11ty/eleventy --serve",
    "clean": "rmdir /S /Q _site"
  },
}
```

Install another library that extends eleventy. more on this in [Filenames and Links](./21-links.md):

``` sh
npm install markdown-it-replace-link -D
```

Change the license, author, description etc. as required.

Now package.json may look like:

``` json

```



create a .eleventy.js to specify the project parameters to specify the project parameters.  I use the ESM syntax variant
for this.

``` JS
return {
  dir: {
   input: 'src'
  },
 }
 };
```

A `src` folder is created to have a central place for the blog articles.  This keeps all node and eleventy specific
configuration files separate from the content.

For now you can place any md files into the `src` directory for testing purpose and you will see that a `_site` folder
is created containing static html files.



<!-- There will be some naming conventions later... -->

Avoiding much configuration - stay to the standard as far as possible:

* One folder with index.html for each post.
*

Try `npx @11ty/eleventy` to compile the project. This will create a new folder `_site` with the generated web site.

Try `npx @11ty/eleventy --serve` to compile the project and start a local web server.

it will tell you how to reach the web server like

``` txt
...
[11ty] Wrote 9 files in 0.20 seconds (v3.0.0)
[11ty] Watching…
[11ty] Server at http://localhost:8080/
```

For now when you click the link <http://localhost:8080/> no page will be displayed as some configurations are still
missing.  When you have placed an `overview.md` file in the `src` folder you can see the genertted output by using the
url <http://localhost:8080/overview>.

full

[text](http://localhost:8080)

[text](http://localhost:8080/00-overview/)

## useful tasks in package.json

The "serve" script in the package.json allows starting the script in the visual studio by a simple click on the NPM
script view and even starting a debug session is possible because the right parameters are passed.

```json
{
  "scripts": {
    "serve": "npx @11ty/eleventy --serve --incremental",
  }
}
```

When renaming files the last generated files from the old filenam remain in the output `_site` folder.  The "clean"
script allows simple deleting of the whole _site folder.  When you change structure or rename files this command will
help you starting from scratch again.

```json
{
  "scripts": {
    "clean": "rmdir /S /Q _site",
  }
}
```




C:\Users\Matthias\Projects\blog>npx @11ty/eleventy --help 
Usage: eleventy
       eleventy --input=. --output=./_site
       eleventy --serve

Arguments:

     --version

     --input=.
       Input template files (default: `.`)

     --output=_site
       Write HTML output to this folder (default: `_site`)

     --serve
       Run web server on --port (default 8080) and watch them too

     --port
       Run the --serve web server on this port (default 8080)

     --watch
       Wait for files to change and automatically rewrite (no web server)

     --incremental
       Only build the files that have changed. Best with watch/serve.

     --incremental=filename.md
       Does not require watch/serve. Run an incremental build targeting a single file.

     --ignore-initial
       Start without a build; build when files change. Works best with watch/serve/incremental.

     --formats=liquid,md
       Allow only certain template types (default: `*`)

     --quiet
       Don’t print all written files (off by default)

     --config=filename.js
       Override the eleventy config file path (default: `.eleventy.js`)

     --pathprefix='/'
       Change all url template filters to use this subdirectory.

     --dryrun
       Don’t write any files. Useful in DEBUG mode, for example: `DEBUG=Eleventy* npx @11ty/eleventy --dryrun`

     --loader
       Set to "esm" to force ESM mode, "cjs" to force CommonJS mode, or "auto" (default) to infer it from package.json.

     --to=json
     --to=ndjson
       Change the output to JSON or NDJSON (default: `fs`)

     --help
