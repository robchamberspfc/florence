
var store = require('shared/state/state.js');

var collectionState = {
    getCollectionState: function () {
        return store.getState().editor.collectionData;
    },
    setCollectionState: function (collectionData) {
        store.dispatch({
            type: "UPDATE_COLLECTION_DATA",
            collectionData: collectionData
        });
    }
};

module.exports = collectionState;
