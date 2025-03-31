const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Find all story files
async function updateStories() {
  const storyFiles = await glob('src/**/*.stories.@(js|jsx|ts|tsx)', { 
    cwd: path.resolve(__dirname, '..') 
  });

  storyFiles.forEach(file => {
    const filePath = path.resolve(__dirname, '..', file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip files that are already updated
    if (content.includes('StoryObj') || content.includes('type Story =')) {
      console.log(`Skipping already updated file: ${file}`);
      return;
    }
    
    // Extract component name from import statement
    const componentMatch = content.match(/import\s+{\s*([A-Za-z0-9_]+)\s*}\s+from/);
    if (!componentMatch) {
      console.log(`Could not find component name in file: ${file}`);
      return;
    }
    
    const componentName = componentMatch[1];
    
    // Check if the file is using the old format
    if (content.includes('export default {') && content.includes('export const')) {
      // Update to new format
      content = content.replace(/import React from ["']react["'];/, 
        `import React from "react";\nimport type { Meta, StoryObj } from '@storybook/react';`);
      
      content = content.replace(/export default {([^}]*)};/, 
        `const meta: Meta<typeof ${componentName}> = {$1};\n\nexport default meta;\ntype Story = StoryObj<typeof ${componentName}>;`);
      
      // Update story exports
      content = content.replace(/export const ([A-Za-z0-9_]+) = \(\) => <[^>]*>/g, 
        'export const $1: Story = {}');
      
      // Update story exports with args
      content = content.replace(/export const ([A-Za-z0-9_]+) = \(args\) => <[^>]*>/g, 
        'export const $1: Story = {');
      
      // Close any open story definitions
      content = content.replace(/;(\s*)$/g, '};$1');
      
      fs.writeFileSync(filePath, content);
      console.log(`Updated file: ${file}`);
    } else {
      console.log(`File format not recognized: ${file}`);
    }
  });

  console.log('Story update complete!');
}

updateStories().catch(console.error);