/**
 * Editor data loader
 * @param path
 * @param collectionId
 * @param click - if present checks the page url to keep in sync with iframe
 */

function loadPageDataIntoEditor(path, collectionId, click) {

    // Check whether page is being edited in another collection already TODO - remove stuff to get collection name, replace leading slash on path and adding /data.json. This will all be done server-side soon.
    var collectionName = collectionId.split('-')[0];
    fetch('/zebedee/collectioncontentstatus/' + collectionName + '?uri=' + path.replace(/^\//g, '') + '/data.json', {credentials: "include"})
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonResponse) {
            if (jsonResponse.length > 0) {
                sweetAlert({
                    title: "Page already being edited",
                    text: "You won't be able to edit this content because it is already in another collection",
                    type: "info"
                })
            }
        })
        .catch(function(error) {
            console.log(error);
        });

    if (Florence.globalVars.welsh) {
        if (path === '/') {       //add whatever needed to read content in Welsh
            var pageUrlData = path + '&lang=cy';
            var toApproveUrlData = '/data_cy.json';
        } else {
            var pageUrlData = path + '&lang=cy';
            var toApproveUrlData = path + '/data_cy.json';
        }
    } else {
        if (path === '/') {       //add whatever needed to read content in English
            var pageUrlData = path;
            var toApproveUrlData = '/data.json';
        } else {
            var pageUrlData = path;
            var toApproveUrlData = path + '/data.json';
        }
    }

    var pageData, isPageComplete;
    var ajaxRequests = [];

    ajaxRequests.push(
        getPageData(collectionId, pageUrlData,
            success = function (response) {
                pageData = response;
            },
            error = function (response) {
                handleApiError(response);
            }
        )
    );

    ajaxRequests.push(
        getCollection(collectionId,
            success = function (response) {
                var lastCompletedEvent = getLastCompletedEvent(response, toApproveUrlData);
                isPageComplete = !(!lastCompletedEvent || lastCompletedEvent.email === Florence.Authentication.loggedInEmail());
            },
            error = function (response) {
                handleApiError(response);
            })
    );

    $.when.apply($, ajaxRequests).then(function () {
        if (click) {
            var iframe = getPreviewUrl();
            if (iframe !== pageData.uri) {
                setTimeout(loadPageDataIntoEditor(path, collectionId), 200);
            } else {
                renderAccordionSections(collectionId, pageData, isPageComplete);
            }
        } else {
            renderAccordionSections(collectionId, pageData, isPageComplete);
        }
    });
}
