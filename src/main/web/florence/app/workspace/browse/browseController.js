var browseView = require('workspace/browse/browseView'),
    getBrowseTree = require('shared/api/getBrowseTree');

var browseController = {
    init: function () {
        this.getBrowseTreeData.then(function(browseTreeData) {
            browseView.render(browseTreeData);
        });
    },
    getBrowseTreeData: new Promise(function(resolve) {
        getBrowseTree.then(function (response) {
            resolve(response);
        })
    })
};

module.exports = browseController;
