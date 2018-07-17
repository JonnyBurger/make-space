---
id: spotify-cache
title: Delete Spotify cache
sidebar_label: spotify-cache
---

## Available platforms

- macOS

## Command

```sh
rm -rfv ~/Library/Caches/com.spotify.client/Data
```

## Description

Song cache of the Spotify desktop app, which can be several Gigabytes.

Spotify automatically limits the size of the cache to a certain percentage of your free space, however in the newer versions of Spotify, there are no cache settings.

Executing this strategy will not get rid of your offline music, which is by default saved under `~/Library/Application Support/Spotify/PersistentCache/Storage`.

## See also

- [Quick Tips to Clear Up Caches from Spotify
  ](https://www.tuneskit.com/spotify-music-tips/clear-spotify-cache.html)
