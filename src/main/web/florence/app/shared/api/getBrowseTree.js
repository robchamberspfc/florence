
var collectionState = require('shared/state/collectionState');

var getBrowseTree = function() {
        return fetch("/zebedee/collectionBrowseTree/" + collectionState.get().id, {credentials: 'include'})
            .then(function(response) {
                return response.json()
        })
    };

module.exports = getBrowseTree;
