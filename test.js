const ava       = require("ava");
const flatten   = require("./index");

const date = new Date();
const func = function() {};

const obj = {
    key1            : {
        innerkey1       : 5,
        innerkey2       : "test",
        innerkey3       : [1,2,3,4],
        innerkey4       : [{ 
            innerarraykey1  : 0,
            innerarraykey2  : null,
            innerarraykey3  : undefined,
            innerarraykey4  : "test",
            unwanted_key    : "test"
        }, {}],
        innerkey5       : {
            innerkey5_1     : {
                innerkey5_1_1   : null,
                unwanted_key    : 5
            }
        }
    },
    key2            : date,
    key3            : func,
    key4            : [1, 2, 3, 4],
    key5            : [1, 2, "oi", { key: -1 }],
    unwanted_key    : {}
};

ava.test("flatten - simple", t => {
    let expected = {
        "key1.innerkey1": 5,
        "key1.innerkey2": "test",
        "key1.innerkey3": [1,2,3,4],
        "key1.innerkey4": [{ innerarraykey1: 0, innerarraykey2: null, innerarraykey3: undefined, innerarraykey4: "test", unwanted_key: "test" }, {}],
        "key1.innerkey5.innerkey5_1.innerkey5_1_1": null,
        "key1.innerkey5.innerkey5_1.unwanted_key" : 5,
        "key2"          : date,
        "key3"          : func,
        "key4"          : [1, 2, 3, 4],
        "key5"          : [1, 2, "oi", { key: -1 }],
        "unwanted_key"  : {}
    };

    t.deepEqual(flatten(obj), expected);
});

ava.test("flatten - custom separator", t => {
    let expected = {
        "key1=>innerkey1": 5,
        "key1=>innerkey2": "test",
        "key1=>innerkey3": [1,2,3,4],
        "key1=>innerkey4": [{ innerarraykey1: 0, innerarraykey2: null, innerarraykey3: undefined, innerarraykey4: "test", unwanted_key: "test" }, {}],
        "key1=>innerkey5=>innerkey5_1=>innerkey5_1_1": null,
        "key1=>innerkey5=>innerkey5_1=>unwanted_key" : 5,
        "key2"          : date,
        "key3"          : func,
        "key4"          : [1, 2, 3, 4],
        "key5"          : [1, 2, "oi", { key: -1 }],
        "unwanted_key"  : {}

    };

    t.deepEqual(flatten(obj, { separator: "=>" }), expected);
});

ava.test("flatten - arrays as objects", t => {
    let expected = {
        "key1.innerkey1": 5,
        "key1.innerkey2": "test",
        "key1.innerkey3.0": 1,
        "key1.innerkey3.1": 2,
        "key1.innerkey3.2": 3,
        "key1.innerkey3.3": 4,
        "key1.innerkey4.0.innerarraykey1": 0,
        "key1.innerkey4.0.innerarraykey2": null,
        "key1.innerkey4.0.innerarraykey3": undefined,
        "key1.innerkey4.0.innerarraykey4": "test",
        "key1.innerkey4.0.unwanted_key"  : "test",
        "key1.innerkey4.1": {},
        "key1.innerkey5.innerkey5_1.innerkey5_1_1": null,
        "key1.innerkey5.innerkey5_1.unwanted_key": 5,
        "key2"          : date,
        "key3"          : func,
        "key4.0"        : 1,
        "key4.1"        : 2,
        "key4.2"        : 3,
        "key4.3"        : 4,
        "key5.0"        : 1,
        "key5.1"        : 2,
        "key5.2"        : "oi",
        "key5.3.key"    : -1,
        "unwanted_key"  : {}
    };

    t.deepEqual(flatten(obj, { arrayAsObject: true }), expected);
});

ava.test("flatten - string as objects", t => {
    let expected = {
        "key1.innerkey1": 5,
        "key1.innerkey2.0": "t",
        "key1.innerkey2.1": "e",
        "key1.innerkey2.2": "s",
        "key1.innerkey2.3": "t",
        "key1.innerkey3": [1,2,3,4],
        "key1.innerkey4": [{ innerarraykey1: 0, innerarraykey2: null, innerarraykey3: undefined, innerarraykey4: "test", unwanted_key: "test" }, {}],
        "key1.innerkey5.innerkey5_1.innerkey5_1_1": null,
        "key1.innerkey5.innerkey5_1.unwanted_key" : 5,
        "key2"          : date,
        "key3"          : func,
        "key4"          : [1, 2, 3, 4],
        "key5"          : [1, 2, "oi", { key: -1 }],
        "unwanted_key"  : {}
    };

    t.deepEqual(flatten(obj, { stringAsObject: true }), expected);
});

ava.test("flatten - filter key", t => {
    let expected = {
        "key1.innerkey1": 5,
        "key1.innerkey2": "test",
        "key1.innerkey3": [1,2,3,4],
        "key1.innerkey4": [{ innerarraykey1: 0, innerarraykey2: null, innerarraykey3: undefined, innerarraykey4: "test", unwanted_key: "test"  }, {}],
        "key1.innerkey5.innerkey5_1.innerkey5_1_1": null,
        "key2"          : date,
        "key3"          : func,
        "key4"          : [1, 2, 3, 4],
        "key5"          : [1, 2, "oi", { key: -1 }]
    };

    t.deepEqual(flatten(obj, { filterOut: "unwanted_key"}), expected);
});

ava.test("flatten - all options", t => {
    let expected = {
        "key1=>innerkey1"                               : 5,
        "key1=>innerkey2=>0"                            : "t",
        "key1=>innerkey2=>1"                            : "e",
        "key1=>innerkey2=>2"                            : "s",
        "key1=>innerkey2=>3"                            : "t",
        "key1=>innerkey3=>0"                            : 1,
        "key1=>innerkey3=>1"                            : 2,
        "key1=>innerkey3=>2"                            : 3,
        "key1=>innerkey3=>3"                            : 4,
        "key1=>innerkey4=>0=>innerarraykey1"            : 0,
        "key1=>innerkey4=>0=>innerarraykey2"            : null,
        "key1=>innerkey4=>0=>innerarraykey3"            : undefined,
        "key1=>innerkey4=>0=>innerarraykey4=>0"         : "t",
        "key1=>innerkey4=>0=>innerarraykey4=>1"         : "e",
        "key1=>innerkey4=>0=>innerarraykey4=>2"         : "s",
        "key1=>innerkey4=>0=>innerarraykey4=>3"         : "t",
        "key1=>innerkey4=>1"                            : {},
        "key1=>innerkey5=>innerkey5_1=>innerkey5_1_1"   : null,
        "key2"                                          : date,
        "key3"                                          : func,
        "key4=>0"                                       : 1,
        "key4=>1"                                       : 2,
        "key4=>2"                                       : 3,
        "key4=>3"                                       : 4,
        "key5=>0"                                       : 1,
        "key5=>1"                                       : 2,
        "key5=>2=>0"                                    : "o",
        "key5=>2=>1"                                    : "i",
        "key5=>3=>key"                                  : -1,
    };

    t.deepEqual(flatten(obj, { arrayAsObject: true, stringAsObject: true, filterOut: "unwanted_key", separator: "=>" }), expected);
});