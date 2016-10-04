
var nodeTemplate = require('./browse.handlebars'),
    getBrowseTree = require('shared/api/getBrowseTree');

var browseView = {

    render: function (browseTreeData) {
        document.getElementById('workspace-browse').innerHTML = nodeTemplate(browseTreeData);
    },

    selectDirectory: function($this) {
        $('.page__item--directory').removeClass('selected'); // remove previous selections
        $this.parents('.js-browse__item--directory').find('.page__item--directory:first').addClass('selected'); // select directories along parent path
    },

    selectPage: function(url) {

        var $selectedListItem = $('[data-url="' + url + '"]'); //get first li with data-url with url
        $('.js-browse__item.selected').removeClass('selected');
        $selectedListItem.addClass('selected');

        // Hide container for item and buttons for previous and show selected one
        $('.page__container.selected').removeClass('selected');
        $selectedListItem.find('.page__container:first').addClass('selected');

        // Hide previous displayed page buttons and show selected one
        if ($selectedListItem.find('.page__buttons:first')) {
            $('.page__buttons.selected').removeClass('selected');
            $selectedListItem.find('.page__buttons:first').addClass('selected');
        }

        //page-list-tree
        $('.tree-nav-holder ul').removeClass('active');
        $selectedListItem.parents('ul').addClass('active');
        $selectedListItem.closest('li').children('ul').addClass('active');
    }
};

module.exports = browseView;
