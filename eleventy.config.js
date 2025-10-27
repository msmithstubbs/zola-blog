module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("static");

  // Add collections for notes, til, and links
  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/notes/*.md").reverse();
  });

  eleventyConfig.addCollection("til", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/til/*.md").reverse();
  });

  eleventyConfig.addCollection("links", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/links/*.md").reverse();
  });

  // Add collection for all posts (notes + til + links)
  eleventyConfig.addCollection("allPosts", function(collectionApi) {
    const notes = collectionApi.getFilteredByGlob("content/notes/*.md");
    const til = collectionApi.getFilteredByGlob("content/til/*.md");
    const links = collectionApi.getFilteredByGlob("content/links/*.md");
    return [...notes, ...til, ...links].sort((a, b) => b.date - a.date);
  });

  // Add filter to group by year
  eleventyConfig.addFilter("groupByYear", function(collection) {
    const grouped = {};
    collection.forEach(item => {
      const year = item.date.getFullYear();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(item);
    });
    // Convert to array of [year, posts] and sort by year descending
    return Object.entries(grouped).sort((a, b) => b[0] - a[0]);
  });

  // Add slug filter
  eleventyConfig.addFilter("slug", function(str) {
    return str.toLowerCase().replace(/\s+/g, '-');
  });

  // Add date filter
  eleventyConfig.addFilter("formatDate", function(date, format) {
    const d = new Date(date);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (format === "%d %B %Y") {
      const day = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    }
    if (format === "%Y") {
      return d.getFullYear().toString();
    }
    return d.toISOString();
  });

  // Add shortcodes
  const markdown = require('markdown-it')();

  eleventyConfig.addPairedShortcode("quote", function(content, footer) {
    const htmlContent = markdown.render(content);
    const htmlFooter = footer ? markdown.renderInline(footer) : '';
    return `<blockquote>${htmlContent}<footer>${htmlFooter}</footer></blockquote>`;
  });

  eleventyConfig.addShortcode("figure", function(img, alt = '') {
    // For posts with images in subdirectories, we need to resolve the path
    // The page context is available in 11ty shortcodes via 'this.page'
    const imgPath = this.page.url + img;
    return `<figure><img src="${imgPath}" alt="${alt}" /></figure>`;
  });

  eleventyConfig.addPairedShortcode("sidenote", function(content) {
    return `<label for="sn-proprietary-monotype-bembo" class="margin-toggle sidenote-number"></label>
<input type="checkbox" id="sn-proprietary-monotype-bembo" class="margin-toggle">
<span class="sidenote">${content}</span>`;
  });

  // Copy images from post directories
  eleventyConfig.addPassthroughCopy("content/**/*.png");
  eleventyConfig.addPassthroughCopy("content/**/*.jpg");
  eleventyConfig.addPassthroughCopy("content/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("content/**/*.gif");

  // Set custom directories
  return {
    dir: {
      input: "content",
      output: "_site",
      includes: "../_includes",
      layouts: "../_layouts",
      data: "../_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
