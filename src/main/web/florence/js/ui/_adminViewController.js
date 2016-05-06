/**
 * Select which view to load
 * @param view (optional) - the view that is being displayed
 */

function adminViewController(view) {
    if (Florence.Authentication.isAuthenticated()) {

        if (view === 'options') {
            viewOptions();

        } else if (view === 'reports') {
            viewReports();
        }
        else {
            viewOptions();
        }
    }
    else {
        viewLogIn();
    }
}