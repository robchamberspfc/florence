
var editView = require('workspace/edit/editView.js'),
    workspaceState = require('shared/state/workspaceState'),
    getActivePage = require('shared/api/getActivePage'),
    i,
    velocity = require('velocity-animate');

var editController = {

    init: function() {

        if ($.isEmptyObject(workspaceState.editorData.get())) {
            // No current editorData, get data for activeURL from API and re-run this initialisation
            editView.render.loader();
            getActivePage().then(function(pageData) {
                workspaceState.editorData.set(pageData);
                editController.init();
            }).catch(function(error) {
                console.log(error);
            });

            return false;
        }

        editView.render.accordions(editController.build.accordions());
        this.bind.accordions();
        console.log("Render from state, no request to Zebedee required");
    },

    build: {

        accordions: function() {
            var HTML = [];

            if (workspaceState.editorData.get().sections) {
                HTML.push(editController.build.sections());
            }

            return HTML.join('');
        },

        sections: function() {
            var templateData = {
                id: "sections",
                heading: "Sections",
                itemName: "section",
                items: []
            },
            editorData = workspaceState.editorData.get(),
            sectionsLength = editorData.sections.length;

            // Map editorData sections to accordion template data
            for (i = 0; i < sectionsLength; i++) {
                templateData.items.push({title: editorData.sections[i].title, value: editorData.sections[i].markdown})
            }

            return editView.accordionHTML(templateData);
        }
    },

    bind: {

        accordions: function() {
            var $headings = $('.js-editor-accordion__heading'),
                $bodys = $('.js-editor-accordion__body'),
                $this;

            // Display hidden body and set negative margin in preparation for being animated later
            $bodys.each(function() {
                $this = $(this);
                $this.css('display', 'block');
                $this.css('margin-top', -$this.outerHeight());
            });

            // If a heading has 'active' class then open it (unanimated)
            $headings.each(function() {
                $this = $(this);
                if ($this.hasClass('active')) {
                    var $thisBody = $this.next('.js-editor-accordion__body');
                    $thisBody.css({display: 'block', marginTop: 0 }).addClass('active');
                    return true;
                }
            });

            // Toggle accordions on click
            $headings.click(function() {
                var $this = $(this),
                    $thisBody = $this.next('.js-editor-accordion__body'),
                    $previousHeading = $('.js-editor-accordion__heading.active'),
                    $previousBody = $('.js-editor-accordion__body.active');

                if ($thisBody.hasClass('active')) {
                    $thisBody.velocity({ marginTop: -$thisBody.outerHeight()}, { duration: 350 });
                    $this.removeClass('active');
                    $thisBody.removeClass('active');
                    return;
                }

                $previousHeading.removeClass('active');
                $previousBody.removeClass('active').velocity({ marginTop: -$previousBody.outerHeight()}, { duration: 350 });

                $thisBody.velocity({ marginTop: 0}, { duration: 350 });
                $this.addClass('active');
                $thisBody.addClass('active');
            });
        }

    }

};

module.exports = editController;
