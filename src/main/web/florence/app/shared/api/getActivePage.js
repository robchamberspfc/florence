var collectionState = require('shared/state/collectionState'),
    workspaceState = require('shared/state/workspaceState'),
    get = require('shared/utilities/get');

var getActivePage = function() {
    return get('/zebedee/data/' + collectionState.get().id + '?uri=' + workspaceState.activeUrl.get());
};

module.exports = getActivePage;
