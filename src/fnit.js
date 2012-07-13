/**
 * fnit - define a function for each element in an array that is closed over the element and index
 */
window['fnit'] = (function(){

    // mkfn makes the functions that go into the returned array.
    // this is where the closure magic happens.
    /**
     * Return a function which calls the given function with the given context, passing in the given element and index as arguments.
     * @param {function(*, number): ?} fn The function which the returned function calls.
     * @param {*} el The element at the given index in the array.
     * @param {number} idx The index into the array of this element.
     * @param {*} ctx The context with which to call the given function.
     * @return {function()} A function which calls the given function with the given context, passing in the given element and index as arguments.
     */
    var mkfn = function(fn, el, idx, ctx) {
        return function() {
            fn.call(ctx, el, idx);
        };
    };

    /**
     * Return an array of parameterless functions which, when called, call the given function with the given context, passing in the corresponding element and index into the given array as arguments. If useElementAsContext is true, then the contexts will be the elements of the given array themselves, and the elements must therefore be objects to avoid errors.
     * @param {Array.<*>} arr The given array. The returned array will be a one-to-one mapping of the elements of this array to functions which close over the element and index at that position on the array.
     * @param {function(*, number): ?} fn The function which is called with the given context, passing in the corresponding element and index by the corresponding returned function.
     * @param {?Object} context The context that the given function is called with. Overridden if useElementAsContext is true.
     * @param {?boolean} useElementAsContext If true, the given function is called with the corresponding element as its context.
     * @return {Array.<function(): undefined>} an array of parameterless functions which, when called, call the given function, passing in the corresponding element and index into the given array as arguments.
     */
    return function(arr, fn, context, useElementAsContext) {
        var l = arr.length, 
        rv = [],
        el;
        if(context == null) {
            context = window;
        }

        // dryness sacrificed for moving the comparison out of the loop
        if(useElementAsContext === true) {
            for(i = 0; i < l; i += 1) {
                el = arr[i];
                rv.push(mkfn(fn, el, i, el));
            }
        }
        else {
            for(i = 0; i < l; i += 1) {
                rv.push(mkfn(fn, arr[i], i, context));
            }
        }
        return rv;
    };
}());