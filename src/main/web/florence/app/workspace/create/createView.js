
var createTemplate = require('./create.handlebars');

var createView = {

    render: function(templateData) {
        document.getElementById('workspace-browse').innerHTML = createTemplate(templateData);
    },

    inputs: {

        append: function(inputHtml) {
            document.getElementById('js-create__optional-inputs').innerHTML += inputHtml;
        },

        empty: function() {
            document.getElementById('js-create__optional-inputs').innerHTML = '';
        }
    },

    findErrorElement: function(inputId) {
        var siblings = document.getElementById(inputId).parentNode.children,
            siblingsLength = siblings.length,
            i,
            errorElement;

        for (i = 0; i < siblingsLength; i++) {
            if (siblings[i].classList.contains("js-create__input-error")) {
                errorElement = siblings[i];
                break;
            }
        }

        return errorElement;
    },

    renderInputError: {

        clearAll: function() {
            var errorElements = document.getElementsByClassName('js-create__input-error'),
                errorElementsLength = errorElements.length,
                i;

            for (i = 0; i < errorElementsLength; i++) {
                errorElements[i].innerHTML = "";
            }
        },

        pageType: function(error) {
            var errorElement = createView.findErrorElement('pageType');
            errorElement.innerHTML = error;
        },

        edition: function(error) {
            var errorElement = createView.findErrorElement('edition');
            errorElement.innerHTML = error;
        },

        releaseDate: function(error) {
            var errorElement = createView.findErrorElement('releaseDate');
            errorElement.innerHTML = error;
        }
    },

    inputHtml: function(inputType) {

        switch (inputType) {
            case ("pageName"): {
                return '<div><label for="pagename" class="hidden">Page name</label>' +
                    '<input id="pagename" name="pagename" required minlength="4" class="full" type="text" placeholder="Page name"/>' +
                    '<span class="js-create__input-error"></span></div>';
            }
            case ("edition"): {
                return '<div><label for="edition">Edition</label>' +
                    '<input id="edition" name="edition" type="text" placeholder="August 2010, Q3 2015, 1978, etc." />' +
                    '<span class="js-create__input-error"></span></div>';
            }
            case ("releaseDate"): {
                return '<div><label for="releaseDate">Release date</label>' +
                    '<input id="releaseDate" name="releaseDate" required type="text" placeholder="day month year" />' +
                    '<span class="js-create__input-error"></span></div>';
            }
            default: {
                console.log('Input type for HTML requested from createView class not recognised');
                return false;
            }
        }
    }



};

module.exports = createView;

