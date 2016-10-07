
var editTemplate = require('./edit.handlebars');

var editView = {

    render: function () {
        document.getElementById('workspace-browse').innerHTML = editTemplate();
    }

};

module.exports = editView;
