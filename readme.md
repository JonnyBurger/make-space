_BETA NOTICE_: This module is not quite ready. I'm publishing it to reserve the name and to test the `npx` feature.

---

# more-space [![Build Status](https://travis-ci.org/JonnyBurger/more-space.svg?branch=master)](https://travis-ci.org/JonnyBurger/more-space)

> Free up hard disk space

## Install

```
$ npm install --save more-space
```

## Usage

```js
const freeSpace = require('more-space');

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
$ npm install --global more-space
```

```
$ more-space --help

  Usage
    more-space [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ more-space
    unicorns & rainbows
    $ more-space ponies
    ponies & rainbows
```

## License

MIT © [Jonny Burger](https://jonny.io)
