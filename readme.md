_BETA NOTICE_: This module is not quite ready. I'm publishing it to reserve the name and to test the `npx` feature.

---

# free-space [![Build Status](https://travis-ci.org/JonnyBurger/free-space.svg?branch=master)](https://travis-ci.org/JonnyBurger/free-space)

> Free up hard disk space

## Install

```
$ npm install --save free-space
```

## Usage

```js
const freeSpace = require('free-space');

freeSpace('unicorns');
//=> 'unicorns & rainbows'
```

## API

### freeSpace(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## CLI

```
$ npm install --global free-space
```

```
$ free-space --help

  Usage
    free-space [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ free-space
    unicorns & rainbows
    $ free-space ponies
    ponies & rainbows
```

## License

MIT © [Jonny Burger](https://jonny.io)
