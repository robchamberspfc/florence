function postUser(name, email, isAdmin, isEditor, isDataVisPublisher) {

    var html = templates.loadingAnimation({dark: true, large: true});
    sweetAlert({
        title: "User being created...",
        text: html,
        showConfirmButton: false,
        html: true
    });

    $.ajax({
        url: "/zebedee/users",
        dataType: 'json',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({
            name: name,
            email: email,
            permissions: {
                admin: isAdmin,
                editor: isEditor,
                dataVisPublisher: isDataVisPublisher
            }
        }),
        success: function () {
            console.log('User created');
            sweetAlert("User created", "User '" + email + "' has been created", "success");
            viewController('users');
        },
        error: function (response) {
            handleUserPostError(response);
        }
    });

    /**
     * Handle error response from creating the user.
     * @param response
     */
    function handleUserPostError(response) {
        if (response.status === 403 || response.status === 401) {
            sweetAlert("You are not permitted to create users.");
        }
        else if (response.status === 409) {
            sweetAlert("Error", response.responseJSON.message, "error");
        } else {
            handleApiError(response);
        }
    }
}

