
var store = require('shared/state/state.js'),
    watchStore = require('shared/state/watchState');

var workspaceState = {

    activeScreen: {

        get: function() {
            return store.getState().workspace.activeScreen;
        },

        set: function(activeScreen) {
            store.dispatch({
                type: "UPDATE_ACTIVE_WORKSPACE_SCREEN",
                activeScreen: activeScreen
            })
        },

        watch: function(onChange) {
            watchStore('workspace.activeScreen', function(newValue) {
                onChange(newValue)
            });
        }
    },

    activeUrl: {

        get: function() {
            return store.getState().workspace.activeUrl;
        },

        set: function(activeUrl) {
            store.dispatch({
                type: "UPDATE_WORKSPACE_ACTIVE_URL",
                activeUrl: activeUrl
            })
        },

        watch: function(onChange) {
            watchStore('workspace.activeUrl', function(newValue) {
                onChange(newValue);
            });
        }
    }

};

module.exports = workspaceState;
