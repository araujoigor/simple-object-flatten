## Simple Object Flatten

Simple and configurable object flattener


### Contents
- [Install](#install)
- [Usage](#usage)
- [Options](#options)
  - [Separator](#separator)
  - [Array as object](#array-as-object)
  - [String as object](#string-as-object)
  - [Filter out keys](#filter-out-keys)
- [License](#license)

### Install

To install just use npm or yarn:

```bash
npm install --save simple-object-flatten
```

```bash
yarn add simple-object-flatten
```

### Usage

In order to use the lib, just import it and use it as a function. The sintax is `flatten(object, options)`. For more information about the options, please check the [Options](#options) section.

```js
const flatten = require("simple-object-flatten");

//-- output: { "foo.bar": "bar", "foo.arr": [ 1, 2, 3 ] }
let flattened = flatten({ foo: { bar: "bar", arr: [ 1, 2, 3 ] } });
```

### Options

Although there are several good object flatteners out there, I decided to create my own because no one was actually fulfilling all my needs. Therefore, this library comes with the following flattening options:

#### Separator

You can specify your own separator when flattening your objects. The default value is `.`.

```js
//-- output: { "foo/bar": "bar", "foo/arr": [ 1, 2, 3 ] }
let flattened = flatten({ foo: { bar: "bar", arr: [ 1, 2, 3 ] } }, { separator: "/" });
```

#### Array as object

By default, the flattener will only flatten the keys of regular objects. However, if you want to treat arrays as objects and flatten its keys, you can set the `arrayAsObject: true`. The default value is `false`.

```js
//-- output: { "foo.bar": "bar", "foo.arr.0": 1, "foo.arr.1": 2, "foo.arr.2": 3 }
let flattened = flatten({ foo: { bar: "bar", arr: [ 1, 2, 3 ] } }, { arrayAsObject: true });
``` 

#### String as object

By default, the flattener will only flatten the keys of regular objects. However, if you want to treat strings as objects and flatten its keys, you can set the `stringAsObject: true`. The default value is `false`.

```js
//-- output: { "foo.bar.0": "b", "foo.bar.1": "a", "foo.bar.2": "r", "foo.arr": [ 1, 2, 3 ] }
let flattened = flatten({ foo: { bar: "bar", arr: [ 1, 2, 3 ] } }, { stringAsObject: true });
```

#### Filter out keys

If for any reason you need to suppress some keys from the resulting object, you can do this using the `filterOut` option. This parameter can be either a string or an array of keys. The default value for this option is `undefined` which means that all the keys from the input are going to appear in the output.

It is important to highlight that the filtering only happens on areas of the object that will be flattened. So if you have an object inside an array with a key to be filtered out, you need to use `arrayAsObject` in order for the filtering to take place in that array. Check out the example below:

```js
//-- output: { "foo.bar": "bar", "foo.arr": [ 1, 2, 3, { unwanted_key: 0 } ] }
let f1 = flatten({ foo: { bar: "bar", arr: [ 1, 2, 3, { unwanted_key: 0 } ], unwanted_key: {} }, unwanted_key: "hi" }, { filterOut: "unwanted_key" });

//-- output: { "foo.bar": "bar", "foo.arr.0": 1, "foo.arr.1": 2, "foo.arr.2": 3, "foo.arr.3": {} }
let f2 = flatten({ foo: { bar: "bar", arr: [ 1, 2, 3, { unwanted_key: 0 } ], unwanted_key: {} }, unwanted_key: "hi" }, { filterOut: "unwanted_key", arrayAsObject: true });
``` 

### License

MIT