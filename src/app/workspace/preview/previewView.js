var template = require('./preview.handlebars');

var previewView = {
    render: function(uri) {
        document.getElementById('workspace-preview').innerHTML = template(uri);
    }
};

module.exports = previewView;