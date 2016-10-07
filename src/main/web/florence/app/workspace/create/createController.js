
var createView = require('workspace/create/createView'),
    workspaceState = require('shared/state/workspaceState');

var createController = {

    init: function() {
        createView.render(createController.validPageOptions(workspaceState.activeUrl.get()));
    },

    pageInputs: function() {

    },

    findNodeInBrowseTreeByUri: function(uri) {
        // TODO this feels like a utility - it perhaps shouldn't live here at least?
        var browseTreeData = workspaceState.browseTreeData.get(),
            nodeObject = false;

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

    getValidPageTypesForLocation: function(uri) {
        /* Returns an array of page types that can be created at a URI */
        var pageType = createController.findNodeInBrowseTreeByUri(uri).type,
            validPageTypes = [];

        switch (pageType) {
            case ("product_page"): {
                validPageTypes = [
                    "bulletin",
                    "article",
                    "article_download"
                ];
                break;
            }
            case ("bulletin"): {
                validPageTypes = [
                    "bulletin",
                    "article",
                    "article_download"
                ];
                break;
            }
        }

        return validPageTypes;
    },

    allPageOptions: function() {
        return [
            {
                pageType: "bulletin",
                title: "Bulletin"
            },
            {
                pageType: "article",
                title: "Article"
            },
            {
                pageType: "article_download",
                title: "Article download"
            },
            {
                pageType: "compendium_landing_page",
                title: "Compendium"
            },
            {
                pageType: "compendium_chapter",
                title: "Compendium chapter"
            },
            {
                pageType: "compendium_data",
                title: "Compendium data"
            },
            {
                pageType: "static_landing_page",
                title: "Static landing page"
            },
            {
                pageType: "static_page",
                title: "Static page"
            },
            {
                pageType: "static_article",
                title: "Static article"
            },
            {
                pageType: "static_foi",
                title: "FOI"
            },
            {
                pageType: "static_qmi",
                title: "QMI"
            },
            {
                pageType: "static_adhoc",
                title: "User requested data"
            },
            {
                pageType: "static_methodology",
                title: "Methodology article"
            },
            {
                pageType: "dataset_landing_page",
                title: "Dataset landing page"
            },
            {
                pageType: "timeseries_landing_page",
                title: "Timeseries dataset landing page"
            },
            {
                pageType: "visualisation",
                title: "Data visualisation"
            },
            {
                pageType: "release",
                title: "Calendar entry"
            }
        ];
    },

    validPageOptions: function(uri) {
        var validPageTypes = createController.getValidPageTypesForLocation(uri),
            validPageTypesLength = validPageTypes.length,
            allPageOptions = createController.allPageOptions(),
            allPageOptionsLength = allPageOptions.length,
            index,
            nestedIndex;

        for (index = 0; index < allPageOptionsLength; index++) {
            for (nestedIndex = 0; nestedIndex < validPageTypesLength; nestedIndex++) {
                if (allPageOptions[index].pageType == validPageTypes[nestedIndex]) {
                    allPageOptions[index].valid = true;
                }
            }
        }

        return allPageOptions;
    }

};

module.exports = createController;
