# Radash
Its like Ramda or Lodash because its just a library of simple, small, utility functions. Its not like Ramda or Lodash because you can open it up and easily read and understand all of them.

## Install
```
yarn add radash
```
or
```
npm install radash
```
Types are included, if your into that.

## Usage
```ts
import _ from 'radash'

const list = [1, 2, 3, 4, 5, 6]

const oddsSquared = _.select(list, x = x*x, x => x % 2)
const { odds, evens } = _.group(list, x => x % 2 ? 'odds' : 'evens' )
```