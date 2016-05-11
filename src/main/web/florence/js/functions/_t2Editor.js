function t2Editor(collectionId, data) {

    var newHighlights = [];
    var setActiveTab, getActiveTab;
    var timeoutId;

    $(".edit-accordion").on('accordionactivate', function (event, ui) {
        setActiveTab = $(".edit-accordion").accordion("option", "active");
        if (setActiveTab !== false) {
            Florence.globalVars.activeTab = setActiveTab;
        }
    });

    getActiveTab = Florence.globalVars.activeTab;
    accordion(getActiveTab);

    // Metadata load, edition and saving
    $("#title").on('input', function () {
        $(this).textareaAutoSize();
        data.description.title = $(this).val();
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            autoSaveMetadata(collectionId, data);
        }, 3000);
    });
    $("#summary").on('input', function () {
        $(this).textareaAutoSize();
        data.description.summary = $(this).val();
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            autoSaveMetadata(collectionId, data);
        }, 3000);
    });
    $("#keywordsTag").tagit({
        availableTags: data.description.keywords,
        singleField: true,
        allowSpaces: true,
        singleFieldNode: $('#keywords')
    });
    $('#keywords').on('change', function () {
        data.description.keywords = $('#keywords').val().split(',');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            autoSaveMetadata(collectionId, data);
        }, 3000);
    });
    $("#metaDescription").on('input', function () {
        $(this).textareaAutoSize();
        data.description.metaDescription = $(this).val();
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            autoSaveMetadata(collectionId, data);
        }, 3000);
    });

    editorNav(save, collectionId, data.uri, data);

    function save() {
        clearTimeout(timeoutId);
        // Highlights
        var orderHighlights = $("#sortable-highlights").sortable('toArray');
        $(orderHighlights).each(function (indexH, titleH) {
            var uri = data.highlightedLinks[parseInt(titleH)].uri;
            var safeUri = checkPathSlashes(uri);
            newHighlights[indexH] = {uri: safeUri};
        });
        data.highlightedLinks = newHighlights;
    }
}

