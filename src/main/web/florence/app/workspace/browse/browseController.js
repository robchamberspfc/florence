var browseView = require('workspace/browse/browseView'),
    getBrowseTree = require('shared/api/getBrowseTree');

var browseController = {
    init: function () {
        getBrowseTree.then(function(browseTreeData) {
            browseView.render(browseTreeData);
        });
    }
};

module.exports = browseController;
