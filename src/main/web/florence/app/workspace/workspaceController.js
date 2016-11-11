
/* Imports */
var workspaceView = require('workspace/workspaceView'),
    navigationController = require('workspace/navigation/navigationController'),
    browseController = require('workspace/browse/browseController'),
    editController = require('workspace/edit/editController'),
    createController = require('workspace/create/createController'),
    workspaceState = require('shared/state/workspaceState'),
    previewController = require('workspace/preview/previewController');

var workspaceController = {

    init: function() {
        workspaceView.render();
        navigationController.init();
        workspaceController.updateWorkspace.onActiveScreenStateUpdate();
        workspaceController.updateWorkspace.onActiveUrlStateUpdate();
        workspaceState.activeScreen.set('browse');
    },

    updateWorkspace: {

        onActiveScreenStateUpdate: function() {
            // var unsubscribe = workspaceState.activeScreen.watch(function(newActiveScreen) {
            //     workspaceController.renderActiveScreen(newActiveScreen);
            //     console.log('New active screen: ', newActiveScreen);
            // });
            //
            // $('.js-nav-item').click(function() {
            //     console.log('Unsubscribe');
            //     unsubscribe();
            // });
            function onChange() {
                console.log("Parent onchange function fired");
            }

            var unsubscribe = workspaceState.activeScreen.watch(onChange);

            $('.js-nav-item').click(function() {
                console.log('Unsubscribe');
                unsubscribe();
            });
        },

        onActiveUrlStateUpdate: function() {
            // workspaceState.activeUrl.watch(function(newValue) {
            //     // Switch to browse screen if active url changes on creator or editor
            //     if (workspaceState.activeScreen.get() === "create" || workspaceState.activeScreen.get() === "edit") {
            //         workspaceState.activeScreen.set('browse');
            //         return;
            //     }
            //     // Browse already showing, just update to new node
            //     browseController.selectBrowseNodeByUrl(newValue);
            //     previewController.updatePreview(newValue);
            // })
        }

    },

    renderActiveScreen: function(activeScreen) {
        switch (activeScreen) {
            case ('browse'): {
                // console.log('Render browse workspace');
                navigationController.changeActiveItem(activeScreen);
                browseController.init();
                previewController.init();
                break;
            }
            case ('create'): {
                // console.log('Render create workspace');
                navigationController.changeActiveItem(activeScreen);
                createController.init();
                break;
            }
            case ('edit'): {
                // console.log('Render edit workspace');
                navigationController.changeActiveItem(activeScreen);
                editController.init();
                previewController.init();
                break;
            }
            default: {
                console.log('Screen name "%s" is not recognised', activeScreen);
                break;
            }
        }
    }

};

module.exports = workspaceController;