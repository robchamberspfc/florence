
var editTemplate = require('./edit.handlebars'),
    accordionTemplate = require('./editAccordion.handlebars');

var editView = {

    render: {

        loader: function () {
            document.getElementById('workspace-browse').innerHTML = editTemplate();
        },

        accordions: function(HTML) {
            document.getElementById('workspace-browse').innerHTML = HTML;
        }
    },

    accordionHTML: function(templateData) {
        /* templateData should follow structure of:
        {
            id: "",
            heading: "",
            items: [
                {
                    title: ""
                }
            ]
        }
        */
        return accordionTemplate(templateData);
    }

};

module.exports = editView;
