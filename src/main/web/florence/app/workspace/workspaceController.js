
/* Imports */
var workspaceView = require('workspace/workspaceView'),
    navigationController = require('workspace/navigation/navigationController'),
    browseController = require('workspace/browse/browseController');

var workspaceController = {
    init: function() {
        workspaceView.render();
        navigationController.init();
        browseController.init();
    }
};

module.exports = workspaceController;