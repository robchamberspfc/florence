var collectionState = require('shared/state/collectionState'),
    workspaceState = require('shared/state/workspaceState');

var updatePage = function() {

    var fetchConfig = {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(workspaceState.editorData.get()),
        headers: new Headers({'Content-Type': 'application/json'})
    };

    return fetch('/zebedee/content/' + collectionState.get().id + '?uri=' + workspaceState.activeUrl.get() + '/data.json', fetchConfig
    ).then(function(response) {
        return response.json();
    });

};

module.exports = updatePage;
