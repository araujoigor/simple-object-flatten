function flatten(obj, options){
    var newObj              = {};
    obj                     = obj;
    options                 = options                   || {};
    options.separator       = options.separator         || ".";
    options.arrayAsObjects  = options.arrayAsObject     || false;
    options.stringAsObject  = options.stringAsObject    || false;

    //-- Arrays and strings depends on the arraysAsObjects arguemnt
    //-- Any types different from Object, Array and String early return
    //-- Single character strings early return always
    if( [null, undefined, false].indexOf(obj) !== -1            ||
        (!options.arrayAsObjects && Array === obj.constructor)  ||
        (!options.stringAsObject && String === obj.constructor) ||
        [Object, Array, String].indexOf(obj.constructor) === -1 ||
        (obj.constructor === String && obj.length === 1)){
        return obj;
    }

    for (var key in obj) {
        if(([].concat.apply([], [options.filterOut]) || []).indexOf(key) !== -1) { continue; };
        var value = flatten(obj[key], options);
        if([null, undefined, false].indexOf(value) === -1 && value.constructor === Object && Object.keys(value || {}).length > 0){
            for(var childkey in value){
                newObj[key+options.separator+childkey] = value[childkey];
            }
            continue;
        }
        newObj[key] = value;
    }
    return newObj;
}

module.exports = flatten;