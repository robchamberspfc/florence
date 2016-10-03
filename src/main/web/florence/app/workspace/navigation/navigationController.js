var navigationView = require('workspace/navigation/navigationView'),
    store = require('shared/state/state.js');

var navigationController = {

    init: function() {
        navigationView.render();
        this.bindClicks();
        this.updateActiveInState('browse');
    },

    bindClicks: function () {
        var $navItems = $('.js-workspace-nav__item');
        $navItems.click(function() {
            var $this = $(this);
            navigationController.setActiveItem($navItems, $this.closest('li'));
            navigationController.updateActiveInState($this.attr('id'));
        });
    },

    setActiveItem: function($allItems, $activeItem) {
        $allItems.removeClass('selected');
        $activeItem.addClass('selected');
    },

    updateActiveInState: function(activeId) {
        store.dispatch({
            type: "UPDATE_ACTIVE_EDITOR_SCREEN",
            activeId: activeId
        })
    }
};

module.exports = navigationController;