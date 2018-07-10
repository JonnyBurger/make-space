---
id: xcode-archives
title: Delete Xcode archives
sidebar_label: xcode-archives
---

## Available platforms

- macOS

## Command

```sh
rm -rfv ~/Library/Developer/Xcode/Archives
```

## Description

Deletes the 'Archives' folder from Xcode, which contains all versions of your iOS, macOS, tvOS and watchOS that you have archived.

Maybe you don't need these archives because you can regenerate them by going back in your Git history and recompiling it.

Use this command if you don't care about these archives and want to give them up to for more space.

Note that you cannot recover these archives from App Store Connect! Do not use this strategy if you need older IPA files of your app.

## See also

- [Can I download my own binaries from iTunes Connect?](https://stackoverflow.com/questions/9521522/can-i-download-my-own-binaries-from-itunes-connect)
