/**
 * Add 'user' drop-down in main nav
 **/

function myAccountUI(email) {
    var $menuTrigger = $('#account-trigger'),
        $menu = $('#account-menu');


    // Set selected states on button and menu
    $menuTrigger.click(function(e) {
        e.stopPropagation();
        $menuTrigger.toggleClass('selected');
        $menu.css('display', 'block') // Menu hidden on load by CSS, this allows animations to control display styling after initial load
            .toggleClass('selected');

        // Close menu whenever any other part of the page is clicked
        $('body').one('click', function() {
            $menuTrigger.toggleClass('selected');
            $menu.toggleClass('selected');
        });
    });

    // Load admin screen
    $('#load-admin').click(function(e) {
        e.stopPropagation();
        viewAdmin();
    });
    
    // Change own password
    $('#change-password').click(function(e) {
        e.stopPropagation();

        var currentPasswordRequired = true,
            email = Florence.Authentication.loggedInEmail();

        viewChangePassword(email, currentPasswordRequired);
    });

    // Log out
    $('#logout').click(function() {
        logout();
    });
}