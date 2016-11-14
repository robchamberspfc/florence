/**
 * Builds a safe URI from current state and POSTs to API. It handles any errors itself rather than passing it back up the stack
 *
 * @returns {Promise}
 */


var utilities = require('shared/utilities/utilities'),
    post = require('shared/utilities/post'),
    workspaceState = require('shared/state/workspaceState'),
    collectionState = require('shared/state/collectionState');

var saveNewPage = function() {
    var pageType = workspaceState.editorData.get().type,
        pageEdition = workspaceState.editorData.get().description.edition ? workspaceState.editorData.get().description.edition : "",
        pagePath = [],
        activePageType = utilities.findNodeInBrowseTreeByUri(workspaceState.activeUrl.get()).type,
        activeURL = workspaceState.activeUrl.get().split('/'),
        index;

    // Page being created as part of a series, remove unnecessary/duplicated entries from current activeURL
    if (activePageType === "article" || activePageType === "article_download") {
        index = activeURL.indexOf("articles");
        activeURL.splice(index, (activeURL.length-index));
    } else if (activePageType === "bulletin") {
        index = activeURL.indexOf("bulletins");
        activeURL.splice(index, (activeURL.length-index));
    }

    // Add current active location
    pagePath = activeURL.concat(pagePath);

    // Add page type to path
    switch (pageType) {
        case ("bulletin"): {
            pagePath.push(pageType + "s");
            break;
        }
        case ("article"): {
            pagePath.push(pageType + "s");
            break;
        }
        case ("article_download"): {
            pagePath.push("articles");
            break;
        }
        case ("dataset_landing_page"): {
            pagePath.push("datasets");
            break;
        }
        case ("compendium_landing_page"): {
            pagePath.push("compendium");
            break;
        }
        default: {
            console.log("Page type not recognised, so new page can't be saved");
            break;
        }
    }

    // Add page title (which is checked for correct slashes)
    pagePath.push(workspaceState.editorData.get().description.title);

    // Add page edition (defaults to an empty string if not available)
    pagePath.push(pageEdition);

    // Build safe URI from pagePath string
    pagePath = utilities.getSafeURI(pagePath.join('/'));

    // Return the POST of latest editor data from state to API
    return post('/zebedee/content/' + collectionState.get().id + '?uri=' + pagePath + '/data.json', workspaceState.editorData.get()
        ).then(function () {
            return pagePath;
        }).catch(function (error) {
            return error;
        }
    );
};

module.exports = saveNewPage;
