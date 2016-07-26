function loadBrowseScreen(collectionId, click, collectionData) {

    return $.ajax({
        url: "/zebedee/collectionBrowseTree/" + collectionId, // url: "/navigation",
        dataType: 'json',
        type: 'GET',
        success: function (response) {

            // run through all json and add isDeletable flag to all nodes
            checkAndAddDeleteFlag(response);

            var collectionOwner = localStorage.getItem('userType');
            response['collectionOwner'] = collectionOwner;

            // Send visualisations back to visualisations folder by default on browse tree load
            if (collectionOwner == "DATA_VISUALISATION") {
                var visDirectory = "/visualisations";
                treeNodeSelect(visDirectory);
            }
            

            var browserContent = $('#iframe')[0].contentWindow;
            var baseURL = Florence.babbageBaseUrl;
            var html = templates.workBrowse(response);
            var browseTree = document.getElementById('browse-tree');
            browseTree.innerHTML = html;

            $('.workspace-browse').css("overflow", "scroll");

            //page-list
            $('.js-browse__item-title').click(function () {
                var $this = $(this),
                    $thisItem = $this.closest('.js-browse__item'),
                    uri = $thisItem.attr('data-url');

                if (uri) {
                    var newURL = baseURL + uri;

                    if (collectionOwner == 'DATA_VISUALISATION') {
                        newURL += "/";
                    }

                    treeNodeSelect(newURL);

                    // Update iframe location which will send change event for iframe to update too
                    document.getElementById('iframe').contentWindow.location.href = newURL;
                    $('.browser-location').val(newURL);

                } else {

                    // Set all directories above it in the tree to be active when a directory clicked
                    selectParentDirectories($this);
                }

                // Open active branches in browse tree
                $('.tree-nav-holder ul').removeClass('active');
                $this.parents('ul').addClass('active');
                $this.closest('li').children('ul').addClass('active');
            });


            if (click) {
                var url = getPreviewUrl();
                if (url === "/blank") {
                    treeNodeSelect('/');
                } else {
                    treeNodeSelect(url);
                }
            } else {
                treeNodeSelect('/');

            }

            openVisDirectoryOnLoad();

        },
        error: function (response) {
            handleApiError(response);
        }
    });

}

function openVisDirectoryOnLoad() {
    var userType = Florence.Authentication.userType();
    
    if (userType == 'DATA_VISUALISATION') {
        $('.page-list li').removeClass('selected');
        var $this = $('.datavis-directory');
        $this.parent('li').addClass('selected');
        $this.siblings('ul').addClass('active');
        $this.addClass('selected');
    }
}

// recursively add isDeletable flag to all browse tree nodes
function checkAndAddDeleteFlag(json) {
    json['isDeletable'] = isDeletable(json.type);

    $.each(json.children, function( key, jsonObj ) {
        jsonObj['isDeletable'] = isDeletable(jsonObj.type);
            if (jsonObj.children) {
                checkAndAddDeleteFlag(jsonObj);
            }
        });
}

// set deletable flag to false for certain page types
function isDeletable(type) {
    if (type == 'home_page' || type == 'taxonomy_landing_page' || type == 'product_page') {
        return false;
    } else {
        return true;
    }
}

// display open directory icon for parents directories
function selectParentDirectories($this) {
    $('.page__item--directory').removeClass('selected'); // remove previous selections
    $this.parents('.js-browse__item--directory').find('.page__item--directory:first').addClass('selected'); // select directories along parent path
}

