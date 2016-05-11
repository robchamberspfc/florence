function updateContent(collectionId, path, content, redirectToPath, noRefresh) {
    var redirect = redirectToPath;
    putContent(collectionId, path, content,
        success = function () {
            Florence.Editor.isDirty = false;
            if (redirect && !noRefresh) {
                createWorkspace(redirect, collectionId, 'edit');
                return;
            } else if (!noRefresh) {
                refreshPreview(path);
                loadPageDataIntoEditor(path, collectionId);
            } else if (noRefresh) {
                // Stop editor refreshing - used for JSON mode
                refreshPreview(path);
            }
        },
        error = function (response) {
            if (response.status === 409) {
                sweetAlert("Cannot edit this page", "It is already part of another collection.");
            } else {
                handleApiError(response);
            }
        }
    );
}
