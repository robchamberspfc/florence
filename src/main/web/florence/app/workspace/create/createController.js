
var createView = require('workspace/create/createView'),
    workspaceState = require('shared/state/workspaceState'),
    bindDatePicker = require('shared/utilities/bindDatePicker'),
    pageModels = require('shared/models/pageModels'),
    postEditorData = require('shared/api/postEditorData'),
    editController = require('workspace/edit/editController'),
    getPage = require('shared/api/getPage'),
    activeURLPageType = "";

var createController = {

    init: function() {
        activeURLPageType = this.findNodeInBrowseTreeByUri(workspaceState.activeUrl.get()).type;
        createView.render(createController.getValidPageOptions());
        this.bindEvents();

        // If page being created as part of a series pre-populate some inputs
        if (activeURLPageType === "bulletin" || activeURLPageType === "article") {
            this.prePopulateInputs();
        }
    },

    bindEvents: function() {
        var $form = $('#js-create__form');

        this.bindPageTypeSelection();
        this.bindFormInput($form);
        this.bindFormSubmit($form);
    },

    bindFormSubmit: function($form) {
        $form.submit(function(event) {
            event.preventDefault();

            if (createController.validateForm()) {
                postEditorData().then(function() {
                    workspaceState.activeScreen.set('edit');
                }).catch(function(error) {
                    console.log(error);
                });
            }
        });
    },

    bindFormInput: function($form) {
        var newEditorData;

        $form.on('input', '#edition', function() {
            newEditorData = workspaceState.editorData.get();
            newEditorData.description.edition = $(this).val();
            workspaceState.editorData.set(newEditorData)
        });

        $form.on('input', '#pagename', function() {
            newEditorData = workspaceState.editorData.get();
            newEditorData.description.title = $(this).val();
            workspaceState.editorData.set(newEditorData);
        });

        $form.on('change', '#releaseDate', function() {
            newEditorData = workspaceState.editorData.get();
            newEditorData.description.releaseDate = (new Date ($(this).val())).toISOString();
            workspaceState.editorData.set(newEditorData);
        });
    },



    bindPageTypeSelection: function() {
        $("#pageType").change(function() {
            var selectOption = $(this).val();
            createController.buildInputs(selectOption);
            workspaceState.editorData.set(createController.getPageModel(selectOption));
        });
    },

    prePopulateInputs: function() {
        var $pageNameInput;

        // Render inputs
        createController.buildInputs(activeURLPageType);
        workspaceState.editorData.set(createController.getPageModel(activeURLPageType));
        $pageNameInput = $('#pagename');

        // Disable page name input as it'll be inheriting from page data
        $pageNameInput.prop('disabled', true).prop('placeholder', 'Page name [FETCHING TITLE...]');

        // Get title from page data of active URL
        getPage().then(function(pageData) {
            $pageNameInput.val(pageData.description.title).trigger('input');
            $pageNameInput.prop('disabled', false).prop('placeholder', 'Page name');
        }).catch(function(error) {
            console.log("Error getting page data for creating page as part of a series:\n", error);
            $pageNameInput.prop('disabled', false).prop('placeholder', 'Page name');
        });
    },

    validateForm: function() {
        var pageData = workspaceState.editorData.get();

        createView.renderInputError.clearAll();


        /* Validate each key that could exist in form data */

        // Edition
        var edition;
        if (pageData.description.edition) {
            edition = (pageData.description.edition).toLowerCase();
        }
        if (edition && (edition === 'latest' || edition === 'data' || edition === 'previousreleases' || edition === 'current')) {
            createView.renderInputError.edition("<span>'" + edition + "' is a reserved path so it can't be used as an edition title</span>");
            return false;
        }

        return true;
    },

    buildInputs: function(selectedOptionId) {
        /* Get string of inputs HTML and request view to render it */
        var inputsArray = this.getInputsForOptionID(selectedOptionId),
            inputsArrayLength = inputsArray.length,
            i;

        // Empty any existing optional inputs from DOM
        createView.inputs.empty();

        // Go through array and build up new array of HTML returned for input type from view
        for (i = 0; i < inputsArrayLength; i++) {
            var inputHtml = (createView.inputHtml(inputsArray[i]));
            createView.inputs.append(inputHtml);

            // Bind date picker pop-up on focus of input - pull this out to a separate function if it starts being used for more inputs
            if (inputsArray[i] === "releaseDate") {
                bindDatePicker();
            }
        }

    },

    getInputsForOptionID: function(selectedOptionId) {
        // Get page type for the selected option
        switch (selectedOptionId) {
            case ("noneSelected"): {
                return [];
            }
            case ("bulletin"): {
                return [
                    "pageName",
                    "edition",
                    "releaseDate"
                ];
            }
            case ("dataset_landing_page"): {
                return [
                    "pageName",
                    "releaseDate"
                ];
            }
            case ("timeseries_dataset_landing_page"): {
                return [
                    "pageName",
                    "releaseDate"
                ];
            }
            default: {
                console.log("Unrecognised selected option id, doesn't map to a page type");
                return false
            }
        }
    },

    getPageModel: function(selectedOptionId) {
        switch (selectedOptionId) {
            case ("bulletin"): {
                return pageModels.bulletin;
            }
            case ("article"): {
                return pageModels.article;
            }
            default: {
                return {};
            }
        }
    },

    findNodeInBrowseTreeByUri: function(uri) {
        // TODO this feels like a utility - it perhaps shouldn't live here at least?
        var browseTreeData = workspaceState.browseTreeData.get(),
            nodeObject = false;

        if (uri === "/") {
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

    getValidPageTypesForLocation: function() {
        /* Returns an array of page types that can be created at a URI */
        var validPageTypes = [];

        switch (activeURLPageType) {
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
            case ("article"): {
                validPageTypes = [
                    "article"
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

    getValidPageOptions: function() {
        var validPageTypes = createController.getValidPageTypesForLocation(),
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

                if (validPageOptions[index].id === activeURLPageType) {
                    validPageOptions[index].active = true;
                }
            }
        }

        return validPageOptions;
    }

};

module.exports = createController;
