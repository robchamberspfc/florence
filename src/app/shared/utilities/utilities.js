var workspaceState = require('shared/state/workspaceState');

var utilities = {

    /* Strips a URI of any spaces, capitalisation */
    getSafeURI: function(uri) {
        var URIArray = uri.split('/'),
            safeURI = [],
            i;

        for (i = 0; i < URIArray.length; i++) {
            if (URIArray !== "") {
                safeURI.push(URIArray[i].replace(/[^A-Z0-9]+/ig, "").toLowerCase());
            }
        }

        safeURI = this.checkURISlashes(safeURI.join('/'));

        return safeURI;
    },

    /* Removes trailing slash and add leading slash (if necessary) to string */
    checkURISlashes: function(uri) {
        var checkedUri = uri[uri.length - 1] === '/' ? uri.substring(0, uri.length - 1) : uri;
        checkedUri = checkedUri[0] !== '/' ? '/' + checkedUri : checkedUri;
        return checkedUri;
    },

    /* Returns the object of the node that matches the given URI string */
    findNodeInBrowseTreeByUri: function(uri) {
        // TODO this feels like a utility - it perhaps shouldn't live here at least?
        var browseTreeData = workspaceState.browseTreeData.get(),
            nodeObject = false;

        if (!browseTreeData) {
            console.log("Error: No browse tree data is currently stored in state");
            return;
        }

        if (uri === "/") {
            return browseTreeData;
        }

        checkOneLayer(browseTreeData.children);

        function checkOneLayer(array) {
            array.forEach(function(object) {
                if (object.uri === uri) {
                    nodeObject = object;
                }

                if (!nodeObject && object.children && object.children.length > 0) {
                    checkOneLayer(object.children);
                }
            });
        }

        return nodeObject;
    }

};

module.exports = utilities;
