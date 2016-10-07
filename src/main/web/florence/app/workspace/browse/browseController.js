var browseView = require('workspace/browse/browseView'),
    getBrowseTree = require('shared/api/getBrowseTree'),
    userState = require('shared/state/userState'),
    workspaceState = require('shared/state/workspaceState'),
    collectionState = require('shared/state/collectionState');

var browseController = {

    init: function () {
        getBrowseTree().then(function(browseTreeData){
            browseController.addDeleteMarkersToData(browseTreeData);
            browseView.render(browseTreeData);
            browseController.bindPageButtonsClick();
            browseController.bindNodeClick();
        }).catch(function(error) {
            console.log(error);
        });
    },

    addDeleteMarkersToData: function(browseTreeData) {
        // recursively add isDeletable and deleteIsInCollection flags to all browse tree nodes
        browseTreeData['isDeletable'] = isDeletable(browseTreeData.type);
        browseTreeData['deleteIsInCollection'] = deleteIsInCollection(browseTreeData.contentPath, collectionState.get());

        $.each(browseTreeData.children, function( key, browseTreeNode ) {
            if (browseTreeNode.children) {
                browseController.addDeleteMarkersToData(browseTreeNode, collectionState.get());
            }
        });

        // set deletable flag to false for certain page types
        function isDeletable(type) {
            return !(type == 'home_page' || type == 'taxonomy_landing_page' || type == 'product_page');
        }

        // check if given uri is marked for deletion in current collection
        function deleteIsInCollection(uri, collectionData) {
            var bool = false;
            if (collectionData.pendingDeletes) {
                $.each(collectionData.pendingDeletes, function (key, deleteMarker) {
                    if (uri == deleteMarker.root.uri) {
                        bool = true;
                        return false;
                    } else {
                        bool = false;
                    }
                });
            }
            return bool;
        }
    },

    bindNodeClick: function() {
        $('.js-browse__item-title').click(function() {
            var url = $(this).closest('.js-browse__item').attr('data-url');

            if (url) {
                browseController.selectBrowseNodeByUrl(url);
            } else {
                // Must be a directory if it has no URL
                var $this = $(this);
                browseView.displayChildren($this);
                browseView.selectDirectories($this);
                browseView.scrollSelectedItemIntoView($this);
            }

            if (userState.type.isPublisher()) {
                // TODO update iframe to new URL
            }
        });
    },

    bindPageButtonsClick: function() {
        var $browseTreeItems = $('.js-browse__item');

        $browseTreeItems.find('.js-browse__edit').click(function() {
            console.log('edit');
        });

        $browseTreeItems.find('.js-browse__create').click(function() {
            console.log('create');
        });

        $browseTreeItems.find('.js-browse__menu').click(function() {
            var $selectedItem = $(this).closest('.js-browse__item');
            if (!$selectedItem.find('.js-browse__menu').hasClass('active')) {
                browseView.pageMenu.show($selectedItem);
            } else {
                browseView.pageMenu.hide($selectedItem);
            }
        });
    },

    selectBrowseNodeByUrl: function(url) {
        var $this = $('[data-url="' + url + '"]');

        // Hide secondary buttons for currently selected item (will gracefully fail if there's no selected item with displayed secondary buttons)
        browseView.pageMenu.hide($('.js-browse__item.selected'));

        browseView.selectPage(url);
        browseView.displayChildren($this);
        browseView.selectDirectories($this);
        browseView.scrollSelectedItemIntoView($this);
    }

};

module.exports = browseController;
