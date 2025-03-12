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