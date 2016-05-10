/**
 * Update user data
 * @param success - function handling successful response
 * @param error - function handling error response
 * @param email - email address to be updated
 * @param data - user object/data to be updated
 * @return {*}
 */

function putUser(success, error, userId, data) {
    var url = '/zebedee/users?email=' + userId;

    return $.ajax({
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(data),
        success: function (response) {
            success(response)
        },
        error: function (response) {
            error(response);
        }
    });
}
