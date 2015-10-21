function datasetLandingEditor(collectionId, data) {

  var newDatasets = [], newRelatedDocuments = [], newRelatedMethodology = [];
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
  getLastPosition();

  resolveTitleT8(collectionId, data, templateData, 'datasets');

  // Metadata edition and saving
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
  //if (!Florence.collection.date) {                      //overwrite scheduled collection date
  if (!data.description.releaseDate) {
    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        autoSaveMetadata(collectionId, data);
      }, 3000);
    });
  } else {
    dateTmp = data.description.releaseDate;
    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        autoSaveMetadata(collectionId, data);
      }, 3000);
    });
  }
  //} else {
  //    $('.release-date').hide();
  //}
  $("#nextRelease").on('input', function () {
    $(this).textareaAutoSize();
    data.description.nextRelease = $(this).val();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      autoSaveMetadata(collectionId, data);
    }, 3000);
  });
  if (!data.description.contact) {
    data.description.contact = {};
  }
  $("#contactName").on('input', function () {
    $(this).textareaAutoSize();
    data.description.contact.name = $(this).val();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      autoSaveMetadata(collectionId, data);
    }, 3000);
  });
  $("#contactEmail").on('input', function () {
    $(this).textareaAutoSize();
    data.description.contact.email = $(this).val();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      autoSaveMetadata(collectionId, data);
    }, 3000);
  });
  $("#contactTelephone").on('input', function () {
    $(this).textareaAutoSize();
    data.description.contact.telephone = $(this).val();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      autoSaveMetadata(collectionId, data);
    }, 3000);
  });
  $("#datasetId").on('input', function () {
    $(this).textareaAutoSize();
    data.description.datasetId = $(this).val();
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
    data.description.keywords = $('#keywords').val().split(', ');
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

  /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
   is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
  var checkBoxStatus = function () {
    if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
      return false;
    } else {
      return true;
    }
  };
  $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
    data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      autoSaveMetadata(collectionId, data);
    }, 3000);
  });

  //Add new edition
  $("#add-dataset").one('click', function () {
    var datasetTitle;
    $('#sortable-dataset').append(
      '<div id="' + lastIndexDataset + '" class="edit-section__sortable-item">' +
      '<textarea class="auto-size" id="new-dataset-title" placeholder="Type title here and click add"></textarea>' +
      '<button class="btn-markdown-edit" id="dataset-add">Edit dataset</button>' +
      '</div>');
    $('#new-dataset-title').on('input', function () {
      $(this).textareaAutoSize();
      datasetTitle = $(this).val();
    });
    $('#dataset-add').on('click', function () {
      if (datasetTitle.length < 4) {
        alert("This is not a valid file title");
        return true;
      } else {
        if (data.timeseries) {
          var datasetType = 'timeseries_dataset';
        } else {
          var datasetType = 'dataset';
        }
        loadT8Creator(collectionId, data.description.releaseDate, datasetType, data.uri, datasetTitle);
      }
    });
  });

  // Save
  var editNav = $('.edit-nav');
  editNav.off(); // remove any existing event handlers.

  editNav.on('click', '.btn-edit-save', function () {
    save();
    updateContent(collectionId, data.uri, JSON.stringify(data));
  });

  // completed to review
  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
    //pageData = $('.fl-editor__headline').val();
    save();
    saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data));
  });

  // reviewed to approve
  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
    save();
    saveAndReviewContent(collectionId, data.uri, JSON.stringify(data));
  });

  function save() {
    // Datasets are uploaded. Save metadata
    var orderDataset = $("#sortable-dataset").sortable('toArray');
    $(orderDataset).each(function (indexF, nameF) {
      var file = data.datasets[parseInt(nameF)].uri;
      newDatasets[indexF] = {uri: file};
    });
    data.datasets = newDatasets;
    // Used in links
    var orderUsedIn = $("#sortable-document").sortable('toArray');
    $(orderUsedIn).each(function (indexU, nameU) {
      var uri = data.relatedDocuments[parseInt(nameU)].uri;
      var safeUri = checkPathSlashes(uri);
      newRelatedDocuments[indexU] = {uri: safeUri};
    });
    data.relatedDocuments = newRelatedDocuments;
    // Related methodology
    var orderRelatedMethodology = $("#sortable-methodology").sortable('toArray');
    $(orderRelatedMethodology).each(function (indexM, nameM) {
      var uri = data.relatedMethodology[parseInt(nameM)].uri;
      var safeUri = checkPathSlashes(uri);
      newRelatedMethodology[indexM] = {uri: safeUri};
    });
    data.relatedMethodology = newRelatedMethodology;
  }
}

function resolveTitleT8(collectionId, data, templateData, field) {
  var ajaxRequest = [];
  $(templateData[field]).each(function (index, path) {
    templateData[field][index].description = {};
    var eachUri = path.uri;
    var dfd = $.Deferred();
    getPageDataTitle(collectionId, eachUri,
      success = function (response) {
        templateData[field][index].description.title = response.title;
        dfd.resolve();
      },
      error = function () {
        alert(field + ' address: ' + eachUri + ' is not found.');
        dfd.resolve();
      }
    );
    ajaxRequest.push(dfd);
  });

  $.when.apply($, ajaxRequest).then(function () {
    var dataTemplate = templateData[field];
    var html = templates.workEditT8LandingDatasetList(dataTemplate);
    $('#' + field).replaceWith(html);
    addVersion(collectionId, data);
  });
}

function addVersion(collectionId, data) {
  // Edit dataset
  // Load dataset to edit
  $(data.datasets).each(function (index) {
    lastIndexDataset = index + 1;

    $("#data-version_" + index).click(function () {
      //open document
      var selectedVersion = $("#data-title_" + index).attr('data-url');
      createWorkspace(selectedVersion, collectionId, 'edit');
    });
  });

  function sortableSections() {
    $("#sortable-version").sortable();
  }

  sortableSections();
}