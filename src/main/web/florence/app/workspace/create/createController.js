
var createView = require('workspace/create/createView'),
    workspaceState = require('shared/state/workspaceState');

var createController = {

    init: function() {
        createView.render();
        createController.validPageTypesForLocation(workspaceState.activeUrl.get());
    },

    pageInputs: function() {

    },

    findNodeInBrowseTreeByUri: function(uri) {
        // TODO this feels like a utility - it perhaps shouldn't live here at least?
        var browseTreeData = workspaceState.browseTreeData.get(),
            nodeObject = false;

        console.log(uri);

        if (uri === "/") {
            console.log('root');
            return browseTreeData;
        }

        checkOneLayer(browseTreeData.children);

        function checkOneLayer(array) {
            array.forEach(function(object) {
                if (object.uri === uri) {
                    nodeObject = object;
                }

                if (!nodeObject && object.children.length > 0) {
                    checkOneLayer(object.children);
                }
            });
        }

        return nodeObject;
    },

    validPageTypesForLocation: function(uri) {
        /* Returns an array of page types that can be created at a URI */
        var pageType = createController.findNodeInBrowseTreeByUri(uri).type;

        console.log(pageType);

        // (browseTreeData.children).forEach(function(object) {
        //     if (object.uri === uri) {
        //         pageType = object.type;
        //     }
        //
        //     if (!pageType) {
        //
        //     }
        // });

        // (browseTreeData.children).map(function(value) {
        //     if (value.uri === uri) {
        //         console.log(value.type);
        //         pageType = value.type;
        //         return;
        //     }
        //
        //     if (!pageType) {
        //         value.chi
        //     }
        // });

        switch (pageType) {
            case ("bulletin"): {
                break;
            }
        }
    }

};

module.exports = createController;
