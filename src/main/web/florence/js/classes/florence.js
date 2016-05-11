// The florence object is used for storing application state.
var Florence = Florence || {
        tredegarBaseUrl: window.location.origin,
        refreshPublisherMenu: function () {
            var mainNavHtml = templates.mainNav(Florence);
            $('.admin-nav').html(mainNavHtml);
            myAccountUI(); // Bind UI events for account actions
        },
        refreshAdminMenu: function() {
            var adminNavHtml = templates.adminNav(Florence);
            $('.admin-nav').html(adminNavHtml);
            myAccountUI(); // Bind UI events for account actions
        },
        setActiveCollection: function (collection) {
            document.cookie = "collection=" + collection.id + ";path=/";
            if (!collection.publishDate) {
                var formattedDate = null;
            } else {
                var formattedDate = StringUtils.formatIsoDateString(collection.publishDate);
            }
            Florence.collection = {
                id: collection.id,
                name: collection.name,
                date: formattedDate,
                publishDate: collection.publishDate,
                type: collection.type
            };
        }
    };

Florence.Editor = {
    isDirty: false,
    data: {}
};

Florence.CreateCollection = {
    selectedRelease: ""
};

Florence.collection = {};

Florence.collectionToPublish = {};

Florence.globalVars = {pagePath: '', activeTab: false, pagePos: '', welsh: false};

Florence.Authentication = {
    accessToken: function () {
        return CookieUtils.getCookieValue("access_token");
    },
    isAuthenticated: function () {
        return Florence.Authentication.accessToken() !== '';
    },
    loggedInEmail: function () {
        return localStorage.getItem("loggedInAs");
    },
    permission: function() {
        return localStorage.getItem("userPermissions");
    }
};

Florence.adminOptions = {
    rawJson: function() {
        return localStorage.getItem("rawJson");
    }
};

Florence.Handler = function (e) {
    if (Florence.Editor.isDirty) {
        var result = confirm("You have unsaved changes. Are you sure you want to continue");
        if (result === true) {
            Florence.Editor.isDirty = false;
            processPreviewLoad();
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    }
};

// if running in a node environment export this as a module.
if (typeof module !== 'undefined') {
    module.exports = Florence;
}


