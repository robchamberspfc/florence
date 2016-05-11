function jsonEditor(collectionId, path, content) {

    // Populate editor with raw JSON in editable input
    var json = JSON.stringify(content, null, 4);
    var html = templates.workEditJson(json);
    $('.edit-accordion').html(html);

    // Update button so user can switch back to UI mode
    $('#json-mode').hide();
    $('#editor-mode').show();

    // Bind editor load on click of 'UI mode' button
    $('#editor-mode').click(function() {
        loadPageDataIntoEditor(path, collectionId);
    });

    // Update JSON with JSON from input on save/save and review
    var $editNav = $('.edit-nav');
    $editNav.off();

    $editNav.on('click', '.btn-edit-save', function () {
        save();
        updateContent(collectionId, path, content, null, true);
    });

    $editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
        save();
        saveAndCompleteContent(collectionId, path, content, null, true);
    });

    $editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
        save();
        saveAndReviewContent(collectionId, path, content, null, true);
    });

    function save() {
        // Update content with latest from textarea
        content = $('#json-input').val();
    }
}
