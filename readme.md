_BETA NOTICE_: This module is not quite ready. I'm publishing it to reserve the name and to test the `npx` feature.

---

# make-space [![Build Status](https://travis-ci.org/JonnyBurger/make-space.svg?branch=master)](https://travis-ci.org/JonnyBurger/make-space)

> Free up hard disk space

## Install

```
$ npm install --save make-space
```

## Usage

```js
const freeSpace = require('make-space');

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
$ npm install --global make-space
```

```
$ make-space --help

  Usage
    make-space [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ make-space
    unicorns & rainbows
    $ make-space ponies
    ponies & rainbows
```

## License

MIT © [Jonny Burger](https://jonny.io)
