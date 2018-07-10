---
id: contributing
title: Adding more strategies
---

## Contributing to `make-space`

Do you have an amazing tip on how to save even more space? Add it to `make-space`!
Contributing is fairly easy.

### Set up the project for development

Fork the repository on Github and then install the dependencies:

```sh
$ git clone https://github.com/{YourGitHubName}/make-space
$ cd make-space
$ npm install
```

You can start the tool by running:

```
npm start
```

### Add a strategy

In the `src/strategies` folder, you'll find all the current strategies. Either copy an existing one or start from scratch.

To enable the strategy, import it in `src/strategies.js`.

A strategy just consists of 5 parts:

- `name`: Short description of what it does
- `key`: a unique identifier
- `probe`: A promise that reports how much space can be saved. Ideally a promise that reports progress!
- `command`: The command that frees up space.
- `feasible`: A command that determines if it is possible to run the strategy. If the command throws an error, the strategy will not be shown. This command must run very fast.

### Submit a pull request

Before you submit, please make sure:

- the `npm test` command runs without failing.
- your strategy has a unique and handy `key`
- you have added some documentation to the `website` folder
- the module stays fast and simple!

Thank you for sending in a PR!

> Please follow our **[Code of Conduct](https://github.com/JonnyBurger/make-space/blob/master/code-of-conduct.md)**!
