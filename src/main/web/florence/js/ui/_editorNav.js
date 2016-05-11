/**
 * Bind events to editor navigation bar buttons
 * @param save - 'save' function from page specific editor (eg t16releaseEditor)
 * @param collectionId
 * @param path
 * @param content
 * @param redirectToPath
 */
function editorNav(save, collectionId, path, content, redirectToPath) {
    var editNav = $('.edit-nav');
    editNav.off(); // remove any existing event handlers.

    // Save, review and approve actions (pass through parameters if available)
    if (collectionId || path || content || redirectToPath) {
        editNav.on('click', '.btn-edit-save', function () {
            save();
            updateContent(collectionId, path, JSON.stringify(content), redirectToPath);
        });

        editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
            save();
            saveAndCompleteContent(collectionId, path, JSON.stringify(content), redirectToPath);
        });

        editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
            save();
            saveAndReviewContent(collectionId, path, JSON.stringify(content), redirectToPath);
        });
    } else {
        editNav.on('click', '.btn-edit-save', function () {
            save(updateContent);
        });

        editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
            save(saveAndCompleteContent);
        });

        editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
            save(saveAndReviewContent);
        });
    }

    // Bind JSON mode button
    $('#json-mode').click(function() {
        jsonEditor(collectionId, path, content);
    });
    
}
