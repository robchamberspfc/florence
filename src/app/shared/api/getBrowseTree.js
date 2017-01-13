
var collectionState = require('shared/state/collectionState'),
    get = require('shared/utilities/get');

var getBrowseTree = function() {
    return get("/zebedee/collectionBrowseTree/" + collectionState.get().id);
};

module.exports = getBrowseTree;
