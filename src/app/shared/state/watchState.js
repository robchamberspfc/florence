/**
 * Observes state and runs function when specific part of state in updated
 *
 * @param statePropert - a string of the selector for the property being observed in stave (eg 'workspace.editorData')
 * @param onChange - a function that is run when selected property in state in updated to new value (which is passed back as an argument in onChange)
 *
 * @returns unsubscribe function - stops this observation of the state
 */

var store = require('shared/state/state'),
    getValue = require('object-path').get;

var watchStore = function(stateProperty, onChange) {

    console.log("Registered state observation for '" + stateProperty + "'");

    var currentValue;

    function handleChange() {
        var previousValue = currentValue;
        currentValue = getValue(store.getState(), stateProperty);

        if (previousValue !== currentValue) {
            onChange(currentValue, previousValue);
            console.log(stateProperty + ' changed from "',previousValue,'" to "',currentValue,'"');
        }
    }

    return store.subscribe(handleChange);

};

module.exports = watchStore;
