
var createTemplate = require('./create.handlebars');

var createView = {

    render: function(templateData) {
        document.getElementById('workspace-browse').innerHTML = createTemplate(templateData);
    },

    renderOptionalInputs: function(inputsHtml) {
        document.getElementById('js-create__optional-inputs').innerHTML = inputsHtml;
    },

    inputHtml: {

        pageEdition: function() {
            return '  <div><label for="edition">Edition</label>' +
            '<input id="edition" type="text" placeholder="August 2010, Q3 2015, 1978, etc." /></div>'
        },

        releaseDate: function() {
            return '<div><label for="releaseDate">Release date</label>' +
            '<input id="releaseDate" type="text" placeholder="day month year" /></div>'
        }

    }



};

module.exports = createView;

