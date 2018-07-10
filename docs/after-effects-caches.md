---
id: after-effects-caches
title: Delete After Effects Disk Cache
sidebar_label: after-effects-caches
---

## Available platforms

- macOS

## Command

```sh
rm -rfv ~/Library/Caches/Adobe/After Effects
```

## Description

Adobe After Effects uses something called a 'Disk Cache' to offer improved performance.

> You can disable the Disk cache or allocate a smaller size to it by going to `Preferences -> Media & Disk Cache` in After Effects.

In my case, the allocated Disk cache size was 46GB and about the same size for an older version of After Effects.

So this strategy has the potential to free dozens of Gigabytes of space!

## See also

- [Clean your After Effects Disk Cache](http://creativedojo.net/clean-after-effects-disk-cache/)
