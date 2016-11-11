
var store = require('shared/state/state.js'),
    watch = require('redux-watch'),
    watchStore = require('shared/state/watchState');

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
            // var watchStore = watch(store.getState, 'workspace.activeScreen');
            //
            // function handleChange() {
            //     watchStore(function(newVal, oldVal, objectPath) {
            //         console.log('%s changed from "%s" to "%s"', objectPath, oldVal, newVal);
            //         workspaceController.renderActiveScreen(newVal);
            //     });
            // }
            //
            // var unsubscribe = store.subscribe(handleChange);

            function select(state) {
                return state.workspace.activeScreen;
            }

            var currentValue;
            function handleChange() {
                var previousValue = currentValue;
                currentValue = select(store.getState());

                if (previousValue !== currentValue) {
                    onChange();
                    console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
                }
            }

            var unsubscribe = store.subscribe(handleChange);
            return unsubscribe;

            // $('.js-nav-item').click(function() {
            //     console.log('Unsubscribe');
            //     unsubscribe();
            // });

            // watchStore('workspace.activeScreen', function(newValue) {
            //     onChange(newValue)
            // });
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
