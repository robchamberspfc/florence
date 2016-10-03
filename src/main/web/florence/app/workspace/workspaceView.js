
var template = require('./workspace.handlebars');

var workspaceView = {
    render: function() {
        document.getElementById('main').innerHTML = template();
    }
};

module.exports = workspaceView;
