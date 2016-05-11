function datasetEditor(collectionId, data) {

    var newFiles = [];
    var setActiveTab, getActiveTab;
    var parentUrl = getParentPage(data.uri);

    //Add parent link onto page
    loadParentLink(collectionId, data, parentUrl);


    $(".edit-accordion").on('accordionactivate', function () {
        setActiveTab = $(".edit-accordion").accordion("option", "active");
        if (setActiveTab !== false) {
            Florence.globalVars.activeTab = setActiveTab;
        }
    });

    getActiveTab = Florence.globalVars.activeTab;
    accordion(getActiveTab);
    getLastPosition();

    editorNav(save, collectionId, data.uri, data, parentUrl);

    function save() {
        // Files are uploaded. Save metadata
        var orderFile = $("#sortable-supplementary-files").sortable('toArray');
        $(orderFile).each(function (indexF, nameF) {
            var title = $('#supplementary-files-title_' + nameF).val();
            var file = data.supplementaryFiles[parseInt(nameF)].file;
            newFiles[indexF] = {title: title, file: file};
        });
        data.supplementaryFiles = newFiles;
        // Notes
        data.section = {markdown: $('#one-markdown').val()};
    }
}