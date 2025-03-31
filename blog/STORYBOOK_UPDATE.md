# Storybook Update to Version 8

This document outlines the changes made to update Storybook from version 6.4 to version 8.0.

## Changes Made

1. **Updated Dependencies**
   - Updated all Storybook packages to version 8.0.0
   - Added `@storybook/react-webpack5` as the framework builder
   - Added `storybook` package for CLI commands

2. **Configuration Updates**
   - Updated `.storybook/main.js` to use the new configuration format
   - Updated `.storybook/preview.js` to use the new preview API

3. **Story Format Updates**
   - Updated story files to use the new Component Story Format (CSF) 3
   - Converted MDX stories to separate MDX documentation and CSF story files
   - Added a script to automate the conversion of story files

## How to Run Storybook

```bash
# Install dependencies
npm install

# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

## Story Update Script

A script has been added to help convert old story formats to the new CSF 3 format:

```bash
# Run the story update script
npm run update-stories
```

## Key Benefits of Storybook 8

1. **Performance Improvements**
   - Faster startup and build times
   - SWC support for Webpack projects

2. **Better Developer Experience**
   - Improved UI and mobile experience
   - Enhanced controls and documentation

3. **Modern Architecture**
   - Better framework support
   - Improved Vite integration

## References

- [Storybook 8 Migration Guide](https://storybook.js.org/docs/migration-guide)
- [Storybook Documentation](https://storybook.js.org/docs)