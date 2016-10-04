/**
 * Http post to the zebedee API to authenticate a user.
 * @param email - the email of the user to authenticate
 * @param password - the password of the user
 * @returns {boolean}
 */
function postLogin(email, password) {
    $.ajax({
        url: "/zebedee/login",
        dataType: 'json',
        contentType: 'application/json',
        crossDomain: true,
        type: 'POST',
        data: JSON.stringify({
            email: email,
            password: password
        }),
        success: function (response) {
            document.cookie = "access_token=" + response + ";path=/";
            localStorage.setItem("loggedInAs", email);

            // Storing in Redux for use in refactored JS
            var userState = require('shared/state/userState.js');
            userState.email.set(email);

            getUserPermission(
                function (permission) {
                    console.log(permission);
                    // Only allow access to editors and admin
                    if (permission.admin || permission.editor) {
                        getPublisherType(permission);
                        Florence.refreshAdminMenu();
                        viewController();

                    } else {
                        logout();
                        sweetAlert("You do not have the permissions to enter here. Please contact an administrator");
                    }
                },
                function (error) {
                    logout();
                    sweetAlert("There is a problem with permissions. Please contact an administrator");
                },
                email
            );
        },
        error: function (response) {
            if (response.status === 417) {
                viewChangePassword(email, true);
            } else {
                handleLoginApiError(response);
            }
        }
    });
    return true;
}

function getPublisherType(permission) {
    // Variable for user type to be dispatched to Redux later
    var userState = require('shared/state/userState.js'),
        userType;

    // Store in localStorage publisher type
    if (permission.admin) {
        localStorage.setItem("userType", "PUBLISHING_SUPPORT");
        userType = "PUBLISHING_SUPPORT"
    } else if (permission.editor && !permission.dataVisPublisher) {
        localStorage.setItem("userType", "PUBLISHING_SUPPORT");
        userType = "PUBLISHING_SUPPORT";
    } else if (permission.editor && permission.dataVisPublisher) {
        localStorage.setItem("userType", "DATA_VISUALISATION");
        userType = "DATA_VISUALISATION";
    } else if (!permission.admin && !permission.editor && !permission.dataVisPublisher) {
        localStorage.setItem("userType", "VIEWER");
        userType = "VIEWER";
    }

    // Update Redux with user type
    userState.type.set(userType);
}
