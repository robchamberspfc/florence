
var nodeTemplate = require('./browseNode.handlebars'),
    getBrowseTree = require('shared/api/getBrowseTree');

var browseView = {
    render: function (browseTreeData) {
        document.getElementById('workspace-browse').innerHTML = nodeTemplate(browseTreeData);
    }
};

module.exports = browseView;
