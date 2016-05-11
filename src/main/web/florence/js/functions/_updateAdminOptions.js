/**
 * Update boolean value of admin-only options on disk
 * @param email - email address of user being updated
 * @param newData - what data/node is being updated in adminOptions object
 */

function updateAdminOptions(email, updatedUser) {
    putUser(
        success = function() {
            console.log('Admin options updated');
            localStorage.setItem("rawJson", updatedUser.adminOptions.rawJson)
        },
        error = function(response) {
            handleApiError(response)
        },
        email, updatedUser
    )
}
