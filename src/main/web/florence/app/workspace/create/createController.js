
var createView = require('workspace/create/createView'),
    workspaceState = require('shared/state/workspaceState'),
    bindDatePicker = require('shared/utilities/bindDatePicker');

var createController = {

    init: function() {
        createView.render(createController.validPageOptions(workspaceState.activeUrl.get()));
        this.bindPageTypeSelection();
    },

    bindFormSubmit: function() {
        var $form = $('#js-create__form'),
            formData;

        $form.off().submit(function(event) {
            event.preventDefault();
            formData = new FormData(this);

            if (createController.validateForm(formData)) {
                console.log("Submit form data to API");
            }

        });
    },

    validateForm: function(formData) {

        // Clear any existing errors from form so we start with a blank slate
        createView.renderInputError.clearAll();


        /* Validate each key that could exist in form data */

        if (formData.has("pageType")) {
            if (formData.get("pageType") === "noneSelected") {
                createView.renderInputError.pageType("Please select a page type");
                return false;
            }
        }

        if (formData.has("edition")) {
            var editionValue = formData.get("edition");
            if (editionValue.toLowerCase() === "latest" || editionValue.toLowerCase() === "data" || editionValue.toLowerCase() === "previousreleases" || editionValue.toLowerCase() === "current") {
                createView.renderInputError.edition("'" + editionValue + "'" + " is a reserved path so it can't be used as an edition title");
                return false;
            }
            if (!editionValue) {
                createView.renderInputError.edition("'Edition' field can't be left empty");
                return false;
            }
        }

        return true;
    },

    buildInputs: function(selectedOptionId) {
        /* Get string of inputs HTML and request view to render it */
        var inputsArray = this.inputsForPageType[this.mapOptionIdToPageTypeId(selectedOptionId)],
            inputsArrayLength = inputsArray.length,
            i;

        // Empty any existing optional inputs from DOM
        createView.optionalInputs.empty();

        // Go through array and build up new array of HTML returned for input type from view
        for (i = 0; i < inputsArrayLength; i++) {
            var inputHtml = (createView.inputHtml(inputsArray[i]));
            createView.optionalInputs.append(inputHtml);

            // Bind date picker pop-up on focus of input - pull this out to a separate function if it starts being used for more inputs
            if (inputsArray[i] === "releaseDate") {
                bindDatePicker();
            }
        }

    },

    mapOptionIdToPageTypeId: function(selectedOptionId) {
        // Get page type for the selected option
        switch (selectedOptionId) {
            case ("noneSelected"): {
                return "noneSelected";
            }
            case ("bulletin"): {
                return "bulletin";
            }
            case ("dataset_landing_page"): {
                return "datasetLandingPage";
            }
            case ("timeseries_dataset_landing_page"): {
                return "datasetLandingPage";
            }
            default: {
                console.log("Unrecognised selected option id, doesn't map to a page type");
                return false
            }
        }
    },

    inputsForPageType: {
        /* Return create screen input types for different page types */

        noneSelected: [],

        bulletin: [
            "edition",
            "releaseDate"
        ],

        datasetLandingPage: [
            "releaseDate"
        ]

    },

    bindPageTypeSelection: function() {
        $("#pageType").change(function() {
            var selectOption = $(this).val();
            createController.buildInputs(selectOption);
            createController.bindFormSubmit(selectOption);
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
