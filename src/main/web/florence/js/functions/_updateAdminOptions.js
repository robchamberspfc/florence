/**
 * Update boolean value of admin-only options on disk
 * @param email - email address of user being updated
 * @param newData - what data/node is being updated in adminOptions object
 */

function updateAdminOptions(email, updatedOptions) {
    putUser(
        success = function() {
            console.log('Admin options updated');
        },
        error = function(response) {
            handleApiError(response)
        },
        email, updatedOptions
    )
}
