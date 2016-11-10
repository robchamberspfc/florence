
var treeTemplate = require('./browse.handlebars'),
    loaderTemplate = require('../../shared/templatePartials/loadingAnimation.handlebars');

var browseView = {

    render: {

        loader: function() {
            document.getElementById('workspace-browse').innerHTML = '<div class="margin-top--3">' + loaderTemplate({large: true, dark: true}) + '</div>';
        },

        tree: function(browseTreeData) {
            document.getElementById('workspace-browse').innerHTML = treeTemplate(browseTreeData);
        }
    },

    selectDirectories: function($this) {
        $('.page__item--directory.selected').removeClass('selected'); // remove previous selections
        $this.parents('.js-browse__item--directory').find('.page__item--directory:first').addClass('selected'); // select directories along parent path
    },

    selectPage: function(url) {
        var $selectedListItem = $('[data-url="' + url + '"]'),
            $previouslySelectedItem = $('.js-browse__item.selected');

        // Remove selected styling from previously selected item
        $previouslySelectedItem.removeClass('selected');

        // Add selected styling to new item
        $selectedListItem.addClass('selected');

        // Hide container for item and buttons for previous and show selected one
        $('.page__container.selected').removeClass('selected');
        $selectedListItem.find('.page__container:first').addClass('selected');

        // Hide previously displayed page buttons and show selected one
        if ($selectedListItem.find('.page__buttons:first')) {
            $('.page__buttons.selected').removeClass('selected');
            $selectedListItem.find('.page__buttons:first').addClass('selected');
        }
    },

    displayChildren: function($this) {
        $('.js-browse__children.active').removeClass('active');
        $this.parents('ul').addClass('active');
        $this.closest('li').children('ul').addClass('active');
    },

    scrollSelectedItemIntoView: function($this) {
        var $browseTree = $('#workspace-browse'),
        $selectedItem = $this ? $this : $browseTree.find('li.selected .page__container.selected');

        if ($selectedItem.length) {
            var selectedTop = $selectedItem.offset().top,
                selectedBottom = selectedTop + $selectedItem.height(),
                browseTop = $browseTree.offset().top,
                browseBottom = browseTop + $browseTree.height(),
                navHeight = $('.nav').height();

            if (selectedTop < browseTop) {
                console.log('Item was above of viewable browse tree');
                $browseTree.scrollTop($browseTree.scrollTop() + (selectedTop) - (navHeight / 2));
            } else if (selectedBottom > browseBottom) {
                console.log('Item was below viewable browse tree');
                $browseTree.scrollTop(selectedBottom - (navHeight / 2) - $selectedItem.height())
            }
        }
    },

    pageMenu: {

        show: function($selectedItem) {
            var $menuButton = $selectedItem.find('.js-browse__menu');

            $selectedItem.find('.js-browse__buttons--primary').addClass('active');
            $menuButton.addClass('active').children('.hamburger-icon__span').addClass('active');
            $menuButton.next('.page__menu').addClass('active');
        },

        hide: function($selectedItem) {
            var $menuButton = $selectedItem.find('.js-browse__menu');

            $selectedItem.find('.js-browse__buttons--primary').removeClass('active');
            $menuButton.removeClass('active').children('.hamburger-icon__span').removeClass('active');
            $menuButton.next('.page__menu').removeClass('active');
        }
    }
};

module.exports = browseView;
