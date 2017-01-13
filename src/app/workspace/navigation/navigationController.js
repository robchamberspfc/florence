var navigationView = require('workspace/navigation/navigationView'),
    workspaceState = require('shared/state/workspaceState');

var navigationController = {

    init: function() {
        navigationView.render();
        this.bindClicks();
        // workspaceState.activeScreen.set('browse');
    },

    bindClicks: function () {
        $('.js-workspace-nav__item').click(function() {
            var item = $(this).attr('id');
            workspaceState.activeScreen.set(item);
        });
    },

    changeActiveItem: function(item) {
        navigationView.renderActiveItem(item);
    }
};

module.exports = navigationController;