/**
 * Logout the current user and return to the login screen.
 */
function logout() {
  delete_cookie('access_token');
  delete_cookie('collection');
  localStorage.setItem("loggedInAs", "");
  localStorage.setItem("userType", "");
  Florence.refreshAdminMenu();
  viewController();
}

function delete_cookie(name) {
  document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}