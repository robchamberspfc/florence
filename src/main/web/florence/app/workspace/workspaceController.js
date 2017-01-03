
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
        this.updateWorkspace.onActiveScreenStateUpdate();
        this.updateWorkspace.onActiveUrlStateUpdate();
        this.bindWorkspaceExit();
        workspaceState.activeScreen.set('browse');
    },

    // Array of all state observations for the workspace so that they can be cancelled when leaving the workspace (or else it's end up being observed multiple times)
    stateSubscriptions: [],

    cancelStateSubscriptions: function() {
        var i,
            unsubscriptions = this.stateSubscriptions,
            unsubscriptionsLength = unsubscriptions.length;

        for (i = 0; i < unsubscriptionsLength; i++) {
            unsubscriptions[i]();
        }
    },

    bindWorkspaceExit: function() {
        //TODO this should be controlled by state, not DOM click
        $('.js-nav-item').off().click(function() {
            workspaceController.cancelStateSubscriptions();
        });
    },

    updateWorkspace: {

        onActiveScreenStateUpdate: function() {
            function renderNewScreen(newScreen) {
                workspaceController.renderActiveScreen(newScreen);
            }

            var unsubscribe = workspaceState.activeScreen.watch(renderNewScreen);

            workspaceController.stateSubscriptions.push(unsubscribe);
        },

        onActiveUrlStateUpdate: function() {

            function updateWorkspace(newUrl) {
                // Switch to browse screen if active url changes on creator or editor
                if (workspaceState.activeScreen.get() === "create" || workspaceState.activeScreen.get() === "edit") {
                    workspaceState.activeScreen.set('browse');
                    return;
                }

                // Browse already displayed, update preview (if necessary) and tree
                if (newUrl !== previewController.getPreviewUri()) {
                    previewController.updatePreview(newUrl);
                }
                browseController.selectBrowseNodeByUrl(newUrl);
            }

            var unsubscribe = workspaceState.activeUrl.watch(updateWorkspace);

            workspaceController.stateSubscriptions.push(unsubscribe);

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