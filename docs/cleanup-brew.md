---
id: brew-cleanup
title: Cleanup Homebrew
sidebar_label: brew-cleanup
---

## Available platforms

- macOS

## Command

```sh
brew cleanup
```

## Description

Deletes old formulas from Homebrew.

Homebrew is a package manager for macOS.
It's documentation says:

> "By default, Homebrew does not uninstall old versions of a formula, so over time you will accumulate old versions. To remove them, simply use:
> `brew cleanup`"

This is a strategy that can easily save gigabytes of data, as you can see in this Twitter thread:

<blockquote class="twitter-tweet" data-lang="de"><p lang="en" dir="ltr">$ brew cleanup<br>&gt; Removing...<br>&gt; ==&gt; This operation has freed approximately 1.2GB of disk space.<br><br>😱😱😱 <a href="https://t.co/J6Fm2SyDr1">https://t.co/J6Fm2SyDr1</a></p>&mdash; Max Stoiber (@mxstbr) <a href="https://twitter.com/mxstbr/status/996713721618628609?ref_src=twsrc%5Etfw">16. Mai 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## See also

- [Homebrew documentation](https://docs.brew.sh/FAQ)
- [Twitter thread](https://twitter.com/mxstbr/status/996713721618628609)
