
var store = require('shared/state/state'),
    watch = require('redux-watch');

var watchStore = function(stateProperty, onChange) {

    var watchStore = watch(store.getState, stateProperty);

    function handleChange() {
        watchStore(function(newVal, oldVal, objectPath) {
            console.log('%s changed from "%s" to "%s"', objectPath, oldVal, newVal);
            onChange(newVal);
        });
    }

    return store.subscribe(handleChange);
    // handleChange();
    // return unsubscribe;

};

module.exports = watchStore;

// function observeStore(select, onChange) {
//     var currentState;
//
//     function handleChange() {
//         var nextState = store.getState() + select;
//         if (nextState !== currentState) {
//             console.log('%s changed from "%s" to "%s"', select, currentState, nextState);
//             currentState = nextState;
//             onChange(currentState);
//         }
//     }
//
//     var unsubscribe = store.subscribe(handleChange);
//     handleChange();
//     return unsubscribe;
// }
//
// module.exports = observeStore;
