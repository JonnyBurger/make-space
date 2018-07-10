---
id: npm-cache
title: Empty npm cache
sidebar_label: npm-cache
---

## Available platforms

- macOS

## Command

```sh
rm -rfv ~/.npm
```

## Description

Empties the NPM cache.

NPM caches modules to make installs faster and to enable offline installs.

If you use this strategy, expect installs to be slower afterwards.

This strategy does not touch the `node_modules` folders of your projects.

## See also

- [Try clearing your npm cache](https://docs.npmjs.com/troubleshooting/try-clearing-the-npm-cache)
- [Offline installation of npm packages](https://addyosmani.com/blog/using-npm-offline/)
