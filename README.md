# Prufung

### A reliable way to test functions with data


## Inspiration 
------
### v1
I learned about [ramda](https://github.com/ramda/ramda) and I was facinated so I made an excuse to work a bit more with it. At the same time I read about making npm packages with Typescript therefore I thought Why not?

### v2 (aka real one)

I needed a way to test if a code was doing what it says it does in browser for my project [pythonCourse](https://github.com/Yhozen/pythonCourse) so I can mimic codecademy behaviour

## Installation
------
```
yarn add prufung
or
npm install --save prufung
```

## Usage
------
define a function to be tested with its arguments and compare it

```javascript
import { expect } from 'prufung'

const add = (a, b) => a + b

expect(add, 5, 6).toBe(11) // true

expect(add, 5, 6).not.toBe(11) // false

expect(add, 5, 6).toBeFalsy() // false

expect(add, 5, 6).toBeTruthy() // true

expect(add, 5, 6).toBeAny(1,2,3,4,5) // false
expect(add, 5, 6).toBeAny(11,2,3,4,5) // true

expect(add, 5, 6).toBeNone(1,2,3,4,5) // true
expect(add, 5, 6).toBeAny(11,2,3,4,5) // true

const passArg = a => a
expect(passArg, {}).toBe({}) // false
expect(passArg, {}).equal({}) // true

const obj = {}
expect(passArg, obj).toBe(obj) // true
expect(passArg, obj).equal(obj) // true

const greeting = name => 'Hello, ' + name 
expect(greeting, 'Mark').stringContaining('Hello') // true

const addTwoToList = list => list.push(2)
expect(addTwoToList, [1,3,4,5]).arrayContaining([2]) // true
```

