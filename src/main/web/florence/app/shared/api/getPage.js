var collectionState = require('shared/state/collectionState'),
    workspaceState = require('shared/state/workspaceState');


var getPage = function() {
    var fetchConfig = {credentials : "include"};

    return fetch('/zebedee/data/' + collectionState.get().id + '?uri=' + workspaceState.activeUrl.get(), fetchConfig).then(function(response) {
        return response.json();
    });
};

module.exports = getPage;
