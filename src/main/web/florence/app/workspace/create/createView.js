
var createTemplate = require('./create.handlebars');

var createView = {

    render: function() {
        document.getElementById('workspace-browse').innerHTML = createTemplate();
    },

    inputHtml: {

        pageEdition: function() {
            return '  <label for="edition">Edition</label>' +
            '<input id="edition" type="text" placeholder="August 2010, Q3 2015, 1978, etc." />'
        },

        date: function() {

        }

    }



};

module.exports = createView;

