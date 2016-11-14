
var editView = require('workspace/edit/editView.js'),
    workspaceState = require('shared/state/workspaceState'),
    getActivePage = require('shared/api/getActivePage');

var editController = {

    init: function() {

        if ($.isEmptyObject(workspaceState.editorData.get())) {
            // No current editorData, get data for activeURL from API and re-run this initialisation
            getActivePage().then(function(pageData) {
                workspaceState.editorData.set(pageData);
                editController.init();
            }).catch(function(error) {
                console.log(error);
            });

            return;
        }

        editView.render();
        console.log("Render from state, no request to Zebedee required");
    }

};

module.exports = editController;
