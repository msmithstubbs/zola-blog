const fs = require('fs');
const path = require('path');

function convertTomlToYaml(toml) {
  let yaml = '';
  const lines = toml.trim().split('\n');

  for (let line of lines) {
    line = line.trim();

    // Skip empty lines
    if (!line) continue;

    // Handle sections like [taxonomies]
    if (line.startsWith('[') && line.endsWith(']')) {
      const sectionName = line.slice(1, -1);
      // For taxonomies section, we'll flatten it
      continue;
    }

    // Handle key = value
    if (line.includes('=')) {
      let [key, ...valueParts] = line.split('=');
      key = key.trim();
      let value = valueParts.join('=').trim();

      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
        const items = value.split(',').map(item => item.trim().replace(/^"|"$/g, ''));
        yaml += `${key}:\n`;
        items.forEach(item => {
          yaml += `  - ${item}\n`;
        });
      } else {
        yaml += `${key}: "${value}"\n`;
      }
    }
  }

  return yaml.trim();
}

function getPermalink(filePath) {
  const parts = filePath.split('/');
  const fileName = parts[parts.length - 1];
  const section = parts[parts.length - 2]; // notes, til, or links

  // Extract slug from filename (remove date prefix if present)
  let slug = fileName.replace('.md', '');

  // Remove date prefix (YYYY-MM-DD-)
  slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');

  return `/${section}/${slug}/`;
}

function convertFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if file has TOML frontmatter
  if (!content.startsWith('+++')) {
    console.log(`Skipping ${filePath} - no TOML frontmatter`);
    return;
  }

  // Extract frontmatter and content
  const parts = content.split('+++');
  if (parts.length < 3) {
    console.log(`Skipping ${filePath} - invalid frontmatter`);
    return;
  }

  const tomlFrontmatter = parts[1];
  const markdownContent = parts.slice(2).join('+++').trim();

  // Convert TOML to YAML
  let yamlFrontmatter = convertTomlToYaml(tomlFrontmatter);

  // Add layout and permalink
  const permalink = getPermalink(filePath);
  yamlFrontmatter = `layout: blog-page.njk\n${yamlFrontmatter}\npermalink: "${permalink}"`;

  // Write new file
  const newContent = `---\n${yamlFrontmatter}\n---\n\n${markdownContent}\n`;
  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`Converted: ${filePath}`);
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.md') && !file.startsWith('_index')) {
      convertFile(filePath);
    }
  }
}

// Process all content directories
const contentDir = '/home/user/zola-blog/content';
processDirectory(contentDir);

console.log('Conversion complete!');
