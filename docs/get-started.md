---
id: get-started
title: Get Started using `make-space`
sidebar_label: Get started
---

## Installation

The simplest way to run `make-space` is to use `npx`:

```sh
$ npx make-space
```

This will download the package from npm and execute it right away. If you don't have npx, you'll get it by [installing the newest version of npm](https://docs.npmjs.com/cli/install).

> By using npx, you don't have to install the tool, saving you more space! You also always get the newest version, so when new strategies are added, you'll always have them.

## Usage

Upon execution, `make-space` will inspect your file system and suggest you things you can do to free up space.

The search phase may take up to a minute, you can press <kbd>s</kbd> to stop the searching and kill all spawned processes.

Once the search phase is done or has been stopped, you can use <kbd>↑</kbd> and <kbd>↓</kbd> to navigate between the suggestions and <kbd>space</kbd> to select / deselect suggestions.

If you have made your selection, press <kbd>↵</kbd> to execute the strategies.

At all times, you can press <kbd>Ctrl</kbd>+<kbd>C</kbd> to quit the tool.
