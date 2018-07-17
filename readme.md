_BETA NOTICE_: This module is still in development and in an early stage. Be careful with deleting stuff for now!

---

# make-space [![npm version](https://img.shields.io/npm/v/make-space.svg?style=flat)](https://www.npmjs.com/package/make-space) [![Build Status](https://travis-ci.org/JonnyBurger/make-space.svg?branch=master)](https://travis-ci.org/JonnyBurger/make-space)

<p align="center">
  <img width="800" src="zoom.gif">
</p>

**⚡️ Fast, lightweight, simple**: Less than 1 MB, no dependencies<sup><a href="#footnote-1">[1]</a></sup>. `make-space` downloads and runs in 5 seconds!

**👨‍💻 Focused on developers**: Finds ways to free up space that other tools don't, such as clearing npm, Homebrew, Xcode, Yarn caches and removing unnecessary Docker images!

**📦 No installation needed**: You just need a newer version of npm. Then you can just type `npx make-space`!

## How to use

```
$ npx make-space
```

<details>
<summary>Why use <code>npx</code>?
</summary>
<ul>
<li>Just one command which is cool!
<li>
With npx, you don't have to install the tool, saving you more space.
<li>Whenever you execute it, you get the newest version.
</li>
<li>
The <code>npx</code> binary is included with npm 5.2 and above.
<li>You can also use a normal npm install or install make-space with yarn:
<pre><code>$ npm install -g make-space<br/>$ make-space</code></pre>or
<pre><code>$ yarn add --global make-space<br/>$ make-space</code></pre>
</li>
</ul>
</details>
<table>
<tr>
<td>
<kbd>s</kbd></td><td>Stop searching<br/>
</td>
</tr>

<tr>
<td><kbd>↑</kbd>/<kbd>↓</kbd></td> <td>Navigate through options<br/></td>
</tr>
<tr>
<td>
<kbd>space</kbd></td><td>Select item</td><br/>
</tr>
<tr>
<tr>
<td><kbd>d</kbd></td><td>Show documentation for command
</td>
</tr>
<tr>
<td>
<kbd>enter</kbd></td><td>Execute selected options</td><br/>
</tr>
<tr>
<td>
<kbd>Ctrl</kbd>+<kbd>C</kbd></td><td>Quit</td><br/>
</tr>
</table>

## Strategies

To free up space, we employ a variety of different strategies. Small savings add up! All strategies that are implemented are also [documented on the website](https://www.make-space.sh/docs/strategies.html).

## What ideas do you have to make space?

We would love if you send us pull requests with new strategies to free up even more space!

[Here are some instructions on how to do so!](https://www.make-space.sh/)

## License

MIT © [Jonny Burger](https://jonny.io)

---

<a name="footnote-1">1)</a> The version that is published on npm is bundled with webpack and then minified, which means you don't need to install the dependencies!
