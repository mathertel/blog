// parse html to extend links with prefix 
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

// reference markdown conversion library
import markdownIt from "markdown-it";

// export function to configure eleventy
export default function(eleventyConfig) {

  // support `prod` environment not publishing drafts 
  const prodVariable = process.env.ELEVENTY_ENV;
  console.log(`Environment: ${prodVariable ? prodVariable : 'not set'}`);
  eleventyConfig.addGlobalData('isProduction', 
    (prodVariable && (prodVariable.trim().toLowerCase() === 'prod')));

  // Modify all URLs pointing to .md files in all .htm output in your project
  eleventyConfig.htmlTransformer.addUrlTransform(
    "htm",
   
    /**
     * transform internal links to markdown fils to the final url using the htm format.
     * @this {object}
     * @param {string} url given url in the document
     */
    (url) => {
      let lUrl = url.toLowerCase();
      if ((! lUrl.startsWith('http')) && (lUrl.endsWith('.md'))) {
        return(url.substring(0, url.length-2) + 'htm');
      }  
      return (url);
    },

    {
    	priority: -1, // run last (especially after PathToUrl transform)
    }
  );

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    extensions: "htm,html"
  });

  // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
  // Adds the {% css %} paired shortcode
  eleventyConfig.addBundle("css", {
    toFileDirectory: "dist",
  });
  // Adds the {% js %} paired shortcode
  eleventyConfig.addBundle("js", {
    toFileDirectory: "dist",
  });

  // /// exclude all draft files from the build in production mode
  // eleventyConfig.addPreprocessor("drafts", "njk,md", (data, content) => {
  //   return (isPublishPage(data) ? undefined : false);
  // });


  // Collection posts: All written and published posts.
  // This is the collection that will be used instead of "all" to allow draft files.
  // * with forward/back navigation references  
  // * with created and modified date (not file based date).
  // * modified date set to created date, when not specified.
  eleventyConfig.addCollection("posts", function(collectionApi) {

    // collect all blog posts from the src folder and sort by created date
    let posts = collectionApi
      .getFilteredByGlob("src/**/*.md")
      .sort((a, b) => a.data.created - b.data.created);

    // add previous references to each post
    for (let i = 0; i < posts.length - 1; i++) {
      posts[i].data.previous = posts[i + 1];
    }

    // add next references to each post
    for (let i = 1; i < posts.length; i++) {
      posts[i].data.next = posts[i - 1];
    }

    // set modified to created if not set
    posts.forEach(p => {
      if (!p.data.modified) {
        p.data.modified = p.data.created;
      }
    });

    console.log(`# of published posts: ${posts.length}`);
    return (posts);
  });


  // Return the list of the tags of pages beeing used.
  eleventyConfig.addFilter("getAllUsedTags", target => {
    const tags = [];

    Object.keys(target).forEach(key => {
      if ((key !== 'all') && (key !== 'posts') && target[key].length > 0) {
        tags.push(key);
      }
    });

    return tags;
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
  });

  eleventyConfig.addFilter('unique', (list) => {
    const map = new Map(list.map((x) => [x, x]));
    return [...map.values()]
  })

  eleventyConfig.addFilter("toISODate", (dateObj) => {
    if (dateObj)
      return dateObj.toISOString().substring(0, 10);
    else
      return "undefined";
  });

  eleventyConfig.addFilter("toISOString", (dateObj) => {
    if (dateObj)
      return dateObj.toISOString();
    else
      return "";
  });

  eleventyConfig.addFilter('dump', (obj) => {
    console.log(JSON.stringify(obj, null, 2));
    return "dumped."
  })


  // copy static files to output
  eleventyConfig.addPassthroughCopy("src/*.css");
  eleventyConfig.addPassthroughCopy("src/sfc/*.*");
  eleventyConfig.addPassthroughCopy("src/**/*.svg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");

  eleventyConfig.addJavaScriptFunction("compareDates", function(dateA, dateB) {
    return items.find(item => item.id === id);
  });


  eleventyConfig.addJavaScriptFunction("inspect", function(value) {
    debugger;
  });


  // development server configuration
  eleventyConfig.setServerOptions({
    // The default file name to show when a directory is requested.
    indexFileName: "index.htm",
  });


  // use special options for markdown and enable markdown-it-replace-link
  const markdown = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
    // replaceLink: link => link.replace(/(^\/[^.]*)\.md$/, "$1.htm"),
  });
  eleventyConfig.setLibrary("md", markdown);
  // markdown.use(mdReplaceLink);


  eleventyConfig.addFilter("markdown", (content) => {
    let r = '';
    if (content) r = markdown.render(content.trim());
    return r;
  });

  // Async support for `addPairedShortcode` is new in Eleventy v2.0.0
  eleventyConfig.addPairedShortcode("term", function(content, termName) {
    let r = '';
    if (content) r = markdown.render(content.trim());
    let html = `<dt><code>${termName}</code></dt><dd>${r}</dd>`;
    return html;
  });

  // Async support for `addPairedShortcode` is new in Eleventy v2.0.0
  eleventyConfig.addPairedShortcode("termlist", function(content) {
    let html = `<dl>${content}</dl>`;
    return html;
  });


  // eleventyConfig.addNunjucksGlobal("isProduction", isProduction);

  // more options as data
  return {
    pathPrefix: "/blog/",
    dir: {
      input: 'src',
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }

};

