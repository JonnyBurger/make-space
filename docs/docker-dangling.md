---
id: docker-dangling
title: Delete dangling Docker images
sidebar_label: docker-dangling
---

## Available platforms

- macOS

## Command

```sh
docker rmi $(docker images -f dangling=true -q)
```

## Description

Removes dangling Docker images.

You might free up even more space by removing all unused images, which encompass dangling images, using the following command:

```
docker system prune --all
```

`make-space` opts for a more conservative strategy and only removes dangling Docker images.

Read [this StackOverflow answer](https://stackoverflow.com/a/45143234/986552) regarding the difference between dangling and unused images:

> An unused image means that it has not been assigned or used in a container. For example, when running `docker ps -a` - it will list all of your exited and currently running containers. Any images shown being used inside any of containers are a "used image". <br/><br/>
> On the other hand, a dangling image just means that you've created the new build of the image, but it wasn't given a new name. So the old images you have becomes the "dangling image". Those old image are the ones that are untagged and displays "`<none>`" on its name when you run `docker images`.

## See also

- [docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/)
- [Docker: What is a dangling image and what is an unused image?](https://stackoverflow.com/questions/45142528/docker-what-is-a-dangling-image-and-what-is-an-unused-image)
