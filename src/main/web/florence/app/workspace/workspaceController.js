
/* Imports */
var workspaceView = require('workspace/workspaceView'),
    navigationController = require('workspace/navigation/navigationController'),
    browseController = require('workspace/browse/browseController'),
    editController = require('workspace/edit/editController'),
    createController = require('workspace/create/createController'),
    workspaceState = require('shared/state/workspaceState');

var workspaceController = {

    init: function() {
        workspaceView.render();
        navigationController.init();
        workspaceController.toggleScreenOnStateChange();
        workspaceState.activeScreen.set('browse');
    },

    toggleScreenOnStateChange: function() {
        workspaceState.activeScreen.watch(function(newActiveScreen) {workspaceController.renderActiveScreen(newActiveScreen)});
    },

    renderActiveScreen: function(activeScreen) {
        switch (activeScreen) {
            case ('browse'): {
                console.log('Render browse workspace');
                navigationController.changeActiveItem(activeScreen);
                browseController.init();
                break;
            }
            case ('create'): {
                console.log('Render create workspace');
                navigationController.changeActiveItem(activeScreen);
                createController.init();
                break;
            }
            case ('edit'): {
                console.log('Render edit workspace');
                navigationController.changeActiveItem(activeScreen);
                editController.init();
                break;
            }
            default: {
                console.log('Screen name "%s" not recognised', activeScreen);
                break;
            }
        }
    }

};

module.exports = workspaceController;