
var createTemplate = require('./create.handlebars');

var createView = {

    render: function() {
        document.getElementById('workspace-browse').innerHTML = createTemplate();
    },

    renderNewInput: {



    }

};

module.exports = createView;

