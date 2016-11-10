var collectionState = require('shared/state/collectionState'),
    workspaceState = require('shared/state/workspaceState'),
    post = require('shared/utilities/post');

var postEditorData = function() {

    return post('/zebedee/content/' + collectionState.get().id + '?uri=' + workspaceState.activeUrl.get() + '/data.json', workspaceState.editorData.get())

};

module.exports = postEditorData;
