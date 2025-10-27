const fs = require('fs');
const path = require('path');

function extractDateFromPath(filePath) {
  const parts = filePath.split('/');

  // Try to find a date in the filename or parent directory
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    const match = part.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
  }

  // Default to file modification time if no date found
  const stats = fs.statSync(filePath);
  const mtime = new Date(stats.mtime);
  const year = mtime.getFullYear();
  const month = String(mtime.getMonth() + 1).padStart(2, '0');
  const day = String(mtime.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getPermalinkFromPath(filePath) {
  const parts = filePath.split('/');
  const section = parts.find(p => ['notes', 'til', 'links'].includes(p));

  // Check if this is an index.md in a subdirectory
  if (parts[parts.length - 1] === 'index.md') {
    const parentDir = parts[parts.length - 2];
    // Remove date prefix from directory name
    const slug = parentDir.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    return `/${section}/${slug}/`;
  }

  // Regular file
  const fileName = parts[parts.length - 1];
  const slug = fileName.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return `/${section}/${slug}/`;
}

function addDateToFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if file has YAML frontmatter
  if (!content.startsWith('---')) {
    console.log(`Skipping ${filePath} - no YAML frontmatter`);
    return;
  }

  // Extract frontmatter and content
  const parts = content.split('---');
  if (parts.length < 3) {
    console.log(`Skipping ${filePath} - invalid frontmatter`);
    return;
  }

  let frontmatter = parts[1];
  const markdownContent = parts.slice(2).join('---').trim();

  // Check if date already exists
  if (frontmatter.includes('date:')) {
    console.log(`Skipping ${filePath} - date already exists`);
    return;
  }

  // Extract date from filename/path
  const date = extractDateFromPath(filePath);

  // Fix permalink
  const permalink = getPermalinkFromPath(filePath);

  // Update frontmatter: add date after layout, fix permalink
  frontmatter = frontmatter.replace(/permalink: ".*?"/, `permalink: "${permalink}"`);

  // Add date after layout line
  frontmatter = frontmatter.replace(
    /(layout: blog-page\.njk)/,
    `$1\ndate: ${date}`
  );

  // Write new file
  const newContent = `---${frontmatter}---\n\n${markdownContent}\n`;
  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`Updated: ${filePath} (date: ${date}, permalink: ${permalink})`);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.md') && !file.startsWith('_index') && file !== 'index.njk') {
      addDateToFile(filePath);
    }
  }
}

// Process all content directories
const contentDir = '/home/user/zola-blog/content';
processDirectory(contentDir);

console.log('Date addition complete!');
