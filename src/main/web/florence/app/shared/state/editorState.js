var store = require('shared/state/state.js');

var editorState = {

    collectionData: {

    },

    activeScreen: {

    },

    isDirty: {
        get: function() {
            return store.getState().editor.isDirty;
        },

        set: function(bool) {
            store.dispatch({
                type: "UPDATE_IS_DIRTY",
                isDirty: bool
            })
        }
    }

};

module.exports = editorState;
