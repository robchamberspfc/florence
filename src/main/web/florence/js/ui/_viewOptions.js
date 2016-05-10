/**
 * Load the admin only options view (only available through the admin screen)
 */

function viewOptions() {
    var email = Florence.Authentication.loggedInEmail();

    getUsers(
        success = function(response) {
            // Load options templates onto page
            var optionsHtml = templates.adminOptions(response);
            var pageMain = document.getElementById('main');
            pageMain.innerHTML = optionsHtml;

            // Labels aren't clickable by default (because of switch markup) so binding click events to them
            var $labels = $('.options__label');
            $labels.click(function() {
                // Set next input to checked
            });

            // Raw JSON option
            var $switches = $('.options__switch-input');
            $switches.on('change', function() {
                var $this = $(this),
                    bool = false;

                if ($this.prop('checked')) {
                    bool = true;
                }

                // Update user object with latest jawJson boolean value
                response['adminOptions']['rawJson'] = bool;

                // Send PUT to API to update on disk
                updateAdminOptions(email, response);

            })

        },
        error = function(response) {
            handleApiError(response);
        },
        email
    );
}