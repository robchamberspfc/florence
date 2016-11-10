var collectionState = require('shared/state/collectionState'),
    workspaceState = require('shared/state/workspaceState');

var postEditorData = function() {

    var fetchConfig = {method: "POST", credentials: 'include', body: workspaceState.editorData.get()};

    return fetch('/zebedee/content/' + collectionState.get().id + '?uri=' + workspaceState.activeUrl.get() + '/data.json', fetchConfig)
        .then(function(response) {
            return response.json();
    });

};

module.exports = postEditorData;
