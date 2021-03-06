---
id: xcode-simulators
sidebar_label: xcode-simulators
title: Delete unavailable Xcode simulators
---

## Available platforms

- macOS

## Command

```sh
xcrun simctl delete unavailable
```

## Description

Deletes all 'unavailable' simulators in Xcode.

An 'unavailable' simulator is one that you have never used before or that you don't have the SDK installed for.
They are safe to delete because simulators can be redownloaded. You will also not lose any data on them because you have not touched unavailable simulators before.

I found this trick in a Reddit post by /u/LisaDziuba [here](https://www.reddit.com/r/iOSProgramming/comments/9zcwtz/run_xcrun_simctl_delete_unavailableand_get_your/). Using this trick I managed to free up slightly more than 10GB of space.

## See also

- [Reddit thread](https://www.reddit.com/r/iOSProgramming/comments/9zcwtz/run_xcrun_simctl_delete_unavailableand_get_your/)
