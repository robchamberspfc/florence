var previewView = require('workspace/preview/previewView'),
    store = require('shared/state/state.js'),
    baseUrlState = require('shared/state/baseUrlState'),
    browseController = require('workspace/browse/browseController'),
    workspaceState = require('shared/state/workspaceState'),
    utilities = require('shared/utilities/utilities');

var previewController = {

    init: function () {
        previewView.render(baseUrlState.get());
        this.bindPreviewClick();
    },

    bindPreviewClick: function() {
        // catch babbage onunload message
        window.addEventListener("message", function (e) {
            previewController.handlePreviewClick();
        });
    },

    handlePreviewClick: function() {

        if (!workspaceState.isDirty.get()) {

            var newUri = previewController.getPreviewUri();

            // update address bar
            this.addressBar.set(newUri);
            // update active url
            workspaceState.activeUrl.set(newUri);


        }

    },

    refreshPreview: function() {

    },

    updatePreview: function(uri) {
        previewView.render(baseUrlState.get() + uri);
    },

    getPreviewUri: function () {

        var parsedUri = document.getElementById('iframe').contentWindow.location.pathname;
        if (parsedUri == 'blank') {console.log('WAS BLANK'); parsedUri = workspaceState.activeUrl.get()}
        return utilities.checkPathSlashes(parsedUri);
    },

    addressBar: {

        set: function(uri) {
            var addressBar = document.getElementById('browser-location');
            addressBar.value = baseUrlState.get() + uri;
        }
    }


};

module.exports = previewController;