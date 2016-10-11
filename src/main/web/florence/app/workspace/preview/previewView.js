var template = require('./preview.handlebars');

var previewView = {
    render: function(baseUri) {
        document.getElementById('workspace-preview').innerHTML = template(baseUri);
    }
};

module.exports = previewView;