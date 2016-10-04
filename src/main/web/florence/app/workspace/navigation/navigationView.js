var template = require('./navigation.handlebars');

var navigationView = {
    render: function() {
        document.getElementById('workspace-navigation').innerHTML = template();
    }
};

module.exports = navigationView;
