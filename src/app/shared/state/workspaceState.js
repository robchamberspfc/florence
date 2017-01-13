
var store = require('shared/state/state.js'),
    watchState = require('shared/state/watchState');

var workspaceState = {

    reset: function() {
        store.dispatch({
            type: "RESET_WORKSPACE"
        });
    },

    browseTreeData: {

        get: function() {
            return store.getState().workspace.browseTreeData;
        },

        set: function(browseTreeData) {
            store.dispatch({
                type: "UPDATE_BROWSE_TREE_DATA",
                browseTreeData: browseTreeData
            })
        }

    },

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
            return watchState('workspace.activeScreen', onChange);
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
            return watchState('workspace.activeUrl', onChange);
        }
    },

    previewUrl: {

        get: function() {
            return store.getState().workspace.previewUrl;
        },

        set: function(previewUrl) {
            store.dispatch({
                type: "UPDATE_WORKSPACE_PREVIEW_URL",
                previewUrl: previewUrl
            })
        },

        watch: function(onChange) {
            return watchState('workspace.previewUrl', onChange);
        }
    },

    isDirty: {

        get: function() {
            return store.getState().workspace.isDirty;
        },

        set: function(bool) {
            store.dispatch({
                type: "UPDATE_IS_DIRTY",
                isDirty: bool
            })
        }
    },

    editorData: {

        get: function() {
            return store.getState().workspace.editorData;
        },

        set: function(editorData) {
            store.dispatch({
                type: "UPDATE_EDITOR_DATA",
                editorData: editorData
            })
        }

    }

};

module.exports = workspaceState;
