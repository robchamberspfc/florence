function viewWorkspace(){

  var intIntervalTime = 100;
  var collectionName = localStorage.getItem("collection");

  function accordion() {
    $(function () {
      $("#accordion").accordion(
          {
            header: "section",
            heightStyle: "content",
            active: 2
          }
      );
    });
  }

  var workspace_menu_main =
    '<nav class="fl-panel fl-panel--menu">' +
      '<ul class="fl-main-menu">' +
          '<li class="fl-main-menu__item fl-main-menu__item--browse">' +
            '<a href="#" class="fl-main-menu__link">Browse</a>' +
          '</li>' +
          '<li class="fl-main-menu__item fl-main-menu__item--create">' +
            '<a href="#" class="fl-main-menu__link">Create</a>' +
          '</li>' +
          '<li class="fl-main-menu__item fl-main-menu__item--edit">' +
            '<a href="#" class="fl-main-menu__link">Edit</a>' +
          '</li>' +
          '<li class="fl-main-menu__item fl-main-menu__item--review">' +
            '<a href="#" class="fl-main-menu__link">Review</a>' +
          '</li>' +
        '</ul>' +
    '</nav>' +

    '<section class="fl-panel fl-panel--sub-menu">' +
    '</section>';

  // Metadata and correction collapsible sections
  var workspace_menu_sub_edit =
    '<section class="fl-panel fl-panel--editor">' +
      '<section style="overflow: scroll;" class="fl-editor">' +
        '<div id="accordion">' +
          '<section class="fl-editor__metadata">Metadata section</section>' +
            '<div id="metadata-section"></div>' +
          '<section class="fl-editor__metadata">Correction section</section>' +
            '<div id="correction-section">' +
              'Demo: <input value="Tab 2 content"><br>' +
              'Demo: <input value="Tab 2 content"><br>' +
              'Demo: <input value="Tab 2 content"><br>' +
            '</div>' +
          '<section class="fl-editor__metadata">Content section</section>' +
            '<div id="content-section">' +
              '<textarea class="fl-editor__headline" name="fl-editor__headline"></textarea>' +
              '<article class="fl-editor__sections"></article>' +
            '</div>' +
          '<section class="fl-editor__metadata">Accordion section</section>' +
            '<div id="content-section">' +
              '<article class="fl-editor__accordion"></article>' +
            '</div>' +
          '<section class="fl-editor__metadata">Related bulletins</section>' +
            '<div id="content-section">' +
              '<article class="fl-editor__related"></article>' +
            '</div>' +
          '<section class="fl-editor__metadata">External links</section>' +
            '<div id="content-section">' +
              '<article class="fl-editor__external"></article>' +
            '</div>' +
        '</div>' +
      '</section>' +
      '<nav class="fl-panel--editor__nav">' +
        '<button class="fl-panel--editor__nav__cancel">Cancel</button>' +
        '<button class="fl-panel--editor__nav__save">Save</button>' +
        '<button class="fl-panel--editor__nav__complete">Save and submit for internal review</button>' +
        '<button class="fl-panel--editor__nav__review">Save and submit for approval</button>' +
      '</nav>' +
    '</section>';

  var workspace_menu_create =
    '<section class="fl-panel fl-panel--creator">' +
      '<section class="fl-creator">' +

        '<section class="fl-creator__page_details">' +
          '<span class="fl-creator__title"> Select the Parent</span>' +
          '<input class="fl-creator__parent" name="fl-editor__headline" cols="40" rows="1"></input>' +
          '<br>' +
          '<span class="fl-creator__title"> enter the new page name </span>' +
          '<input class="fl-creator__new_name" name="fl-editor__headline" cols="40" rows="1"></input>' +
          '<br>' +
          '<section class="fl-creator__title"> Select a Page Type' +
          '<select class="fl-creator__page_type_list_select">'+
            '<option>bulletin</option>' +
          '</select></section>'+
        '</section>' +
      '</section>' +
      '<nav class="fl-panel--creator__nav">' +
        '<button class="fl-panel--creator__nav__create">Create Page</button>' +
      '</nav>' +
    '</section>';

  var workspace_menu_review =
    '<section class="fl-panel">' +
    '<div class="fl-review-list-holder"></div>' +
    '<button class="fl-button fl-button--big fl-button--center fl-edit-button">Edit this page</button>' +
    '<button class="fl-button fl-button--big fl-button--center fl-review-button">Happy with this send to content owner</button>' +
    '</section>';

  var workspace_preview =
    '<section class="fl-panel fl-panel--preview">' +
      '<div class="fl-panel--preview__inner">' +
        '<iframe src="/index.html" class="fl-panel fl-panel--preview__content"></iframe>' +
      '</div>' +
    '</section>';

  //build view
  $('.fl-view').prepend(workspace_menu_main + workspace_preview);

  //click handlers
  $('.fl-main-menu__link').click(function() {
    $('.fl-panel--sub-menu').empty();
    $('.fl-panel--preview__inner').removeClass('fl-panel--preview__inner--active');

    // setupFlorenceWorkspace($(this));
    if ($(this).parent().hasClass('fl-main-menu__item--browse')){
      enablePreview();
    }

    else if ($(this).parent().hasClass('fl-main-menu__item--create')){
      //
      $('.fl-panel--sub-menu').html(workspace_menu_create);
      loadPageCreator();
    }

    else if ($(this).parent().hasClass('fl-main-menu__item--edit')){
      $('.fl-panel--sub-menu').append(workspace_menu_sub_edit);
      $('.fl-panel--preview__inner').addClass('fl-panel--preview__inner--active');
      // Clear local storage
      localStorage.removeItem("pageurl");
      var pageurl = $('.fl-panel--preview__content').contents().get(0).location.href;
      localStorage.setItem("pageurl",pageurl);
      accordion();
      loadPageDataIntoEditor(localStorage.getItem("collection"));
      setInterval(checkForPageChanged(loadPageDataIntoEditor(collectionName)), intIntervalTime);

      $('.fl-panel--editor__nav__publish').click(function () {
          publish(collectionName);
      });
    }

    else if ($(this).parent().hasClass('fl-main-menu__item--review')){

      $('.fl-panel--sub-menu').append(workspace_menu_review);
      $('.fl-panel--preview__inner').addClass('fl-panel--preview__inner--active');

      localStorage.removeItem("pageurl");
      var pageurl = $('.fl-panel--preview__content').contents().get(0).location.href;
      localStorage.setItem("pageurl",pageurl);

      loadReviewScreen(collectionName);
      setInterval(checkForPageChanged(updateReviewScreen()), intIntervalTime);
    }

    else {
      //browse
    }
  });

  //removePreviewColClasses();
  //removeSubMenus();

  $('.fl-main-menu__link').removeClass('fl-main-menu__link--active');
  $(this).addClass('fl-main-menu__link--active');

  $('.fl-panel--preview__inner').removeClass('fl-panel--preview__inner--active');
  $('.fl-panel--preview').addClass('col--7');
  $('.fl-panel--sub-menu').show();
}
