var browseView = require('workspace/browse/browseView'),
    getBrowseTree = require('shared/api/getBrowseTree'),
    userState = require('shared/state/userState');

var browseController = {
    init: function () {
        getBrowseTree.then(function(browseTreeData) {
            browseView.render(browseTreeData);
            browseController.bindClick();
        });
    },

    bindClick: function() {
        $('.js-browse__item-title').click(function() {
            var $this = $(this),
                $thisItem = $this.closest('.js-browse__item'),
                url = $thisItem.attr('data-url');

            if (url) {
                browseView.selectPage(url);
            } else {
                browseView.selectDirectory($this);
            }

            // TODO possibly need to set the scroll position of the browse tree, open up parent directories and show pages under directories?

            if (userState.type.isPublisher()) {
                // TODO update iframe to new URL

            }
        });
    }
};

module.exports = browseController;
