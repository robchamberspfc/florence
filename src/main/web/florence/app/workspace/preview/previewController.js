var previewView = require('workspace/preview/previewView'),
    baseUrlState = require('shared/state/baseUrlState'),
    workspaceState = require('shared/state/workspaceState'),
    utilities = require('shared/utilities/utilities');

var previewController = {

    init: function () {
        previewView.render(baseUrlState.get());
        this.catchPreviewOnUnload();
    },

    catchPreviewOnUnload: function() {
        window.addEventListener("message", function () {
            previewController.handlePreviewChange();
        });
    },

    handlePreviewChange: function() {
        var newPreviewUri = this.getPreviewUri();
        workspaceState.activeUrl.set(newPreviewUri);
    },

    refreshPreview: function() {

    },

    updatePreview: function(uri) {
        previewView.render(baseUrlState.get() + uri);
    },

    getPreviewUri: function () {
        var iframeUri = document.getElementById('iframe').contentWindow.location.pathname;
        //if (iframeUri == 'blank') {console.log('WAS BLANK'); parsedUri = workspaceState.activeUrl.get()}
        return utilities.checkPathSlashes(iframeUri);
    },

    addressBar: {

        set: function(uri) {
            var addressBar = document.getElementById('browser-location');
            addressBar.value = baseUrlState.get() + uri;
        }
    }

};

module.exports = previewController;