
var collectionState = require('shared/state/collectionState');

var getBrowseTree = new Promise(function(resolve, reject) {
    fetch("/zebedee/collectionBrowseTree/" + collectionState.getCollectionState().id, {credentials: 'include'}).then(function(response) {
        return response.json();
    }).then(function(jsonResponse) {
        resolve(jsonResponse);
    }).catch(function(error) {
       reject(error)
    });
});

module.exports = getBrowseTree;
