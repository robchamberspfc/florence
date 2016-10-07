
var store = require('shared/state/state'),
    watch = require('redux-watch');

var watchStore = function(stateProperty, onChange) {

    var watchStore = watch(store.getState, stateProperty);
    store.subscribe(watchStore(function(newVal, oldVal, objectPath) {
        console.log('%s changed from "%s" to "%s"', objectPath, oldVal, newVal);
        onChange(newVal);
    }));

};

module.exports = watchStore;
