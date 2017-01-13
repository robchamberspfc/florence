var template = require('./navigation.handlebars');

var navigationView = {

    render: function() {
        document.getElementById('workspace-navigation').innerHTML = template();
    },

    renderActiveItem: function(item) {
        $('.js-workspace-nav__item').removeClass('selected');
        $('#' + item).addClass('selected');
    }
};

module.exports = navigationView;
