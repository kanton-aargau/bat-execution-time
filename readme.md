
# bat-execution-time

> :clock1: CLI to measure the execution time for a bat file over a period of time

[![NPM version][version-image]][version-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Js Standard Style][standard-image]][standard-url]

## Installation

```
$ npm install -g bat-execution-time
```

## Usage

```
bat-execution-time [batfile] [args]

Options:
  --times, -t   run the tests `t` times                    [number] [default: 1]
  --output, -o  write the results into a json file                      [string]
  -h, --help    Show help                                              [boolean]
```

### Examples

Write directly to `stdout`:

```
$ bat-execution-time .\test\fixtures\test.bat -t 5
```

![example](./docs/example.png)

Or write the output to a file:

```
$ bat-execution-time .\test\fixtures\test.bat -o results.json -t 2
```

```json
{
  "data": [
    {
      "processTime": 3.217272558,
      "timeOfDay": "16:55:23"
    },
    {
      "processTime": 3.208636087,
      "timeOfDay": "16:55:26"
    }
  ]
}
```

## License

[MIT][license-url]

[version-image]: https://img.shields.io/npm/v/bat-execution-time.svg?style=flat-square

[version-url]: https://npmjs.org/package/bat-execution-time

[david-image]: http://img.shields.io/david/kanton-aargau/bat-execution-time.svg?style=flat-square

[david-url]: https://david-dm.org/kanton-aargau/bat-execution-time

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square

[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/bat-execution-time.svg?style=flat-square

[license-url]: ./license