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
            console.log(e);
            previewController.handlePreviewClick();
        });
    },

    handlePreviewClick: function() {

        // var previewUri = this.getPreviewUri();
        // var workspaceActiveUri = workspaceState.activeUrl.get();
        //
        // console.log ('prev: ', previewUri, 'active: ', workspaceActiveUri);

        // if (previewUri != "/blank") {
        //
        //     // update address bar
        //     this.addressBar.set(previewUri);
        //     // update active url
        //     workspaceState.activeUrl.set(previewUri);
        //
        // }

        //console.log('Preview clicked, new uri: ', previewController.getPreviewUri());
        //console.log('isDirty.get: ', workspaceState.isDirty.get());

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
        console.log('base: ',baseUrlState.get());
        console.log('uri param: ', uri);
        console.log('param to render', baseUrlState.get() + uri);

        console.log('document.getElementById(iframe).contentWindow.location.pathname: ', document.getElementById('iframe').contentWindow.location.pathname);
        previewView.render(baseUrlState.get() + uri);
    },

    getPreviewUri: function () {

        var parsedUri = document.getElementById('iframe').contentWindow.location.pathname;
        if (parsedUri == 'blank') {console.log('WAS BLANK'); parsedUri = workspaceState.activeUrl.get()}
        console.log('getPreviewUri ran!!', parsedUri);
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