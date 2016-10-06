
var store = require('shared/state/state.js');

var collectionState = {

    get: function () {
        return store.getState().editor.collectionData;
    },

    set: function (collectionData) {
        store.dispatch({
            type: "UPDATE_COLLECTION_DATA",
            collectionData: collectionData
        });
    }
};

module.exports = collectionState;