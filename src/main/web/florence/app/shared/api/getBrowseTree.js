
var collectionState = require('shared/state/collectionState');

var getBrowseTree =
    fetch("/zebedee/collectionBrowseTree/" + collectionState.get().id, {credentials: 'include'}).then(function(response) {
        return response.json();
    }).then(function(jsonResponse) {
        return jsonResponse;
    }).catch(function(error) {
       return error
    });

module.exports = getBrowseTree;
