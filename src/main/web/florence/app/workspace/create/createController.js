
var createView = require('workspace/create/createView'),
    workspaceState = require('shared/state/workspaceState');

var createController = {

    init: function() {
        createView.render(createController.validPageOptions(workspaceState.activeUrl.get()));
        this.bindPageTypeSelection();
    },

    buildInputs: function(id) {
        /* Get string of inputs HTML and request view to render it */
        var inputHtml;

        switch (id) {
            case ("bulletin"): {
                inputHtml = this.getInputsForPageType.bulletin();
                break;
            }
            case ("dataset_landing_page"): {
                inputHtml = this.getInputsForPageType.datasetLandingPage();
                break;
            }
            case ("timeseries_dataset_landing_page"): {
                inputHtml = this.getInputsForPageType.datasetLandingPage();
                break;
            }
        }

        createView.renderOptionalInputs(inputHtml);
    },

    getInputsForPageType: {
        /* Load create screen for different page types */

        bulletin: function() {
            var inputs = [];
            inputs.push(createView.inputHtml.pageEdition());
            inputs.push(createView.inputHtml.releaseDate());
            return inputs.join('');
        },

        datasetLandingPage: function() {
            var inputs = [];
            inputs.push(createView.inputHtml.releaseDate());
            return inputs.join('');
        }

    },

    bindPageTypeSelection: function() {
        $("#js-create__page-select").change(function() {
            createController.buildInputs($(this).val());
        });
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
            case ("home_page"): {
                validPageTypes = [
                    "visualisation",
                    "release"
                ];
                break;
            }
            case ("product_page"): {
                validPageTypes = [
                    "bulletin",
                    "article",
                    "article_download",
                    "compendium_landing_page",
                    "static_methodology",
                    "static_methodology_download",
                    "static_qmi",
                    "static_adhoc",
                    "dataset_landing_page",
                    "timeseries_dataset_landing_page"
                ];
                break;
            }
            case ("bulletin"): {
                validPageTypes = [
                    "bulletin"
                ];
                break;
            }
            case ("compendium"): {
                validPageTypes = [
                    "compendium_chapter",
                    "compendium_data"
                ];
                break;
            }
        }

        return validPageTypes;
    },

    allPageTypeOptions: function() {
        /* All possible <option> elements that can be used in page type <select> */
        return [
            {
                id: "bulletin",
                title: "Statistical bulletin"
            },
            {
                id: "article",
                title: "Article"
            },
            {
                id: "article_download",
                title: "Article [PDF]"
            },
            {
                id: "compendium_landing_page",
                title: "Compendium"
            },
            {
                id: "compendium_chapter",
                title: "Compendium chapter"
            },
            {
                id: "compendium_data",
                title: "Compendium data"
            },
            {
                id: "static_landing_page",
                title: "Static landing page"
            },
            {
                id: "static_page",
                title: "Static page"
            },
            {
                id: "static_article",
                title: "Static article"
            },
            {
                id: "static_foi",
                title: "FOI"
            },
            {
                id: "static_qmi",
                title: "QMI"
            },
            {
                id: "static_adhoc",
                title: "User requested data"
            },
            {
                id: "static_methodology",
                title: "Methodology article"
            },
            {
                id: "static_methodology_download",
                title: "Methodology article [PDF]"
            },
            {
                id: "dataset_landing_page",
                title: "Dataset landing page"
            },
            {
                id: "timeseries_dataset_landing_page",
                title: "Timeseries data landing page"
            },
            {
                id: "dataset",
                title: "Dataset"
            },
            {
                id: "timeseries_dataset",
                title: "Timeseries dataset"
            },
            {
                id: "visualisation",
                title: "Data visualisation"
            },
            {
                id: "release",
                title: "Calendar entry"
            }
        ];
    },

    validPageOptions: function(uri) {
        var validPageTypes = createController.getValidPageTypesForLocation(uri),
            validPageTypesLength = validPageTypes.length,
            validPageOptions = createController.allPageTypeOptions(),
            validPageOptionsLength = validPageOptions.length,
            index,
            nestedIndex;

        for (index = 0; index < validPageOptionsLength; index++) {
            for (nestedIndex = 0; nestedIndex < validPageTypesLength; nestedIndex++) {
                if (validPageOptions[index].id == validPageTypes[nestedIndex]) {
                    validPageOptions[index].valid = true;
                }
            }
        }

        return validPageOptions;
    }

};

module.exports = createController;
