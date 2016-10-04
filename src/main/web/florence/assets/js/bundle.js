/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {var CookieUtils = {
	  getCookieValue: function (a, b) {
	    b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
	    return b ? b.pop() : '';
	  }
	};

	// if running in a node environment export this as a module.
	if (true) {
	  module.exports = CookieUtils;
	}




	// The florence object is used for storing application state.
	var Florence = Florence || {
	        babbageBaseUrl: window.location.origin,
	        refreshAdminMenu: function () {
	            // Display a message to show users are on dev or sandpit
	            Florence.environment = isDevOrSandpit();

	            var mainNavHtml = templates.mainNav(Florence);
	            $('.js-nav').html(mainNavHtml);
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
	    userType: function() {
	        return localStorage.getItem("userType");
	    }
	};

	Florence.Handler = function (e) {
	    if (Florence.Editor.isDirty) {
	        var result = confirm("You have unsaved changes. Are you sure you want to continue?");
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

	// Add base url to Redux for use in refactored JS
	var baseUrlState = __webpack_require__(48);
	baseUrlState.set(window.location.origin);

	// if running in a node environment export this as a module.
	if (true) {
	    module.exports = Florence;
	}


	var PathUtils = {
	  isJsonFile: function (uri) {
	    return uri.indexOf('data.json', uri.length - 'data.json'.length) !== -1;
	  }
	};

	// if running in a node environment export this as a module.
	if (true) {
	  module.exports = PathUtils;
	}




	var StringUtils = {
	  textareaLines: function (line, maxLineLength, start, numberOfLinesCovered) {

	    if (start + maxLineLength >= line.length) {
	      //console.log('Line Length = ' + numberOfLinesCovered);
	      return numberOfLinesCovered;
	    }

	    var substring = line.substr(start, maxLineLength + 1);
	    var actualLineLength = substring.lastIndexOf(' ') + 1;

	    if (actualLineLength === maxLineLength) // edge case - the break is at the end of the line exactly with a space after it
	    {
	      actualLineLength--;
	    }

	    if (start + actualLineLength === line.length) {
	      return numberOfLinesCovered;
	    }

	    if (actualLineLength === 0) {
	      actualLineLength = maxLineLength;
	    }

	    //if(numberOfLinesCovered < 30) {
	    //  console.log('Line: ' + numberOfLinesCovered + ' length = ' + actualLineLength);
	    //}
	    return StringUtils.textareaLines(line, maxLineLength, start + actualLineLength, numberOfLinesCovered + 1);
	  },

	  formatIsoDateString: function (input) {
	    var date = new Date(input);
	    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	    var formattedDate = $.datepicker.formatDate('dd/mm/yy', date) + ' ' + date.getHours() + ':' + minutes;
	    return formattedDate;
	  },

	  formatIsoFullDateString: function (input) {
	    var date = new Date(input);
	//    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	    var formattedDate = $.datepicker.formatDate('DD dd MM yy', date);        //+ ' ' + date.getHours() + ':' + minutes;
	    return formattedDate;
	  },

	  formatIsoFull: function (input) {
	    var date = new Date(input);
	    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	    var formattedDate = $.datepicker.formatDate('DD dd MM yy', date) + ' ' + date.getHours() + ':' + minutes;
	    return formattedDate;
	  },

	  formatIsoFullSec: function (input) {
	    var date = new Date(input);
	    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	    var seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
	    var formattedDate = $.datepicker.formatDate('DD dd MM yy', date) + ' ' + date.getHours() + ':' + minutes + ':' + seconds;
	    return formattedDate;
	  },

	  randomId: function () {
	    var S4 = function () {
	      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    };
	    return (S4() + S4());
	  }

	};

	// if running in a node environment export this as a module.
	if (true) {
	  module.exports = StringUtils;
	}

	function deleteCollection(collectionId, success, error) {
	  $.ajax({
	    url: "/zebedee/collection/" + collectionId,
	    type: 'DELETE',
	    success: function (response) {
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	function deleteContent(collectionId, path, success, error) {
	  var safePath = checkPathSlashes(path);
	  // send ajax call
	  $.ajax({
	    url: "/zebedee/content/" + collectionId + "?uri=" + safePath,
	    type: 'DELETE',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	function deleteEquation(collectionId, path, success, error) {
	  var safePath = checkPathSlashes(path);
	  $.ajax({
	    url: "/zebedee/equation/" + collectionId + "?uri=" + safePath,
	    type: 'DELETE',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	function getCollection(collectionId, success, error) {
	  return $.ajax({
	    url: "/zebedee/collection/" + collectionId,
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      success(response);
	    },
	    error: function (response) {
	      error(response);
	    }
	  });
	}

	function getCollectionDetails(collectionId, success, error) {
	  return $.ajax({
	    url: "/zebedee/collectionDetails/" + collectionId,
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      success(response);
	    },
	    error: function (response) {
	      error(response);
	    }
	  });
	}
	/**
	 * Gets the JSON file for the page
	 * @param collectionId
	 * @param path
	 * @param success
	 * @param error
	 * @returns {*}
	 */

	function getPageData(collectionId, path, success, error) {
	  var safePath = checkPathSlashes(path);
	  return $.ajax({
	    url: "/zebedee/data/" + collectionId + "?uri=" + safePath,
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	/**
	 * Get page data with only the page description.
	 * @param collectionId
	 * @param path
	 * @param success
	 * @param error
	 * @returns {*}
	 */
	function getPageDataDescription(collectionId, path, success, error) {
	  return $.ajax({
	    url: "/zebedee/data/" + collectionId + "?uri=" + path + '&description',
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	/**
	 * Get page data with only the page title.
	 * @param collectionId
	 * @param path
	 * @param success
	 * @param error
	 * @returns {*}
	 */
	function getPageDataTitle(collectionId, path, success, error) {
	  return $.ajax({
	    url: "/zebedee/data/" + collectionId + "?uri=" + path + '&title',
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	function getBabbagePageData(collectionId, path, success, error) {
	  return $.ajax({
	    url: path + '/data',
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}
	function getPageResource(collectionId, path, success, error) {
	  var safePath = checkPathSlashes(path);
	  return $.ajax({
	    url: "/zebedee/resource/" + collectionId + "?uri=" + safePath,
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	/**
	 * Http post to the zebedee API to get a list of teams.
	 * @param success
	 * @param error
	 * @param name (to get specific details)
	 * @returns {*}
	 */
	function getTeams(success, error, name) {

	  var url = "/zebedee/teams";

	  if(name) {
	    url += '/' + name;
	  }

	  return $.ajax({
	    url: url,
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      success(response);
	    },
	    error: function (response) {
	      error(response);
	    }
	  });
	}

	/**
	 * Http post to the zebedee API to get a list of user permissions.
	 * @param success
	 * @param error
	 * @param userId
	 * @returns {*}
	 */
	function getUserPermission(success, error, userId) {

	  var url = "/zebedee/permission?email=" + userId;


	  return $.ajax({
	    url: url,
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      success(response);
	    },
	    error: function (response) {
	      error(response);
	    }
	  });
	}

	/**
	 * Http post to the zebedee API to get a list of users.
	 * @param success
	 * @param error
	 * @param userId
	 * @returns {*}
	 */
	function getUsers(success, error, userId) {

	  var url = "/zebedee/users";

	  if(userId) {
	    url += '?email=' + userId;
	  }

	  return $.ajax({
	    url: url,
	    dataType: 'json',
	    type: 'GET',
	    success: function (response) {
	      success(response);
	    },
	    error: function (response) {
	      error(response);
	    }
	  });
	}
	function moveContent(collectionId, path, newPath, success, error) {
	  $.ajax({
	    url: "/zebedee/contentmove/" + collectionId + "?uri=" + checkPathSlashes(path) + "&toUri=" + checkPathSlashes(newPath),
	    type: 'POST',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	/**
	 * HTTP post to the zebedee API to set a new password
	 * @param success - function to run on success
	 * @param error - function to run on error
	 * @param email - the email address of the user to change the password for
	 * @param password - the password to set
	 * @param oldPassword - the current password of the user if they are not already authenticated
	 */
	function postPassword(success, error, email, password, oldPassword) {
	  $.ajax({
	    url: "/zebedee/password",
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'POST',
	    data: JSON.stringify({
	      password: password,
	      email: email,
	      oldPassword: oldPassword
	    }),
	    success: function () {
	      if(success) {
	        success();
	      }
	    },
	    error: function (response) {
	      if(error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}/**
	 * Post to the zebedee API permission endpoint.
	 * Set permissions for the given email address.
	 * @param success
	 * @param error
	 * @param email - The email of the user to set permissions for
	 * @param admin - boolean true if the user should be given admin permissions
	 * @param editor - boolean true if the user should be given editor permissions
	 */
	function postPermission(success, error, email, admin, editor, dataVisPublisher) {
	  $.ajax({
	    url: "/zebedee/permission",
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'POST',
	    data: JSON.stringify({
	      email: email,
	      admin: admin,
	      dataVisPublisher: dataVisPublisher,
	      editor: editor
	    }),
	    success: function () {
	      if(success) {
	        success();
	      }
	    },
	    error: function (response) {
	      if(error) {
	        error(response);
	      } else {
	        if (response.status === 403 || response.status === 401) {
	          sweetAlert("You are not permitted to update permissions.")
	        } else {
	          handleApiError(response);
	        }
	      }
	    }
	  });
	}function putContent(collectionId, path, content, success, error, recursive) {
	  postContent(collectionId, path, content, true, recursive,
	    onSuccess = function () {
	      if(success) {
	        success();
	      }
	    },
	    onError = function (response) {
	      if (error) {
	        error(response);
	      }
	      else {
	        handleApiError(response);
	      }
	    }
	  );
	}
	function addDeleteMarker(uri, title, success) {

	    var deleteTarget = {
	        uri: uri,
	        user: localStorage.getItem('loggedInAs'),
	        title: title,
	        collectionId: Florence.collection.id
	     };

	    $.ajax({
	        url: "/zebedee/DeleteContent/",
	        type: 'POST',
	        data: JSON.stringify(deleteTarget),
	        dataType: 'json',
	        contentType: 'application/json',
	        cache: false,
	        success: function (response) {
	            if (success)
	                success(response);
	        },
	        error: function (response) {
	            handleApiError(response);
	        }
	    });
	}

	function removeDeleteMarker(uri, success) {
	    $.ajax({
	        url: "/zebedee/DeleteContent/" + Florence.collection.id + "?uri=" + uri,
	        type: 'DELETE',
	        dataType: 'json',
	        contentType: 'application/json',
	        cache: false,
	        success: function (response) {
	            if (success)
	                success(response);
	        },
	        error: function (response) {
	            handleApiError(response);
	        }
	    });
	}
	setupFlorence();/**
	 * Keeps the accordion open in the tab specified
	 * @param active - the active tab
	 */

	function accordion(active) {
	  var activeTab = parseInt(active);
	  if(!activeTab){
	    activeTab = 'none';
	  }
	  $(function () {
	    $(".edit-accordion").accordion(
	      {
	        header: "div.edit-section__head",
	        heightStyle: "content",
	        active: activeTab,
	        collapsible: true
	      }
	    );
	  });
	}
	$('.section').bind('DOMSubtreeModified', function (){
		$('.auto-size').textareaAutoSize();
	});

	/**
	 * Checks for changes in the iframe path
	 * @param onChanged - function
	 */
	function checkForPageChanged(onChanged) {
	    var iframeUrl = Florence.globalVars.pagePath;
	    var nowUrl = $('#iframe')[0].contentWindow.document.location.pathname;

	    // Only update URL if it's different and it's got a valid value (ie not 'blank')
	    if (iframeUrl !== nowUrl && !(nowUrl === "/blank" || nowUrl === "blank")) {
	        Florence.globalVars.activeTab = false;
	        Florence.globalVars.pagePos = '';
	        if (!onChanged) {
	            Florence.globalVars.pagePath = nowUrl;
	        } else {
	            onChanged(nowUrl);
	        }
	    }
	}

	/**
	 * Checks a valid link
	 * @param uri
	 * @returns {*} - if valid returns a formatted valid link
	 */

	function checkPathParsed (uri) {
	  if (uri.match(/^(https?|ftp):\/\/(([a-z0-9$_\.\+!\*\'\(\),;\?&=-]|%[0-9a-f]{2})+(:([a-z0-9$_\.\+!\*\'\(\),;\?&=-]|%[0-9a-f]{2})+)?@)?((([a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.)*[a-z][a-z0-9-]*[a-z0-9]|((\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5]))(:\d+)?)(((\/+([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)*(\?([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)?)?)?(#([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)?/i)) {
	    var myUrl = parseURL(uri);
	    var safeUrl = myUrl.pathname;
	    if (safeUrl.charAt(safeUrl.length-1) === '/') {
	      safeUrl = safeUrl.slice(0, -1);
	    }
	  return safeUrl;
	  } else {
	    sweetAlert('This is not a valid link');
	    return false;
	  }
	}
	/**
	 * Checks for initial slash and no trailing slash
	 * @param uri
	 * @returns {*} - valid format
	 */
	function checkPathSlashes (uri) {
	  var checkedUri = uri[uri.length - 1] === '/' ? uri.substring(0, uri.length - 1) : uri;
	  checkedUri = checkedUri[0] !== '/' ? '/' + checkedUri : checkedUri;
	  return checkedUri;
	}

	/**
	 * When content is saved check if the changes made require us to rename the content, i.e. change the uri.
	 * @param collectionId
	 * @param data
	 * @param renameUri
	 * @param onSave
	 */
	function checkRenameUri(collectionId, data, renameUri, onSave) {

	    if (renameUri && !data.description.language && !data.description.edition) {   // It will not change welsh url + do not rename content with edition.
	        doRename();
	    } else {
	        onSave(collectionId, data.uri, JSON.stringify(data));
	    }

	    function doRename() {
	        // Does it have edition?
	        if (data.description.edition) {
	            // CH 29/04/2016 disabling the URI change of content with an edition as it breaks the link of previous editions
	            //moveContentWithEditionInUri();
	            onSave(collectionId, data.uri, JSON.stringify(data));
	        } else if (data.type === 'static_adhoc') {
	            moveAdHoc();
	        } else {
	            moveContentWithoutEdition();
	        }
	    }

	    function moveAdHoc() {
	        var titleNoSpace = data.description.title.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	        var referenceNoSpace = data.description.reference.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	        var tmpNewUri = data.uri.split("/");
	        tmpNewUri.splice([tmpNewUri.length - 1], 1, referenceNoSpace + titleNoSpace);
	        var newUri = tmpNewUri.join("/");

	        putContent(collectionId, data.uri, JSON.stringify(data), function () {
	            moveContent(collectionId, data.uri, newUri, function () {
	                getPageData(collectionId, newUri, function (pageData) { // get the updated data after doing the move.
	                        data = pageData;
	                        Florence.globalVars.pagePath = newUri;
	                        ;
	                        onSave(collectionId, newUri, JSON.stringify(data));
	                    },
	                    onError = function () {
	                        onSave(collectionId, data.uri, JSON.stringify(data));
	                    });
	            });
	        });

	        return titleNoSpace;
	    }

	    function moveContentWithEditionInUri() {
	        //Special case dataset editions. They have edition but not title
	        if (data.description.title) {
	            var titleNoSpace = data.description.title.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	        }
	        var editionNoSpace = data.description.edition.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	        var tmpNewUri = data.uri.split("/");
	        if (data.type === 'dataset') {
	            tmpNewUri.splice([tmpNewUri.length - 1], 1, editionNoSpace);
	        } else {
	            tmpNewUri.splice([tmpNewUri.length - 2], 2, titleNoSpace, editionNoSpace);
	        }

	        var newUri = tmpNewUri.join("/");

	        // save any changes before actually doing the move
	        putContent(collectionId, data.uri, JSON.stringify(data), function () {
	            moveContent(collectionId, data.uri, newUri, function () {
	                    getPageData(collectionId, newUri, function (pageData) { // get the updated data after doing the move.
	                        data = pageData;

	                        Florence.globalVars.pagePath = newUri;
	                        ;
	                        //is it a compendium? Rename children array
	                        //take this out if moveContent in Zebedee works
	                        if (data.type === 'compendium_landing_page') {
	                            if (data.chapters) {
	                                data.chapters = renameCompendiumChildren(data.chapters, titleNoSpace, editionNoSpace);
	                            }
	                            if (data.datasets) {
	                                data.datasets = renameCompendiumChildren(data.datasets, titleNoSpace, editionNoSpace);
	                            }
	                        }
	                        onSave(collectionId, newUri, JSON.stringify(data));
	                    });
	                },
	                onError = function () {
	                    onSave(collectionId, data.uri, JSON.stringify(data));
	                });
	        });
	    }

	    function moveContentWithoutEdition() {
	        var titleNoSpace = data.description.title.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	        var tmpNewUri = data.uri.split("/");
	        //Articles with no edition. Add date as edition
	        if (data.type === 'article' || data.type === 'article_download') {
	            var editionDate = $.datepicker.formatDate('yy-mm-dd', new Date());
	            tmpNewUri.splice([tmpNewUri.length - 2], 2, titleNoSpace, editionDate);
	        } else {
	            tmpNewUri.splice([tmpNewUri.length - 1], 1, titleNoSpace);
	        }
	        var newUri = tmpNewUri.join("/");

	        putContent(collectionId, data.uri, JSON.stringify(data), function () {
	            moveContent(collectionId, data.uri, newUri, function () {
	                    getPageData(collectionId, newUri, function (pageData) { // get the updated data after doing the move.
	                        data = pageData;

	                        Florence.globalVars.pagePath = newUri;
	                        //if it is a dataset rename children array
	                        //take this out if moveContent in Zebedee works
	                        if (data.type === 'dataset_landing_page') {
	                            if (data.datasets) {
	                                data.datasets = renameDatasetChildren(data.datasets, titleNoSpace);
	                            }
	                        }
	                        onSave(collectionId, newUri, JSON.stringify(data));
	                    });
	                },
	                onError = function () {
	                    onSave(collectionId, data.uri, JSON.stringify(data));
	                });
	        });
	    }
	}
	/**
	 * Return the last edited event for the given page, from the given collection.
	 * @param collection
	 * @param page
	 * @returns {*}
	 */
	function getLastEditedEvent(collection, page) {

	  var uri = page;
	  var safeUri = checkPathSlashes(uri);

	  var pageEvents = collection.eventsByUri[safeUri];

	  var lastEditedEvent = _.chain(pageEvents)
	    .filter(function (event) {
	      return event.type === 'EDITED';
	    })
	    .sortBy(function (event) {
	      return event.date;
	    })
	    .last()
	    .value();

	  return lastEditedEvent;
	}

	/**
	 * Return the collection created event from the given collection of events.
	 * @param events
	 * @returns {*}
	 */
	function getCollectionCreatedEvent(events) {

	  var event = _.chain(events)
	    .filter(function (event) {
	      return event.type === 'CREATED';
	    })
	    .last()
	    .value();

	  return event;
	}

	/**
	 * Return the last completed event for the given page, from the given collection.
	 * @param collection
	 * @param page
	 * @returns {*}
	 */
	function getLastCompletedEvent(collection, page) {

	  var uri = page;
	  var safeUri = checkPathSlashes(uri);

	   var lastCompletedEvent;

	  if (collection.eventsByUri) {
	    var pageEvents = collection.eventsByUri[safeUri];
	    if (pageEvents) {
	      lastCompletedEvent = _.chain(pageEvents)
	        .filter(function (event) {
	          return event.type === 'COMPLETED';
	        })
	        .sortBy(function (event) {
	          return event.date;
	        })
	        .last()
	        .value();
	    }
	  }
	  return lastCompletedEvent;
	}

	// Copy chart markdown to clipboard (clipboard.js plugin)
	var clipboard = null;
	function initialiseClipboard() {
	    var i;

	    // Add index to any trigger/target that will use clipboard.js so we can identify each element individually
	    $('.copy-markdown').each(function(index) {
	        var $this = $(this);
	        if (!$this.hasClass('copy-markdown_' + index)) {
	            $this.addClass('copy-markdown_' + index).attr('data-clipboard-index', index);
	            $this.closest('.edit-section__sortable-item').find('.copy-markdown-target').attr('id', 'copy-markdown-target_' + index);
	            $this.find('.tick-animation-trigger').addClass('tick-animation-trigger_' + index);
	        }
	    });

	    // Fire clipboard initialisation
	    clipboard = new Clipboard('.copy-markdown', {
	        target: function(trigger) {
	            i = $(trigger).attr('data-clipboard-index');
	            return document.getElementById('copy-markdown-target_' + i);
	        }
	    });
	    clipboard.on('success', function(e) {
	        toggleTick(i, "show");
	        setTimeout(function() {
	            toggleTick(i, "hide")
	        }, 2000);
	        e.clearSelection();
	    });
	    clipboard.on('error', function(e) {
	        console.log("Error copying markdown");
	        console.error('Action:', e.action);
	        console.error('Trigger:', e.trigger);
	    });

	    // Switch 'done' tick on and off
	    function toggleTick(i, state) {
	        if (state == "show") {
	            $(".copy-markdown_" + i).attr("style", "color:transparent;");
	        }
	        $(".tick-animation-trigger_" + i).toggleClass("drawn");
	        if (state == "hide") {
	            function showBtnText () { $(".copy-markdown_" + i).removeAttr("style");}
	            setTimeout(showBtnText, 1600);
	        }
	    }
	}
	function createCollection(teams) {

	    var publishTime, collectionId, collectionDate, releaseUri;
	    collectionId = $('#collectionname').val();
	    var publishType = $('input[name="publishType"]:checked').val();
	    var scheduleType = $('input[name="scheduleType"]:checked').val();

	    if (publishType === 'scheduled') {
	        publishTime = parseInt($('#hour').val()) + parseInt($('#min').val());
	        var toIsoDate = $('#date').datepicker("getDate");
	        collectionDate = new Date(parseInt(new Date(toIsoDate).getTime()) + publishTime).toISOString();
	    } else {
	        collectionDate = null;
	    }

	    if (scheduleType === 'release' && publishType === 'scheduled') {
	        if (!Florence.CreateCollection.selectedRelease) {
	            sweetAlert('Please select a release');
	            return true;
	        }
	        releaseUri = Florence.CreateCollection.selectedRelease.uri;
	    } else {
	        releaseUri = null;
	    }

	    // inline tests
	    if (collectionId === '') {
	        sweetAlert('This is not a valid collection name', "A collection name can't be empty");
	        return true;
	    }
	    if (collectionId.match(/\./)) {
	        sweetAlert('This is not a valid collection name', "You can't use fullstops");
	        return true;
	    }
	    if ((publishType === 'scheduled') && (scheduleType === 'custom') && (isValidDate(new Date(collectionDate)))) {
	        sweetAlert('This is not a valid date');
	        return true;
	    }
	    if ((publishType === 'scheduled') && (scheduleType === 'custom') && (Date.parse(collectionDate) < new Date())) {
	        sweetAlert('This is not a valid date');
	        return true;
	    } else {

	        // Add loading icon to button
	        loadingBtn($('.btn-collection-create'));

	        // Create the collection
	        $.ajax({
	            url: "/zebedee/collection",
	            dataType: 'json',
	            contentType: 'application/json',
	            type: 'POST',
	            data: JSON.stringify({
	                name: collectionId,
	                type: publishType,
	                publishDate: collectionDate,
	                pendingDeletes: [],
	                teams: teams,
	                collectionOwner: Florence.Authentication.userType(),
	                releaseUri: releaseUri
	            }),
	            success: function (collection) {
	                Florence.setActiveCollection(collection);
	                createWorkspace('', collection.id, 'browse', collection);
	            },
	            error: function (response) {
	                if (response.status === 409) {
	                    sweetAlert("Error", response.responseJSON.message, "error");
	                }
	                else {
	                    handleApiError(response);
	                }
	            }
	        });
	    }
	}

	function isValidDate(d) {
	    if (!isNaN(d.getTime())) {
	        return false;
	    }
	    return true;
	}

	/**
	 * Handles the initial creation of the workspace screen.
	 * @param path - path to iframe
	 * @param collectionId
	 * @param menu - opens a specific menu
	 * @param collectionData - JSON of the currently active collection
	 * @param stopEventListener - separates the link between editor and iframe
	 * @returns {boolean}
	 **/

	function createWorkspace(path, collectionId, menu, collectionData, stopEventListener) {
	    var safePath = '';

	    $("#working-on").on('click', function () {
	    }); // add event listener to mainNav

	    if (stopEventListener) {
	        document.getElementById('iframe').onload = function () {
	            var browserLocation = document.getElementById('iframe').contentWindow.location.href;
	            $('.browser-location').val(browserLocation);
	            var iframeEvent = document.getElementById('iframe').contentWindow;
	            iframeEvent.removeEventListener('click', Florence.Handler, true);
	        };
	        return false;
	    } else {
	        var currentPath = '';
	        if (path) {
	            currentPath = path;
	            safePath = checkPathSlashes(currentPath);
	        }
	        
	        Florence.globalVars.pagePath = safePath;
	        if (Florence.globalVars.welsh !== true) {
	            document.cookie = "lang=" + "en;path=/";
	        } else {
	            document.cookie = "lang=" + "cy;path=/";
	        }
	        Florence.refreshAdminMenu();

	        var workSpace = templates.workSpace(Florence.babbageBaseUrl + safePath);
	        $('.section').html(workSpace);

	        // Store nav objects
	        var $nav = $('.js-workspace-nav'),
	            $navItem = $nav.find('.js-workspace-nav__item');

	        // Set browse panel to full height to show loading icon
	        $('.loader').css('margin-top', '84px');
	        $('.workspace-menu').height($('.workspace-nav').height());


	        /* Setup preview */
	        if (collectionData && collectionData.collectionOwner == "DATA_VISUALISATION") {
	            // Disable preview for data vis
	            $('#browser-location').show();
	            $('.browser').addClass('disabled');
	            updateBrowserURL("/");
	            $('#iframe').attr('src', Florence.babbageBaseUrl);
	        } else {
	            // Detect click on preview, stopping browsing around preview from getting rid of unsaved data accidentally
	            detectPreviewClick();

	            // Detect changes to preview and handle accordingly
	            processPreviewLoad(collectionId, collectionData);

	            // Update preview URL on initial load of workspace
	            updateBrowserURL(path);
	        }

	        if (Florence.globalVars.welsh !== true) {
	            $('#nav--workspace__welsh').empty().append('<a href="#">Language: English</a>');
	        } else {
	            $('#nav--workspace__welsh').empty().append('<a href="#">Language: Welsh</a>');
	        }

	        /* Bind clicking */
	        $navItem.click(function () {
	            menu = '';
	            if (Florence.Editor.isDirty) {
	                swal({
	                    title: "Warning",
	                    text: "You have unsaved changes. Are you sure you want to continue?",
	                    type: "warning",
	                    showCancelButton: true,
	                    confirmButtonText: "Continue",
	                    cancelButtonText: "Cancel"
	                }, function (result) {
	                    if (result === true) {
	                        Florence.Editor.isDirty = false;
	                        processMenuClick(this);
	                    } else {
	                        return false;
	                    }
	                });
	            } else {
	                processMenuClick(this);
	            }
	        });


	        function processMenuClick(clicked) {
	            var menuItem = $(clicked);

	            $navItem.removeClass('selected');
	            menuItem.addClass('selected');

	            if (menuItem.is('#browse')) {
	                loadBrowseScreen(collectionId, 'click', collectionData);
	            } else if (menuItem.is('#create')) {
	                Florence.globalVars.pagePath = getPreviewUrl();
	                var type = false;
	                loadCreateScreen(Florence.globalVars.pagePath, collectionId, type, collectionData);
	            } else if (menuItem.is('#edit')) {
	                Florence.globalVars.pagePath = getPreviewUrl();
	                loadPageDataIntoEditor(Florence.globalVars.pagePath, Florence.collection.id);
	            } else if (menuItem.is('#import')) {
	                loadImportScreen(Florence.collection.id);
	            } else {
	                loadBrowseScreen(collectionId, false, collectionData);
	            }
	        }

	        $('#nav--workspace__welsh').on('click', function () {
	            Florence.globalVars.welsh = Florence.globalVars.welsh === false ? true : false;
	            createWorkspace(Florence.globalVars.pagePath, collectionId, 'browse');
	        });

	        $('.workspace-menu').on('click', '.btn-browse-create', function () {
	            var dest = $('.tree-nav-holder ul').find('.js-browse__item.selected').attr('data-url');
	            // var spanType = $(this).parent().prev('span');
	            var spanType = $(this).closest('.js-browse__item').find('.js-browse__item-title:first');
	            var typeClass = spanType[0].attributes[0].nodeValue;
	            var typeGroup = typeClass.match(/--(\w*)$/);
	            var type = typeGroup[1];
	            Florence.globalVars.pagePath = dest;
	            $navItem.removeClass('selected');
	            $("#create").addClass('selected');
	            loadCreateScreen(Florence.globalVars.pagePath, collectionId, type, collectionData);
	        });

	        $('.workspace-menu').on('click', '.btn-browse-delete', function () {
	            var $parentItem = $('.tree-nav-holder ul').find('.js-browse__item.selected');
	            var $parentContainer = $parentItem.find('.page__container.selected');
	            var $button = $parentContainer.find('.btn-browse-delete');
	            var dest = $parentItem.attr('data-url');
	            var spanType = $(this).parent().prev('span');
	            var title = spanType.html();
	            addDeleteMarker(dest, title, function() {
	                $parentContainer.addClass('animating').addClass('deleted');
	                toggleDeleteRevertButton($parentContainer);
	                toggleDeleteRevertChildren($parentItem);

	                // Stops animation happening anytime other than when going between delete/undo delete
	                $parentContainer.one("webkitTransitionEnd transitionEnd", function() {
	                    $parentContainer.removeClass('animating');
	                });
	            });
	        });

	        $('.workspace-menu').on('click', '.btn-browse-delete-revert', function () {
	            var $parentItem = $('.tree-nav-holder ul').find('.js-browse__item.selected');
	            var $parentContainer = $parentItem.find('.page__container.selected');
	            var $button = $parentContainer.find('.btn-browse-delete-revert');
	            var dest = $parentItem.attr('data-url');
	            removeDeleteMarker(dest, function() {
	                $parentContainer.addClass('animating').removeClass('deleted');
	                toggleDeleteRevertButton($parentContainer);
	                toggleDeleteRevertChildren($parentItem);

	                // Stops animation happening anytime other than when going between delete/undo delete
	                $parentContainer.one("webkitTransitionEnd transitionEnd", function() {
	                    $parentContainer.removeClass('animating');
	                });
	            });
	        });

	        $('.workspace-menu').on('click', '.btn-browse-move', function() {
	            var $parentItem = $('.tree-nav-holder ul').find('.js-browse__item.selected'),
	                fromUrl = $parentItem.attr('data-url');

	            moveBrowseNode(fromUrl);
	        });

	        $('.workspace-menu').on('click', '.btn-browse-create-datavis', function () {
	            var dest = '/visualisations';
	            var type = 'visualisation';
	            Florence.globalVars.pagePath = dest;
	            loadCreateScreen(Florence.globalVars.pagePath, collectionId, type, collectionData);
	        });

	        $('.workspace-menu').on('click', '.btn-browse-edit', function () {
	            var dest = $('.tree-nav-holder ul').find('.js-browse__item.selected').attr('data-url');
	            Florence.globalVars.pagePath = dest;
	            $navItem.removeClass('selected');
	            $("#edit").addClass('selected');
	            loadPageDataIntoEditor(Florence.globalVars.pagePath, collectionId);
	        });

	        $('.workspace-menu').on('click', '.js-browse__menu', function() {
	            var $thisItem = $('.js-browse__item.selected .page__container.selected'),
	                $thisBtn = $thisItem.find('.js-browse__menu'),
	                $thisMenu = $thisBtn.next('.page__menu'),
	                menuHidden;

	            function toggleMenu() {
	                $thisBtn.toggleClass('active').children('.hamburger-icon__span').toggleClass('active');
	                $thisItem.find('.js-browse__buttons--primary').toggleClass('active');
	                $thisMenu.toggleClass('active');
	            }

	            // Toggle menu on click
	            toggleMenu();

	            // Shut menu if another item or button is clicked
	            $('.js-browse__item-title, .btn-browse-move, .btn-browse-delete').on('click', function() {
	                if (!menuHidden) {
	                    toggleMenu();
	                    menuHidden = true;
	                }
	            });
	        });

	        if (menu === 'edit') {
	            $navItem.removeClass('selected');
	            $("#edit").addClass('selected');
	            loadPageDataIntoEditor(Florence.globalVars.pagePath, collectionId);
	        } else if (menu === 'browse') {
	            $navItem.removeClass('selected');
	            $("#browse").addClass('selected');
	            loadBrowseScreen(collectionId, 'click', collectionData);
	        }
	        //};
	    }
	}

	// SHOULD BE REPLACED BY 'onIframeLoad' -  Bind click event to iframe element and run global Florence.Handler
	function detectPreviewClick() {
	    var iframeEvent = document.getElementById('iframe').contentWindow;
	    iframeEvent.addEventListener('click', Florence.Handler, true);
	}

	function processPreviewLoad(collectionId, collectionData) {
	    if (collectionData && collectionData.collectionOwner == "DATA_VISUALISATION") {
	        // iframe is blacked out on browse for data vis content
	        $('#iframe').empty();

	    } else {
	        // Collection of functions to run on iframe load
	        onIframeLoad(function (event) {
	            var $iframe = $('#iframe'), // iframe element in DOM, check length later to ensure it's on the page before continuing
	                $browse = $('#browse'); // 'Browse' menu tab, check later if it's selected

	            // Check it is a load event and that iframe is in the DOM still before processing the load
	            if (event.data == "load" && $iframe.length) {
	                // Check whether page URL is different and then load editor or update browse tree
	                checkForPageChanged(function (newUrl) {
	                    var safeUrl = checkPathSlashes(newUrl),
	                        selectedItem = $('.workspace-browse li.selected').attr('data-url'); // Get active node in the browse tree

	                    Florence.globalVars.pagePath = safeUrl;

	                    if ($('.workspace-edit').length || $('.workspace-create').length) {

	                        // Switch to browse screen if navigating around preview whilst on create or edit tab
	                        loadBrowseScreen(collectionId, 'click', collectionData);
	                    }
	                    else if ($('.workspace-browse').length && selectedItem != Florence.globalVars.pagePath) {
	                        // Only update browse tree of on 'browse' tab and preview and active node don't already match
	                        treeNodeSelect(safeUrl);
	                    }
	                });
	                updateBrowserURL(); // Update browser preview URL

	                if ($browse.hasClass('selected')) {
	                    browseScrollPos(); // Update browse tree scroll position
	                }
	            }
	        });
	    }
	}

	// Reusable iframe startload event - uses message sent up form babbage on window.load
	function onIframeLoad(runFunction) {
	    window.addEventListener("message", function (event) {
	        runFunction(event);
	    });
	}

	// Update the scroll position of the browse tree if selected item off screen
	function browseScrollPos() {
	    var $selectedItem = $('.workspace-browse li.selected .page__container.selected'),
	        $browseTree = $('.workspace-browse');

	    if ($selectedItem.length) {
	        var selectedTop = $selectedItem.offset().top,
	            selectedBottom = selectedTop + $selectedItem.height(),
	            browseTop = $browseTree.offset().top,
	            browseBottom = browseTop + $browseTree.height(),
	            navHeight = $('.nav').height();

	        if (selectedTop < browseTop) {
	            console.log('Item was outside of viewable browse tree');
	            $browseTree.scrollTop($browseTree.scrollTop() + (selectedTop) - (navHeight / 2));
	        } else if (selectedBottom > browseBottom) {
	            console.log('Item was outside of viewable browse tree');
	            $browseTree.scrollTop(selectedBottom - (navHeight / 2) - $selectedItem.height())
	        }
	    }
	}

	function updateBrowserURL(url) {
	    if(!url) {
	        url = Florence.globalVars.pagePath;
	    }
	    $('.browser-location').val(Florence.babbageBaseUrl + url);
	}

	// toggle delete button from 'delete' to 'revert' for content marked as to be deleted and remove/show other buttons in item
	function toggleDeleteRevertButton($container) {
	    $container.find('.btn-browse-delete-revert, .js-browse__buttons--primary, .js-browse__buttons--secondary').toggle();
	}

	// Toggle displaying children as deleted or not deleted
	function toggleDeleteRevertChildren($item) {
	    var $childContainer = $item.find('.js-browse__item .page__container'),
	        isDeleting = $item.children('.page__container').hasClass('deleted');

	    if (isDeleting) {
	        $childContainer.addClass('deleted');
	    } else {
	        $childContainer.removeClass('deleted');

	        // If a child item has previously been deleted but is being shown by a parent then undo the toggle buttons
	        if ($childContainer.find('.btn-browse-delete-revert').length) {
	            // toggleDeleteRevertButton($childContainer.find('.btn-browse-delete-revert'));
	            toggleDeleteRevertButton($childContainer);
	        }
	    }

	    $childContainer.find('.page__buttons').toggleClass('deleted');
	}

	function deleteTeam(name) {
	  $.ajax({
	    url: "/zebedee/teams/" + name,
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'DELETE',
	    success: function () {
	      sweetAlert('Deleted', "The team has been successfully deleted", 'success');
	      viewController('teams');
	    },
	    error: function (response) {
	      if (response.status === 403 || response.status === 401) {
	        sweetAlert("Error", "You are not permitted to delete teams", "error");
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	function deleteTeamMember(name, email) {
	  var encodedName = encodeURIComponent(name);
	  $.ajax({
	    url: "/zebedee/teams/" + encodedName + "?email=" + email,
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'DELETE',
	    success: function () {
	      console.log('Team member deleted: ' + email);
	    },
	    error: function (response) {
	      handleUserPostError(response);
	    }
	  });

	  /**
	   * Handle error response from creating the team.
	   * @param response
	   */
	  function handleUserPostError(response) {
	    if (response.status === 403 || response.status === 401) {
	      sweetAlert("You are not permitted to delete users.");
	    }
	    else if (response.status === 409) {
	      sweetAlert("Error", response.responseJSON.message, "error");
	    } else {
	      handleApiError(response);
	    }
	  }
	}
	function deleteUnpublishedVersion (collectionId, path, success, error) {
	  var url = "/zebedee/version/" + collectionId + "?uri=" + path;

	  // Update content
	  $.ajax({
	    url: url,
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'DELETE',
	    success: function (response) {
	      success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	function deleteUser(email) {
	  $.ajax({
	    url: "/zebedee/users?email=" + email,
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'DELETE',
	    success: function () {
	      console.log('User deleted');
	      sweetAlert('Deleted', "User '"  + email + "' has been deleted", 'success');
	      viewController('users');
	    },
	    error: function (response) {
	      if (response.status === 403 || response.status === 401) {
	        sweetAlert("Error", "You are not permitted to delete users", "error")
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	/**
	 * Manage files associated with datasets. When uploading a file creates a new dataset
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key
	 * @param idField - HTML id for the template (has to be 'edition')
	 */

	function addDataset(collectionId, data, field, idField) {
	    var downloadExtensions, pageType;
	    var uriUpload;
	    var lastIndex;
	    if (data[field]) {
	        lastIndex = data[field].length;
	    } else {
	        lastIndex = 0;
	    }
	    var uploadedNotSaved = {uploaded: false, saved: false, editionUri: ""};
	    $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);

	    //Add
	    if (data.timeseries) {
	        downloadExtensions = /\.csdb$|\.csv$/;
	        pageType = 'timeseries_dataset';
	    } else {
	        downloadExtensions = /\.csv$|.xls$|.zip$/;
	        pageType = 'dataset';
	    }

	    $('#add-' + idField).one('click', function () {
	        // check that a timeseries dataset has max one file
	        if (data.timeseries && (data[field] && data[field].length < 1) || !data.timeseries) {
	            var position = $(".workspace-edit").scrollTop();
	            Florence.globalVars.pagePos = position + 200;

	            $('#sortable-' + idField).append(
	                '<div id="' + lastIndex + '" class="edit-section__item">' +
	                '  <form id="UploadForm">' +
	                '    <textarea class="auto-size" placeholder="Period (E.g. 2015, August to December 2010, etc." type="text" id="edition"></textarea>' +
	                '    <textarea class="auto-size" placeholder="Label (E.g. Final, Revised, etc.)" type="text" id="version"></textarea>' +
	                '    <input type="file" title="Select a file and click Submit" name="files">' +
	                '    <div class="dataset-buttons">' +
	                '    <button type="submit" form="UploadForm" value="submit">Submit</button>' +
	                '    <button class="btn-page-cancel" id="file-cancel">Cancel</button>' +
	                //'    <button class="btn-dataset-autocsdb" id="no-file">Auto CSDB</button>' +
	                '    </div>' +
	                '  </form>' +
	                '  <div id="response"></div>' +
	                '  <ul id="list"></ul>' +
	                '</div>');
	            if (!data.timeseries) {
	                $('#no-file').remove();
	            }

	            $('#file-cancel').one('click', function (e) {
	                e.preventDefault();
	                $('#' + lastIndex).remove();
	                //Check files uploaded and delete them
	                if (uploadedNotSaved.uploaded === true) {
	                    data[field].splice(-1, 1);
	                    deleteContent(Florence.collection.id, uploadedNotSaved.editionUri,
	                        onSuccess = function () {
	                        },
	                        onError = function (error) {
	                            handleApiError(error);
	                        }
	                    );
	                }
	                addDataset(collectionId, data, 'datasets', 'edition');
	            });

	            $('#UploadForm').submit(function (e) {
	                e.preventDefault();
	                e.stopImmediatePropagation();

	                var formdata = new FormData();

	                function showUploadedItem(source) {
	                    $('#list').append(source);
	                }

	                var pageTitle = this[0].value;
	                var pageTitleTrimmed = pageTitle.replace(/[^A-Z0-9]+/ig, "").toLowerCase();

	                var versionLabel = this[1].value;

	                var file = this[2].files[0];
	                if (!file) {
	                    sweetAlert("Please select a file to upload");
	                    return;
	                }

	                document.getElementById("response").innerHTML = "Uploading . . .";

	                var fileNameNoSpace = file.name.replace(/[^a-zA-Z0-9\.]/g, "").toLowerCase();
	                if (file.name.match(/\.csv$/)) {
	                    fileNameNoSpace = 'upload-' + fileNameNoSpace;
	                }
	                uriUpload = data.uri + '/' + pageTitleTrimmed + '/' + fileNameNoSpace;
	                var safeUriUpload = checkPathSlashes(uriUpload);

	                if (data[field] && data[field].length > 0) {
	                    $(data[field]).each(function (i, filesUploaded) {
	                        if (filesUploaded.file === safeUriUpload || filesUploaded.file === fileNameNoSpace) {
	                            sweetAlert('This file already exists');
	                            $('#' + lastIndex).remove();
	                            addDataset(collectionId, data, 'datasets', 'edition');
	                            formdata = false;   // if not present the existing file was being overwritten
	                            return;
	                        }
	                    });
	                }

	                if (!!file.name.match(downloadExtensions)) {
	                    showUploadedItem(fileNameNoSpace);
	                    if (formdata) {
	                        formdata.append("name", file);
	                    }
	                } else {
	                    sweetAlert('This file type is not supported');
	                    $('#' + lastIndex).remove();
	                    addDataset(collectionId, data, 'datasets', 'edition');
	                    return;
	                }

	                if (pageTitle.length < 4 || pageTitle.toLowerCase() === 'data') {
	                    sweetAlert("This is not a valid file title");
	                    return;
	                }

	                if (formdata) {
	                    $.ajax({
	                        url: "/zebedee/content/" + collectionId + "?uri=" + safeUriUpload,
	                        type: 'POST',
	                        data: formdata,
	                        cache: false,
	                        processData: false,
	                        contentType: false,
	                        success: function () {
	                            document.getElementById("response").innerHTML = "File uploaded successfully";
	                            if (!data[field]) {
	                                data[field] = [];
	                            }
	                            data[field].push({uri: data.uri + '/' + pageTitleTrimmed});
	                            uploadedNotSaved.uploaded = true;
	                            // create the dataset
	                            loadT8EditionCreator(collectionId, data, pageType, pageTitle, fileNameNoSpace, versionLabel);
	                            // on success save parent and child data
	                        }
	                    });
	                }
	            });

	            $('#no-file').one('click', function (e) {
	                e.preventDefault();
	                e.stopImmediatePropagation();

	                if (data.timeseries) {    // not necessary but for extra security
	                    if (data.description.datasetId) {   // check for an id to link the csdb to
	                        // on success save parent and child data
	                        var pageTitle = $('#edition').val();
	                        var pageTitleTrimmed = pageTitle.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	                        var fileNameNoSpace = data.description.datasetId + '.csdb';

	                        var versionLabel = $('#version').val();
	                        if (pageTitleTrimmed.length < 4 || pageTitleTrimmed === 'data') {
	                            sweetAlert("This is not a valid file title");
	                            e.preventDefault();
	                            e.stopImmediatePropagation();
	                            $('#' + lastIndex).remove();
	                            addDataset(collectionId, data, field, idField);
	                        } else {
	                            data[field].push({uri: data.uri + '/' + pageTitleTrimmed});
	                            // create the dataset if there is not any
	                            loadT8EditionCreator(collectionId, data, pageType, pageTitle, fileNameNoSpace, versionLabel);
	                        }
	                    } else {
	                        sweetAlert("Warning!", "You need to add a dataset Id to match the CSDB.", "error");
	                        e.preventDefault();
	                        e.stopImmediatePropagation();
	                        $('#' + lastIndex).remove();
	                        addDataset(collectionId, data, field, idField);
	                    }
	                } else {
	                    sweetAlert("Oops!", "It looks like this is not a timeseries dataset.", "error");
	                }
	            });
	        } else {
	            sweetAlert("Warning!", "You can add only one file in a timeseries dataset.", "error");
	        }
	    });


	    function sortable() {
	        $('#sortable-' + idField).sortable({
	            stop: function () {
	                $('#' + idField + ' .edit-section__sortable-item--counter').each(function (index) {
	                    $(this).empty().append(index + 1);
	                });
	            }
	        });
	    }

	    sortable();
	}

	/**
	 * Manage files associated with content
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function addFile(collectionId, data, field, idField) {
	    var list = data[field];
	    var downloadExtensions, header, button;
	    if (field === 'supplementaryFiles') {
	        header = 'Supplementary files';
	        button = 'supplementary file';
	    } else if (field === 'pdfDownloads') {
	        header = 'Upload methodology PDF file';
	        button = 'pdf';
	    } else if (field === 'pdfTable') {
	        header = 'PDF Table';
	        button = 'pdf';
	    } else {
	        header = 'Upload files';
	        button = 'file';
	    }
	    var dataTemplate = {list: list, idField: idField, header: header, button: button};
	    var html = templates.editorDownloads(dataTemplate);
	    $('#' + idField).replaceWith(html);
	    var uriUpload;

	    $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);

	    //Edit
	    if (!data[field] || data[field].length === 0) {
	        var lastIndex = 0;
	    } else {
	        $(data[field]).each(function (index) {
	            // Delete
	            $('#' + idField + '-delete_' + index).click(function () {
	                fileDelete(collectionId, data, field, index);
	            });
	        });
	    }

	    //Add
	    if (data.type === 'static_adhoc') {
	        downloadExtensions = /\.csv$|.xls$|.doc$|.pdf$|.zip$/;
	    } else if (data.type === 'static_qmi') {
	        downloadExtensions = /\.pdf$/;
	    } else if (data.type === 'article_download' || (data.type === 'static_methodology_download' && field === 'pdfDownloads')) {
	        downloadExtensions = /\.pdf$/;
	    } else if (data.type === 'static_methodology_download' && field === 'downloads') {
	        downloadExtensions = /\.csv$|.xls$|.doc$|.ppt$|.zip$/;
	    } else if (data.type === 'static_methodology') {
	        downloadExtensions = /\.csv$|.xls$|.doc$|.ppt$|.pdf$|.zip$/;
	    } else if (data.type === 'static_foi') {
	        downloadExtensions = /\.csv$|.xls$|.doc$|.pdf$|.zip$/;
	    } else if (data.type === 'static_page') {
	        downloadExtensions = /\.csv$|.xls$|.doc$|.pdf$|.zip$/;
	    } else if (data.type === 'static_article') {
	        downloadExtensions = /\.xls$|.pdf$|.zip$/;
	    } else if (data.type === 'dataset' || data.type === 'timeseries_dataset') {
	        downloadExtensions = /\.csv$|.xls$|.doc$|.pdf$|.zip$/;
	    } else if (data.type === 'article' || data.type === 'bulletin'|| data.type === 'compendium_chapter') {
	        downloadExtensions = /\.pdf$/;
	    } else {
	        sweetAlert("This file type is not valid", "Contact an administrator if you need to add this type of file in this document", "info");
	    }

	    $('#add-' + idField).one('click', function () {
	        if ((data.type === 'article' || data.type === 'bulletin') && (data[field] && data[field].length > 0)) {
	            sweetAlert("You can upload only one file here");
	            return false;
	        } else {
	            if (!data[field]) {
	                data[field] = [];
	            }
	            uploadFile(collectionId, data, field, idField, lastIndex, downloadExtensions, addFile);
	        }
	    });

	    $(function () {
	        $('.add-tooltip').tooltip({
	            items: '.add-tooltip',
	            content: 'Type title here and click Save to add it to the page',
	            show: "slideDown", // show immediately
	            open: function (event, ui) {
	                ui.tooltip.hover(
	                    function () {
	                        $(this).fadeTo("slow", 0.5);
	                    });
	            }
	        });
	    });

	    function sortable() {
	        $('#sortable-' + idField).sortable({
	            stop: function () {
	                $('#' + idField + ' .edit-section__sortable-item--counter').each(function (index) {
	                    $(this).empty().append(index + 1);
	                });
	            }
	        });
	    }

	    sortable();
	}

	/**
	 * Manages file with description
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function addFileWithDetails(collectionId, data, field, idField) {
	  var list = data[field];
	  var dataTemplate = {list: list, idField: idField};
	  var html = templates.editorDownloadsWithSummary(dataTemplate);
	  $('#' + idField).replaceWith(html);
	  var uriUpload;
	  var downloadExtensions;

	  $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);

	  // Edit
	  if (!data[field] || data[field].length === 0) {
	    var lastIndex = 0;
	  } else {
	    $(data[field]).each(function (index) {
	      // Delete
	      $('#' + idField + '-delete_' + index).click(function () {
	        fileDelete(collectionId, data, field, index);
	      });

	      // Edit
	      $('#' + idField + '-edit_' + index).click(function () {
	        var editedSectionValue = {
	          "title": $('#' + idField + '-title_' + index).val(),
	          "markdown": $('#' + idField + '-summary_' + index).val()
	        };

	        var saveContent = function (updatedContent) {
	          data[field][index].fileDescription = updatedContent;
	          data[field][index].title = $('#' + idField + '-title_' + index).val();
	          updateContent(collectionId, data.uri, JSON.stringify(data));
	        };
	        loadMarkdownEditor(editedSectionValue, saveContent, data);
	      });
	    });
	  }

	  //Add
	  if (data.type === 'compendium_data') {
	    downloadExtensions = /\.csv$|.xls$|.zip$/;
	  } else {
	    sweetAlert("This file type is not valid", "Contact an administrator if you need to add this type of file in this document", "info");
	  }

	  $('#add-' + idField).one('click', function () {
	    uploadFile(collectionId, data, field, idField, lastIndex, downloadExtensions, addFileWithDetails);
	  });

	  $(function () {
	    $('.add-tooltip').tooltip({
	      items: '.add-tooltip',
	      content: 'Type title here and click Edit to add a description',
	      show: "slideDown", // show immediately
	      open: function (event, ui) {
	        ui.tooltip.hover(
	          function () {
	            $(this).fadeTo("slow", 0.5);
	          });
	      }
	    });
	  });

	  function sortable() {
	    $('#sortable-' + idField).sortable({
	      stop: function () {
	        $('#' + idField + ' .edit-section__sortable-item--counter').each(function (index) {
	          $(this).empty().append(index + 1);
	        });
	      }
	    });
	  }

	  sortable();
	}

	/**
	 * Manages alerts
	 * @param collectionId
	 * @param data
	 * @param templateData
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function editAlert(collectionId, data, templateData, field, idField) {
	  var list = templateData[field];
	  var dataTemplate = {list: list, idField: idField};
	  var html = templates.editorAlert(dataTemplate);
	  $('#' + idField).replaceWith(html);
	  initialiseAlert(collectionId, data, templateData, field, idField);
	  // New alert
	  $("#add-" + idField).click(function () {
	    if (!data[field]) {
	      data[field] = [];
	      templateData[field] = [];
	    }
	    var tmpDate = (new Date()).toISOString();
	    data[field].push({markdown: "", date: tmpDate, type: "alert"});
	    templateData[field].push({markdown: "", date: tmpDate, type: "alert"});
	    saveAlert(collectionId, data.uri, data, templateData, field, idField);
	  });
	  $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
	}

	function refreshAlert(collectionId, data, templateData, field, idField) {
	  var list = templateData[field];
	  var dataTemplate = {list: list, idField: idField};
	  var html = templates.editorAlert(dataTemplate);
	  $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
	  initialiseAlert(collectionId, data, templateData, field, idField);
	}

	function initialiseAlert(collectionId, data, templateData, field, idField) {
	  // Load
	  $(data[field]).each(function (index) {
	    dateTmp = data[field][index].date;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#date_' + index).val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data[field][index].date = new Date($('#date_' + index).datepicker('getDate')).toISOString();
	      templateData[field][index].date = new Date($('#date_' + index).datepicker('getDate')).toISOString();
	    });
	    $('#' + idField + '-edit_' + index).click(function () {
	      var editedSectionValue = {title: 'Alert notice', markdown: data[field][index].markdown};
	      //var editedSectionValue = data[field][index].markdown;
	      var saveContent = function (updatedContent) {
	        data[field][index].markdown = updatedContent;
	        templateData[field][index].markdown = updatedContent;
	        saveAlert(collectionId, data.uri, data, templateData, field, idField);
	      };
	      loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	    });

	    var correctionCheck;
	    if (data[field][index].type === 'correction') {
	      correctionCheck = 'checked';
	    } else if (data[field][index].type === 'alert') {
	      correctionCheck = 'unchecked';
	    }

	    if (data.type === 'dataset_landing_page' || data.type === 'compendium_landing_page') {
	      $('#correction-container_' + index).append('<label for="correction-alert_' + index + '">Show as correction' +
	        '<input id="correction-alert_' + index + '" type="checkbox" value="value" ' + correctionCheck + '/></label>');
	    }

	    $('#correction-alert_' + index).change(function () {
	      if ($(this).prop('checked') === true) {
	        data[field][index].type = 'correction';
	      }
	      else {
	        data[field][index].type = 'alert';
	      }
	      saveAlert(collectionId, data.uri, data, templateData, field, idField);
	    });

	    // Delete
	    $('#' + idField + '-delete_' + index).click(function () {
	      swal ({
	        title: "Warning",
	        text: "Are you sure you want to delete this alert?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Delete",
	        cancelButtonText: "Cancel",
	        closeOnConfirm: false
	      }, function(result) {
	        if (result === true) {
	          swal({
	            title: "Deleted",
	            text: "This alert has been deleted",
	            type: "success",
	            timer: 2000
	          });
	          var position = $(".workspace-edit").scrollTop();
	          Florence.globalVars.pagePos = position;
	          $(this).parent().remove();
	          data[field].splice(index, 1);
	          templateData[field].splice(index, 1);
	          saveAlert(collectionId, data.uri, data, templateData, field, idField);
	        }
	      });
	    });
	  });
	  function sortable() {
	    $('#sortable-' + idField).sortable({
	      stop: function(){
	        $('#' + idField + ' .edit-section__sortable-item--counter').each(function(index) {
	          $(this).empty().append(index + 1);
	        });
	      }
	    });
	  }

	  sortable();

	}

	function saveAlert(collectionId, path, data, templateData, field, idField) {
	  putContent(collectionId, path, JSON.stringify(data),
	    success = function () {
	      Florence.Editor.isDirty = false;
	      refreshAlert(collectionId, data, templateData, field, idField);
	      refreshPreview(data.uri);
	    },
	    error = function (response) {
	      if (response.status === 409) {
	        sweetAlert("Cannot edit this page", "It is already part of another collection.");
	      } else {
	        handleApiError(response);
	      }
	    }
	  );
	}

	/**
	 * Manages related data
	 * @param collectionId
	 * @param data
	 * @param templateData
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function editBlocks(collectionId, data, templateData, field, idField) {
	  var list = templateData[field];
	  var dataTemplate = {list: list, idField: idField};
	  var html = templates.editorT1Blocks(dataTemplate);
	  $('#' + idField).replaceWith(html);
	  resolveStatsTitle(collectionId, data, templateData, field, idField);
	  $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
	}

	function refreshBlocks(collectionId, data, templateData, field, idField) {
	  var list = templateData[field];
	  var dataTemplate = {list: list, idField: idField};
	  var html = templates.editorT1Blocks(dataTemplate);
	  $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
	  initialiseBlocks(collectionId, data, templateData, field, idField);
	}

	function initialiseBlocks(collectionId, data, templateData, field, idField) {
	  // Load
	  $(data[field]).each(function (index) {
	    // Edit
	    $('#' + idField + '-edit_' + index).click(function () {
	      var $this = data[field][index];
	      if (!$this.title) {
	        // This is data
	        var modal = templates.blockNewsModal($this);
	        var pastedUrl;
	        $('.modal').remove();
	        $('.workspace-menu').append(modal);
	        $('.modal-news').remove();

	        //Modal click events
	        $('.btn-uri-cancel').off().one('click', function () {
	          $('.modal').remove();
	        });

	        $('.btn-uri-get').off().click(function () {
	          pastedUrl = $('#uri-input').val();
	          if (pastedUrl === "") {
	            sweetAlert("This field cannot be empty. Please paste a valid url address");
	          } else {
	            var dataUrl = checkPathParsed(pastedUrl);
	            if (dataUrl === "") {    //special case for home page
	              dataUrl = "/";
	            }
	            checkValidStats(collectionId, data, templateData, field, idField, dataUrl, index);
	            $('.modal').remove();
	          }
	        });
	      } else {
	        // This is item
	        var images = data.images;
	        var dataTemplate = {block: $this, images: images};
	        var modal = templates.blockNewsModal(dataTemplate);
	        var uri, title, text, image;
	        $('.modal').remove();
	        $('.workspace-menu').append(modal);
	        //menuselect("uri-size");

	        $('#uri-input').change(function () {
	          $this.uri = $('#uri-input').val();
	        });
	        $('#uri-title').change(function () {
	          $this.title = $('#uri-title').val();
	        });
	        $("#uri-text").change(function () {
	          $(this).textareaAutoSize();
	          $this.text = $('#uri-text').val();
	        });

	        var imageIdx = _.findIndex(images, function(item) {return item.uri === $this.image;});
	        $('#uri-image').val(imageIdx.toString()).prop('selected', 'true');

	        $
	        $('#uri-image').change(function () {
	          var index = parseInt($('#uri-image').val());
	          if (index === -1) {
	            $this.image = '';
	          } else {
	            $this.image = images[index].uri;
	          }
	        });

	        //Modal click events
	        $('.btn-uri-cancel').off().click(function () {
	          $('.modal').remove();
	        });

	        $('.btn-uri-get').off().click(function () {
	          if (!($this.title || title)) {
	            sweetAlert('You need to enter a title to continue');
	            return false;
	          } else {
	            data[field][index] = {uri: $this.uri, title: $this.title, text: $this.text, image: $this.image};
	            saveBlocks(collectionId, data.uri, data, templateData, field, idField);
	            $('.modal').remove();
	          }
	        });
	      }
	    });

	    // Delete
	    $('#' + idField + '-delete_' + index).click(function () {
	      swal({
	        title: "Warning",
	        text: "Are you sure you want to delete this block?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Delete",
	        cancelButtonText: "Cancel",
	        closeOnConfirm: false
	      }, function (result) {
	        if (result === true) {
	          swal({
	            title: "Deleted",
	            text: "This " + idField + " has been deleted",
	            type: "success",
	            timer: 2000
	          });
	          var position = $(".workspace-edit").scrollTop();
	          Florence.globalVars.pagePos = position;
	          $(this).parent().remove();
	          data[field].splice(index, 1);
	          templateData[field].splice(index, 1);
	          putContent(collectionId, data.uri, JSON.stringify(data),
	            function () {
	              Florence.Editor.isDirty = false;
	              refreshPreview(data.uri);
	              refreshBlocks(collectionId, data, templateData, field, idField);
	            },
	            function (response) {
	              if (response.status === 400) {
	                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	              }
	              else {
	                handleApiError(response);
	              }
	            }
	          );
	        }
	      });
	    });
	  });

	  //Add
	  $('#add-' + idField).off().click(function () {
	    //add a modal to select an option for stats or news
	    var position = $(".workspace-edit").scrollTop();
	    Florence.globalVars.pagePos = position;
	    var modalStatsOrNews = templates.blockModal;
	    $('.workspace-menu').append(modalStatsOrNews);
	    //They choose timeseries
	    $('#data-link').click(function () {
	      if (!data[field]) {
	        data[field] = [];
	      }

	      var modal = templates.blockNewsModal;
	      var pastedUrl;
	      $('.modal').remove();
	      $('.workspace-menu').append(modal);
	      $('.modal-news').remove();

	      //Modal click events
	      $('.btn-uri-cancel').off().one('click', function () {
	        createWorkspace(data.uri, collectionId, 'edit');
	      });

	      $('.btn-uri-get').off().click(function () {
	        pastedUrl = $('#uri-input').val();
	        if (pastedUrl === "") {
	          sweetAlert("This field cannot be empty. Please paste a valid url address");
	        } else {
	          var dataUrl = checkPathParsed(pastedUrl);
	          if (dataUrl === "") {    //special case for home page
	            dataUrl = "/";
	          }
	          checkValidStats(collectionId, data, templateData, field, idField, dataUrl);
	          $('.modal').remove();
	        }
	      });
	    });

	    //They choose news
	    $('#item-link').click(function () {
	      if (!data[field]) {
	        data[field] = [];
	      }
	      var images = data.images;
	      var dataTemplate = {block: {}, images: images};
	      var modal = templates.blockNewsModal(dataTemplate);
	      var uri, title, text, image;
	      $('.modal').remove();
	      $('.workspace-menu').append(modal);

	      $('#uri-input').change(function () {
	        uri = $('#uri-input').val();
	      });
	      $('#uri-title').change(function () {
	        title = $('#uri-title').val();
	      });
	      $("#uri-text").change(function () {
	        $(this).textareaAutoSize();
	        text = $('#uri-text').val();
	      });
	      $('#uri-image').change(function () {
	        var index = parseInt($('#uri-image').val());
	        if (index === -1) {
	          $this.image = '';
	        } else {
	          $this.image = images[index].uri;
	        }
	      });

	      $('.btn-uri-get').off().click(function () {
	        if (!title) {
	          sweetAlert('You need to enter a title to continue');
	        }
	        else {
	          data[field].push({uri: uri, title: title, text: text, image: image});
	          templateData[field].push({uri: uri, title: title, text: text, image: image});
	          saveBlocks(collectionId, data.uri, data, templateData, field, idField);
	          $('.modal').remove();
	        }
	      });
	      $('.btn-uri-cancel').off().click(function () {
	        $('.modal').remove();
	      });
	    });

	    //They cancel
	    $('.btn-uri-cancel').off().click(function () {
	      $('.modal').remove();
	    });
	  });

	  // Make sections sortable
	  function sortable() {
	    $('#sortable-' + idField).sortable({
	      stop: function () {
	        $('#' + idField + ' .edit-section__sortable-item--counter').each(function (index) {
	          $(this).empty().append(index + 1);
	        });
	      }
	    });
	  }

	  sortable();
	}

	function resolveStatsTitle(collectionId, data, templateData, field, idField) {
	  var ajaxRequest = [];
	  $(templateData[field]).each(function (index, path) {
	    var dfd = $.Deferred();
	    if (!this.title) {
	      getPageDataTitle(collectionId, path.uri,
	        function (response) {
	          templateData[field][index] = response;
	          dfd.resolve();
	        },
	        function () {
	          sweetAlert("Error", field + ' address: ' + path.uri + ' is not found.', "error");
	          dfd.resolve();
	        }
	      );
	      ajaxRequest.push(dfd);
	    }
	  });

	  $.when.apply($, ajaxRequest).then(function () {
	    refreshBlocks(collectionId, data, templateData, field, idField);
	  });
	}


	function saveBlocks(collectionId, path, data, templateData, field, idField) {
	  putContent(collectionId, path, JSON.stringify(data),
	    success = function (response) {
	      Florence.Editor.isDirty = false;
	      resolveStatsTitle(collectionId, data, templateData, field, idField);
	      refreshPreview(data.uri);
	    },
	    error = function (response) {
	      if (response.status === 400) {
	        sweetAlert("Cannot edit this page", "It is already part of another collection.");
	      }
	      else {
	        handleApiError(response);
	      }
	    }
	  );
	}

	function checkValidStats(collectionId, data, templateData, field, idField, dataUrl, index) {
	  var dataUrlData = dataUrl + "/data";
	  $.ajax({
	    url: dataUrlData,
	    dataType: 'json',
	    crossDomain: true,
	    success: function (result) {
	      if (result.type === 'timeseries') {
	        if (!data[field]) {
	          data[field] = [];
	          templateData[field] = [];
	        }
	      }
	      else {
	        sweetAlert("This is not a valid document");
	        createWorkspace(data.uri, collectionId, 'edit');
	        return;
	      }

	      if (index) {
	        data[field][index] = {uri: dataUrl};
	        templateData[field][index] = {uri: dataUrl};
	      } else {
	        data[field].push({uri: dataUrl});
	        templateData[field].push({uri: dataUrl});
	      }
	      saveBlocks(collectionId, data.uri, data, templateData, field, idField);

	    },
	    error: function () {
	      console.log('No page data returned');
	    }
	  });
	}
	function editCollection(collection) {

	    collection.collectionOwner = Florence.Authentication.userType();

	    getTeams(
	        success = function (teams) {
	            var editPublishTime, toIsoDate;
	            var collDetails = $('.js-collection__content').detach();
	            var html = templates.collectionEdit({collection: collection, teams: teams.teams});
	            $('.js-collection__head').after(html);
	            $('.btn-collection-edit').off();

	            $('#collection-editor-name').on('input', function () {
	                collection.name = $('#collection-editor-name').val();
	            });

	            $("#editor-team-tag").tagit({
	                singleField: true,
	                singleFieldNode: $('#editor-team-input'),
	                singleFieldDelimiter: ("$$")
	            });

	            $(collection.teams).each(function (i, team) {
	                $('#editor-team-tag').tagit('createTag', team);
	            });

	            $('.ui-autocomplete-input').hide();

	            $('select#editor-team').change(function () {
	                $('#editor-team-tag').tagit('createTag', $("#editor-team option:selected").text());
	            });

	            $('#editor-team-input').change(function () {
	                collection.teams = $('#editor-team-input').val().split('$$');
	                //After creating the array tagit leaves an empty string if all elements are removed
	                if (teams.length === 1 && teams[0] === "") {
	                    teams = [];
	                }
	            });

	            if (!collection.publishDate) {
	                $('#collection-editor-date').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	                    toIsoDate = $('#collection-editor-date').datepicker("getDate");
	                });
	            } else {
	                dateTmp = collection.publishDate;
	                toIsoDate = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	                $('#collection-editor-date').val(toIsoDate).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	                    toIsoDate = $('#collection-editor-date').datepicker("getDate");
	                });
	            }

	            //initial value
	            if (collection.type === "manual") {
	                $('#collection-editor-date-block').hide();
	            } else {
	                $('#collection-editor-date-block').show();
	            }

	            $('input[type=radio]').click(function () {
	                if ($(this).val() === 'manualCollection') {
	                    collection.type = "manual";
	                    $('#collection-editor-date-block').hide();
	                } else if ($(this).val() === 'scheduledCollection') {
	                    collection.type = "scheduled";
	                    $('#collection-editor-date-block').show();
	                }
	            });

	            //More functionality to be added here
	            // When scheduled, do we change all the dates in the files in the collection?


	            //Save
	            $('.btn-collection-editor-save').click(function () {
	                //save date and time to collection
	                if (collection.type === 'scheduled') {
	                    editPublishTime = parseInt($('#collection-editor-hour').val()) + parseInt($('#collection-editor-min').val());
	                    collection.publishDate = new Date(parseInt(new Date(toIsoDate).getTime()) + editPublishTime).toISOString();
	                } else {
	                }
	                //check validity
	                if (collection.name === '') {
	                    sweetAlert('This is not a valid collection name', "A collection name can't be empty");
	                    return true;
	                }
	                if (collection.name.match(/\./)) {
	                    sweetAlert('This is not a valid collection name', "You can't use fullstops");
	                    return true;
	                }
	                if ((collection.type === 'scheduled') && (Date.parse(collection.publishDate) < new Date())) {
	                    sweetAlert('This is not a valid date. Date cannot be in the past');
	                    return true;
	                } else {
	                    // Update the collection
	                    $.ajax({
	                        url: "/zebedee/collection/" + collection.id,
	                        dataType: 'json',
	                        contentType: 'application/json',
	                        type: 'PUT',
	                        data: JSON.stringify(collection),
	                        success: function (updatedCollection) {
	                            Florence.setActiveCollection(updatedCollection);
	                            //createWorkspace('', updatedCollection.id, 'browse');
	                            sweetAlert("Collection amended", "", "success");
	                            viewCollections(collection.id);
	                        },
	                        error: function (response) {
	                            if (response.status === 409) {
	                                sweetAlert("Error", response.responseJSON.message, "error");
	                            }
	                            else {
	                                handleApiError(response);
	                            }
	                        }
	                    });
	                }
	            });

	            //Cancel
	            $('.btn-collection-editor-cancel').click(function () {
	                $('.btn-collection-edit').click(function () {
	                    editCollection(collection);
	                });
	                $('.js-collection__edit-modal').remove();
	                $('.js-collection__head').after(collDetails);
	            });

	            setCollectionEditorHeight();
	        },
	        error = function (jqxhr) {
	            handleApiError(jqxhr);
	        }
	    );
	}

	function setCollectionEditorHeight() {
	    var $contentModal = $('.js-collection__edit-modal'),
	        panelHeight = parseInt($('.panel--off-canvas').height()),
	        headHeight = parseInt($('.slider__head').outerHeight()),
	        contentMargin = (parseInt($contentModal.css('margin-top'))) + (parseInt($contentModal.css('margin-bottom')));

	    var contentHeight = panelHeight - headHeight - contentMargin;
	    $contentModal.css('height', contentHeight);
	}

	/**
	 * Manage files associated with datasets. When uploading a file creates a new dataset
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key ('versions')
	 * @param idField - HTML id for the template ('version' or 'correction')
	 */

	function editDatasetVersion(collectionId, data, field, idField) {
	    var downloadExtensions, uriUpload, file;
	    var lastIndex;
	    if (data[field]) {
	        lastIndex = data[field].length;
	    } else {
	        lastIndex = 0;
	        data[field] = [];
	    }
	    var uploadedNotSaved = {uploaded: false, saved: false, fileUrl: "", oldLabel: data.description.versionLabel};
	    $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
	    //Add
	    if (data.type === 'timeseries_dataset') {
	        downloadExtensions = /\.csdb$|\.csv$/;
	    } else if (data.type === 'dataset') {
	        downloadExtensions = /\.csv$|.xls$|.zip$/;
	    }

	    var ajaxRequest = [];
	    var templateData = $.extend(true, {}, data);
	    $(templateData[field]).each(function (index, version) {
	        var dfd = $.Deferred();
	        if (version.correctionNotice) {
	            templateData[field][index].type = true;
	        } else {
	            templateData[field][index].type = false;
	        }
	        templateData[field][index].label = version.label;
	        dfd.resolve();
	        ajaxRequest.push(dfd);
	    });

	    $.when.apply($, ajaxRequest).then(function () {
	        var html = templates.editorCorrection({idField: idField});
	        $('#' + idField).replaceWith(html);
	        initialiseDatasetVersion(collectionId, data, templateData, field, idField);
	    });

	    $("#add-" + idField).one('click', function () {
	        addTheVersion();
	    });

	    function addTheVersion() {
	        var position = $(".workspace-edit").scrollTop();
	        Florence.globalVars.pagePos = position + 200;

	        // todo: Move this HTML into a handlebars template.
	        $('#' + idField + '-section').append(
	            '<div id="' + lastIndex + '" class="edit-section__item">' +
	            '  <form id="UploadForm">' +
	            '    <textarea class="auto-size" type="text" placeholder="Add a label here (E.g. Revised, Final, etc" id="label"></textarea>' +
	            '    <input type="file" title="Select a file and click Submit" name="files">' +
	            '    <div class="dataset-buttons">' +
	            '    <button class="btn btn--primary" type="submit" form="UploadForm" value="submit">Submit</button>' +
	            '    <button class="btn btn-page-cancel" id="file-cancel">Cancel</button>' +
	            //'    <button class="btn-dataset-autocsdb" id="no-file">Auto CSDB</button>' +
	            '    </div>' +
	            '  </form>' +
	            '  <div id="response"></div>' +
	            '  <ul id="list"></ul>' +
	            '</div>');

	        if (data.type === 'dataset') {
	            $('#no-file').remove();
	        }

	        // The label field is not used for corrections, just use existing version label.
	        if (idField === "correction") {
	            var $versionLabel = $('#UploadForm #label');
	            $versionLabel.text(uploadedNotSaved.oldLabel);
	            $versionLabel.hide();
	        }

	        $('#file-cancel').one('click', function (e) {
	            e.preventDefault();
	            $('#' + lastIndex).remove();
	            if (uploadedNotSaved.uploaded === true && uploadedNotSaved.saved === false) {
	                data.description.versionLabel = uploadedNotSaved.oldLabel;
	                deleteContent(collectionId, uploadedNotSaved.fileUrl,
	                    onSuccess = function () {
	                    },
	                    onError = function (error) {
	                        handleApiError(error);
	                    }
	                );
	            }
	            initialiseDatasetVersion(collectionId, data, templateData, field, idField);
	        });

	        $('#UploadForm').submit(function (e) {
	            e.preventDefault();
	            e.stopImmediatePropagation();

	            var formdata = new FormData();

	            function showUploadedItem(source) {
	                $('#list').append(source);
	            }

	            var versionLabel = this[0].value;
	            file = this[1].files[0];

	            // Check that a file has been uploaded
	            if (!file) {
	                sweetAlert('Please select a file to upload');
	                return;
	            }

	            if (data.type == "timeseries_dataset") {
	                // Validate that the file name matches the datasetId (which is stored in the parent dataset_landing page
	                var parentUrl = getParentPage(data.uri);

	                fetch(parentUrl + '/data', {credentials: 'include'}).then(function(response) {
	                    return response.json();
	                }).then(function(parentData) {
	                    var datasetId = (parentData.description.datasetId).toUpperCase(),
	                        downloadTitle = ((file.name).split('.').shift()).toUpperCase();
	                    if (!datasetId) {
	                        // Throw error if the parent page has no dataset ID
	                        sweetAlert({
	                            title: "Dataset missing an ID",
	                            text: "Please go to the parent page and give the dataset an ID",
	                            type: "warning"
	                        });
	                    } else if (datasetId !== downloadTitle) {
	                        // Throw error to user if file name and dataset ID don't match
	                        sweetAlert({
	                            text: "CSDB filename must match the dataset's ID",
	                            type: "warning"
	                        });
	                    } else {
	                        saveSubmittedFile();
	                    }
	                }).catch(function(error) {
	                    console.log("Error getting timeseries dataset parent data... ", error);
	                });
	            } else {
	                // Not a timeseries_dataset, so continue with saving file as normal
	                saveSubmittedFile();
	            }

	            function saveSubmittedFile() {
	                var responseElem = document.getElementById("response");
	                responseElem.innerHTML = "Uploading . . .";

	                var fileNameNoSpace = file.name.replace(/[^a-zA-Z0-9\.]/g, "").toLowerCase();
	                if (file.name.match(/\.csv$/)) {
	                    fileNameNoSpace = 'upload-' + fileNameNoSpace;
	                }
	                uriUpload = data.uri + '/' + fileNameNoSpace;
	                var safeUriUpload = checkPathSlashes(uriUpload);

	                if (!!file.name.match(downloadExtensions)) {
	                    showUploadedItem(fileNameNoSpace);
	                    if (formdata) {
	                        formdata.append("name", file);
	                    }
	                    $('#list').empty();
	                } else {
	                    sweetAlert({
	                        text: 'This file type is not supported',
	                        type: "warning"
	                    });
	                    responseElem.innerHTML = "";
	                    $('#' + lastIndex).remove();
	                    editDatasetVersion(collectionId, data, field, idField);
	                    return;
	                }

	                if (formdata) {
	                    $.ajax({
	                        url: "/zebedee/content/" + collectionId + "?uri=" + safeUriUpload,
	                        type: 'POST',
	                        data: formdata,
	                        cache: false,
	                        processData: false,
	                        contentType: false,
	                        success: function () {
	                            uploadedNotSaved.uploaded = true;
	                            uploadedNotSaved.fileUrl = safeUriUpload;
	                            // create the new version/correction
	                            saveNewCorrection(collectionId, data.uri,
	                                function (response) {
	                                    responseElem.innerHTML = "File uploaded successfully";
	                                    var tmpDate = Florence.collection.publishDate ? Florence.collection.publishDate : (new Date()).toISOString();
	                                    if (idField === "correction") {
	                                        data[field].push({
	                                            correctionNotice: " ",
	                                            updateDate: tmpDate,
	                                            uri: response,
	                                            label: versionLabel
	                                        });
	                                        // Enter a notice
	                                        var editedSectionValue = {title: 'Correction notice', markdown: ''};
	                                        var saveContent = function (updatedContent) {
	                                            data[field][data[field].length - 1].correctionNotice = updatedContent;
	                                            data.downloads = [{file: fileNameNoSpace}];
	                                            uploadedNotSaved.saved = true;
	                                            $("#" + idField).find('.edit-section__content').prepend('<div id="sortable-' + idField + '" class="edit-section__sortable">');
	                                            $("#" + idField + '-section').remove();
	                                            saveDatasetVersion(collectionId, data.uri, data, field, idField);
	                                        };
	                                        loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	                                    } else {
	                                        data[field].push({
	                                            correctionNotice: "",
	                                            updateDate: tmpDate,
	                                            uri: response,
	                                            label: versionLabel
	                                        });
	                                        data.description.versionLabel = versionLabel; // only update the version label for versions not corrections.
	                                        data.downloads = [{file: fileNameNoSpace}];
	                                        uploadedNotSaved.saved = true;
	                                        $("#" + idField).find('.edit-section__content').prepend('<div id="sortable-' + idField + '" class="edit-section__sortable">');
	                                        $("#" + idField + '-section').remove();
	                                        saveDatasetVersion(collectionId, data.uri, data, field, idField);
	                                    }
	                                }, function (response) {
	                                    if (response.status === 409) {
	                                        sweetAlert("You can add only one " + idField + " before publishing.");
	                                        responseElem.innerHTML = "";
	                                        deleteContent(collectionId, uploadedNotSaved.fileUrl);
	                                    }
	                                    else if (response.status === 404) {
	                                        sweetAlert("You can only add " + idField + "s to content that has been published.");
	                                        responseElem.innerHTML = "";
	                                        deleteContent(collectionId, uploadedNotSaved.fileUrl);
	                                    }
	                                    else {
	                                        responseElem.innerHTML = "";
	                                        handleApiError(response);
	                                    }
	                                }
	                            );
	                        },
	                        error: function (response) {
	                            console.log("Error in uploading this file");
	                            handleApiError(response);
	                        }
	                    });
	                }
	            }
	        });

	        $('#no-file').one('click', function (e) {
	            e.preventDefault();
	            // extra security check
	            if (data.type === 'timeseries_dataset') {
	                var versionLabel = $('#UploadForm #label').val();
	                uploadedNotSaved.uploaded = false;

	                // create the new version/correction
	                saveNewCorrection(collectionId, data.uri,
	                    function (response) {
	                        var tmpDate = Florence.collection.publishDate ? Florence.collection.publishDate : (new Date()).toISOString();
	                        if (idField === "correction") {
	                            data[field].push({
	                                correctionNotice: " ",
	                                updateDate: tmpDate,
	                                uri: response,
	                                label: versionLabel
	                            });
	                            // Enter a notice
	                            var editedSectionValue = {title: 'Correction notice', markdown: ''};
	                            var saveContent = function (updatedContent) {
	                                data[field][data[field].length - 1].correctionNotice = updatedContent;
	                                //data.downloads = [{file: fileNameNoSpace}];    // not necessary as zebedee will have a CSDB file
	                                uploadedNotSaved.saved = true;
	                                $("#" + idField).find('.edit-section__content').prepend('<div id="sortable-' + idField + '" class="edit-section__sortable">');
	                                $("#" + idField + '-section').remove();
	                                saveDatasetVersion(collectionId, data.uri, data, field, idField);
	                            };
	                            loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	                        } else {
	                            data[field].push({
	                                correctionNotice: "",
	                                updateDate: tmpDate,
	                                uri: response,
	                                label: versionLabel
	                            });
	                            data.description.versionLabel = versionLabel; // only update the version label for versions not corrections.
	                            //data.downloads = [{file: fileNameNoSpace}];    // not necessary as zebedee will have a CSDB file
	                            uploadedNotSaved.saved = true;
	                            $("#" + idField).find('.edit-section__content').prepend('<div id="sortable-' + idField + '" class="edit-section__sortable">');
	                            $("#" + idField + '-section').remove();
	                            saveDatasetVersion(collectionId, data.uri, data, field, idField);
	                        }
	                    }, function (response) {
	                        if (response.status === 409) {
	                            sweetAlert("You can add only one " + idField + " before publishing.");
	                            deleteContent(collectionId, uploadedNotSaved.fileUrl);
	                        }
	                        else if (response.status === 404) {
	                            sweetAlert("You can only add " + idField + "s to content that has been published.");
	                            deleteContent(collectionId, uploadedNotSaved.fileUrl);
	                        }
	                        else {
	                            handleApiError(response);
	                        }
	                    }
	                );
	            } else {
	                sweetAlert("Oops!", "It looks like this is not a timeseries dataset.", "error");
	            }
	        });
	    }
	}

	function refreshDatasetVersion(collectionId, data, field, idField) {
	    var ajaxRequest = [];
	    var templateData = $.extend(true, {}, data);
	    $(templateData[field]).each(function (index, version) {
	        var dfd = $.Deferred();
	        if (version.correctionNotice) {
	            templateData[field][index].type = true;
	        } else {
	            templateData[field][index].type = false;
	        }
	        templateData[field][index].label = version.label;
	        dfd.resolve();
	        ajaxRequest.push(dfd);
	    });

	    $.when.apply($, ajaxRequest).then(function () {
	        initialiseDatasetVersion(collectionId, data, templateData, field, idField);
	    });

	}

	function initialiseDatasetVersion(collectionId, data, templateData, field, idField) {
	    // Load
	    var list = templateData[field];
	    var correction;
	    if (idField === 'correction') {
	        correction = true;
	    } else {
	        correction = false;
	    }
	    var dataTemplate = {list: list, idField: idField, correction: correction};
	    var html = templates.workEditT8VersionList(dataTemplate);
	    $('#sortable-' + idField).replaceWith(html);

	    $(data[field]).each(function (index) {
	        //dateTmp = data[field][index].updateDate;
	        //var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	        //$('#' + idField + '-date_' + index).val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	        //  data[field][index].updateDate = new Date($('#' + idField + '-date_' + index).datepicker('getDate')).toISOString();
	        //  saveDatasetVersion(collectionId, data.uri, data, field, idField);
	        //});

	        dateTmp = data[field][index].updateDate;

	        var monthName = new Array();
	        monthName[0] = "January";
	        monthName[1] = "February";
	        monthName[2] = "March";
	        monthName[3] = "April";
	        monthName[4] = "May";
	        monthName[5] = "June";
	        monthName[6] = "July";
	        monthName[7] = "August";
	        monthName[8] = "September";
	        monthName[9] = "October";
	        monthName[10] = "November";
	        monthName[11] = "December";
	        //var n = monthName[theDateTime.getMonth()];

	        theDateTime = new Date(dateTmp);
	        theYear = theDateTime.getFullYear();
	        theMonth = monthName[theDateTime.getMonth()];
	        theDay = addLeadingZero(theDateTime.getDate());
	        theHours = addLeadingZero(theDateTime.getHours());
	        theMinutes = addLeadingZero(theDateTime.getMinutes());
	        //console.log(theHours +':'+ theMinutes);

	        var dateTimeInputString = theDay + ' ' + theMonth + ' ' + theYear + ' ' + theHours + ':' + theMinutes;

	        function addLeadingZero(number) {
	            var number = '0' + number;
	            number = number.slice(-2);
	            return number;
	        }

	        $('#' + idField + '-date_' + index).val(dateTimeInputString).datetimepicker({
	            dateFormat: 'dd MM yy',
	            controlType: 'select',
	            oneLine: true,
	            timeFormat: 'HH:mm',
	            onClose: function () {
	                function isDonePressed() {
	                    return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
	                }

	                if (isDonePressed()) {
	                    data[field][index].updateDate = new Date($('#' + idField + '-date_' + index).datetimepicker('getDate')).toISOString();
	                    console.log("Run save " + index);
	                    saveDatasetVersion(collectionId, data.uri, data, field, idField);
	                }
	            }
	        });

	        if (idField === 'correction') {
	            $('#' + idField + '-edit_' + index).click(function () {
	                var markdown = data[field][index].correctionNotice;
	                var editedSectionValue = {title: 'Correction notice', markdown: markdown};
	                var saveContent = function (updatedContent) {
	                    data[field][index].correctionNotice = updatedContent;
	                    saveDatasetVersion(collectionId, data.uri, data, field, idField);
	                };
	                loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	            });
	        }
	        $('#' + idField + '-edit-label_' + index).click(function () {
	            var markdown = data[field][index].label ? data[field][index].label : "";
	            var editedSectionValue = {title: 'Label content', markdown: markdown};
	            var saveContent = function (updatedContent) {
	                data[field][index].label = updatedContent;
	                if (index === data[field].length - 1) {
	                    data.description.versionLabel = updatedContent;
	                }
	                saveDatasetVersion(collectionId, data.uri, data, field, idField);
	            };
	            loadMarkdownEditor(editedSectionValue, saveContent, data);
	        });
	        // Delete
	        $('#' + idField + '-delete_' + index).click(function () {
	            swal({
	                title: "Warning",
	                text: "This will revert all changes you have made in this file. Are you sure you want to delete this " + idField + "?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Delete",
	                cancelButtonText: "Cancel",
	                closeOnConfirm: false
	            }, function (result) {
	                if (result === true) {
	                    swal({
	                        title: "Deleted",
	                        text: "This " + idField + " version has been deleted",
	                        type: "success",
	                        timer: 2000
	                    });
	                    var pathToDelete = data.uri;
	                    var fileToDelete = pathToDelete + '/' + data.downloads[0].file;  //Saves always the latest
	                    var uriToDelete = $('#' + idField + '-edition_' + index).attr(idField + '-url');
	                    deleteUnpublishedVersion(collectionId, uriToDelete, function () {
	                        var position = $(".workspace-edit").scrollTop();
	                        Florence.globalVars.pagePos = position;
	                        $('#' + idField + '-delete_' + index).parent().remove();
	                        // delete uploaded file
	                        deleteContent(collectionId, fileToDelete, function () {
	                            console.log("File deleted");
	                        }, function (error) {
	                            if (error.status === 404) {
	                                sweetAlert("There was no CSDB file to delete or this " + idField + " has been already published.");
	                            }
	                            else {
	                                handleApiError(error);
	                            }
	                        });
	                        // delete modified data.json and revert to published
	                        deleteContent(collectionId, pathToDelete, function () {
	                            loadPageDataIntoEditor(pathToDelete, collectionId);
	                            refreshPreview(pathToDelete);
	                        }, function (error) {
	                            handleApiError(error);
	                        });
	                    }, function (response) {
	                        if (response.status === 404) {
	                            sweetAlert("You cannot delete a " + idField + " that has been published.");
	                        }
	                        else {
	                            handleApiError(response);
	                        }
	                    });
	                }
	            });
	        });
	    });

	}

	function saveDatasetVersion(collectionId, path, data, field, idField) {

	    putContent(collectionId, path, JSON.stringify(data),
	        function () {
	            Florence.Editor.isDirty = false;
	            refreshDatasetVersion(collectionId, data, field, idField);
	            refreshPreview(path);
	        },
	        function (response) {
	            if (response.status === 400) {
	                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	            }
	            else {
	                handleApiError(response);
	            }
	        }
	    );
	}

	/**
	 * Manages dates for release calendar
	 * @param collectionId
	 * @param data
	 * @param templateData
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function editDate(collectionId, data, templateData, field, idField) {
	  var list = templateData[field];
	  var dataTemplate = {list: list, idField: idField};
	  runDatePicker(dataTemplate);
	  var html = templates.editorDate(dataTemplate);
	  $('#' + idField).replaceWith(html);
	  initialiseNoteMarkdown(collectionId, data, templateData, field, idField);
	}

	function runDatePicker(dataTemplate) {
	  if(dataTemplate && dataTemplate.list) {
	    var countSections = dataTemplate.list.length;
	    var i = 0;
	    while (i < countSections) {
	      var tmpDate = dataTemplate.list[i].previousDate;
	      dataTemplate.list[i].previousDate = $.datepicker.formatDate('dd MM yy', new Date(tmpDate));
	      i++;
	    }
	  }
	}

	function refreshNoteMarkdown(collectionId, data, templateData, field, idField) {
	  var list = templateData[field];
	  var dataTemplate = {list: list, idField: idField};
	  runDatePicker(dataTemplate);
	  var html = templates.editorDate(dataTemplate);
	  $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
	  initialiseNoteMarkdown(collectionId, data, templateData, field, idField)
	}

	function initialiseNoteMarkdown(collectionId, data, templateData, field, idField) {
	  // Load
	  $(data[field]).each(function (index) {
	    $('#' + idField + '-note_' + index).click(function () {
	      var markdown = $('#' + idField + '-markdown_' + index).val();
	      var editedSectionValue = {title: 'Note', markdown: markdown};
	      var saveContent = function (updatedContent) {
	        data[field][index].changeNotice = updatedContent;
	        templateData[field][index].changeNotice = updatedContent;
	        saveNoteMarkdown(collectionId, data.uri, data, templateData, field, idField);
	      };
	      loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	    });
	  });
	}

	function saveNoteMarkdown(collectionId, path, data, templateData, field, idField) {
	  putContent(collectionId, path, JSON.stringify(data),
	    success = function () {
	      Florence.Editor.isDirty = false;
	      refreshNoteMarkdown(collectionId, data, templateData, field, idField);
	      refreshPreview(data.uri);
	    },
	    error = function (response) {
	      if (response.status === 400) {
	        sweetAlert("Cannot edit this page", "It is already part of another collection.");
	      }
	      else {
	        handleApiError(response);
	      }
	    }
	  );
	}

	/**
	 * Manage correction of documents with files attached (compendium_data, article_download)
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key ('versions')
	 * @param idField - HTML id for the template ('correction')
	 */

	function editDocWithFilesCorrection(collectionId, data, field, idField) {
	  var downloadExtensions, file;
	  if (!data[field]) {
	    data[field] = [];
	  }
	  var oldFile = $.extend(true, {}, data);
	  var uploadedNotSaved = {uploaded: false, saved: false, files: oldFile.downloads};
	  $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
	  //Add file types
	  if (data.type === 'compendium_data'){
	    downloadExtensions = /\.csv$|.xls$|.zip$/;
	  }
	  else if (data.type === 'article_download'){
	    downloadExtensions = /\.pdf$/;
	  }

	  refreshDocWithFilesCorrection(collectionId, data, field, idField);


	  $("#add-" + idField).one('click', function () {

	    $("#add-" + idField).parent().append('<button class="btn-page-delete"' +
	      ' id="cancel-correction">Cancel</button>');
	    //Display the list of uploaded files in the ref table
	    var list = data.downloads;
	    var html = templates.editorDocWithFiles(list);
	    $('#sortable-correction').append(html);

	    //Update the files to be corrected
	    $(data.downloads).each(function (index) {
	      $('#correction-upload_' + index).click(function () {
	        fileCorrection(index);
	      }).children().click(function (e) {
	        e.stopPropagation();
	      });
	    });

	    //Cancel the correction
	    $('#cancel-correction').click(function () {
	      //Check the files uploaded
	      var filesToDelete = checkFilesUploaded (uploadedNotSaved.files, data.downloads);
	      if (filesToDelete) {
	        _.each(filesToDelete, function (file) {
	          var fileToDelete = data.uri + file;
	          deleteContent(collectionId, fileToDelete);
	        });
	      }
	      loadPageDataIntoEditor(data.uri, collectionId);
	      refreshPreview(data.uri);
	    });

	    //Save the correction
	    $("#add-" + idField).html("Save correction").on().click(function () {
	      saveNewCorrection(collectionId, data.uri,
	        function (response) {
	          var tmpDate = (new Date()).toISOString();           // it could use releaseDate
	          data[field].push({
	            correctionNotice: "",
	            updateDate: tmpDate,
	            uri: response
	          });
	          uploadedNotSaved.saved = true;
	          $("#add-" + idField).parents('.edit-section__content').remove('#sortable-' + idField)
	            .find('.text-center').prepend('<div id="sortable-' + idField + '" class="edit-section__sortable">');  //check .after()
	          // Enter a notice
	          var editedSectionValue = {title: 'Enter correction notice', markdown: ''};
	          var saveContent = function (updatedContent) {
	            data[field][data[field].length - 1].correctionNotice = updatedContent;
	            saveDocWithFilesCorrection(collectionId, data.uri, data, field, idField);
	          };
	          loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	          //saveDocWithFilesCorrection(collectionId, data.uri, data, field, idField);
	        }, function (response) {
	          if (response.status === 409) {
	            //Revert to condition before error
	            var filesToDelete = checkFilesUploaded(uploadedNotSaved.files, data.downloads);
	            if (filesToDelete) {
	              _.each(filesToDelete, function (download) {
	                var fileToDelete = data.uri + '/' + download;
	                deleteContent(collectionId, fileToDelete);
	              });
	            }
	            sweetAlert("You can add only one " + idField + " before publishing.");
	            refreshDocWithFilesCorrection(collectionId, data, field, idField);
	          }
	          else if (response.status === 404) {
	            //Revert to condition before error
	            var filesToDelete = checkFilesUploaded(uploadedNotSaved.files, data.downloads);
	            if (filesToDelete) {
	              _.each(filesToDelete, function (download) {
	                var fileToDelete = data.uri + '/' + download;
	                deleteContent(collectionId, fileToDelete);
	              });
	            }
	            data.downloads = uploadedNotSaved.files;
	            sweetAlert("You can only add " + idField + "s to content that has been published.");
	            refreshDocWithFilesCorrection(collectionId, data, field, idField);
	          }
	          else {
	            //Revert to condition before error
	            var filesToDelete = checkFilesUploaded(uploadedNotSaved.files, data.downloads);
	            if (filesToDelete) {
	              _.each(filesToDelete, function (download) {
	                var fileToDelete = data.uri + '/' + download;
	                deleteContent(collectionId, fileToDelete);
	              });
	            }
	            handleApiError(response);
	            refreshDocWithFilesCorrection(collectionId, data, field, idField);
	          }
	        }
	      );
	    });
	  });

	  function fileCorrection(index) {
	    var position = $(".workspace-edit").scrollTop();
	    Florence.globalVars.pagePos = position + 200;
	    var html = templates.uploadFileForm(index);
	    $('#correction-filename_show_' + index).append(html);

	    $('#file-cancel').one('click', function (e) {
	      e.preventDefault();
	      $('#' + index).remove();
	      if (uploadedNotSaved.uploaded === true && uploadedNotSaved.saved === false) {
	        data.downloads[index].file = uploadedNotSaved.files[index].file;
	        var fileToDelete = data.uri + '/' + uploadedNotSaved.files[index].file;
	        deleteContent(collectionId, fileToDelete);
	      }
	      refreshDocWithFilesCorrection(collectionId, data, field, idField);
	    });

	    $('#UploadForm').submit(function (e) {
	      e.preventDefault();
	      e.stopImmediatePropagation();

	      var formdata = new FormData();

	      function showUploadedItem(source) {
	        $('#list').append(source);
	      }

	      file = this[0].files[0];
	      if (!file) {
	        alert('Please select a file to upload.');
	        return;
	      }

	      document.getElementById("response").innerHTML = "Uploading . . .";

	      var fileNameNoSpace = file.name.replace(/[^a-zA-Z0-9\.]/g, "").toLowerCase();

	      if (!!file.name.match(downloadExtensions)) {
	        showUploadedItem(fileNameNoSpace);
	        if (formdata) {
	          formdata.append("name", file);
	        }
	      } else {
	        alert('This file type is not supported');
	        $('#' + index).remove();
	        editDocWithFilesCorrection(collectionId, data, field, idField);
	        return;
	      }

	      if (formdata) {
	        $.ajax({
	          url: "/zebedee/content/" + collectionId + "?uri=" + data.uri + '/' + fileNameNoSpace,
	          type: 'POST',
	          data: formdata,
	          cache: false,
	          processData: false,
	          contentType: false,
	          success: function () {
	            document.getElementById("response").innerHTML = "File uploaded successfully";
	            uploadedNotSaved.uploaded = true;
	            $('#' + index).remove();
	            $('#correction-filename_show_' + index).replaceWith('<p id="correction-filename_show_' + index + '">' + fileNameNoSpace + '</p>');
	            data.downloads[index].file = fileNameNoSpace;
	          },
	          error: function (response) {
	            handleApiError(response);
	          }
	        });
	      }
	    });
	  }
	}

	function refreshDocWithFilesCorrection(collectionId, data, field, idField) {
	  var list = data[field];
	  var dataTemplate = {list: list, idField: idField};
	  var html = templates.editorCorrection(dataTemplate);
	  $('#' + idField).replaceWith(html);
	  initialiseDocWithFilesCorrection(collectionId, data, field, idField)
	}

	function initialiseDocWithFilesCorrection(collectionId, data, field, idField) {
	  // Load
	  $(data[field]).each(function (index) {
	    dateTmp = data[field][index].updateDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#' + idField + '-date_' + index).val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data[field][index].updateDate = new Date($('#' + idField + '-date_' + index).datepicker('getDate')).toISOString();
	      saveDocWithFilesCorrection(collectionId, data.uri, data, field, idField);
	    });
	    if (idField === 'correction') {
	      $('#' + idField + '-edit_' + index).click(function () {
	        var markdown = $('#' + idField + '-markdown_' + index).val();
	        var editedSectionValue = {title: 'Correction notice', markdown: markdown};
	        var saveContent = function (updatedContent) {
	          data[field][index].correctionNotice = updatedContent;
	          saveDocWithFilesCorrection(collectionId, data.uri, data, field, idField);
	        };
	        loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	      });
	    }

	    // Delete
	    $('#' + idField + '-delete_' + index).click(function () {
	      var result = confirm("This will revert all changes you have made in this file. Are you sure you want to delete" +
	        " this " + idField + "?");
	      if (result === true) {
	        var pathToDelete = data.uri;
	        var filesToDelete = data.downloads;  //Delete all files in directory
	        var uriToDelete = $(this).parent().parent().children('#' + idField + '-edition_' + index).attr(idField + '-url');
	        deleteUnpublishedVersion(collectionId, uriToDelete, function () {
	          var position = $(".workspace-edit").scrollTop();
	          Florence.globalVars.pagePos = position;
	          $(this).parent().remove();
	          //delete uploaded files in this directory
	          _.each(filesToDelete, function (download) {
	            fileToDelete = data.uri + '/' + download.file;
	            deleteContent(collectionId, fileToDelete);
	          });
	          // delete modified data.json and revert to pubished
	          deleteContent(collectionId, pathToDelete, function () {
	            loadPageDataIntoEditor(pathToDelete, collectionId);
	            refreshPreview(pathToDelete);
	          }, function (error) {
	            handleApiError(error);
	          });
	        }, function (response) {
	          if (response.status === 404) {
	            sweetAlert("You cannot delete a " + idField + " that has been published.");

	          }
	          else {
	            handleApiError(response);
	          }
	        });
	      }
	    });
	  });
	}

	function saveDocWithFilesCorrection(collectionId, path, data, field, idField) {
	  putContent(collectionId, path, JSON.stringify(data),
	    function () {
	      Florence.Editor.isDirty = false;
	      refreshDocWithFilesCorrection(collectionId, data, field, idField);
	      refreshPreview(path);
	    },
	    function (response) {
	      if (response.status === 400) {
	        alert("Cannot edit this page. It is already part of another collection.");
	      }
	      else {
	        handleApiError(response);
	      }
	    }
	  );
	}

	function checkFilesUploaded (oldFiles, newFiles) {
	  var diff = [];
	  _.each(oldFiles, function (oldFile, i) {
	    if (oldFile.file !== newFiles[i].file) {
	      diff.push(newFiles[i].file);
	    }
	  });
	  return diff;
	}

	/**
	 * Manages corrections (versions)
	 * @param collectionId
	 * @param data
	 * @param templateData
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function editDocumentCorrection(collectionId, data, templateData, field, idField) {
	  var list = templateData[field];
	  var dataTemplate = {list: list, idField: idField};
	  var html = templates.editorCorrection(dataTemplate);
	  $('#' + idField).replaceWith(html);
	  initialiseCorrection(collectionId, data, templateData, field, idField);
	  // New correction
	  $("#add-" + idField).one('click', function () {
	    if (!data[field]) {
	      data[field] = [];
	      templateData[field] = [];
	    }
	    saveNewCorrection(collectionId, data.uri, function (response) {
	      var tmpDate = Florence.collection.publishDate ? Florence.collection.publishDate : (new Date()).toISOString();
	      data[field].push({correctionNotice: "", updateDate: tmpDate, uri: response});
	      templateData[field].push({correctionNotice: "", updateDate: tmpDate, uri: response});
	      // Enter a notice
	      var editedSectionValue = {title: 'Correction notice', markdown: data[field].correctionNotice};
	      var saveContent = function (updatedContent) {
	        data[field][data[field].length - 1].correctionNotice = updatedContent;
	        saveCorrection(collectionId, data.uri, data, templateData, field, idField);
	      };
	      loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	      $("#add-" + idField).remove();
	    }, function (response) {
	      if (response.status === 409) {
	        sweetAlert("You can add only one correction before publishing.");
	      }
	      else {
	        handleApiError(response);
	      }
	    });
	  });
	  $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
	}

	function refreshCorrection(collectionId, data, templateData, field, idField) {
	  var list = templateData[field];
	  var dataTemplate = {list: list, idField: idField};
	  var html = templates.editorCorrection(dataTemplate);
	  $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
	  initialiseCorrection(collectionId, data, templateData, field, idField);
	}

	function initialiseCorrection(collectionId, data, templateData, field, idField) {
	  // Load
	  $(data[field]).each(function (index) {
	    dateTmp = data[field][index].updateDate;
	    // ORIGINAL TIME PICKER CODE
	    // var dateTmpCorr = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    // $('#correction-date_' + index).val(dateTmpCorr).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	    //  data[field][index].updateDate = new Date($('#correction-date_' + index).datepicker('getDate')).toISOString();
	    //  templateData[field][index].updateDate = new Date($('#correction-date_' + index).datepicker('getDate')).toISOString();
	    //  saveCorrection(collectionId, data.uri, data, templateData, field, idField);
	    // });


	    var monthName = new Array();
	    monthName[0] = "January";
	    monthName[1] = "February";
	    monthName[2] = "March";
	    monthName[3] = "April";
	    monthName[4] = "May";
	    monthName[5] = "June";
	    monthName[6] = "July";
	    monthName[7] = "August";
	    monthName[8] = "September";
	    monthName[9] = "October";
	    monthName[10] = "November";
	    monthName[11] = "December";
	    //var n = monthName[theDateTime.getMonth()];

	    theDateTime = new Date(dateTmp);
	    theYear = theDateTime.getFullYear();
	    theMonth = monthName[theDateTime.getMonth()];
	    theDay = addLeadingZero(theDateTime.getDate());
	    theHours = addLeadingZero(theDateTime.getHours());
	    theMinutes = addLeadingZero(theDateTime.getMinutes());
	    //console.log(theHours +':'+ theMinutes);

	    var dateTimeInputString = theDay + ' ' + theMonth + ' ' + theYear + ' ' + theHours +':' + theMinutes;

	    function addLeadingZero(number){
	      var number = '0' + number;
	      number = number.slice(-2);
	      return number;
	    }

	    $('#correction-date_' + index).val(dateTimeInputString).datetimepicker({
	        dateFormat: 'dd MM yy',
	        controlType: 'select',
	        oneLine: true,
	        timeFormat: 'HH:mm',
	        onClose: function () {
	          function isDonePressed() {
	            return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
	          }
	          if (isDonePressed()){
	            data[field][index].updateDate = new Date($('#correction-date_' + index).datetimepicker('getDate')).toISOString();
	            templateData[field][index].updateDate = new Date($('#correction-date_' + index).datetimepicker('getDate')).toISOString();
	            console.log("Run save " + index);
	            saveCorrection(collectionId, data.uri, data, templateData, field, idField);
	          }
	        }
	      });
	    //$('#correction-date_' + index).datetimepicker('setDate', new Date(dateTmp));



	    ///////////look at me

	    //$('body').on('click', '#done-button', function () {
	    //  data[field][index].updateDate = new Date($('#correction-date_' + index).datetimepicker('getDate')).toISOString();
	    //  templateData[field][index].updateDate = new Date($('#correction-date_' + index).datetimepicker('getDate')).toISOString();
	    //  saveCorrection(collectionId, data.uri, data, templateData, field, idField);
	    //});



	    $('#' + idField + '-edit_' + index).click(function () {
	      var markdown = data[field][index].correctionNotice;
	      var editedSectionValue = {title: 'Correction notice', markdown: markdown};
	      var saveContent = function (updatedContent) {
	        data[field][index].correctionNotice = updatedContent;
	        templateData[field][index].correctionNotice = updatedContent;
	        saveCorrection(collectionId, data.uri, data, templateData, field, idField);
	      };
	      loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	    });
	    // Delete
	    $('#' + idField + '-delete_' + index).click(function () {
	      swal ({
	        title: "Warning",
	        text: "Are you sure you want to delete this correction?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Delete",
	        cancelButtonText: "Cancel",
	        closeOnConfirm: false
	      }, function(result){
	        if (result === true) {
	          deleteUnpublishedVersion(collectionId, data[field][index].uri, function () {
	            var position = $(".workspace-edit").scrollTop();
	            Florence.globalVars.pagePos = position;
	            $(this).parent().remove();
	            data[field].splice(index, 1);
	            templateData[field].splice(index, 1);
	            saveCorrection(collectionId, data.uri, data, templateData, field, idField);
	            swal({
	              title: "Deleted",
	              text: "This correction has been deleted",
	              type: "success",
	              timer: 2000
	            });
	          }, function (response) {
	            if (response.status === 400) {
	              sweetAlert("You cannot delete a correction that has been published.");
	            }
	            else {
	              handleApiError(response);
	            }
	          });
	        }
	      });
	    });
	  });
	}

	function saveCorrection(collectionId, path, data, templateData, field, idField) {
	  putContent(collectionId, path, JSON.stringify(data),
	    function () {
	      Florence.Editor.isDirty = false;
	      refreshCorrection(collectionId, data, templateData, field, idField);
	      refreshPreview(data.uri);
	    },
	    function (response) {
	      if (response.status === 400) {
	        sweetAlert("Cannot edit this page", "It is already part of another collection.");
	      }
	      else {
	        handleApiError(response);
	      }
	    }
	  );
	}

	/**
	 * Manages related data
	 * @param collectionId
	 * @param data
	 * @param templateData
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function editIntAndExtLinks(collectionId, data, templateData, field, idField) {
	    $(data[field]).each(function (index, path) {
	        if (!this.title) {
	            templateData[field][index] = (function () {
	                resolveInternalLinksTitle(collectionId, data, templateData, field, idField, index)
	            })();
	        } else {
	            templateData[field][index].description = {};
	            templateData[field][index].description.title = templateData[field][index].title;
	        }
	    });
	    var list = templateData[field];
	    var dataTemplate = createRelatedItemAccordionSectionViewModel(idField, list, data);
	    var html = templates.editorRelated(dataTemplate);
	    $('#' + idField).replaceWith(html);
	    initialiseLinks(collectionId, data, templateData, field, idField);
	    $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
	}

	function refreshLinks(collectionId, data, templateData, field, idField) {
	    var list = templateData[field];
	    var dataTemplate = createRelatedItemAccordionSectionViewModel(idField, list, data);
	    var html = templates.editorRelated(dataTemplate);
	    $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
	    initialiseLinks(collectionId, data, templateData, field, idField);
	}

	function initialiseLinks(collectionId, data, templateData, field, idField) {
	    // Load
	    $(data[field]).each(function (index) {
	        // Delete
	        $('#' + idField + '-delete_' + index).click(function () {
	            swal({
	                title: "Warning",
	                text: "Are you sure you want to delete this link?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Delete",
	                cancelButtonText: "Cancel",
	                closeOnConfirm: false
	            }, function (result) {
	                if (result === true) {
	                    swal({
	                        title: "Deleted",
	                        text: "This " + idField + " has been deleted",
	                        type: "success",
	                        timer: 2000
	                    });
	                    var position = $(".workspace-edit").scrollTop();
	                    Florence.globalVars.pagePos = position;
	                    $(this).parent().remove();
	                    data[field].splice(index, 1);
	                    templateData[field].splice(index, 1);
	                    putContent(collectionId, data.uri, JSON.stringify(data),
	                        success = function () {
	                            Florence.Editor.isDirty = false;
	                            refreshPreview(data.uri);
	                            refreshLinks(collectionId, data, templateData, field, idField);
	                        },
	                        error = function (response) {
	                            if (response.status === 400) {
	                                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                            }
	                            else {
	                                handleApiError(response);
	                            }
	                        }
	                    );
	                }
	            });
	        });
	    });

	    //Add
	    //$('#add-' + idField).off().one('click', function () {
	    $('#add-link').off().click(function () {
	        //add a modal to select an option for internal or external
	        var position = $(".workspace-edit").scrollTop();
	        Florence.globalVars.pagePos = position;
	        var modalIntOrExt = templates.linkModal;
	        $('.workspace-menu').append(modalIntOrExt);
	        //They choose internal
	        $('#internal-link').click(function () {
	            if (!data[field]) {
	                data[field] = [];
	            }

	            //Florence.globalVars.pagePos = position;
	            var modal = templates.relatedModal;
	            $('.modal').remove();
	            $('.workspace-menu').append(modal);
	            $('.modal-box input[type=text]').focus();

	            //Modal click events
	            $('.btn-uri-cancel').off().one('click', function () {
	                $('.modal').remove();
	            });

	            $('.btn-uri-get').off().click(function () {
	                var pastedUrl = $('#uri-input').val();
	                if (pastedUrl === "") {
	                    sweetAlert("This field cannot be empty. Please paste a valid url address");
	                } else {
	                    var dataUrl = checkPathParsed(pastedUrl);
	                    if (dataUrl === "") {    //special case for home page
	                        dataUrl = "/";
	                    }
	                    data[field].push({uri: dataUrl});
	                    templateData[field].push({uri: dataUrl});
	                    saveExternalLink(collectionId, data.uri, data, templateData, field, idField);
	                    $('.modal').remove();
	                }
	            });

	            $('.btn-uri-browse').off().one('click', function () {
	                var iframeEvent = document.getElementById('iframe').contentWindow;
	                iframeEvent.removeEventListener('click', Florence.Handler, true);
	                createWorkspace(data.uri, collectionId, '', null , true);
	                $('.modal').remove();

	                //Disable the editor
	                $('body').append(
	                    "<div class='col col--5 panel modal-background'></div>"
	                );

	                //Add buttons to iframe window
	                var iframeNav = templates.iframeNav();
	                $(iframeNav).hide().appendTo('.browser').fadeIn(600);

	                //Take iframe window to homepage/root
	                $('#iframe').attr('src', '/');

	                $('.btn-browse-cancel').off().one('click', function () {
	                    createWorkspace(data.uri, collectionId, 'edit');
	                    $('.iframe-nav').remove();
	                    $('.modal-background').remove();
	                });

	                //Remove added markup if user navigates away from editor screen
	                $('a:not(.btn-browse-get)').click(function () {
	                    $('.iframe-nav').remove();
	                    $('.modal-background').remove();
	                });

	                $('.btn-browse-get').off().one('click', function () {
	                    var dataUrl = getPathNameTrimLast();
	                    if (dataUrl === "") {   //special case for home page
	                        dataUrl = "/";
	                    }
	                    var latestUrl;
	                    //if you wanted to add latest automatically uncomment these lines
	                    if (dataUrl.match(/\/articles\//) || dataUrl.match(/\/bulletins\//)) {
	                        swal({
	                            title: "Warning",
	                            text: "Would you like to always show the latest release of this document?",
	                            type: "warning",
	                            showCancelButton: true,
	                            confirmButtonText: "Yes",
	                            cancelButtonText: "No",
	                            closeOnConfirm: true
	                        }, function (result) {
	                            if (result === true) {
	                                var tempUrl = dataUrl.split('/');
	                                tempUrl.pop();
	                                tempUrl.push('latest');
	                                latestUrl = tempUrl.join('/');
	                            } else {
	                                latestUrl = dataUrl;
	                            }
	                            $('.iframe-nav').remove();
	                            $('.modal-background').remove();
	                            data[field].push({uri: latestUrl});
	                            templateData[field].push({uri: latestUrl});
	                            saveExternalLink(collectionId, data.uri, data, templateData, field, idField);
	                        });
	                    } else {
	                        latestUrl = dataUrl;
	                        $('.iframe-nav').remove();
	                        $('.modal-background').remove();
	                        data[field].push({uri: latestUrl});
	                        templateData[field].push({uri: latestUrl});
	                        saveExternalLink(collectionId, data.uri, data, templateData, field, idField);
	                    }
	                });
	            });
	        });

	        //They choose external
	        $('#external-link').click(function () {
	            if (!data[field]) {
	                data[field] = [];
	            }
	            var modal = templates.linkExternalModal;
	            var uri, title;
	            $('.modal').remove();
	            $('.workspace-menu').append(modal);
	            $('#uri-input').change(function () {
	                uri = $('#uri-input').val();
	            });
	            $('#uri-title').change(function () {
	                title = $('#uri-title').val();
	            });
	            $('.btn-uri-get').off().click(function () {
	                if (!title) {
	                    sweetAlert('You need to enter a title to continue');
	                }
	                else {
	                    data[field].push({uri: uri, title: title});
	                    saveExternalLink(collectionId, data.uri, data, templateData, field, idField);
	                    $('.modal').remove();
	                }
	            });
	            $('.btn-uri-cancel').off().click(function () {
	                $('.modal').remove();
	            });
	        });
	        //They cancel
	        $('.btn-uri-cancel').off().click(function () {
	            $('.modal').remove();
	        });
	    });

	    // Make sections sortable
	    function sortable() {
	        $('#sortable-' + idField).sortable({
	            stop: function () {
	                $('#' + idField + ' .edit-section__sortable-item--counter').each(function (index) {
	                    $(this).empty().append(index + 1);
	                });
	            }
	        });
	    }

	    sortable();
	}

	function resolveInternalLinksTitle(collectionId, data, templateData, field, idField, index) {
	    getPageDataTitle(collectionId, templateData[field][index].uri,
	        success = function (response) {
	            templateData[field][index] = response;
	            templateData[field][index].description = {};
	            templateData[field][index].description.title = response.title;
	            if (response.edition) {
	                templateData[field][index].description.edition = response.edition;
	            }
	            refreshLinks(collectionId, data, templateData, field, idField);
	        },
	        error = function () {
	            sweetAlert("Error", field + ' address: ' + templateData[field][index].uri + ' is not found.', "error");
	        }
	    );
	}


	function saveExternalLink(collectionId, path, data, templateData, field, idField) {
	    putContent(collectionId, path, JSON.stringify(data),
	        success = function (response) {
	            Florence.Editor.isDirty = false;
	            refreshLinks(collectionId, data, templateData, field, idField);
	            createWorkspace(data.uri, collectionId, 'edit');
	        },
	        error = function (response) {
	            if (response.status === 400) {
	                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	            }
	            else {
	                handleApiError(response);
	            }
	        }
	    );
	}

	/**
	 * Manages markdown content (saves an object)
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key
	 * @param title - header to appear in the editor
	 */

	function editMarkdownOneObject (collectionId, data, field, title) {
	  var list = data[field];

	  if(!data[field]) {
	    data[field] = {}
	  }

	  var dataTemplate;
	  if (title) {
	    dataTemplate = {list: list, header: title};
	  } else {
	    dataTemplate = {list: list, header: 'Content'};
	  }

	  var html = templates.editorContentOne(dataTemplate);
	  $('#one').replaceWith(html);
	  // Load
	  $('#one-edit').click(function() {
	    var markdown = $('#one-markdown').val();
	    var editedSectionValue = {title: 'Content', markdown: markdown};
	    var saveContent = function(updatedContent) {
	      data[field].markdown = updatedContent;
	      saveMarkdownOne (collectionId, data.uri, data, field);
	    };

	    loadMarkdownEditor(editedSectionValue, saveContent, data);
	  });

	  // Delete
	  $('#one-delete').click(function() {
	    swal ({
	      title: "Warning",
	      text: "Are you sure you want to delete?",
	      type: "warning",
	      showCancelButton: true,
	      confirmButtonText: "Delete",
	      cancelButtonText: "Cancel",
	      closeOnConfirm: false
	    }, function(result) {
	      if (result === true) {
	        $(this).parent().remove();
	        data[field] = {};
	        saveMarkdownOne(collectionId, data.uri, data, field);
	        swal({
	          title: "Deleted",
	          text: "This " + idField + " has been deleted",
	          type: "success",
	          timer: 2000
	        });
	      }
	    });
	  });
	}

	function saveMarkdownOne (collectionId, path, data, field) {
	  putContent(collectionId, path, JSON.stringify(data),
	    success = function () {
	      Florence.Editor.isDirty = false;
	      editMarkdownOneObject (collectionId, data, field);
	    },
	    error = function (response) {
	      if (response.status === 400) {
	          sweetAlert("Cannot edit this page", "It is already part of another collection.");
	      }
	      else {
	        handleApiError(response);
	      }
	    }
	  );
	}

	/**
	 * Manages markdown content (saves an array)
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key
	 */

	function editMarkdownWithNoTitle(collectionId, data, field, idField) {
	  var list = data[field];

	  var dataTemplate;
	  if (idField === 'note') {
	    dataTemplate = {list: list, idField: idField, header: 'Notes'};
	  } else if (idField === 'prerelease') {
	    dataTemplate = {list: list, idField: idField, header: 'Pre-release access'};
	  } else {
	    dataTemplate = {list: list, idField: idField, header: 'Content'};
	  }

	  var html = templates.editorContentNoTitle(dataTemplate);
	  $('#' + idField).replaceWith(html);
	  // Load
	  $('#content-edit').click(function () {
	    var markdown = $('#content-markdown').val();
	    var editedSectionValue = {title: 'Content', markdown: markdown};
	    var saveContent = function (updatedContent) {
	      data[field] = [updatedContent];
	      saveMarkdownNoTitle(collectionId, data.uri, data, field, idField);

	      // when finished in the markdown editor be sure to refresh the charts / tables / images list to show any newly added
	      refreshChartList(collectionId, data);
	      refreshTablesList(collectionId, data);
	      refreshImagesList(collectionId, data);
	    };
	    loadMarkdownEditor(editedSectionValue, saveContent, data);
	  });

	  // Delete
	  $('#content-delete').click(function () {
	    swal({
	      title: "Warning",
	      text: "Are you sure you want to delete?",
	      type: "warning",
	      showCancelButton: true,
	      confirmButtonText: "Delete",
	      cancelButtonText: "Cancel",
	      closeOnConfirm: false
	    }, function (result) {
	      if (result === true) {
	        $(this).parent().remove();
	        data[field] = [];
	        saveMarkdownNoTitle(collectionId, data.uri, data, field, idField);
	        swal({
	          title: "Deleted",
	          text: "This " + idField + " has been deleted",
	          type: "success",
	          timer: 2000
	        });
	      }
	    });
	  });

	}

	function saveMarkdownNoTitle(collectionId, path, data, field, idField) {
	  putContent(collectionId, path, JSON.stringify(data),
	    success = function () {
	      Florence.Editor.isDirty = false;
	      editMarkdownWithNoTitle(collectionId, data, field, idField);
	    },
	    error = function (response) {
	      if (response.status === 400) {
	        sweetAlert("Cannot edit this page", "It is already part of another collection.");
	      }
	      else {
	        handleApiError(response);
	      }
	    }
	  );
	}

	function editServiceMessage(collectionId, data) {
	  if (!data.serviceMessage) {
	    data.serviceMessage = '';
	  }
	  //add template to editor
	  var text = data.serviceMessage;
	  var html = templates.editorServiceMessage(text);
	  $('#srv-msg').replaceWith(html);
	  //change text
	  $("#srv-msg-txt").on('input', function () {
	    $(this).textareaAutoSize();
	    data.serviceMessage = $(this).val();
	  });

	  //delete
	  $('#srv-msg-delete').click(function () {
	    swal({
	      title: "Warning",
	      text: "Are you sure you want to delete?",
	      type: "warning",
	      showCancelButton: true,
	      confirmButtonText: "Delete",
	      cancelButtonText: "Cancel",
	      closeOnConfirm: true
	    }, function (result) {
	      if (result === true) {
	        data.serviceMessage = "";
	        putContent(collectionId, '', JSON.stringify(data),
	          success = function () {
	            Florence.Editor.isDirty = false;
	            createWorkspace('/', collectionId, 'edit');
	          },
	          error = function (response) {
	            if (response.status === 400) {
	              sweetAlert("Cannot edit this page", "It is already part of another collection.");
	            }
	            else {
	              handleApiError(response);
	            }
	          }
	        );
	      }
	    });
	  });
	}/**
	 * Manages topics to appear in list pages
	 * @param collectionId
	 * @param data
	 * @param templateData
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function editTopics(collectionId, data, templateData, field, idField) {
	    var list = templateData[field];
	    var dataTemplate = {list: list, idField: idField};
	    var html = templates.editorTopics(dataTemplate);
	    $('#' + idField).replaceWith(html);
	    initialiseTopics(collectionId, data, templateData, field, idField);
	    resolveTopicTitle(collectionId, data, templateData, field, idField);
	    $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
	}

	function refreshTopics(collectionId, data, templateData, field, idField) {
	    var list = templateData[field];
	    var dataTemplate = {list: list, idField: idField};
	    var html = templates.editorTopics(dataTemplate);
	    $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
	    initialiseTopics(collectionId, data, templateData, field, idField);
	}

	function initialiseTopics(collectionId, data, templateData, field, idField) {
	    // Load
	    if (!data[field] || data[field].length === 0) {
	        editTopics['lastIndex' + field] = 0;
	    } else {
	        $(data[field]).each(function (index) {
	            editTopics['lastIndex' + field] = index + 1;

	            // Delete
	            $('#' + idField + '-delete_' + index).click(function () {
	                swal({
	                    title: "Warning",
	                    text: "Are you sure you want to delete this link?",
	                    type: "warning",
	                    showCancelButton: true,
	                    confirmButtonText: "Delete",
	                    cancelButtonText: "Cancel",
	                    closeOnConfirm: false
	                }, function (result) {
	                    if (result === true) {
	                        swal({
	                            title: "Deleted",
	                            text: "This " + idField + " has been deleted",
	                            type: "success",
	                            timer: 2000
	                        });
	                        var position = $(".workspace-edit").scrollTop();
	                        Florence.globalVars.pagePos = position;
	                        $(this).parent().remove();
	                        data[field].splice(index, 1);
	                        templateData[field].splice(index, 1);
	                        putContent(collectionId, data.uri, JSON.stringify(data),
	                            success = function () {
	                                Florence.Editor.isDirty = false;
	                                refreshPreview(data.uri);
	                                refreshTopics(collectionId, data, templateData, field, idField)
	                            },
	                            error = function (response) {
	                                if (response.status === 400) {
	                                    sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                                }
	                                else {
	                                    handleApiError(response);
	                                }
	                            }
	                        );
	                    }
	                });
	            });
	        });
	    }

	    //Add
	    $('#add-' + idField).off().one('click', function () {
	        var hasLatest; //Latest markup doesn't need to show in handlebars template
	        var position = $(".workspace-edit").scrollTop();

	        Florence.globalVars.pagePos = position;
	        var modal = templates.relatedModal(hasLatest);
	        $('.workspace-menu').append(modal);
	        $('.modal-box input[type=text]').focus();

	        //Modal click events
	        $('.btn-uri-cancel').off().one('click', function () {
	            createWorkspace(data.uri, collectionId, 'edit');
	        });

	        $('.btn-uri-get').off().one('click', function () {
	            var pastedUrl = $('#uri-input').val();
	            var dataUrl = checkPathParsed(pastedUrl);
	            getTopic(collectionId, data, templateData, field, idField, dataUrl);
	            $('.modal').remove();
	        });

	        $('.btn-uri-browse').off().one('click', function () {
	            var iframeEvent = document.getElementById('iframe').contentWindow;
	            iframeEvent.removeEventListener('click', Florence.Handler, true);
	            createWorkspace(data.uri, collectionId, '', null, true);
	            $('.modal').remove();

	            //Disable the editor
	            $('body').append(
	                "<div class='col col--5 panel modal-background'></div>"
	            );

	            //Add buttons to iframe window
	            var iframeNav = templates.iframeNav(hasLatest);
	            $(iframeNav).hide().appendTo('.browser').fadeIn(500);

	            $('.btn-browse-cancel').off().one('click', function () {
	                createWorkspace(data.uri, collectionId, 'edit');
	                $('.iframe-nav').remove();
	                $('.modal-background').remove();
	            });

	            //Remove added markup if user navigates away from editor screen
	            $('a:not(.btn-browse-get)').click(function () {
	                $('.iframe-nav').remove();
	                $('.modal-background').remove();
	            });

	            $('.btn-browse-get').off().one('click', function () {
	                var dataUrl = getPathNameTrimLast();
	                $('.iframe-nav').remove();
	                $('.modal-background').remove();
	                getTopic(collectionId, data, templateData, field, idField, dataUrl);
	            });
	        });
	    });

	    function sortable() {
	        $('#sortable-' + idField).sortable({
	            stop: function () {
	                $('#' + idField + ' .edit-section__sortable-item--counter').each(function (index) {
	                    $(this).empty().append(index + 1);
	                });
	            }
	        });
	    }

	    sortable();

	}

	function getTopic(collectionId, data, templateData, field, idField, dataUrl) {
	    var dataUrlData = dataUrl + "/data";

	    $.ajax({
	        url: dataUrlData,
	        dataType: 'json',
	        crossDomain: true,
	        success: function (result) {
	            if (result.type === 'product_page') {
	                if (!data[field]) {
	                    data[field] = [];
	                    templateData[field] = [];
	                }
	            }

	            else {
	                sweetAlert("This is not a valid document");
	                createWorkspace(data.uri, collectionId, 'edit');
	                return;
	            }

	            data[field].push({uri: result.uri});
	            templateData[field].push({uri: result.uri});
	            saveTopics(collectionId, data.uri, data, templateData, field, idField);

	        },
	        error: function () {
	            console.log('No page data returned');
	        }
	    });
	}

	function resolveTopicTitle(collectionId, data, templateData, field, idField) {
	    var ajaxRequest = [];
	    $(templateData[field]).each(function (index, path) {
	        templateData[field][index].description = {};
	        var eachUri = path.uri;
	        var dfd = $.Deferred();
	        getPageDataTitle(collectionId, eachUri,
	            success = function (response) {
	                templateData[field][index].description.title = response.title;
	                dfd.resolve();
	            },
	            error = function () {
	                sweetAlert("Error", field + ' address: ' + eachUri + ' is not found.', "error");
	                dfd.resolve();
	            }
	        );
	        ajaxRequest.push(dfd);
	    });

	    $.when.apply($, ajaxRequest).then(function () {
	        refreshTopics(collectionId, data, templateData, field, idField);
	    });
	}

	function saveTopics(collectionId, path, data, templateData, field, idField) {
	    putContent(collectionId, path, JSON.stringify(data),
	        success = function (response) {
	            console.log("Updating completed " + response);
	            Florence.Editor.isDirty = false;
	            resolveTopicTitle(collectionId, data, templateData, field, idField);
	            refreshPreview(path);
	            var iframeEvent = document.getElementById('iframe').contentWindow;
	            iframeEvent.addEventListener('click', Florence.Handler, true);
	        },
	        error = function (response) {
	            if (response.status === 400) {
	                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	            }
	            else {
	                handleApiError(response);
	            }
	        }
	    );
	}

	function isDevOrSandpit () {
	    var hostname = window.location.hostname;
	    var env = {};

	    if(hostname.indexOf('develop') > -1) {
	        env.name = 'develop'
	    }

	    if(hostname.indexOf('sandpit') > -1) {
	        env.name = 'sandpit'
	    }

	    // if((hostname.indexOf('127') > -1) || (hostname.indexOf('localhost')) > -1) {
	    //     env.name = 'localhost'
	    // }

	    return env;
	}
	/**
	 * Manages links
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function renderExternalLinkAccordionSection(collectionId, data, field, idField) {
	    var list = data[field];
	    var dataTemplate = {list: list, idField: idField};
	    var html = templates.editorLinks(dataTemplate);
	    $('#' + idField).replaceWith(html);

	    // Load
	    $(data[field]).each(function (index) {

	        $('#' + idField + '-edit_' + index).click(function () {
	            var uri = data[field][index].uri;
	            var title = data[field][index].title;
	            addEditLinksModal('edit', uri, title, index);
	        });

	        // Delete
	        $('#' + idField + '-delete_' + index).click(function () {
	            swal({
	                title: "Warning",
	                text: "Are you sure you want to delete?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Delete",
	                cancelButtonText: "Cancel",
	                closeOnConfirm: false
	            }, function (result) {
	                if (result === true) {
	                    var position = $(".workspace-edit").scrollTop();
	                    Florence.globalVars.pagePos = position + 300;
	                    $(this).parent().remove();
	                    data[field].splice(index, 1);
	                    saveLink(collectionId, data.uri, data, field, idField);
	                    refreshPreview(data.uri);
	                    swal({
	                        title: "Deleted",
	                        text: "This link has been deleted",
	                        type: "success",
	                        timer: 2000
	                    });
	                }
	            });
	        });
	    });

	    //Add
	    $('#add-' + idField).click(function () {
	        var position = $(".workspace-edit").scrollTop();
	        Florence.globalVars.pagePos = position + 300;
	        addEditLinksModal();
	    });

	    function sortable() {
	        $('#sortable-' + idField).sortable({
	            stop: function () {
	                $('#' + idField + ' .edit-section__sortable-item--counter').each(function (index) {
	                    $(this).empty().append(index + 1);
	                });
	            }
	        });
	    }

	    sortable();

	    function saveLink(collectionId, path, data, field, idField) {
	        putContent(collectionId, path, JSON.stringify(data),
	            success = function () {
	                Florence.Editor.isDirty = false;
	                renderExternalLinkAccordionSection(collectionId, data, field, idField);
	                refreshPreview(data.uri);
	            },
	            error = function (response) {
	                if (response.status === 400) {
	                    sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                }
	                else {
	                    handleApiError(response);
	                }
	            }
	        );
	    }

	    function addEditLinksModal(mode, uri, title, index) {

	        var uri = uri;
	        var title = title;

	        if (!data[field]) {
	            data[field] = [];
	        }

	        var linkData = {title: title, uri: uri};

	        var modal = templates.linkExternalModal(linkData);
	        $('.workspace-menu').append(modal);

	        $('#uri-input').change(function () {
	            uri = $('#uri-input').val();
	        });
	        $('#uri-title').change(function () {
	            title = $('#uri-title').val();
	        });

	        $('.btn-uri-get').off().click(function () {
	            if (!title) {
	                sweetAlert('You need to enter a title to continue');
	            } else if (uri.match(/\s/g)) {
	                sweetAlert('Your link cannot contain spaces');
	            } else {
	                if (mode == 'edit') {
	                    data[field][index].uri = uri;
	                    data[field][index].title = title;
	                } else {
	                    data[field].push({uri: uri, title: title});
	                }
	                saveLink(collectionId, data.uri, data, field, idField);
	                $('.modal').remove();
	            }
	        });

	        $('.btn-uri-cancel').off().click(function () {
	            $('.modal').remove();
	        });

	    }
	}

	function fileDelete (collectionId, data, field, index) {
	  swal ({
	    title: "Warning",
	    text: "Are you sure you want to delete this file?",
	    type: "warning",
	    showCancelButton: true,
	    confirmButtonText: "Delete",
	    cancelButtonText: "Cancel",
	    closeOnConfirm: false
	  }, function(result) {
	    if (result === true) {
	      swal({
	        title: "Deleted",
	        text: "This alert has been deleted",
	        type: "success",
	        timer: 2000
	      });
	      var position = $(".workspace-edit").scrollTop();
	      Florence.globalVars.pagePos = position;
	      $(this).parent().remove();
	      $.ajax({
	        url: "/zebedee/content/" + collectionId + "?uri=" + data.uri + '/' + data[field][index].file,
	        type: "DELETE",
	        success: function (res) {
	          console.log(res);
	        },
	        error: function (res) {
	          console.log(res);
	        }
	      });
	      data[field].splice(index, 1);
	      updateContent(collectionId, data.uri, JSON.stringify(data));
	    }
	  });
	}

	function uploadFile(collectionId, data, field, idField, lastIndex, downloadExtensions, onSave) {
	    var position = $(".workspace-edit").scrollTop();
	    Florence.globalVars.pagePos = position + 200;
	    var html = templates.uploadFileForm(lastIndex);
	    $('#sortable-' + idField).append(html);

	    $('#file-cancel').one('click', function (e) {
	        e.preventDefault();
	        $('#' + lastIndex).remove();
	        onSave(collectionId, data, field, idField);
	    });

	    $('#UploadForm').submit(function (e) {
	        e.preventDefault();
	        e.stopImmediatePropagation();

	        var formdata = new FormData();

	        function showUploadedItem(source) {
	            $('#list').append(source);
	        }

	        var file = this[0].files[0];
	        if (!file) {
	            sweetAlert("Please select a file to upload");
	            return;
	        }

	        document.getElementById("response").innerHTML = "Uploading . . .";

	        var fileNameNoSpace = file.name.replace(/[^a-zA-Z0-9\.]/g, "").toLowerCase();
	        uriUpload = data.uri + "/" + fileNameNoSpace;
	        var safeUriUpload = checkPathSlashes(uriUpload);

	        if (data[field] && data[field].length > 0) {
	            $(data[field]).each(function (i, filesUploaded) {
	                if (filesUploaded.file === fileNameNoSpace || filesUploaded.file === safeUriUpload) {
	                    sweetAlert('This file already exists');
	                    $('#' + lastIndex).remove();
	                    onSave(collectionId, data, field, idField);
	                    formdata = false;  // if not present the existing file was being overwritten
	                    return;
	                }
	            });
	        }
	        if (!!file.name.match(downloadExtensions)) {
	            showUploadedItem(fileNameNoSpace);
	            if (formdata) {
	                formdata.append("name", file);
	            }
	        } else {
	            sweetAlert("This file type is not supported");
	            $('#' + lastIndex).remove();
	            onSave(collectionId, data, field, idField);
	            return;
	        }

	        if (formdata) {
	            $.ajax({
	                url: "/zebedee/content/" + collectionId + "?uri=" + safeUriUpload,
	                type: 'POST',
	                data: formdata,
	                cache: false,
	                processData: false,
	                contentType: false,
	                success: function () {
	                    document.getElementById("response").innerHTML = "File uploaded successfully";
	                    if (!data[field]) {
	                        data[field] = [];
	                    }
	                    data[field].push({title: '', file: fileNameNoSpace});
	                    updateContent(collectionId, data.uri, JSON.stringify(data));
	                }
	            });
	        }
	    });
	}

	/**
	 * Gives the last position when on a page
	 */

	function getLastPosition () {
	  var position = Florence.globalVars.pagePos;
	  if (position > 0) {
	    setTimeout(function() {
	      $(".workspace-edit").scrollTop(position + 100);
	    }, 200);
	  }
	}

	/**
	 *  Get the network speed from zebedee/ping endpoint and output the network health
	 **/

	function networkStatus(ping) {
	    var $good = $('.icon-status--good'),
	        $ok = $('.icon-status--ok'),
	        $poor = $('.icon-status--poor'),
	        $veryPoor = $('.icon-status--very-poor');

	    if (ping > 0 && ping < 100) {
	        $('.icon-status div').css({"opacity": "1.0"});
	    } else if (ping >= 100 && ping < 200) {
	        $good.css({"opacity": "0.2"});
	        $ok.css({"opacity": "1.0"});
	        $poor.css({"opacity": "1.0"});
	        $veryPoor.css({"opacity": "1.0"});
	    } else if (ping >= 200 && ping < 300) {
	        $good.css({"opacity": "0.2"});
	        $ok.css({"opacity": "0.2"});
	        $poor.css({"opacity": "1.0"});
	        $veryPoor.css({"opacity": "1.0"});
	    } else if (ping >= 300) {
	        $good.css({"opacity": "0.2"});
	        $ok.css({"opacity": "0.2"});
	        $poor.css({"opacity": "0.2"});
	        $veryPoor.css({"opacity": "1.0"});
	    }
	}function getParentPage (url) {
	  var checkedUrl = checkPathSlashes(url);
	  var contentUrlTmp = checkedUrl.split('/');
	  contentUrlTmp.splice(-1, 1);
	  var contentUrl = contentUrlTmp.join('/');
	  return contentUrl;
	}
	function getPathNameTrimLast() {
	  var parsedUrl = document.getElementById('iframe').contentWindow.location.pathname;

	  if (parsedUrl.charAt(parsedUrl.length-1) === '/') {
	    parsedUrl = parsedUrl.slice(0, -1);
	  }
	  return parsedUrl;
	}

	function getPreviewUrl() {
	  var parsedUrl = document.getElementById('iframe').contentWindow.location.pathname;
	  var safeUrl = checkPathSlashes(parsedUrl);
	  return safeUrl;
	}

	/**
	 * Generic error handler method for ajax responses.
	 * Apply your specific requirements for an error response and then call this method to take care of the rest.
	 * @param response
	 */
	function handleApiError(response) {

	    if (!response || response.status === 200)
	        return;

	    if (response.status === 403 || response.status === 401) {
	        //sweetAlert('You are not logged in', 'Please refresh Florence and log back in.');
	        logout();
	    } else if (response.status === 504) {
	        sweetAlert('This task is taking longer than expected', "It will continue to run in the background.", "info");
	    } else {
	        var message = 'An error has occurred, please contact an administrator.';

	        if (response.responseJSON) {
	            message = response.responseJSON.message;
	        }

	        console.log(message);
	        sweetAlert("Error", message, "error");
	    }
	}

	/* Unique error handling for the login screen */
	function handleLoginApiError(response) {

	    if (!response || response.status === 200)
	        return;

	    if (response.status === 400) {
	        sweetAlert("Please enter a valid username and password");
	        logout();
	    } else if (response.status === 403 || response.status === 401) {
	        sweetAlert('Incorrect login details', 'These login credentials were not recognised. Please try again.', 'error');
	        logout();
	    } else {
	        var message = 'An error has occurred, please contact an administrator.';

	        if (response.responseJSON) {
	            message = response.responseJSON.message;
	        }

	        console.log(message);
	        sweetAlert("Error", message, "error");
	    }
	}
	function initialiseLastNoteMarkdown(collectionId, data, field, field2) {
	  // Load
	  var lastIndex = data[field].length - 1;
	  var editedSectionValue = '';
	  var saveContent = function (updatedContent) {
	    data[field][lastIndex][field2] = updatedContent;
	    putContent(collectionId, data.uri, JSON.stringify(data),
	      success = function () {
	        Florence.Editor.isDirty = false;
	        loadPageDataIntoEditor(data.uri, collectionId);
	        refreshPreview(data.uri);
	      },
	      error = function (response) {
	        if (response.status === 400) {
	          sweetAlert("Cannot edit this page", "It is already part of another collection.");
	        }
	        else {
	          handleApiError(response);
	        }
	      }
	    );
	  };
	  loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	}
	/**
	 * Validate an inputs value before it's submitted to the server
	 */

	function validatePageName(customSelector) {
	    var $inputSelector = $('#pagename');
	    var isCustomSelector;
	    var bool = true;

	    // Allow other inputs to use same validation (eg edition)
	    if (customSelector) {
	        $inputSelector = $(customSelector);
	        isCustomSelector = true;
	    }

	    // Do validation
	    if ($inputSelector.val().toLowerCase() === 'current' || $inputSelector.val().toLowerCase() === 'latest' || $inputSelector.val().toLowerCase() === 'data') { // Check for reserved words (ie endpoints in zebedee/babbage)
	        sweetAlert({
	            title: "Invalid page name",
	            text: "The words 'current', 'latest' and 'data' are reserved paths so can't be used as a page name",
	            type: "warning"
	        });
	        $inputSelector.val('');
	        bool = false;
	    } else if (!$inputSelector.val()) { // Check inputs contains something
	        sweetAlert({
	            title: "Page name can't be left empty",
	            type: "warning"
	        });
	        bool = false;
	    } else if ($inputSelector.val().length < 5 && !isCustomSelector) { // Check page name length is longer than 4 characters
	        sweetAlert({
	            title: "Invalid page name",
	            text: "A page name must have more than 4 characters",
	            type: "warning"
	        });
	        bool = false;
	    }
	    
	    return bool
	}
	function loadBrowseScreen(collectionId, click, collectionData) {

	    // Get collection data if it's undefined and re-run the function once request has returned
	    if (!collectionData) {
	        getCollection(collectionId, success = function(getCollectionResponse) {
	                loadBrowseScreen(collectionId, click, getCollectionResponse);
	            }, error = function() {
	                console.log('Error getting collection data for: ', collectionId);
	            });

	        return false;
	    }

	    return $.ajax({
	        url: "/zebedee/collectionBrowseTree/" + collectionId, // url: "/navigation",
	        dataType: 'json',
	        type: 'GET',
	        success: function (response) {

	            checkAndAddDeleteFlag(response, collectionData);

	            // var collectionOwner = localStorage.getItem('userType');
	            response['collectionOwner'] = localStorage.getItem('userType');

	            // var browserContent = $('#iframe')[0].contentWindow;
	            var html = templates.workBrowse(response);
	            var browseTree = document.getElementById('browse-tree');
	            browseTree.innerHTML = html;

	            $('.workspace-browse').css("overflow", "scroll");

	            // Send visualisations back to visualisations folder by default on browse tree load
	            // if (collectionOwner == "DATA_VISUALISATION") {
	            //     var visDirectory = "/visualisations";
	            //     treeNodeSelect(visDirectory);
	            // }

	            // Bind click event for browse tree item
	            bindBrowseTreeClick();

	            if (click) {
	                var url = getPreviewUrl();
	                if (url === "/blank" || response['collectionOwner'] == 'DATA_VISUALISATION') {
	                    treeNodeSelect('/');
	                } else {
	                    treeNodeSelect(url);
	                }
	            } else {
	                treeNodeSelect('/');

	            }

	            // Switch to browse tab (if not already)
	            var $browseTab = $('#browse');
	            if (!$browseTab.hasClass('selected')) {
	                $('.js-workspace-nav .js-workspace-nav__item').removeClass('selected');
	                $browseTab.addClass('selected');
	            }

	            openVisDirectoryOnLoad();

	        },
	        error: function (response) {
	            handleApiError(response);
	        }
	    });

	}

	// Bind the actions for a click on a browse tree item
	function bindBrowseTreeClick() {
	    $('.js-browse__item-title').click(function () {
	        var $this = $(this),
	            $thisItem = $this.closest('.js-browse__item'),
	            uri = $thisItem.attr('data-url'),
	            baseURL = Florence.babbageBaseUrl,
	            isDataVis = localStorage.getItem('userType') == 'DATA_VISUALISATION';

	        if (uri) {
	            var newURL = baseURL + uri;

	            treeNodeSelect(newURL);

	            // Data vis browsing doesn't update iframe
	            if (isDataVis) {
	                return false
	            }

	            // Update iframe location which will send change event for iframe to update too
	            document.getElementById('iframe').contentWindow.location.href = newURL;
	            $('.browser-location').val(newURL);

	        } else {

	            // Set all directories above it in the tree to be active when a directory clicked
	            selectParentDirectories($this);
	        }

	        // Open active branches in browse tree
	        openBrowseBranch($this);
	    });
	}

	function openBrowseBranch($this) {
	    $('.tree-nav-holder ul').removeClass('active');
	    $this.parents('ul').addClass('active');
	    $this.closest('li').children('ul').addClass('active');
	}

	function openVisDirectoryOnLoad() {
	    var userType = Florence.Authentication.userType();

	    if (userType == 'DATA_VISUALISATION') {
	        $('.js-browse__item .page__container').removeClass('selected');
	        $('.page__buttons--list.selected').removeClass('selected');
	        var $this = $('.datavis-directory');
	        $this.next('.page__buttons--list').addClass('selected')
	            .closest('.page__container').addClass('selected')
	            .next('.js-browse__children').addClass('active');
	    }
	}

	// recursively add isDeletable and deleteIsInCollection flags to all browse tree nodes
	function checkAndAddDeleteFlag(browseTree, collectionData) {
	    browseTree['isDeletable'] = isDeletable(browseTree.type);
	    browseTree['deleteIsInCollection'] = deleteIsInCollection(browseTree.contentPath, collectionData);

	    $.each(browseTree.children, function( key, browseTreeNode ) {
	        if (browseTreeNode.children) {
	            checkAndAddDeleteFlag(browseTreeNode, collectionData);
	        }
	    });
	}

	// set deletable flag to false for certain page types
	function isDeletable(type) {
	    if (type == 'home_page' || type == 'taxonomy_landing_page' || type == 'product_page') {
	        return false;
	    } else {
	        return true;
	    }
	}

	// check if given uri is marked for deletion in current collection
	function deleteIsInCollection(uri, collectionData) {
	    var bool;
	    if (collectionData.pendingDeletes) {
	        $.each(collectionData.pendingDeletes, function (key, deleteMarker) {
	            if (uri == deleteMarker.root.uri) {
	                bool = true;
	                return false;
	            } else {
	                bool = false;
	            }
	        });
	    }
	    return bool;
	}

	// display open directory icon for parents directories
	function selectParentDirectories($this) {
	    $('.page__item--directory').removeClass('selected'); // remove previous selections
	    $this.parents('.js-browse__item--directory').find('.page__item--directory:first').addClass('selected'); // select directories along parent path
	}

	function loadChartBuilder(pageData, onSave, chart) {
	    var chart = chart;
	    var pageUrl = pageData.uri;
	    var html = templates.chartBuilder(chart);
	    $('body').append(html);
	    $('.js-chart-builder').css("display", "block");

	    if (chart) {
	        $('#chart-data').val(toTsv(chart));
	        refreshExtraOptions();
	    }

	    renderText();
	    renderChart();

	    function refreshExtraOptions() {
	        var template = getExtraOptionsTemplate(chart.chartType);
	        if (template) {
	            var html = template(chart);
	            $('#extras').html(html);
	        } else {
	            $('#extras').empty();
	        }
	    }

	    function getExtraOptionsTemplate(chartType) {
	        switch (chartType) {
	            case 'barline':
	            case 'rotated-barline':
	                return templates.chartEditBarlineExtras;
	            case 'dual-axis':
	                return templates.chartEditDualAxisExtras;
	            case 'line':
	                return templates.chartEditLineChartExtras;
	            case 'bar':
	            case 'rotated':
	                return templates.chartEditBarChartExtras;
	            default:
	                return;
	        }
	    }

	    $('.refresh-chart').on('input', function () {
	        chart = buildChartObject();
	        refreshExtraOptions();
	        renderChart();
	    });

	    $('.refresh-chart').on('change', ':checkbox', function () {
	        chart = buildChartObject();
	        refreshExtraOptions();
	        renderChart();
	    });


	    $('.refresh-text').on('input', function () {
	        renderText();
	    });

	    $('.btn-chart-builder-cancel').on('click', function () {
	        $('.js-chart-builder').stop().fadeOut(200).remove();
	    });

	    $('.btn-chart-builder-create').on('click', function () {

	        chart = buildChartObject();

	        var jsonPath = chart.uri + ".json";
	        $.ajax({
	            url: "/zebedee/content/" + Florence.collection.id + "?uri=" + jsonPath,
	            type: 'POST',
	            data: JSON.stringify(chart),
	            processData: false,
	            contentType: 'application/json',
	            success: function (res) {

	                if (!pageData.charts) {
	                    pageData.charts = [];
	                }

	                existingChart = _.find(pageData.charts, function (existingChart) {
	                    return existingChart.filename === chart.filename;
	                });

	                if (existingChart) {
	                    existingChart.title = chart.title;
	                } else {
	                    pageData.charts.push({
	                        title: chart.title,
	                        filename: chart.filename,
	                        uri: chart.uri
	                    });
	                }

	                if (onSave) {
	                    onSave(chart.filename, '<ons-chart path="' + chart.filename + '" />');
	                }
	                $('.js-chart-builder').stop().fadeOut(200).remove();
	            }
	        });
	    });

	    setShortcuts('#chart-title', renderText);
	    setShortcuts('#chart-subtitle', renderText);
	    setShortcuts('#chart-data', renderChart);
	    setShortcuts('#chart-x-axis-label', renderChart);
	    setShortcuts('#chart-notes', renderText);

	    //Renders html outside actual chart area (title, subtitle, source, notes etc.)
	    function renderText() {
	        var title = doSuperscriptAndSubscript($('#chart-title').val());
	        var subtitle = doSuperscriptAndSubscript($('#chart-subtitle').val());
	        $('#chart-source-preview').html($('#chart-source').val());
	        $('#chart-title-preview').html(title);
	        $('#chart-subtitle-preview').html(subtitle);
	        $('#chart-notes-preview').html(toMarkdown($('#chart-notes').val()));
	    }

	    function toMarkdown(text) {
	        if (text && isMarkdownAvailable) {
	            var converter = new Markdown.getSanitizingConverter();
	            Markdown.Extra.init(converter, {
	                extensions: "all"
	            });
	            return converter.makeHtml(text)
	        }
	        return '';
	    }

	    function isMarkdownAvailable() {
	        return typeof Markdown !== 'undefined'
	    }

	    function doSuperscriptAndSubscript(text) {
	        if (text && isMarkdownAvailable) {
	            var converter = new Markdown.Converter();
	            return converter._DoSubscript(converter._DoSuperscript(text));
	        }
	        return text;

	    }

	    // Builds, parses, and renders our chart in the chart editor
	    function renderChart() {
	        chart = buildChartObject();
	        var preview = $('#chart');
	        var chartHeight = preview.width() * chart.aspectRatio;
	        var chartWidth = preview.width();
	        renderChartObject('chart', chart, chartHeight, chartWidth);
	    }

	    function buildChartObject() {
	        var json = $('#chart-data').val();
	        if (!chart) {
	            chart = {};
	        }

	        chart.type = "chart";
	        chart.title = $('#chart-title').val();
	        chart.filename = chart.filename ? chart.filename : StringUtils.randomId(); //  chart.title.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	        chart.uri = pageUrl + "/" + chart.filename;
	        chart.subtitle = $('#chart-subtitle').val();
	        chart.unit = $('#chart-unit').val();
	        chart.source = $('#chart-source').val();

	        chart.decimalPlaces = $('#chart-decimal-places').val();
	        chart.labelInterval = $('#chart-label-interval').val();

	        chart.notes = $('#chart-notes').val();
	        chart.altText = $('#chart-alt-text').val();
	        chart.xAxisLabel = $('#chart-x-axis-label').val();
	        chart.startFromZero = $('#start-from-zero').prop('checked');
	        chart.finishAtHundred = $('#finish-at-hundred').prop('checked');

	        if (chart.title === '') {
	            chart.title = '[Title]'
	        }

	        chart.data = tsvJSON(json);
	        chart.headers = tsvJSONHeaders(json);
	        chart.series = tsvJSONColNames(json);
	        chart.categories = tsvJSONRowNames(json);

	        chart.aspectRatio = $('#aspect-ratio').val();

	        if (isShowBarLineSelection(chart.chartType)) {
	            var types = {};
	            var groups = [];
	            var group = [];
	            var seriesData = chart.series;
	            $.each(seriesData, function (index) {
	                types[seriesData[index]] = $('#types_' + index).val() || 'bar';
	            });
	            (function () {
	                $('#extras input:checkbox:checked').each(function () {
	                    group.push($(this).val());
	                });
	                groups.push(group);
	                return groups;
	            })();
	            chart.chartTypes = types;
	            chart.groups = groups;
	        }

	        chart.chartType = $('#chart-type').val();

	        //console.log(chart);
	        parseChartObject(chart);

	        chart.files = [];
	        //chart.files.push({ type:'download-png', filename:chart.filename + '-download.png' });
	        //chart.files.push({ type:'png', filename:chart.filename + '.png' });

	        return chart;
	    }

	    //Determines if selected chart type is barline or rotated bar line
	    function isShowBarLineSelection(chartType) {
	        return (chartType === 'barline' || chartType === "rotated-barline" || chartType === "dual-axis");
	    }

	    function parseChartObject(chart) {

	        // Determine if we have a time series
	        var timeSeries = axisAsTimeSeries(chart.categories);
	        if (timeSeries && timeSeries.length > 0) {
	            chart.isTimeSeries = true;

	            // We create data specific to time
	            timeData = [];
	            _.each(timeSeries, function (time) {
	                var item = chart.data[time['row']];
	                item.date = time['date'];
	                item.label = time['label'];
	                timeData.push(item);
	            });

	            chart.timeSeries = timeData;
	        }
	    }

	    //// Converts chart to highcharts configuration by posting Babbage /chartconfig endpoint and to the rendering with fetched configuration
	    function renderChartObject(bindTag, chart, chartHeight, chartWidth) {

	        var jqxhr = $.post("/chartconfig", {
	                data: JSON.stringify(chart),
	                width: chartWidth
	            },
	            function () {
	                var chartConfig = window["chart-" + chart.filename];
	                console.debug("Refreshing the chart, config:", chartConfig);
	                if (chartConfig) {
	                    chartConfig.chart.renderTo = "chart";
	                    new Highcharts.Chart(chartConfig);
	                    delete window["chart-" + chart.filename]; //clear data from window object after rendering
	                }
	            }, "script")
	            .fail(function (data, err) {
	                console.error(err);
	                console.log("Failed reading chart configuration from server", chart);
	                $("#chart").empty();
	            });
	    }

	    // Data load from text box functions
	    function tsvJSON(input) {
	        var lines = input.split("\n");
	        var result = [];
	        var headers = lines[0].split("\t");

	        for (var i = 1; i < lines.length; i++) {
	            var obj = {};
	            var currentline = lines[i].split(",").join("").split("\t");

	            for (var j = 0; j < headers.length; j++) {
	                obj[headers[j]] = currentline[j];
	            }
	            result.push(obj);
	        }
	        return result; //JSON
	    }

	    function toTsv(data) {
	        var output = "";

	        for (var i = 0; i < data.headers.length; i++) {
	            if (i === data.headers.length - 1) {
	                output += data.headers[i];
	            } else {
	                output += data.headers[i] + "\t";
	            }
	        }

	        for (var i = 0; i < data.categories.length; i++) {
	            output += "\n" + toTsvLine(data.data[i], data.headers);
	        }

	        return output;
	    }

	    function toTsvLine(data, headers) {

	        var output = "";

	        for (var i = 0; i < headers.length; i++) {
	            if (i === headers.length - 1) {
	                output += data[headers[i]];
	            } else {
	                output += data[headers[i]] + "\t";
	            }
	        }
	        return output;
	    }

	    function tsvJSONRowNames(input) {
	        var lines = input.split("\n");
	        var result = [];

	        for (var i = 1; i < lines.length; i++) {
	            var currentline = lines[i].split("\t");
	            result.push(currentline[0]);
	        }
	        return result
	    }

	    function tsvJSONColNames(input) {
	        var lines = input.split("\n");
	        var headers = lines[0].split("\t");
	        headers.shift();
	        return headers;
	    }

	    function tsvJSONHeaders(input) {
	        var lines = input.split("\n");
	        var headers = lines[0].split("\t");
	        return headers;
	    }

	    function exportToSVG(sourceSelector) {
	        var svgContainer = $(sourceSelector);
	        var svg = svgContainer.find('svg');

	        var styleContent = "\n";
	        for (var i = 0; i < document.styleSheets.length; i++) {
	            str = document.styleSheets[i].href.split("/");
	            if (str[str.length - 1] == "c3.css") {
	                var rules = document.styleSheets[i].rules;
	                for (var j = 0; j < rules.length; j++) {
	                    styleContent += (rules[j].cssText + "\n");
	                }
	                break;
	            }
	        }

	        //var style = document.createElementNS("http://www.w3.org/2000/svg", "style");
	        //$(style).textContent += "\n<![CDATA[\n" + styleContent + "\n]]>\n";
	        //
	        //svg.prepend(style);
	        //svg[0].getElementsByTagName("defs")[0].appendChild(style);


	        svg.prepend("\n<style type='text/css'></style>");
	        svg.find("style").textContent += "\n<![CDATA[" + styleContent + "]]>\n";


	        //if ($('#chart-type').val() === 'line') {
	        //  $('.c3 line').css("fill", "none");
	        //  console.log($('.c3 line'))
	        //}

	        var source = (new XMLSerializer).serializeToString(svg[0]);
	        //console.log(source);

	        //add name spaces.
	        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
	            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
	        }
	        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
	            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
	        }
	        //add padding
	        source = source.replace(/style="overflow: hidden;"/, 'style="overflow: hidden; padding: 50px;"');

	        //add xml declaration
	        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

	        return source;
	    }


	    // Steps through time series points
	    function axisAsTimeSeries(axis) {
	        var result = [];
	        var rowNumber = 0;

	        _.each(axis, function (tryTimeString) {
	            var time = convertTimeString(tryTimeString);
	            if (time) {
	                time.row = rowNumber;
	                rowNumber = rowNumber + 1;

	                result.push(time);
	            } else {
	                return null;
	            }
	        });
	        return result;
	    }

	    function convertTimeString(timeString) {
	        // First time around parse the time string according to rules from regular timeseries
	        var result = {};
	        result.label = timeString;

	        // Format time string
	        // Check for strings that will turn themselves into a strange format
	        twoDigitYearEnd = timeString.match(/\W\d\d$/);
	        if (twoDigitYearEnd !== null) {
	            year = parseInt(timeString.substr(timeString.length - 2, timeString.length));
	            prefix = timeString.substr(0, timeString.length - 2).trim();

	            if (year >= 40) {
	                timeString = prefix + " 19" + year;
	            } else {
	                timeString = prefix + " 20" + year;
	            }
	        }

	        // Check for quarters
	        quarter = timeString.match(/Q\d/);
	        year = timeString.match(/\d\d\d\d/);
	        if ((quarter !== null) && (year !== null)) {
	            months = ["February ", "May ", "August ", "November "];
	            quarterMid = parseInt(quarter[0][1]);
	            timeString = months[quarterMid - 1] + year[0];
	        }

	        // We are going with all times in a common format
	        var date = new Date(timeString);
	        if (!isNaN(date.getTime())) {
	            result.date = date;
	            result.period = 'other';
	            return result;
	        }

	        return (null);
	    }

	    function generatePng(sourceSelector, canvasSelector, fileSuffix) {

	        var preview = $(sourceSelector);
	        var chartHeight = preview.height();
	        var chartWidth = preview.width();

	        var content = exportToSVG(sourceSelector).trim();

	        var $canvas = $(canvasSelector);
	        $canvas.width(chartWidth);
	        $canvas.height(chartHeight);

	        var canvas = $canvas.get(0);

	        // Draw svg on canvas
	        canvg(canvas, content);

	        // get data url from canvas.
	        var dataUrl = canvas.toDataURL('image/png');
	        var pngData = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
	        //console.log(dataUrl);

	        var raw = window.atob(pngData);
	        var rawLength = raw.length;
	        var array = new Uint8Array(new ArrayBuffer(rawLength));

	        for (var i = 0; i < rawLength; i++) {
	            array[i] = raw.charCodeAt(i);
	        }

	        var suffix = "";

	        if (fileSuffix) {
	            suffix = fileSuffix
	        }

	        var pngUri = pageUrl + "/" + chart.filename + suffix + ".png";
	        $.ajax({
	            url: "/zebedee/content/" + Florence.collection.id + "?uri=" + pngUri,
	            type: 'POST',
	            data: new Blob([array], {
	                type: 'image/png'
	            }),
	            contentType: "image/png",
	            processData: false,
	            success: function (res) {
	                //console.log('png uploaded!');
	            }
	        });
	    }
	}// fully load the charts list from scratch
	function loadChartsList(collectionId, data) {
	    var html = templates.workEditCharts(data);
	    $('#charts').replaceWith(html);
	    initialiseChartList(collectionId, data);
	    initialiseClipboard();
	}

	// refresh only the list of charts - leaving the container div that accordion works from.
	function refreshChartList(collectionId, data) {
	    var html = templates.workEditCharts(data);
	    $('#chart-list').replaceWith($(html).find('#chart-list'));
	    initialiseChartList(collectionId, data);
	    initialiseClipboard();
	}

	// do all the wiring up of buttons etc once the template has been rendered.
	function initialiseChartList(collectionId, data) {

	    $('#add-chart').click(function () {
	        loadChartBuilder(data, function () {
	            refreshPreview();

	            putContent(collectionId, data.uri, JSON.stringify(data),
	                success = function () {
	                    Florence.Editor.isDirty = false;
	                    refreshPreview();
	                    refreshChartList(collectionId, data);
	                },
	                error = function (response) {
	                    handleApiError(response);
	                }
	            );
	        });
	    });

	    $(data.charts).each(function (index, chart) {

	        var basePath = data.uri;
	        var chartPath = basePath + '/' + chart.filename;
	        var chartJson = chartPath;

	        $("#chart-edit_" + index).click(function () {
	            getPageData(collectionId, chartJson,
	                onSuccess = function (chartData) {

	                    loadChartBuilder(data, function () {
	                        refreshPreview();

	                        putContent(collectionId, basePath, JSON.stringify(data),
	                            success = function () {
	                                Florence.Editor.isDirty = false;
	                                refreshPreview();
	                                refreshChartList(collectionId, data);
	                            },
	                            error = function (response) {
	                                handleApiError(response);
	                            }
	                        );
	                    }, chartData);
	                })
	        });

	        $("#chart-delete_" + index).click(function () {
	            swal({
	                title: "Warning",
	                text: "Are you sure you want to delete this chart?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Delete",
	                cancelButtonText: "Cancel",
	                closeOnConfirm: false
	            }, function (result) {
	                if (result === true) {
	                    $(this).parent().remove();
	                    data.charts = _(data.charts).filter(function (item) {
	                        return item.filename !== chart.filename
	                    });
	                    putContent(collectionId, basePath, JSON.stringify(data),
	                        success = function () {
	                            deleteContent(collectionId, chartJson + '.json', onSuccess = function () {
	                            }, onError = function () {
	                            });
	                            Florence.Editor.isDirty = false;
	                            swal({
	                                title: "Deleted",
	                                text: "This chart has been deleted",
	                                type: "success",
	                                timer: 2000
	                            });
	                            refreshChartList(collectionId, data);
	                        },
	                        error = function (response) {
	                            handleApiError(response);
	                        }
	                    );
	                }
	            });
	        });
	    });
	    // Make sections sortable
	    function sortable() {
	        $('#sortable-chart').sortable();
	    }

	    sortable();
	}


	function loadCreateScreen(parentUrl, collectionId, type, collectionData) {
	    var isDataVis = false; // Flag for template to show correct options in select

	    // Load data vis creator or ordinary publisher creator
	    if (collectionData && collectionData.collectionOwner == "DATA_VISUALISATION") {
	        isDataVis = true;
	        type = 'visualisation';
	    }

	    var html = templates.workCreate({"dataVis": isDataVis});

	    $('.workspace-menu').html(html);
	    loadCreator(parentUrl, collectionId, type, collectionData);
	    $('#pagetype').focus();
	}
	function loadCreator(parentUrl, collectionId, type, collectionData) {
	    var $typeSelect = $('#pagetype'),
	        pageType,
	        releaseDate;

	    getCollection(collectionId,
	        success = function (response) {
	            if (!response.publishDate) {
	                releaseDate = null;
	            } else {
	                releaseDate = response.publishDate;
	            }
	        },
	        error = function (response) {
	            handleApiError(response);
	        }
	    );

	    //releaseDate = Florence.collection.date;             //to be added back to scheduled collections

	    if (type === 'bulletin' || type === 'article') {
	        $typeSelect.val(type).change();
	        loadT4Creator(collectionId, releaseDate, type, parentUrl);
	    } else if (type === 'compendium_landing_page') {
	        $typeSelect.val(type).change();
	        loadT6Creator(collectionId, releaseDate, type, parentUrl);
	    } else if (type === 'visualisation') {
	        $typeSelect.val(type).change();
	        loadVisualisationCreator(collectionId, type, collectionData);
	    } else {
	        $typeSelect.off().change(function () {
	            pageType = $(this).val();
	            $('.edition').empty();
	            $('.create-publishing-error').remove();

	            if (pageType === 'bulletin' || pageType === 'article' || pageType === 'article_download') {
	                loadT4Creator(collectionId, releaseDate, pageType, parentUrl);
	            }
	            else if (pageType.match(/compendium_.+/)) {
	                loadT6Creator(collectionId, releaseDate, pageType, parentUrl);
	            }
	            else if (pageType.match(/static_.+/)) {
	                loadT7Creator(collectionId, releaseDate, pageType, parentUrl);
	            }
	            else if (pageType === 'dataset_landing_page' || pageType === 'timeseries_landing_page') {
	                loadT8Creator(collectionId, releaseDate, pageType, parentUrl);
	            } else if (pageType === 'visualisation') {
	                console.log('Visualisation');

	            } else if (pageType === 'release') {
	                loadT16Creator(collectionId, releaseDate, pageType, parentUrl);
	            }
	            else {
	                sweetAlert("Error", 'Page type not recognised. Contact an administrator', "error");
	            }
	        });
	    }
	}



	/*
	*   Loads datepicker with correct format and moves focus to next form element on selection
	 */

	function creatorDatePicker() {
	    $('#releaseDate').datepicker({
	        dateFormat: 'dd MM yy',
	        onSelect: function() {
	            nextFormElement();
	        }
	    });
	}

	function nextFormElement() {
	    var $dateInput = $('#releaseDate');

	    if ($dateInput.nextUntil('input, select, textarea, button').length) {
	        $dateInput.nextUntil('input, select, textarea, button').focus();
	        console.log('sibling', $dateInput.nextUntil('input, select, textarea, button'));
	    } else if ($dateInput.closest('.edition').nextUntil('input, select, textarea, button').length) {
	        $dateInput.closest('.edition').nextUntil('input, select, textarea, button').focus();
	        console.log('parents sibling', $dateInput.closest('.edition').nextUntil('input, select, textarea, button'));
	    } else {
	        console.log('No following inputs');
	    }
	}
	/**
	 * Created by crispin on 10/12/2015.
	 */
	function loadEmbedIframe(onSave) {
	    // add modal window
	    $('.workspace-menu').append(templates.embedIframe());

	    // variables
	    var modal = $(".modal");

	    // modal functions
	    function closeModal() {
	        modal.remove();
	    }
	    function saveUrl() {
	        var embedUrl = $('input#embed-url').val();
	        if (!embedUrl) {
	            console.log("No url added");
	            sweetAlert('URL field is empty', 'Please add a url and save again');
	        } else {
	            onSave('<ons-interactive url="' + embedUrl + '" />');
	            modal.remove();
	        }
	    }

	    // bind events
	    $('.btn-embed-cancel').click(function() {
	        closeModal();
	    });
	    $('.btn-embed-save').click(function() {
	        saveUrl();
	    });
	    modal.keyup(function(e) {
	        if (e.keyCode == 27) { //close on esc key
	            closeModal()
	        }
	        if (e.keyCode == 13) { //save on enter key
	            saveUrl();
	        }
	    });
	}function loadEquationBuilder(pageData, onSave, equation) {
	  var equation = equation;
	  var pageUrl = pageData.uri;
	  var html = templates.equationBuilder(equation);

	  var renderingPreview = false;

	  $('body').append(html);
	  $('.js-equation-builder').css("display", "block");

	  $('.btn-equation-builder-cancel').on('click', function () {
	    $('.js-equation-builder').stop().fadeOut(200).remove();
	  });

	  // if editing existing equation render preview straight away
	  if (equation) {
	    var contentStr = equation.content;
	    renderPreview(contentStr);
	  }

	  // on change of content filed re-render preview
	  var timeout;
	  $('#equation-content').keyup(function () {

	    if (!renderingPreview) {
	      clearTimeout(timeout);
	      var contentStr = $(this).val();
	      timeout = setTimeout(function () {
	        renderPreview(contentStr);
	      }, 100);
	    }

	  });


	  // save equation
	  $('.btn-equation-builder-create').on('click', function () {

	    equation = buildEquationObject();

	    var jsonPath = equation.uri + ".json";
	    $.ajax({
	      url: "/zebedee/equation/" + Florence.collection.id + "?uri=" + jsonPath,
	      type: 'POST',
	      data: JSON.stringify(equation),
	      processData: false,
	      contentType: 'application/json',
	      success: function () {

	        if (!pageData.equations) {
	          pageData.equations = [];
	        }

	        existingEquation = _.find(pageData.equations, function (existingEquation) {
	          return existingEquation.filename === equation.filename;
	        });

	        if (existingEquation) {
	          existingEquation.title = equation.title;
	        } else {
	          pageData.equations.push({
	            title: equation.title,
	            filename: equation.filename,
	            uri: equation.uri
	          });
	        }

	        if (onSave) {
	          onSave(equation.filename, '<ons-equation path="' + equation.filename + '" />');
	        }
	        $('.js-equation-builder').stop().fadeOut(200).remove();
	        refreshEquationsList(Florence.collection.id, pageData);
	      }
	    });
	  });

	  function buildEquationObject() {
	    if (!equation) {
	      equation = {};
	    }

	    equation.type = "equation";
	    equation.filename = equation.filename ? equation.filename : StringUtils.randomId();
	    equation.uri = pageUrl + "/" + equation.filename;
	    equation.title = $('#equation-title').val();
	    equation.content = $('#equation-content').val();

	    return equation;
	  }


	  function renderPreview(content) {
	    renderingPreview = true;
	    var svg;
	    $.ajax({
	      url: "/zebedee/equationpreview/",
	      type: 'POST',
	      contentType: 'text/plain',
	      crossDomain: true,
	      data: JSON.stringify(content),
	      success: function (data) {
	        svg = data;
	        $(".js-equation-preview").html(svg);
	        renderingPreview = false;
	      },
	      error: function () {
	        renderingPreview = false;
	      }
	    });
	  }

	}// fully load the equations list from scratch
	function loadEquationsList(collectionId, data) {
	    var html = templates.workEditEquations(data);
	    $('#equations').replaceWith(html);
	    initialiseEquationList(collectionId, data);
	    initialiseClipboard();
	}

	// refresh only the list of equations - leaving the container div that accordion works from.
	function refreshEquationsList(collectionId, data) {
	    var html = templates.workEditEquations(data);
	    $('#equation-list').replaceWith($(html).find('#equation-list'));
	    initialiseEquationList(collectionId, data);
	    initialiseClipboard();
	}

	// do all the wiring up of buttons etc once the template has been rendered.
	function initialiseEquationList(collectionId, data) {

	    $('#add-equation').click(function () {
	        loadEquationBuilder(data, function () {
	            refreshPreview();

	            putContent(collectionId, data.uri, JSON.stringify(data),
	                success = function () {
	                    Florence.Editor.isDirty = false;
	                    refreshPreview();
	                    refreshEquationsList(collectionId, data);
	                },
	                error = function (response) {
	                    handleApiError(response);
	                }
	            );
	        });
	    });

	    $(data.equations).each(function (index, equation) {

	        var basePath = data.uri;
	        var equationPath = basePath + '/' + equation.filename;
	        var equationJson = equationPath;

	        $("#equation-edit_" + index).click(function () {
	            getPageData(collectionId, equationJson,
	                onSuccess = function (equationData) {

	                    loadEquationBuilder(data, function () {
	                        refreshPreview();

	                        putContent(collectionId, basePath, JSON.stringify(data),
	                            success = function () {
	                                Florence.Editor.isDirty = false;
	                                refreshPreview();
	                                refreshEquationList(collectionId, data);
	                            },
	                            error = function (response) {
	                                handleApiError(response);
	                            }
	                        );
	                    }, equationData);
	                })
	        });

	        $("#equation-delete_" + index).click(function () {
	            swal({
	                title: "Warning",
	                text: "Are you sure you want to delete this equation?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Delete",
	                cancelButtonText: "Cancel",
	                closeOnConfirm: false
	            }, function (result) {
	                if (result === true) {
	                    $(this).parent().remove();
	                    data.equations = _(data.equations).filter(function (item) {
	                        return item.filename !== equation.filename
	                    });
	                    putContent(collectionId, basePath, JSON.stringify(data),
	                        success = function () {
	                            deleteEquation(collectionId, equationJson, onSuccess = function () {
	                            }, onError = function () {
	                            });
	                            Florence.Editor.isDirty = false;
	                            swal({
	                                title: "Deleted",
	                                text: "This equation has been deleted",
	                                type: "success",
	                                timer: 2000
	                            });
	                            refreshEquationsList(collectionId, data);
	                        },
	                        error = function (response) {
	                            handleApiError(response);
	                        }
	                    );
	                }
	            });
	        });
	    });
	    // Make sections sortable
	    function sortable() {
	        $('#sortable-equation').sortable();
	    }

	    sortable();
	}


	/**
	 * Load the image builder screen. This screen is for adding images that cannot be built using the chart
	 * builder, hence the additional parameters in the builder that imitate a chart.
	 * @param pageData - The data for the page the image is being added to.
	 * @param onSave - The function to call when the image is saved and the image builder is closed.
	 * @param image - The existing image object if an existing image is being edited.
	 */
	function loadImageBuilder(pageData, onSave, image) {
	  var pageUrl = pageData.uri;
	  var previewImage;

	  // render the template for the image builder screen
	  var html = templates.imageBuilder(image);
	  $('body').append(html);

	  // The files uploaded as part of the image creation are stored in an array on the image object.
	  // These keys identify the different types of files that can be added.
	  var imageFileKey = "uploaded-image"; // The actual image shown on screen
	  var dataFileKey = "uploaded-data"; // The associated data file for the image.

	  // if we are passing an existing image to the builder, go ahead and show it.
	  if (image) {
	    renderImage(getImageUri(image));
	    renderText();
	  }

	  // If any text fields on the form are changed, update them.
	  $('.refresh-text').on('input', function () {
	    renderText();
	  });

	  $('#upload-image-form').submit(function (event) {
	    event.preventDefault();
	    event.stopImmediatePropagation();

	    var formData = new FormData($(this)[0]);
	    var file = this[0].files[0];
	    if (!file) {
	      sweetAlert('Please select a file to upload.');
	      return;
	    }

	    if (!/\.png|.jpeg$|.jpg$|/.test(file)) {
	      sweetAlert('The data file upload is limited to PNG and JPEG.', "", "info");
	      return;
	    }

	    var fileExtension = file.name.split('.').pop();
	    previewImage = buildJsonObjectFromForm(previewImage);
	    var imagePath = previewImage.uri + '.' + fileExtension;
	    var imageFileName = previewImage.filename + '.' + fileExtension;
	    var fileExists = getExistingFileName(previewImage, imageFileKey);

	    uploadFile(
	      imagePath,
	      formData,
	      success = function () {
	        if (!fileExists) {
	          previewImage.files.push({type: imageFileKey, filename: imageFileName, fileType: fileExtension});
	        }
	        renderImage(getImageUri(previewImage));
	      });

	    return false;
	  });

	  $('#upload-data-form').submit(function (event) {
	    $(this).find(':submit').attr('disabled', 'disabled');
	    event.preventDefault();
	    event.stopImmediatePropagation();

	    var formData = new FormData($(this)[0]);
	    var file = this[0].files[0];
	    if (!file) {
	      sweetAlert('Please select a file to upload.');
	      return;
	    }

	    if (!/\.csv$|.xls$|.xlsx$|/.test(file)) {
	      sweetAlert('The data file upload is limited to CSV, XLS, or XLSX.');
	      return;
	    }

	    var fileExtension = file.name.split('.').pop();
	    previewImage = buildJsonObjectFromForm(previewImage);
	    var filePath = previewImage.uri + '.' + fileExtension;
	    var fileName = previewImage.filename + '.' + fileExtension;
	    var fileExists = getExistingFileName(previewImage, dataFileKey);

	    uploadFile(
	      filePath,
	      formData,
	      success = function () {
	        if (!fileExists) {
	          swal({
	            title: "Upload complete",
	            text: "Upload complete",
	            type: "success",
	            timer: 2000
	          });
	          previewImage.files.push({type: dataFileKey, filename: fileName, fileType: fileExtension});
	        }
	      });

	    return false;
	  });


	  function mapImageJsonValues(from, to) {
	    to = buildJsonObjectFromForm(to);

	    $(from.files).each(function (fromIndex, fromFile) {
	      var fileExistsInImage = false;

	      $(to.files).each(function (toIndex, toFile) {
	        if (fromFile.type == toFile.type) {
	          fileExistsInImage = true;
	          toFile.fileName = fromFile.fileName;
	          toFile.fileType = fromFile.fileType;
	        }
	      });

	      if (!fileExistsInImage) {
	        to.files.push(fromFile);
	      }
	    });

	    return to;
	  }

	  $('.btn-image-builder-create').on('click', function () {

	    previewImage = buildJsonObjectFromForm(previewImage);

	    if (!previewImage.title) {
	      sweetAlert("Please enter a title for the image.");
	      return;
	    }

	    var imageFileName = getExistingFileName(previewImage, imageFileKey);
	    if (!imageFileName && image)
	      imageFileName = getExistingFileName(image, imageFileKey);
	    if (!imageFileName) {
	      sweetAlert("Please upload an image");
	      return;
	    }

	    var imageExists = false;
	    if (image) {
	      imageExists = true;
	      // map preview image values onto image
	      image = mapImageJsonValues(previewImage, image);
	    } else { // just use the preview files
	      image = previewImage;
	      addImageToPageJson(image);
	    }

	    saveImageJson(image, success = function () {

	      // if there is an image that exists already, overwrite it.
	      if (imageExists) {
	        $(previewImage.files).each(function (index, file) {
	          var fromFile = pageUrl + '/' + file.filename;
	          var toFile = pageUrl + '/' + file.filename.replace(previewImage.filename, image.filename);
	          if (fromFile != toFile) {
	            console.log("moving... table file: " + fromFile + " to: " + toFile);
	            renameContent(Florence.collection.id, fromFile, toFile,
	              onSuccess = function () {
	                console.log("Moved table file: " + fromFile + " to: " + toFile);
	              });
	          }
	        });
	      }

	      if (onSave) {
	        onSave(image.filename, '<ons-image path="' + image.filename + '" />', pageData);
	      }
	      closeImageBuilderScreen();
	    });
	  });

	  $('.btn-image-builder-cancel').on('click', function () {

	    closeImageBuilderScreen();

	    if (previewImage) {
	      $(previewImage.files).each(function (index, file) {

	        var fileToDelete = pageUrl + '/' + file.filename;
	        deleteContent(Florence.collection.id, fileToDelete,
	          onSuccess = function () {
	            console.log("deleted image file: " + fileToDelete);
	          });
	      });
	    }
	  });

	  function closeImageBuilderScreen() {
	    $('.image-builder').stop().fadeOut(200).remove();
	  }

	  setShortcuts('#image-title');
	  setShortcuts('#image-subtitle');

	  function renderText() {
	    var title = doSuperscriptAndSubscript($('#image-title').val());
	    var subtitle = doSuperscriptAndSubscript($('#image-subtitle').val());
	    $('#image-title-preview').html(title);
	    $('#image-subtitle-preview').html(subtitle);
	    $('#image-source-preview').html($('#image-source').val());
	    $('#image-notes-preview').html(toMarkdown($('#image-notes').val()));
	  }

	  function renderImage(imageUri) {
	    var iframeMarkup = '<iframe id="preview-frame" frameBorder ="0" scrolling = "yes" src="' + '/zebedee/resource/' + Florence.collection.id + '?uri=' + imageUri + '"></iframe>';
	    $('#image').html(iframeMarkup);
	    var iframe = document.getElementById('preview-frame');
	    iframe.height = "500px";
	    iframe.width = "100%";
	    setTimeout(
	      function () {
	        body = $('#preview-frame').contents().find('body');
	        $(body).children().css('height', '100%');
	      }, 100);
	  }

	  function toMarkdown(text) {
	    if (text && isMarkdownAvailable) {
	      var converter = new Markdown.getSanitizingConverter();
	      Markdown.Extra.init(converter, {
	        extensions: "all"
	      });
	      return converter.makeHtml(text)
	    }
	    return '';
	  }

	  function isMarkdownAvailable() {
	    return typeof Markdown !== 'undefined'
	  }

	  function doSuperscriptAndSubscript(text) {
	    if (text && isMarkdownAvailable) {
	      var converter = new Markdown.Converter();
	      return converter._DoSubscript(converter._DoSuperscript(text));
	    }
	    return text;

	  }


	  function uploadFile(path, formData, success) {
	    $.ajax({
	      url: "/zebedee/content/" + Florence.collection.id + "?uri=" + path,
	      type: 'POST',
	      data: formData,
	      async: false,
	      cache: false,
	      contentType: false,
	      processData: false,
	      success: function () {
	        if (success) {
	          success();
	        }
	      }
	    });
	  }

	  function getImageUri(image) {
	    if (pageUrl === '/') {
	      return '/' + getImageFilename(image);
	    } else {
	      return pageData.uri + '/' + getImageFilename(image);
	    }
	  }

	  function getImageFilename(image) {
	    return getExistingFileName(image, imageFileKey)
	  }

	  // for any figure object, iterate the files and return the file path for the given key.
	  function getExistingFileName(object, key) {
	    var result;
	    _.each(object.files, function (file) {
	      if (key === file.type) {
	        result = file.filename;
	      }
	    });
	    return result;
	  }

	  function saveImageJson(image, success, error) {
	    var noExtension = image.uri.match(/^(.+?)(\.[^.]*$|$)/);
	    var imageJson = noExtension[1] + ".json";

	    $.ajax({
	      url: "/zebedee/content/" + Florence.collection.id + "?uri=" + imageJson,
	      type: 'POST',
	      data: JSON.stringify(image),
	      processData: false,
	      contentType: 'application/json',
	      success: function (response) {
	        if (success)
	          success(response);
	      },
	      error: function (response) {
	        if (error) {
	          error(response);
	        } else {
	          handleApiError(response);
	        }
	      }
	    });
	  }

	  function addImageToPageJson(image) {
	    if (!pageData.images) {
	      pageData.images = [];
	    } else {

	      var existingImage = _.find(pageData.images, function (existingImage) {
	        return existingImage.filename === image.filename;
	      });

	      if (existingImage) {
	        existingImage.title = image.title;
	        return;
	      }
	    }

	    pageData.images.push({title: image.title, filename: image.filename, uri: image.uri});
	  }

	  function buildJsonObjectFromForm(image) {
	    if (!image) {
	      image = {};
	    }

	    image.type = "image";
	    // give the image a unique ID if it does not already have one.
	    image.filename = image.filename ? image.filename : StringUtils.randomId();
	    image.title = $('#image-title').val();
	    if (pageUrl === '/') {
	      image.uri = "/" + image.filename;
	    } else {
	      image.uri = pageUrl + "/" + image.filename;
	    }
	    image.subtitle = $('#image-subtitle').val();
	    image.source = $('#image-source').val();
	    image.notes = $('#image-notes').val();
	    image.altText = $('#image-alt-text').val();

	    if (!image.files) {
	      image.files = [];
	    }

	    return image;
	  }
	}


	function loadImagesList(collectionId, data) {
	    var html = templates.workEditImages(data);
	    $('#images').replaceWith(html);
	    initialiseImagesList(collectionId, data);
	    initialiseClipboard();
	}

	function refreshImagesList(collectionId, data) {
	    var html = templates.workEditImages(data);
	    $('#image-list').replaceWith($(html).find('#image-list'));
	    initialiseImagesList(collectionId, data);
	    initialiseClipboard();
	}

	function initialiseImagesList(collectionId, data) {

	    $('#add-image').click(function () {
	        loadImageBuilder(data, function () {
	            Florence.Editor.isDirty = false;
	            refreshImagesList(collectionId, data);
	        });
	    });

	    $(data.images).each(function (index, image) {
	        var basePath = data.uri;
	        var noExtension = image.uri.match(/^(.+?)(\.[^.]*$|$)/);
	        var imageJson = noExtension[1] + '.json';

	        $("#image-edit_" + index).click(function () {
	            getPageResource(collectionId, imageJson,
	                onSuccess = function (imageData) {
	                    loadImageBuilder(data, function () {
	                        Florence.Editor.isDirty = false;
	                        //refreshPreview();
	                        refreshImagesList(collectionId, data);
	                    }, imageData);
	                }
	            );
	        });

	        $("#image-delete_" + index).click(function () {
	            swal({
	                title: "Warning",
	                text: "Are you sure you want to delete this image?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Delete",
	                cancelButtonText: "Cancel",
	                closeOnConfirm: false
	            }, function (result) {
	                if (result === true) {
	                    $(this).parent().remove();
	                    // delete any files associated with the image.
	                    getPageResource(collectionId, imageJson,
	                        onSuccess = function (imageData) {
	                            if (imageData.files) {
	                                _.each(imageData.files, function (file) {
	                                    var fileUri = basePath + '/' + file.filename;
	                                    //console.log('deleting ' + fileUri);
	                                    deleteContent(collectionId, fileUri, function () {
	                                    }, function () {
	                                    });
	                                });
	                            } else {
	                                //console.log('deleting ' + image.uri);
	                                deleteContent(collectionId, image.uri);
	                            }
	                        });

	                    // remove the image from the page json when its deleted
	                    data.images = _(data.images).filter(function (item) {
	                        return item.filename !== image.filename;
	                    });

	                    // save the updated page json
	                    putContent(collectionId, basePath, JSON.stringify(data),
	                        success = function () {
	                            Florence.Editor.isDirty = false;

	                            swal({
	                                title: "Deleted",
	                                text: "This image has been deleted",
	                                type: "success",
	                                timer: 2000
	                            });

	                            refreshImagesList(collectionId, data);

	                            // delete the image json file
	                            deleteContent(collectionId, imageJson,
	                                onSuccess = function () {
	                                },
	                                error = function (response) {
	                                    if (response.status !== 404)
	                                        handleApiError(response);
	                                });
	                        },
	                        error = function (response) {
	                            handleApiError(response);
	                        }
	                    );
	                }
	            });
	        });
	    });
	    // Make sections sortable
	    function sortable() {
	        $('#sortable-image').sortable();
	    }

	    sortable();
	}
	function loadImportScreen (collectionId) {

	  getCollection(collectionId,
	    success = function (collection) {
	      var html = templates.workImport;
	      $('.workspace-menu').html(html);

	      $('#UploadForm').submit(function (e) {
	        e.preventDefault();
	        e.stopImmediatePropagation();

	        var formdata = new FormData();

	        function showUploadedItem(source) {
	          $('#list').append(source);
	        }

	        var file = this[0].files[0];
	        if (!file) {
	          sweetAlert("Please select a file to upload");
	          return;
	        }

	        document.getElementById("response").innerHTML = "Uploading . . .";

	        var fileNameNoSpace = file.name.replace(/[^a-zA-Z0-9\.]/g, "").toLowerCase();
	        var uriUpload = "/" + fileNameNoSpace;

	        // check if the file already exists.
	        //if (data[field] && data[field].length > 0) {
	        //  $(data[field]).each(function (i, filesUploaded) {
	        //    if (filesUploaded.file === fileNameNoSpace || filesUploaded.file === fileNameNoSpace ) {
	        //      sweetAlert('This file already exists');
	        //      $('#' + lastIndex).remove();
	        //      formdata = false;  // if not present the existing file was being overwritten
	        //      return;
	        //    }
	        //  });
	        //}

	        if (file.name.match(".csv")) {
	          showUploadedItem(fileNameNoSpace);
	          if (formdata) {
	            formdata.append("name", file);
	          }
	        } else {
	          sweetAlert("This file type is not supported");
	          return;
	        }

	        if (formdata) {
	          $.ajax({
	            url: "/zebedee/timeseriesimport/" + collectionId + "?uri=" + uriUpload,
	            type: 'POST',
	            data: formdata,
	            cache: false,
	            processData: false,
	            contentType: false,
	            success: function () {
	              document.getElementById("response").innerHTML = "File uploaded successfully";
	              //if (!data[field]) {
	              //  data[field] = [];
	              //}
	              //data[field].push({title: '', file: fileNameNoSpace});
	            }
	          });
	        }
	      });
	    },
	    error = function (response) {
	      handleApiError(response);
	    }
	  );




	}

	/**
	 * Manages markdown editor
	 * @param content
	 * @param onSave
	 * @param pageData
	 * @param notEmpty - if present, markdown cannot be left empty
	 */

	function loadMarkdownEditor(content, onSave, pageData, notEmpty) {

	    if (content.title == undefined) {
	        var html = templates.markdownEditorNoTitle(content);
	        $('body').append(html);
	        $('.markdown-editor').stop().fadeIn(200);
	        $('#wmd-input').focus();
	    } else {
	        var html = templates.markdownEditor(content);
	        $('body').append(html);
	        $('.markdown-editor').stop().fadeIn(200);
	        $('#wmd-input').focus();
	    }

	    markdownEditor();

	    var markdown = $('#wmd-input').val();

	    // Detect if markdown updated and update variable
	    $('#wmd-input').on('input', function() {
	        markdown = $('#wmd-input').val();
	    });

	    if (notEmpty === true || markdown === '') {
	        $('.btn-markdown-editor-cancel').hide();
	    } else {
	        $('.btn-markdown-editor-cancel').on('click', function () {
	            $('.markdown-editor').stop().fadeOut(200).remove();
	        });
	    }

	    $(".btn-markdown-editor-save").click(function () {
	        onSave(markdown);
	    });

	    if (notEmpty) {
	        $(".btn-markdown-editor-exit").click(function () {
	            if (markdown === '') {
	                sweetAlert('Please add some text', "This can't be left empty");
	            } else {
	                onSave(markdown);
	                $('.markdown-editor').stop().fadeOut(200).remove();
	            }
	        });
	    } else {
	        $(".btn-markdown-editor-exit").click(function () {
	            // Just a little test to see if the markdown is ever getting set to null - can delete it later if this is never fired
	            if (!markdown || markdown == "null") {
	                console.log("Error, undefined or null markdown value");
	            }
	            onSave(markdown);
	            $('.markdown-editor').stop().fadeOut(200).remove();
	        });
	    }

	    var onInsertSave = function (name, markdown) {
	        insertAtCursor($('#wmd-input')[0], markdown);
	        $('#wmd-input').trigger('input');
	        Florence.Editor.markdownEditor.refreshPreview();
	    };

	    $("#js-editor--chart").click(function () {
	        loadChartBuilder(pageData, onInsertSave);
	    });

	    $("#js-editor--table").click(function () {
	        loadTableBuilder(pageData, onInsertSave);
	    });

	    $("#js-editor--equation").click(function () {
	        loadEquationBuilder(pageData, onInsertSave);
	    });

	    $("#js-editor--image").click(function () {
	        loadImageBuilder(pageData, function (name, markdown, pageData) {
	            onInsertSave(name, markdown);
	            refreshImagesList(Florence.collection.id, pageData)
	        });
	    });

	    $("#js-editor--embed").click(function () {
	        loadEmbedIframe(function (markdown) {
	            onInsertSave('', markdown);
	        });
	    });

	    $("#wmd-input").on('click', function () {
	        markDownEditorSetLines();
	    });

	    $("#wmd-input").on('keyup', function () {
	        markDownEditorSetLines();
	    });

	    // http://stackoverflow.com/questions/6140632/how-to-handle-tab-in-textarea
	    $("#wmd-input").keydown(function (e) {
	        if (e.keyCode === 9) { // tab was pressed
	            // get caret position/selection
	            var start = this.selectionStart;
	            var end = this.selectionEnd;

	            var $this = $(this);
	            var value = $this.val();

	            // set textarea value to: text before caret + tab + text after caret
	            $this.val(value.substring(0, start)
	                + "\t"
	                + value.substring(end));

	            // put caret at right position again (add one for the tab)
	            this.selectionStart = this.selectionEnd = start + 1;

	            // prevent the focus lose
	            e.preventDefault();
	        }
	    });

	    // http://stackoverflow.com/questions/11076975/insert-text-into-textarea-at-cursor-position-javascript
	    function insertAtCursor(field, value) {
	        //IE support
	        if (document.selection) {
	            field.focus();
	            sel = document.selection.createRange();
	            sel.text = value;
	        }
	        //MOZILLA and others
	        else if (field.selectionStart || field.selectionStart == '0') {
	            var startPos = field.selectionStart;
	            var endPos = field.selectionEnd;
	            field.value = field.value.substring(0, startPos)
	                + value
	                + field.value.substring(endPos, field.value.length);
	            field.selectionStart = startPos + value.length;
	            field.selectionEnd = startPos + value.length;
	        } else {
	            field.value += value;
	        }
	    }
	}


	function markdownEditor() {

	    var converter = new Markdown.getSanitizingConverter();

	    // output chart tag as text instead of the actual tag.
	    converter.hooks.chain("preBlockGamut", function (text) {
	        var newText = text.replace(/(<ons-chart\spath="[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)*[\]$]+"?\s?\/>)/ig, function (match) {
	            var path = $(match).attr('path');
	            return '[chart path="' + path + '" ]';
	        });
	        return newText;
	    });

	    // output table tag as text instead of the actual tag.
	    converter.hooks.chain("preBlockGamut", function (text) {
	        var newText = text.replace(/(<ons-table\spath="[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)*[\]$]+"?\s?\/>)/ig, function (match) {
	            var path = $(match).attr('path');
	            return '[table path="' + path + '" ]';
	        });
	        return newText;
	    });

	    // output equation tag as text instead of the actual tag.
	    converter.hooks.chain("preBlockGamut", function (text) {
	        var newText = text.replace(/(<ons-equation\spath="[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)*[\]$]+"?\s?\/>)/ig, function (match) {
	            var path = $(match).attr('path');
	            return '[equation path="' + path + '" ]';
	        });
	        return newText;
	    });

	    // output interactive tag as text instead of the actual tag.
	    converter.hooks.chain("preBlockGamut", function (text) {
	        var newText = text.replace(/(<ons-interactive\surl="[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)*[\]$]+"?\s?\/>)/ig, function (match) {
	            var path = $(match).attr('url');
	            return '[interactive url="' + path + '" ]';
	        });
	        return newText;
	    });

	    converter.hooks.chain("plainLinkText", function (link) {
	        console.log("link done, innit");
	        console.log(link);
	    });

	    Markdown.Extra.init(converter, {
	        extensions: "all"
	    });

	    var editor = new Markdown.Editor(converter);
	    Florence.Editor.markdownEditor = editor;

	    editor.hooks.chain("onPreviewRefresh", function () {
	        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	    });

	    editor.run();
	    markDownEditorSetLines();
	}

	/**
	 * Editor data loader
	 * @param path
	 * @param collectionId
	 * @param click - if present checks the page url to keep in sync with iframe
	 */

	function loadPageDataIntoEditor(path, collectionId, click) {

	    if (Florence.globalVars.welsh) {
	        if (path === '/') {       //add whatever needed to read content in Welsh
	            var pageUrlData = path + '&lang=cy';
	            var toApproveUrlData = '/data_cy.json';
	        } else {
	            var pageUrlData = path + '&lang=cy';
	            var toApproveUrlData = path + '/data_cy.json';
	        }
	    } else {
	        if (path === '/') {       //add whatever needed to read content in English
	            var pageUrlData = path;
	            var toApproveUrlData = '/data.json';
	        } else {
	            var pageUrlData = path;
	            var toApproveUrlData = path + '/data.json';
	        }
	    }

	    var pageData, isPageComplete;
	    var ajaxRequests = [];

	    ajaxRequests.push(
	        getPageData(collectionId, pageUrlData,
	            success = function (response) {
	                pageData = response;
	            },
	            error = function (response) {
	                handleApiError(response);
	            }
	        )
	    );

	    ajaxRequests.push(
	        getCollection(collectionId,
	            success = function (response) {
	                var lastCompletedEvent = getLastCompletedEvent(response, toApproveUrlData);
	                isPageComplete = !(!lastCompletedEvent || lastCompletedEvent.email === Florence.Authentication.loggedInEmail());
	            },
	            error = function (response) {
	                handleApiError(response);
	            })
	    );

	    $.when.apply($, ajaxRequests).then(function () {
	        if (click) {
	            var iframe = getPreviewUrl();
	            if (iframe !== pageData.uri) {
	                setTimeout(loadPageDataIntoEditor(path, collectionId), 200);
	            } else {
	                renderAccordionSections(collectionId, pageData, isPageComplete);
	            }
	        } else {
	            renderAccordionSections(collectionId, pageData, isPageComplete);
	        }
	    });
	}
	function loadParentLink(collectionId, data, parentUrl) {

	  getPageDataTitle(collectionId, parentUrl,
	      function (response) {
	        var parentTitle = response.title;
	        $('.child-page__title').append(parentTitle);
	      },
	      function () {
	        sweetAlert("Error", "Could not find parent that this is a sub page of", "error");
	      }
	  );

	  //Add link back to parent page
	  $('.child-page').append("<a class='child-page__link'>Back to parent page</a>");

	  //Take user to parent edit screen on link click
	  $('.child-page__link').click(function () {
	    //If there are edits check whether user wants to continue
	    if (Florence.Editor.isDirty) {
	      swal ({
	        title: "Warning",
	        text: "You have unsaved changes. Are you sure you want to continue?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Continue",
	        cancelButtonText: "Cancel"
	      }, function (result) {
	        if (result === true) {
	          Florence.Editor.isDirty = false;
	          //Return to parent if user confirms it
	          updateContent(collectionId, data.uri, JSON.stringify(data), parentUrl);
	          return true;
	        }
	      });
	    } else {
	      //Return to parent without saving
	      createWorkspace(parentUrl, collectionId, 'edit');
	    }
	  });

	}/**
	 * Creates releases' JSON
	 * @param collectionId
	 * @param releaseDate
	 * @param pageType
	 * @param parentUrl
	 */

	function loadT16Creator(collectionId, releaseDate, pageType, parentUrl) {
	    var releaseDate = null;             //overwrite scheduled collection date
	    var pageType, pageTitle, uriSection, pageTitleTrimmed, newUri, pageData, safeNewUri;
	    var parentUrlData = "/data"; //home page
	    $.ajax({
	        url: parentUrlData,
	        dataType: 'json',
	        crossDomain: true,
	        success: function (checkData) {
	            //Checks page is built in correct location
	            if (checkData.type === 'home_page') {
	                submitFormHandler();
	                return true;
	            } else {
	                sweetAlert("This is not a valid place to create this page.");
	                loadCreateScreen(parentUrl, collectionId);
	            }
	        },
	        error: function () {
	            console.log('No page data returned');
	        }
	    });

	    function submitFormHandler() {
	        $('.edition').append(
	            '<label for="releaseDate">Release date</label>' +
	            '<input id="releaseDate" type="text" placeholder="day month year" />' +
	            '<div class="select-wrap select-wrap--half">' +
	            '<select id="hour">' +
	            '  <option value="0">00</option>' +
	            '  <option value="3600000">01</option>' +
	            '  <option value="7200000">02</option>' +
	            '  <option value="10800000">03</option>' +
	            '  <option value="14400000">04</option>' +
	            '  <option value="18000000">05</option>' +
	            '  <option value="21600000">06</option>' +
	            '  <option value="25200000">07</option>' +
	            '  <option value="28800000">08</option>' +
	            '  <option value="32400000" selected="selected">09</option>' +
	            '  <option value="36000000">10</option>' +
	            '  <option value="39600000">11</option>' +
	            '  <option value="43200000">12</option>' +
	            '  <option value="46800000">13</option>' +
	            '  <option value="50400000">14</option>' +
	            '  <option value="54000000">15</option>' +
	            '  <option value="57600000">16</option>' +
	            '  <option value="61200000">17</option>' +
	            '  <option value="64800000">18</option>' +
	            '  <option value="68400000">19</option>' +
	            '  <option value="72000000">20</option>' +
	            '  <option value="75600000">21</option>' +
	            '  <option value="79200000">22</option>' +
	            '  <option value="82800000">23</option>' +
	            '</select>' +
	            '</div>' +
	            '<div class="select-wrap select-wrap--half">' +
	            '<select id="min">' +
	            '  <option value="0">00</option>' +
	            '  <option value="1800000" selected="selected">30</option>' +
	            '</select>' +
	            '</div>'
	        );
	        // $('#releaseDate').datepicker({
	        //     dateFormat: 'dd MM yy',
	        //     onSelect: function() {
	        //         $('select#hour').focus();
	        //     }
	        // });
	        creatorDatePicker();

	        //Submits inherited and added information to JSON
	        $('form').off().submit(function (e) {
	            var nameValid = validatePageName();
	            if (!nameValid) {
	                return false;
	            }
	            pageData = pageTypeDataT16(pageType);
	            var publishTime = parseInt($('#hour').val()) + parseInt($('#min').val());
	            var toIsoDate = $('#releaseDate').datepicker("getDate");
	            pageData.description.releaseDate = new Date(parseInt(new Date(toIsoDate).getTime()) + publishTime).toISOString();
	            pageData.description.edition = $('#edition').val();
	            pageTitle = $('#pagename').val();
	            pageData.description.title = pageTitle;
	            uriSection = "releases";
	            pageTitleTrimmed = pageTitle.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	            newUri = makeUrl(uriSection, pageTitleTrimmed);
	            safeNewUri = checkPathSlashes(newUri);

	            if (!pageData.description.releaseDate) {
	                sweetAlert('Release date can not be empty');
	                return true;
	            }
	            if (pageTitle.length < 5) {
	                sweetAlert("This is not a valid file title");
	                return true;
	            } else {
	                Florence.globalVars.pagePath = safeNewUri;
	                saveContent(collectionId, safeNewUri, pageData);
	            }
	            e.preventDefault();
	        });
	    }
	}

	function pageTypeDataT16(pageType) {
	    return {
	        "description": {
	            "releaseDate": "",
	            "provisionalDate": "",
	            "finalised": false,
	            "nextRelease": "", //does not make sense
	            "contact": {
	                "name": "",
	                "email": "",
	                "telephone": ""
	            },
	            "summary": "",
	            "title": "",
	            "nationalStatistic": false,
	            "cancelled": false,
	            "cancellationNotice": [],
	            "published": false
	        },
	        "markdown": [],
	        "relatedDatasets": [],
	        "relatedDocuments": [],
	        "relatedMethodology": [],
	        "relatedMethodologyArticle": [],
	        "links": [],
	        type: pageType,
	        "dateChanges": []
	    };
	}

	/**
	 * Creates article and bulletin JSON
	 * @param collectionId
	 * @param releaseDate
	 * @param pageType
	 * @param parentUrl
	 */

	function loadT4Creator(collectionId, releaseDate, pageType, parentUrl) {
	    var releaseDate = null;             //overwrite scheduled collection date
	    var conditions = true;
	    var pageType, pageTitle, uriSection, pageTitleTrimmed, pageEditionTrimmed, releaseDateManual,
	        isInheriting, newUri, pageData, natStat, contactName, contactEmail,
	        contactTel, keyWords, metaDescr, relatedData, summary, relatedMethodology;
	    var parentUrlData = parentUrl + "/data";
	    $.ajax({
	        url: parentUrlData,
	        dataType: 'json',
	        crossDomain: true,
	        success: function (checkData) {
	            if (checkData.type === 'product_page' && !Florence.globalVars.welsh) {
	                var checkedUrl = checkPathSlashes(checkData.uri);
	                submitFormHandler(checkedUrl);
	                return true;
	            }
	            if ((checkData.type === 'bulletin' && pageType === 'bulletin') || (checkData.type === 'article' && pageType === 'article') || (checkData.type === 'article_download' && pageType === 'article_download')) {
	                var checkedUrl = checkPathSlashes(checkData.uri);
	                var safeParentUrl = getParentPage(checkedUrl);
	                natStat = checkData.description.nationalStatistic;
	                contactName = checkData.description.contact.name;
	                contactEmail = checkData.description.contact.email;
	                contactTel = checkData.description.contact.telephone;
	                pageTitle = checkData.description.title;
	                keyWords = checkData.description.keywords;
	                summary = checkData.description.summary;
	                metaDescr = checkData.description.metaDescription;
	                relatedMethodology = checkData.relatedMethodology;
	                if (checkData.type === 'bulletin' && pageType === 'bulletin') {
	                    relatedData = checkData.relatedData;
	                }
	                isInheriting = true;
	                submitFormHandler(safeParentUrl, pageTitle, isInheriting);
	                return true;
	            } else {
	                sweetAlert("This is not a valid place to create this page.");
	                loadCreateScreen(parentUrl, collectionId);
	            }
	        },
	        error: function () {
	            console.log('No page data returned');
	        }
	    });

	    function submitFormHandler(parentUrl, title, isInheriting) {

	        $('.edition').append(
	            '<div id="edition-div">' +
	            '  <label for="edition">Edition</label>' +
	            '  <input id="edition" type="text" placeholder="August 2010, Q3 2015, 1978, etc." />' +
	            '</div>'
	        );
	        if (!releaseDate) {
	            $('.edition').append(
	                '<div id="release-div">' +
	                '  <label for="releaseDate">Release date</label>' +
	                '  <input id="releaseDate" type="text" placeholder="day month year" />' +
	                '</div>'
	            );
	            creatorDatePicker();
	        }
	        if(!isInheriting) {
	            $('.btn-page-create').before(
	                '<p class="create-publishing-error">Creating a publication here will create a new series.</p>'
	            )
	        }
	        if (title) {
	            pageTitle = title;
	            $('#pagename').val(title);
	        }

	        $('form').off().submit(function (e) {
	            e.preventDefault();
	            releaseDateManual = $('#releaseDate').val();

	            // Do input validation
	            var nameValid = validatePageName();
	            var editionValid = validatePageName('#edition');
	            if (!nameValid || !editionValid) {
	                return false;
	            }

	            pageData = pageTypeDataT4(pageType);
	            pageData.description.edition = $('#edition').val();
	            if (title) {
	                //do nothing;
	            } else {
	                pageTitle = $('#pagename').val();
	            }
	            pageData.description.title = pageTitle;
	            if (pageType === 'article_download') {
	                uriSection = 'articles';
	            } else {
	                uriSection = pageType + "s";
	            }
	            pageTitleTrimmed = pageTitle.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	            if (pageData.description.edition) {
	                pageEditionTrimmed = pageData.description.edition.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	                var releaseUri = pageEditionTrimmed;
	            }

	            if (!pageData.description.edition && releaseDateManual) {                          //Manual collections
	                date = $.datepicker.parseDate("dd MM yy", releaseDateManual);
	                releaseUri = $.datepicker.formatDate('yy-mm-dd', date);
	            } else if (!pageData.description.edition && !releaseDateManual) {
	                releaseUri = $.datepicker.formatDate('yy-mm-dd', new Date(releaseDate));
	            }

	            if (!releaseDate) {
	                pageData.description.releaseDate = new Date($('#releaseDate').val()).toISOString();
	            } else {
	                pageData.description.releaseDate = releaseDate;
	            }
	            if (isInheriting) {
	                pageData.description.nationalStatistic = natStat;
	                pageData.description.contact.name = contactName;
	                pageData.description.contact.email = contactEmail;
	                pageData.description.contact.telephone = contactTel;
	                pageData.description.keywords = keyWords;
	                pageData.description.metaDescription = metaDescr;
	                pageData.relatedMethodology = relatedMethodology;
	                if (pageType === 'bulletin') {
	                    pageData.description.summary = summary;
	                    pageData.relatedData = relatedData;
	                }
	                newUri = makeUrl(parentUrl, releaseUri);
	            } else {
	                newUri = makeUrl(parentUrl, uriSection, pageTitleTrimmed, releaseUri);
	            }
	            var safeNewUri = checkPathSlashes(newUri);

	            if (pageType === 'bulletin' && !pageData.description.edition) {
	                sweetAlert('Edition can not be empty');
	                $('.select-wrap').remove();
	                $('#edition-div').remove();
	                $('#release-div').remove();
	                loadT4Creator(collectionId, releaseDate, pageType, parentUrl);
	                e.preventDefault();
	                conditions = false;
	            }
	            if (!pageData.description.releaseDate) {
	                sweetAlert('Release date can not be empty');
	                $('.select-wrap').remove();
	                $('#edition-div').remove();
	                $('#release-div').remove();
	                loadT4Creator(collectionId, releaseDate, pageType, parentUrl);
	                e.preventDefault();
	                conditions = false;
	            }
	            if (pageTitle.length < 5) {
	                sweetAlert("This is not a valid file title");
	                $('.select-wrap').remove();
	                $('#edition-div').remove();
	                $('#release-div').remove();
	                loadT4Creator(collectionId, releaseDate, pageType, parentUrl);
	                e.preventDefault();
	                conditions = false;
	            }
	            else if (conditions) {
	                saveContent(collectionId, safeNewUri, pageData);
	            }
	        });
	    }

	    function pageTypeDataT4(pageType) {

	        if (pageType === "bulletin") {
	            return {
	                "description": {
	                    "title": "",
	                    "edition": "",
	                    "summary": "",
	                    "releaseDate": "",
	                    "nextRelease": "",
	                    "contact": {
	                        "name": "",
	                        "email": "",
	                        "telephone": ""
	                    },
	                    "nationalStatistic": false,
	                    "headline1": "",
	                    "headline2": "",
	                    "headline3": "",
	                    "keywords": [],
	                    "metaDescription": "",
	                },
	                "sections": [],
	                "accordion": [],
	                "relatedDocuments": [],
	                "relatedData": [],
	                "relatedMethodology": [],
	                "relatedMethodologyArticle": [],
	                "topics": [],
	                "links": [],
	                "charts": [],
	                "tables": [],
	                "equations": [],
	                "pdfTable": [],
	                "images": [],
	                "alerts": [],
	                "versions": [],
	                type: pageType
	            };
	        }

	        else if (pageType === "article") {
	            return {
	                "description": {
	                    "title": "",
	                    "edition": "",
	                    "_abstract": "",
	                    "releaseDate": "",
	                    "nextRelease": "",
	                    "contact": {
	                        "name": "",
	                        "email": "",
	                        "telephone": ""
	                    },
	                    "nationalStatistic": false,
	                    "keywords": [],
	                    "metaDescription": "",
	                },
	                "sections": [],
	                "accordion": [],
	                "relatedDocuments": [],
	                "relatedData": [],
	                "relatedMethodology": [],
	                "relatedMethodologyArticle": [],
	                "topics": [],
	                "links": [],
	                "charts": [],
	                "tables": [],
	                "equations": [],
	                "pdfTable": [],
	                "images": [],
	                "alerts": [],
	                "versions": [],
	                type: pageType
	            };
	        }

	        else if (pageType === "article_download") {
	            return {
	                "description": {
	                    "title": "",
	                    "_abstract": "",
	                    "edition": "",
	                    "releaseDate": "",
	                    "nextRelease": "",
	                    "contact": {
	                        "name": "",
	                        "email": "",
	                        "telephone": ""
	                    },
	                    "nationalStatistic": false,
	                    "keywords": [],
	                    "metaDescription": ""
	                },
	                "markdown": [],
	                "downloads": [],
	                "relatedDocuments": [],
	                "relatedData": [],
	                "relatedMethodology": [],
	                "relatedMethodologyArticle": [],
	                "topics": [],
	                "links": [],
	                "charts": [],
	                "tables": [],
	                "equations": [],
	                "images": [],
	                "alerts": [],
	                "versions": [],
	                type: pageType
	            };
	        }

	        else {
	            sweetAlert('Unsupported page type. This is not an article or a bulletin');
	        }
	    }
	}

	/**
	 * Creates compendium documents
	 * @param collectionId
	 * @param releaseDate
	 * @param pageType
	 * @param parentUrl
	 * @param pageTitle
	 */

	function loadT6Creator(collectionId, releaseDate, pageType, parentUrl, pageTitle) {
	    var releaseDate = null;             //overwrite scheduled collection date
	    var pageType, pageTitle, pageEdition, uriSection, pageTitleTrimmed, pageEditionTrimmed, releaseDateManual, isInheriting, newUri, pageData, parentData;
	    var parentUrlData = parentUrl + "/data";
	    $.ajax({
	        url: parentUrlData,
	        dataType: 'json',
	        crossDomain: true,
	        success: function (checkData) {
	            parentData = $.extend(true, {}, checkData);
	            if ((checkData.type === 'product_page' && pageType === 'compendium_landing_page' && !Florence.globalVars.welsh) ||
	                (checkData.type === 'compendium_landing_page' && pageType === 'compendium_chapter') ||
	                (checkData.type === 'compendium_landing_page' && pageType === 'compendium_data')) {
	                parentUrl = checkData.uri;
	                pageData = pageTypeDataT6(pageType, checkData);
	                if (pageTitle) {
	                    submitNoForm(parentUrl, pageTitle);
	                } else {
	                    submitFormHandler(parentUrl);
	                }
	                return true;
	            }
	            if (checkData.type === 'compendium_landing_page' && pageType === 'compendium_landing_page') {
	                parentUrl = getParentPage(checkData.uri);
	                pageTitle = checkData.description.title;
	                isInheriting = true;
	                pageData = pageTypeDataT6(pageType, checkData);
	                submitFormHandler(parentUrl, pageTitle, isInheriting);
	                return true;
	            } else {
	                sweetAlert("This is not a valid place to create this page.");
	                loadCreateScreen(parentUrl, collectionId);
	            }
	        },
	        error: function () {
	            console.log('No page data returned');
	        }
	    });

	    function submitFormHandler(parentUrl, title, isInheriting) {
	        $('.edition').empty();
	        if (pageType === 'compendium_landing_page') {
	            $('.edition').append(
	                '<label for="edition">Edition</label>' +
	                '<input id="edition" type="text" placeholder="August 2010, Q3 2015, 1978, etc." />' +
	                '<br>' +
	                '<label for="releaseDate">Release date</label>' +
	                '<input id="releaseDate" type="text" placeholder="day month year" />'
	            );
	            creatorDatePicker();
	        }
	        if (title) {
	            pageTitle = title;
	            $('#pagename').val(title);
	        }

	        $('form').off().submit(function (e) {
	            releaseDateManual = $('#releaseDate').val();

	            // Input validation
	            var nameValid = validatePageName();
	            var editionValid = validatePageName('#edition');
	            if (!nameValid || !editionValid) {
	                return false;
	            }

	            if (pageType === 'compendium_landing_page') {
	                pageData.description.edition = $('#edition').val();
	            }
	            if (!title) {
	                pageTitle = $('#pagename').val();
	            }

	            pageData.description.title = pageTitle;
	            pageTitleTrimmed = pageTitle.replace(/[^A-Z0-9]+/ig, "").toLowerCase();

	            pageEdition = pageData.description.edition;
	            pageEditionTrimmed = pageEdition.replace(/[^A-Z0-9]+/ig, "").toLowerCase();

	            if (pageType === 'compendium_landing_page' && releaseDate == null) {
	                pageData.description.releaseDate = new Date($('#releaseDate').val()).toISOString();
	            }
	            else if (pageType === 'compendium_landing_page' && releaseDate) {
	                pageData.description.releaseDate = releaseDate;
	            }

	            if (isInheriting && pageType === 'compendium_landing_page') {
	                newUri = makeUrl(parentUrl, pageEditionTrimmed);
	            }
	            else if (pageType === 'compendium_landing_page') {
	                uriSection = "compendium";
	                newUri = makeUrl(parentUrl, uriSection, pageTitleTrimmed, pageEditionTrimmed);
	            }
	            else if ((pageType === 'compendium_chapter') || (pageType === 'compendium_data')) {
	                newUri = makeUrl(parentUrl, pageTitleTrimmed);
	            }
	            else {
	                sweetAlert('Oops! Something went the wrong.', "", "error");
	                loadCreateScreen(parentUrl, collectionId);
	            }
	            var safeNewUri = checkPathSlashes(newUri);

	            if ((pageType === 'compendium_landing_page') && (!pageData.description.edition)) {
	                sweetAlert('Edition can not be empty');
	                e.preventDefault();
	                return true;
	            }
	            if ((pageType === 'compendium_landing_page') && (!pageData.description.releaseDate)) {
	                sweetAlert('Release date can not be empty');
	                e.preventDefault();
	                return true;
	            }
	            if (pageTitle.length < 5) {
	                sweetAlert("This is not a valid file title");
	                e.preventDefault();
	                return true;
	            }
	            if (pageTitle.toLowerCase() === 'current' || pageTitle.toLowerCase() === 'latest') {
	                alert("This is not a valid file title");
	                e.preventDefault();
	                return true;
	            }
	            else {
	                putContent(collectionId, safeNewUri, JSON.stringify(pageData),
	                    success = function (message) {
	                        console.log("Updating completed " + message);
	                        if (pageData.type === 'compendium_landing_page') {
	                            viewWorkspace(safeNewUri, collectionId, 'edit');
	                            refreshPreview(safeNewUri);
	                            return true;
	                        }
	                        else if ((pageType === 'compendium_chapter') || (pageType === 'compendium_data')) {
	                            updateParentLink(safeNewUri);
	                            return true;
	                        }
	                    },
	                    error = function (response) {
	                        if (response.status === 409) {
	                            sweetAlert("Cannot create this page", "It already exists.");
	                        }
	                        else {
	                            handleApiError(response);
	                        }
	                    }
	                );
	            }
	            e.preventDefault();
	        });
	    }

	    function submitNoForm(parentUrl, title) {

	        pageData.description.title = title;
	        pageTitleTrimmed = title.replace(/[^A-Z0-9]+/ig, "").toLowerCase();

	        if ((pageType === 'compendium_chapter') || (pageType === 'compendium_data')) {
	            newUri = makeUrl(parentUrl, pageTitleTrimmed);
	        } else {
	            sweetAlert('Oops! Something went the wrong way.');
	            loadCreateScreen(parentUrl, collectionId);
	        }

	        var safeNewUri = checkPathSlashes(newUri);

	        // check if the page exists
	        getPageData(collectionId, safeNewUri,
	            success = function () {
	                sweetAlert('This page already exists');
	            },
	            // if the page does not exist, create it
	            error = function () {
	                putContent(collectionId, safeNewUri, JSON.stringify(pageData),
	                    success = function (message) {
	                        console.log("Updating completed " + message);
	                        updateParentLink(safeNewUri);
	                    },
	                    error = function (response) {
	                        if (response.status === 400) {
	                            sweetAlert("Cannot edit this page. It is already part of another collection.");
	                        }
	                        else {
	                            handleApiError(response);
	                        }
	                    }
	                );
	            }
	        );
	    }

	    function pageTypeDataT6(pageType, checkData) {

	        if (pageType === "compendium_landing_page") {
	            return {
	                "description": {
	                    "releaseDate": "",
	                    "nextRelease": "",
	                    "contact": {
	                        "name": "",
	                        "email": "",
	                        "telephone": ""
	                    },
	                    "summary": "",
	                    "keywords": [],
	                    "metaDescription": "",
	                    "nationalStatistic": false,
	                    "title": "",
	                    "edition": ""
	                },
	                "datasets": [],
	                "chapters": [],
	                "relatedDocuments": [],
	                "relatedData": [],
	                "relatedMethodology": [],
	                "relatedMethodologyArticle": [],
	                "topics": [],
	                "alerts": [],
	                type: pageType
	            };
	        }

	        else if (pageType === 'compendium_chapter') {
	            return {
	                "description": {
	                    "releaseDate": checkData.description.releaseDate || "",
	                    "nextRelease": checkData.description.nextRelease || "",
	                    "contact": {
	                        "name": checkData.description.contact.name || "",
	                        "email": checkData.description.contact.email || "",
	                        "telephone": checkData.description.contact.telephone || ""
	                    },
	                    "_abstract": "",
	                    "authors": [],
	                    "keywords": checkData.description.keywords || [],
	                    "metaDescription": checkData.description.metaDescription || "",
	                    "nationalStatistic": checkData.description.nationalStatistic,
	                    "title": "",
	                    "headline": "",
	                },
	                "sections": [],
	                "accordion": [],
	                "relatedDocuments": [],
	                "relatedData": [],
	                "relatedMethodology": [],
	                "relatedMethodologyArticle": [],
	                "externalLinks": [],
	                "charts": [],
	                "tables": [],
	                "images": [],
	                "versions": [],
	                "alerts": [],
	                "pdfTable": [],
	                type: pageType
	            };
	        }

	        else if (pageType === 'compendium_data') {
	            return {
	                "description": {
	                    "releaseDate": checkData.description.releaseDate || "",
	                    "nextRelease": checkData.description.nextRelease || "",
	                    "contact": {
	                        "name": checkData.description.contact.name || "",
	                        "email": checkData.description.contact.email || "",
	                        "telephone": checkData.description.contact.telephone || ""
	                    },
	                    "summary": "",
	                    "datasetId": "",
	                    "keywords": checkData.description.keywords || [],
	                    "metaDescription": checkData.description.metaDescription || "",
	                    "nationalStatistic": checkData.description.nationalStatistic,
	                    "title": ""
	                },
	                "downloads": [],
	                "versions": [], //{date, uri, correctionNotice}
	                "relatedDocuments": [],
	                "relatedMethodology": [],
	                "relatedMethodologyArticle": [],
	                type: pageType
	            };
	        }

	        else {
	            sweetAlert('Unsupported page type. This is not a compendium file type');
	        }
	    }

	    function updateParentLink(childUri) {
	        if (pageType === "compendium_chapter") {
	            parentData.chapters.push({uri: childUri})
	        }
	        else if (pageType === 'compendium_data') {
	            parentData.datasets.push({uri: childUri})
	        }
	        else {
	            sweetAlert('Oops! Something went the wrong way.');
	            loadCreateScreen(parentUrl, collectionId);
	        }
	        putContent(collectionId, parentUrl, JSON.stringify(parentData),
	            success = function (message) {
	                viewWorkspace(childUri, collectionId, 'edit');
	                refreshPreview(childUri);
	                console.log("Parent link updating completed " + message);
	            },
	            error = function (response) {
	                if (response.status === 400) {
	                    sweetAlert("Cannot edit this page. It is already part of another collection.");
	                }
	                else {
	                    handleApiError(response);
	                }
	            }
	        );
	    }
	}

	/**
	 * Creates static pages' JSON
	 * @param collectionId
	 * @param releaseDate
	 * @param pageType
	 * @param parentUrl
	 */

	function loadT7Creator(collectionId, releaseDate, pageType, parentUrl) {
	    var releaseDate = null;             //overwrite scheduled collection date
	    var pageName, pageNameTrimmed, newUri, pageData, isNumber;
	    if (parentUrl === '/') {        //to check home page
	        parentUrl = '';
	    }
	    var parentUrlData = parentUrl + "/data";
	    $.ajax({
	        url: parentUrlData,
	        dataType: 'json',
	        crossDomain: true,
	        success: function (checkData) {
	            if (pageType === 'static_landing_page' && checkData.type === 'home_page' ||
	                (pageType === 'static_qmi' || pageType === 'static_adhoc' || pageType === 'static_methodology' || pageType === 'static_methodology_download') && checkData.type === 'product_page' ||
	                (pageType === 'static_landing_page' || pageType === 'static_page' || pageType === 'static_article') && checkData.type === 'home_page_census') {
	                submitFormHandler();
	                return true;
	            } else if ((pageType === 'static_foi' || pageType === 'static_page' || pageType === 'static_article' || pageType === 'static_landing_page') && checkData.type.match(/static_.+/)) {
	                submitFormHandler();
	                return true;
	            } else {
	                sweetAlert("This is not a valid place to create this page.");
	                loadCreateScreen(parentUrl, collectionId);
	            }
	        },
	        error: function () {
	            console.log('No page data returned');
	        }
	    });

	    function submitFormHandler() {
	        if (pageType === 'static_qmi') {
	            $('.edition').append(
	                '<label for="releaseDate">Last revised</label>' +
	                '<input id="releaseDate" type="text" placeholder="day month year" />'
	            );

	            creatorDatePicker();
	        } else if (pageType === 'static_adhoc') {
	            $('.edition').append(
	                '<label for="releaseDate">Release date</label>' +
	                '<input id="releaseDate" type="text" placeholder="day month year" />' +
	                '<br>' +
	                '<label for="adhoc-reference">Reference</label>' +
	                '<input id="adhoc-reference" type="text" placeholder="Reference number" />'
	            );
	            creatorDatePicker();
	            $('#adhoc-reference').on('input', function () {
	                isNumber = $(this).val();
	                if (!isNumber.match(/^\d+$/)) {
	                    sweetAlert('This needs to be a number');
	                    $(this).val('');
	                }
	            });
	        }
	        else if (!releaseDate && !(pageType === 'static_page' || pageType === 'static_landing_page')) {
	            $('.edition').append(
	                '<label for="releaseDate">Release date</label>' +
	                '<input id="releaseDate" type="text" placeholder="day month year" />'
	            );
	            creatorDatePicker();
	        }

	        $('form').off().submit(function (e) {
	            e.preventDefault();
	            var nameValid = validatePageName();
	            if (!nameValid) {
	                return false;
	            }
	            pageData = pageTypeDataT7(pageType);
	            pageName = $('#pagename').val().trim();
	            pageData.description.title = pageName;
	            pageNameTrimmed = pageName.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	            pageData.fileName = pageNameTrimmed;
	            pageData.description.reference = isNumber;
	            var adHocUrl = isNumber + pageNameTrimmed;
	            if (pageType === 'static_qmi' && !Florence.globalVars.welsh) {
	                newUri = makeUrl(parentUrl, 'qmis', pageNameTrimmed);
	            } else if (pageType === 'static_adhoc' && !Florence.globalVars.welsh) {
	                newUri = makeUrl(parentUrl, 'adhocs', adHocUrl);
	            } else if ((pageType === 'static_methodology' || pageType === 'static_methodology_download') && !Florence.globalVars.welsh) {
	                newUri = makeUrl(parentUrl, 'methodologies', pageNameTrimmed);
	            } else if (!Florence.globalVars.welsh) {
	                newUri = makeUrl(parentUrl, pageNameTrimmed);
	            } else {
	                sweetAlert('You can not perform that operation in Welsh.');
	            }
	            var safeNewUri = checkPathSlashes(newUri);
	            if (releaseDate && (pageType === 'static_qmi')) {
	                date = new Date(releaseDate);
	                pageData.description.lastRevised = $.datepicker.formatDate('dd/mm/yy', date);
	            } else if (releaseDate) {
	                date = new Date(releaseDate);
	                pageData.description.releaseDate = $.datepicker.formatDate('dd/mm/yy', date);
	            } else if (!releaseDate && (pageType === 'static_qmi')) {
	                pageData.description.lastRevised = new Date($('#releaseDate').val()).toISOString();
	                //} else if (!releaseDate && (pageType === 'static_page' || pageType === 'static_article')) {
	                //  pageData.description.releaseDate = "1970-01-01T00:00:00.000Z";  // zebedee throws a JsonSyntaxException
	                // if no date is present
	            } else if (!releaseDate) {
	                if ($('#releaseDate').val()) {
	                    pageData.description.releaseDate = new Date($('#releaseDate').val()).toISOString();
	                } else {
	                    pageData.description.releaseDate = new Date().toISOString();
	                }
	            }

	            if (pageName.length < 4) {
	                sweetAlert({
	                    title: "This is not a valid page name",
	                    text: "Page names must be 4 characters or longer",
	                    type: "warning"
	                });
	                loadCreateScreen(parentUrl, collectionId);
	            } else {
	                saveContent(collectionId, safeNewUri, pageData);
	            }
	        });
	    }
	}

	function pageTypeDataT7(pageType) {

	    if (pageType === "static_page") {
	        return {
	            "description": {
	                "title": "",
	                "summary": "",
	                "releaseDate": "",
	                "keywords": [],
	                "metaDescription": ""
	            },
	            "markdown": [],
	            "charts": [],
	            "tables": [],
	            "equations": [],
	            "images": [],
	            "downloads": [],
	            type: pageType,
	            "anchors": [],
	            "links": []
	        };
	    } else if (pageType === "static_landing_page") {
	        return {
	            "description": {
	                "title": "",
	                "summary": "",
	                "releaseDate": "",
	                "keywords": [],
	                "metaDescription": "",
	            },
	            "sections": [],
	            "markdown": [],
	            type: pageType,
	            "links": []
	        };
	    }
	    else if (pageType === "static_article") {
	        return {
	            "description": {
	                "title": "",
	                "summary": "",
	                "releaseDate": "",
	                "keywords": [],
	                "metaDescription": ""
	            },
	            "sections": [],
	            "charts": [],
	            "tables": [],
	            "equations": [],
	            "images": [],
	            "anchors": [],
	            "links": [],
	            "alerts": [],
	            type: pageType
	        };
	    } else if (pageType === "static_methodology") {
	        return {
	            "description": {
	                "title": "",
	                "summary": "",
	                "releaseDate": "",
	                "contact": {
	                    "name": "",
	                    "email": "",
	                    "telephone": ""
	                },
	                "keywords": [],
	                "metaDescription": ""
	            },
	            "sections": [],
	            "accordion": [],
	            "relatedDocuments": [],
	            "relatedDatasets": [],
	            "relatedMethodology": [],
	            "relatedMethodologyArticle": [],
	            "charts": [],
	            "tables": [],
	            "equations": [],
	            "images": [],
	            "downloads": [],
	            "links": [],
	            "pdfTable": [],
	            "alerts": [],
	            type: pageType
	        };
	    } else if (pageType === "static_methodology_download") {
	        return {
	            "description": {
	                "title": "",
	                "contact": {
	                    "name": "",
	                    "email": "",
	                    "phone": ""
	                },
	                "releaseDate": "",
	                "keywords": [],
	                "metaDescription": ""
	            },
	            "markdown": [],
	            "downloads": [],
	            "relatedDocuments": [],
	            "relatedDatasets": [],
	            "relatedMethodology": [],
	            "relatedMethodologyArticle": [],
	            "links": [],
	            "alerts": [],
	            type: pageType
	        };
	    } else if (pageType === "static_qmi") {
	        return {
	            "description": {
	                "title": "",
	                "contact": {
	                    "name": "",
	                    "email": "",
	                    "phone": ""
	                },
	                "surveyName": "",
	                "frequency": "",
	                "compilation": "",
	                "geographicCoverage": "",
	                "sampleSize": null,
	                "lastRevised": "",
	                "nationalStatistic": false,
	                "keywords": [],
	                "metaDescription": ""
	            },
	            "markdown": [],
	            "downloads": [],
	            "relatedDocuments": [],
	            "relatedDatasets": [],
	            "relatedMethodology": [],
	            "relatedMethodologyArticle": [],
	            "links": [],
	            type: pageType
	        };
	    } else if (pageType === "static_foi") {
	        return {
	            "description": {
	                "title": "",
	                "releaseDate": "",
	                "keywords": [],
	                "metaDescription": ""
	            },
	            "downloads": [],
	            "markdown": [],
	            "links": [],
	            type: pageType
	        };
	    } else if (pageType === "static_adhoc") {
	        return {
	            "description": {
	                "title": "",
	                "releaseDate": "",
	                "reference": null,
	                "keywords": [],
	                "metaDescription": ""
	            },
	            "downloads": [],
	            "markdown": [],
	            "links": [],
	            type: pageType
	        };
	    } else {
	        sweetAlert('Unsupported page type', 'This is not a static page', "info");
	    }
	}/**
	 * Creates data JSON
	 * @param collectionId
	 * @param data
	 * @param pageType
	 * @param pageEdition
	 * @param downloadUrl
	 */

	function loadT8EditionCreator(collectionId, data, pageType, pageEdition, downloadUrl, versionLabel) {
	    var releaseDate = null;             //overwrite scheduled collection date
	    var pageEditionTrimmed, newUri, pageData;

	    pageData = pageTypeDataT8(pageType, data);
	    submitNoForm(data.uri, pageEdition, downloadUrl, versionLabel);

	    function submitNoForm(parentUrl, edition, downloadUrl) {
	        pageData.description.edition = edition;
	        pageData.description.versionLabel = versionLabel;
	        pageData.downloads.push({file: downloadUrl});
	        pageEditionTrimmed = edition.replace(/[^A-Z0-9]+/ig, "").toLowerCase();

	        if ((pageType === 'dataset') || (pageType === 'timeseries_dataset')) {
	            newUri = makeUrl(parentUrl, pageEditionTrimmed);
	        } else {
	            sweetAlert('Oops! Something went the wrong.');
	            loadCreateScreen(parentUrl, collectionId);
	        }

	        var safeNewUri = checkPathSlashes(newUri);

	        putContent(collectionId, safeNewUri, JSON.stringify(pageData),
	            success = function () {
	                updateContent(collectionId, data.uri, JSON.stringify(data));
	            },
	            error = function (response) {
	                if (response.status === 409) {
	                    sweetAlert("Cannot create this page", "It already exists.");
	                }
	                else {
	                    handleApiError(response);
	                }
	            }
	        );
	    }

	    function pageTypeDataT8(pageType, parentData) {

	        if (pageType === "dataset") {
	            return {
	                "description": {
	                    "releaseDate": parentData.description.releaseDate || "",
	                    "edition": "",
	                    "versionLabel": ""
	                },
	                "versions": [], //{updateDate, uri, correctionNotice, label}
	                "downloads": [],
	                "supplementaryFiles": [],
	                type: pageType
	            };
	        }

	        else if (pageType === "timeseries_dataset") {
	            return {
	                "description": {
	                    "releaseDate": parentData.description.releaseDate || "",
	                    "edition": "",
	                    "versionLabel": ""
	                },
	                "versions": [], //{updateDate, uri, correctionNotice, label}
	                "downloads": [],
	                "supplementaryFiles": [],
	                type: pageType
	            };
	        }

	        else {
	            sweetAlert('Unsupported page type', 'This is not a dataset type');
	        }
	    }
	}

	/**
	 * Creates data JSON
	 * @param collectionId
	 * @param releaseDate
	 * @param pageType
	 * @param parentUrl
	 */

	function loadT8Creator(collectionId, releaseDate, pageType, parentUrl, pageTitle) {
	    var releaseDate = null;             //overwrite scheduled collection date
	    var uriSection, pageTitleTrimmed, releaseDateManual, newUri, pageData;
	    var parentUrlData = parentUrl + "/data";
	    // will add this var in dataset_landing_page
	    var timeseries = false;
	    if (pageType === 'timeseries_landing_page') {
	        timeseries = true;
	        pageType = 'dataset_landing_page';
	    }

	    $.ajax({
	        url: parentUrlData,
	        dataType: 'json',
	        crossDomain: true,
	        success: function (checkData) {
	            if (checkData.type === 'product_page' && !Florence.globalVars.welsh) {
	                submitFormHandler();
	                return true;
	            } else {
	                sweetAlert("This is not a valid place to create this page.");
	                loadCreateScreen(parentUrl, collectionId);
	            }
	        },
	        error: function () {
	            console.log('No page data returned');
	        }
	    });

	    function submitFormHandler() {

	        if (!releaseDate) {
	            $('.edition').append(
	                '<label for="releaseDate">Release date</label>' +
	                '<input id="releaseDate" type="text" placeholder="day month year" />'
	            );
	            creatorDatePicker();
	        }

	        $('form').off().submit(function (e) {
	            var nameValid = validatePageName();
	            if (!nameValid) {
	                return false;
	            }

	            releaseDateManual = $('#releaseDate').val()
	            pageData = pageTypeDataT8(pageType);
	            pageTitle = $('#pagename').val();
	            pageData.description.title = pageTitle;
	            pageData.timeseries = timeseries;
	            uriSection = "datasets";
	            pageTitleTrimmed = pageTitle.replace(/[^A-Z0-9]+/ig, "").toLowerCase();

	            if (!releaseDate) {
	                pageData.description.releaseDate = new Date($('#releaseDate').val()).toISOString();
	            } else {
	                pageData.description.releaseDate = releaseDate;
	            }
	            newUri = makeUrl(parentUrl, uriSection, pageTitleTrimmed);
	            var safeNewUri = checkPathSlashes(newUri);

	            if (!pageData.description.releaseDate) {
	                sweetAlert('Release date can not be empty');
	                return true;
	            }
	            if (pageTitle.length < 5) {
	                sweetAlert("This is not a valid file title");
	                return true;
	            }
	            else {
	                saveContent(collectionId, safeNewUri, pageData);
	            }
	            e.preventDefault();
	        });
	    }

	    function pageTypeDataT8(pageType) {

	        if (pageType === "dataset_landing_page") {
	            return {
	                "description": {
	                    "releaseDate": "",
	                    "nextRelease": "",
	                    "contact": {
	                        "name": "",
	                        "email": "",
	                        "telephone": ""
	                    },
	                    "summary": "",
	                    "datasetId": "",
	                    "keywords": [],
	                    "metaDescription": "",
	                    "nationalStatistic": false,
	                    "title": ""
	                },
	                "timeseries": false,
	                "datasets": [],
	                "section": {},      //notes
	                "corrections": [],
	                "relatedDatasets": [],
	                "relatedDocuments": [],
	                "relatedMethodology": [],
	                "relatedMethodologyArticle": [],
	                "topics": [],
	                "alerts": [],
	                type: pageType
	            };
	        }
	        else {
	            sweetAlert('Unsupported page type. This is not a dataset type');
	        }
	    }
	}

	function loadTableBuilder(pageData, onSave, table) {
	  var pageUrl = pageData.uri;
	  var html = templates.tableBuilder(table);
	  var previewTable;
	  var path;
	  var xlsPath;
	  var htmlPath;
	  var currentTable = table;

	  $('body').append(html);

	  if (table) {
	    renderTable(table.uri);
	    $('#table-modify-form').show();
	  }

	  /** Upload a XLS file **/
	  $('#upload-table-form').submit(function (event) {
	    var formData = new FormData($(this)[0]);
	    previewTable = buildJsonObjectFromForm(previewTable);

	    if ( $("#files").val() ) {
	      var errors = validateTableModifications(previewTable);
	      if (!errors.exist()) {
	        uploadFile(previewTable, formData);
	      } else {
	        errors.show();
	      }
	    } else {
	        sweetAlert("Validation error", "Please select a .xls file to upload.");
	    }
	  });

	    /** Upload the file. **/
	  function uploadFile(previewTable, formData) {
	    path = previewTable.uri;
	    xlsPath = path + ".xls";
	    htmlPath = path + ".html";

	    // send xls file to zebedee
	    $.ajax({
	      url: "/zebedee/content/" + Florence.collection.id + "?uri=" + xlsPath,
	      type: 'POST',
	      data: formData,
	      async: false,
	      cache: false,
	      contentType: false,
	      processData: false,
	      success: function () {
	        createTableHtml(previewTable);
	      }
	    });
	    currentTable = previewTable;
	    $('#table-modify-form').show();
	    return false;
	  }

	    /** Create HTML **/
	  function createTableHtml(previewTable) {
	    $.ajax({
	      url: "/zebedee/table/" + Florence.collection.id + "?uri=" + xlsPath,
	      type: 'POST',
	      data: JSON.stringify(previewTable),
	      contentType: 'application/json',
	      dataType: 'text',
	      success: function (html) {
	        saveTableJson(previewTable, success = function () {
	          saveTableHtml(html);
	        });
	      }
	    });
	  }

	  function saveTableJson(table, success) {
	    var tableJson = table.uri + ".json";

	    $.ajax({
	      url: "/zebedee/content/" + Florence.collection.id + "?uri=" + tableJson,
	      type: 'POST',
	      data: JSON.stringify(table),
	      processData: false,
	      contentType: 'application/json',
	      success: function () {
	        if (success) {
	          success();
	        }
	      }
	    });
	  }

	  /** Save HTML **/
	  function saveTableHtml(data) {
	    $.ajax({
	      url: "/zebedee/content/" + Florence.collection.id + "?uri=" + htmlPath + "&validateJson=false",
	      type: 'POST',
	      data: data,
	      processData: false,
	      success: function () {
	        addFilesToPreview();
	        renderTable(path);
	        $('#table-metadata-form').slideDown("slow");
	      }
	    });
	  }

	  function addFilesToPreview() {
	    previewTable.files = [];
	    previewTable.files.push({type: 'download-xls', filename: previewTable.filename + '.xls'});
	    previewTable.files.push({type: 'html', filename: previewTable.filename + '.html'});
	  }

	  function renderTable(path) {
	    var iframeMarkup = '<iframe id="preview-frame" style="opacity:0" frameBorder ="0" scrolling = "yes" src="' + path + '"></iframe>';
	    $('#preview-table').html(iframeMarkup);
	    var iframe = $('#preview-frame');
	    iframe.load(function () {
	      var contents = iframe.contents();
	      contents.find('body').css("background", "transparent");
	      contents.find('body').css("width", "480px");
	      contents.find('.markdown-table-wrap').css('width', '700px');
	      iframe.height(contents.find('html').height());
	      iframe.css("opacity", "1");
	    });
	  }

	  /** Submit modifications details. **/
	  $('#table-modify-form').submit(function (event) {
	    event.preventDefault();
	    previewModifications();
	  });

	  function previewModifications() {
	    previewTable = buildJsonObjectFromForm(previewTable);
	    var errors = validateTableModifications(previewTable);

	    if (!errors.exist()) {
	        postModifyTableForm(previewTable);
	    } else {
	        errors.show();
	    }
	  }

	  /** Validate the form contains correct data. **/
	  function validateTableModifications(tableData) {
	    var errors = {
	        messages: [],
	        exist: function () {
	            return this.messages.length > 0;
	        },

	        show: function () {
	          var msg = "";
	          this.messages.forEach( function (item) {
	            msg = msg + item + "\n";
	          });
	          sweetAlert("Validation error", msg);
	        }
	    }

	    var mods = tableData.modifications;
	    validateList(mods.rowsExcluded, "Rows Excluded", errors);
	    validateList(mods.headerRows, "Table Header Rows", errors);
	    validateList(mods.headerColumns, "Table Header Columns", errors);

	    if (mods.rowsExcluded.length > 0 && mods.headerRows.length > 0) {
	        mods.headerRows.forEach( function (header) {
	            if ($.inArray(header, mods.rowsExcluded) >= 0) {
	                errors.messages.push("Row " + header + " is excluded and cannot be set as a Header Row.");
	            }
	        });
	    }
	    return errors;
	  }

	  /** Post the modify table form. **/
	  function postModifyTableForm(tableData) {
	    var currentUri = currentTable ? currentTable.uri : tableData.uri;
	    var tableMetadataUrl = "/zebedee/modifytable/" + Florence.collection.id + "?currentUri=" + currentUri + "&newUri=" + tableData.uri + "&validateJson=false";

	    $.ajax({
	      url: tableMetadataUrl,
	      type: 'POST',
	      dataType: 'text',
	      contentType: 'application/json',
	      data: JSON.stringify(tableData),
	      success: function ( response ) {
	        getSavedTableModifications(tableData.uri);
	        addFilesToPreview();
	      },
	      error: function (response) {
	        getSavedTableModifications(tableData.uri);
	        addFilesToPreview();
	        handleApiError(response);
	      }
	    });
	  }

	  /** Get the current saved values of the table modifications. **/
	  function getSavedTableModifications(uri) {
	    var updatedContentUri = "/zebedee/modifytable/" + Florence.collection.id + "?uri=" + uri + ".json";
	    $.ajax({
	      url: updatedContentUri,
	      type: 'GET',
	      dataType: 'json',
	      success: function (json) {
	        updateTableModificationForm(json);
	        renderTable(uri);
	        $('#table-modify-form').slideDown("slow");
	      }
	    });
	  }

	  /** Update the table modifications form. **/
	  function updateTableModificationForm(tableJson) {
	    $("#rows-excluded").val("");
	    $("#header-rows").val("");
	    $("#header-columns").val("");
	    $("#rows-excluded").val(asCommaSeparatedStr(tableJson.modifications.rowsExcluded));
	    $("#header-rows").val(asCommaSeparatedStr(tableJson.modifications.headerRows));
	    $("#header-columns").val(asCommaSeparatedStr(tableJson.modifications.headerColumns));
	  }

	  /** Delete / Cancel **/
	  $('.btn-table-builder-cancel').on('click', function () {
	    $('.table-builder').stop().fadeOut(200).remove();

	    // delete the preview table
	    if (previewTable) {
	      $(previewTable.files).each(function (index, file) {
	        var fileToDelete = pageUrl + '/' + file.filename;
	        deleteContent(Florence.collection.id, fileToDelete,
	          onSuccess = function () {
	            console.log("deleted table file: " + fileToDelete);
	          });
	      });

	      deleteContent(Florence.collection.id, previewTable.uri + ".json", function(){}, function(){});
	    }
	  });

	  /** Save **/
	  $('.btn-table-builder-create').on('click', function () {
	    // if uploaded = true rename the preview table
	    previewTable = buildJsonObjectFromForm(previewTable);
	    var tableExists = false;

	    if (table) {
	      tableExists = true;
	      table = mapJsonValues(previewTable, table);
	    } else { // just keep the preview files
	      table = previewTable;
	      addTableToPageJson(table);
	    }

	    saveTableJson(table, success=function() {
	      if (tableExists) {

	        if (previewTable.files.length == 0) {
	            addFilesToPreview();
	        }

	        // if a table exists, rename the preview to its name
	        $(previewTable.files).each(function (index, file) {
	          var fromFile = pageUrl + '/' + file.filename;
	          var toFile = pageUrl + '/' + file.filename.replace(previewTable.filename, table.filename);
	          console.log("moving... table file: " + fromFile + " to: " + toFile);
	          renameContent(Florence.collection.id, fromFile, toFile,
	            onSuccess = function () {
	              console.log("Moved table file: " + fromFile + " to: " + toFile);
	            });
	        });
	        deleteContent(Florence.collection.id, previewTable.uri + ".json", function(){}, function(){});
	      }

	      if (onSave) {
	        onSave(table.filename, '<ons-table path="' + table.filename + '" />');
	      }
	      $('.table-builder').stop().fadeOut(200).remove();
	    });
	  });

	  setShortcuts('#table-title');

	  function addTableToPageJson(table) {
	    if (!pageData.tables) {
	      pageData.tables = [];
	    } else {

	      var existingTable = _.find(pageData.tables, function (existingTable) {
	        return existingTable.filename === table.filename;
	      });

	      if (existingTable) {
	        existingTable.title = table.title;
	        return;
	      }
	    }

	    pageData.tables.push({title: table.title, filename: table.filename, uri: table.uri});
	  }

	  function mapJsonValues(from, to) {
	    to = buildJsonObjectFromForm(to);

	    $(from.files).each(function (fromIndex, fromFile) {
	      var fileExistsInImage = false;

	      $(to.files).each(function (toIndex, toFile) {
	        if (fromFile.type == toFile.type) {
	          fileExistsInImage = true;
	          toFile.fileName = fromFile.fileName;
	          toFile.fileType = fromFile.fileType;
	        }
	      });

	      if(!fileExistsInImage) {
	        to.files.push(fromFile);
	      }

	    });

	    return to;
	  }

	  function buildJsonObjectFromForm(table) {
	    if (!table) {
	      table = {};
	    }

	    table.type = 'table';
	    table.title = $('#table-title').val();

	    if (!table.filename) {
	        table.filename = StringUtils.randomId();
	    }

	    table.uri = pageUrl + "/" + table.filename;

	    if (table.title === '') {
	      table.title = '[Title]';
	    }

	    if (!table.files) {
	      table.files = [];
	    }

	    table.modifications = {};
	    table.modifications.rowsExcluded = inputAsList("#rows-excluded", []);
	    table.modifications.headerRows = inputAsList("#header-rows", []);
	    table.modifications.headerColumns = inputAsList("#header-columns", []);
	    return table;
	  }

	  function asCommaSeparatedStr(_list) {
	    var currentValues = "";
	    _list.forEach( function( item) {
	      currentValues = item + ", " + currentValues;
	    });
	    return currentValues.substring(0, currentValues.lastIndexOf(","));
	  }

	  /** Converts a comma separated string to a list **/
	  function inputAsList(_elemId, _list) {
	    if ( $(_elemId).val() ) {
	      var valuesString = $(_elemId).val().split(",");
	      valuesString.forEach( function(item) {
	        var value = item.trim();
	        if (value) {
	          _list.push(value);
	        }
	      });
	    }
	    return _list;
	  }

	  function validateList(_list, fieldName, errors) {
	    if (_list.length == 0) {
	        return errors;
	    }

	    for (i = 0; i < _list.length; i++) {
	      var value = _list[i];
	      if (isNaN(value) || (!value)) {
	        errors.messages.push(fieldName + " is invalid.");
	        isValid = false;
	        break;
	      }
	    }
	    return errors;
	  }
	}

	function loadTablesList(collectionId, data) {
	    var html = templates.workEditTables(data);
	    $('#tables').replaceWith(html);
	    initialiseTablesList(collectionId, data);
	    initialiseClipboard();
	}

	function refreshTablesList(collectionId, data) {
	    var html = templates.workEditTables(data);
	    $('#table-list').replaceWith($(html).find('#table-list'));
	    initialiseTablesList(collectionId, data);
	    initialiseClipboard();
	}

	function initialiseTablesList(collectionId, data) {

	    $('#add-table').click(function () {
	        loadTableBuilder(data, function () {
	            Florence.Editor.isDirty = false;
	            refreshPreview();
	            refreshTablesList(collectionId, data);
	        });
	    });

	    $(data.tables).each(function (index, table) {
	        var basePath = data.uri;
	        var tablePath = basePath + '/' + table.filename;
	        var tableJson = tablePath;

	        $("#table-edit_" + index).click(function () {
	            getPageData(collectionId, tableJson,
	                onSuccess = function (tableData) {
	                    loadTableBuilder(data, function () {
	                        Florence.Editor.isDirty = false;
	                        refreshPreview();
	                        refreshTablesList(collectionId, data);
	                    }, tableData);
	                })
	        });

	        $("#table-delete_" + index).click(function () {
	            swal({
	                title: "Warning",
	                text: "Are you sure you want to delete this table?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Delete",
	                cancelButtonText: "Cancel",
	                closeOnConfirm: false
	            }, function (result) {
	                if (result === true) {
	                    $(this).parent().remove();
	                    // delete any files associated with the table.
	                    var extraFiles = [table.filename + '.html', table.filename + '.xls'];
	                    _(extraFiles).each(function (file) {
	                        var fileToDelete = basePath + '/' + file;
	                        deleteContent(collectionId, fileToDelete,
	                            onSuccess = function () {
	                            },
	                            onError = function (error) {
	                            });
	                    });

	                    // remove the table from the page json when its deleted
	                    data.tables = _(data.tables).filter(function (item) {
	                        return item.filename !== table.filename
	                    });
	                    // save the updated page json
	                    putContent(collectionId, basePath, JSON.stringify(data),
	                        success = function () {

	                            // delete the table json file
	                            deleteContent(collectionId, tableJson + '.json', onSuccess = function () {
	                            }, onError = function (error) {
	                            });

	                            Florence.Editor.isDirty = false;
	                            refreshTablesList(collectionId, data);

	                            swal({
	                                title: "Deleted",
	                                text: "This table has been deleted",
	                                type: "success",
	                                timer: 2000
	                            });
	                        },
	                        error = function (response) {
	                            if (response.status !== 404)
	                                handleApiError(response);
	                        }
	                    );


	                }
	            });
	        });
	    });
	    // Make sections sortable
	    function sortable() {
	        $('#sortable-table').sortable();
	    }

	    sortable();
	}/**
	 * Creates data visualisation's JSON
	 * @param collectionId
	 * @param pageType
	 * @param collectionData
	 */

	function loadVisualisationCreator(collectionId, pageType, collectionData) {
	    var pageData, pageTitle, pageId, newUri, safeNewUri, uriSection, pageIdTrimmed;
	    var parentUrlData = "/data";
	    $.ajax({
	        url: parentUrlData,
	        dataType: 'json',
	        crossDomain: true,
	        success: function (checkData) {
	            //Checks page is being built in root - the directory is not recognised, so we're looking for the home_page page type
	            if (checkData.type === 'home_page') {
	                submitFormHandler();
	                return true;
	            } else {
	                sweetAlert("This is not a valid place to create this page.");
	                //TODO load data vis directory
	            }
	        },
	        error: function () {
	            console.log('No page data returned');
	        }
	    });

	    function submitFormHandler() {
	        pageData = pageTypeDataVisualisation(pageType);

	        // Prepend unique code field into create form
	        var codeInput = "<label for='visualisation-uid'>Unique ID</label><input placeholder='Eg DVC126' type='text' id='visualisation-uid'>";
	        $('.edition').after(codeInput);

	        $('form').submit(function(e) {
	            e.preventDefault();
	            var nameValid = validatePageName();
	            if (!nameValid) {
	                return false;
	            }

	            // Update page title and UID
	            pageTitle = $('#pagename').val();
	            pageData.description.title = pageTitle;
	            pageId = $('#visualisation-uid').val();
	            pageData.uid = pageId;

	            // Save the new page
	            pageIdTrimmed = pageId.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	            uriSection = "visualisations";
	            newUri = makeUrl(uriSection, pageIdTrimmed);
	            safeNewUri = checkPathSlashes(newUri);
	            Florence.globalVars.pagePath = safeNewUri;
	            saveContent(collectionId, safeNewUri, pageData, collectionData);
	        });

	    }
	}

	function pageTypeDataVisualisation(pageType) {
	    return {
	        description: {
	            title: ""
	        },
	        uid: "",
	        type: pageType,
	        zipTitle: "",
	        filenames: [],
	        indexPage: ""

	    };
	}


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
	}function makeUrl(args) {
	  var accumulator;
	  accumulator = [];
	  for(var i=0; i < arguments.length; i++) {
	    accumulator =  accumulator.concat(arguments[i]
	                              .split('/')
	                              .filter(function(argument){return argument !== "";}));
	  }
	  return accumulator.join('/');
	}

	/**
	 * Manages markdown content
	 * @param collectionId
	 * @param data
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */
	function renderMarkdownContentAccordionSection(collectionId, data, field, idField) {

	    // the list of content sections to render in accordion section.
	    var list = data[field];

	    // a view model including the list and field name the list is contained in.
	    var dataTemplate = {list: list, idField: idField};

	    // render the HTML for the accordion section.
	    var html = templates.editorContent(dataTemplate);

	    // inject the HTML into the accordion section
	    $('#' + idField).replaceWith(html);

	    // attach event handlers for the buttons.
	    initialiseMarkdownContentAccordionSection(collectionId, data, field, idField)
	}

	function refreshMarkdownContentAccordionSection(collectionId, data, field, idField) {
	    var list = data[field];
	    var dataTemplate = {list: list, idField: idField};
	    var html = templates.editorContent(dataTemplate);
	    $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
	    initialiseMarkdownContentAccordionSection(collectionId, data, field, idField)
	}

	function initialiseMarkdownContentAccordionSection(collectionId, data, field, idField) {

	    // for each entry in the list
	    function debugLogAccordionSection() {
	        for (var i = 0; i < data[field].length; i++) {
	            console.log(data[field][i].title)
	        }
	    }

	    $(data[field]).each(function (index) {

	        $('#' + idField + '-title_' + index).on('input', function () {
	            data[field][index].title = $(this).val();
	            //debugLogAccordionSection();
	        });

	        // attach edit handler
	        $('#' + idField + '-edit_' + index).click(function () {

	            // create view model to pass to the markdown editor
	            var editedSectionValue = {
	                "title": data[field][index].title,
	                "markdown": data[field][index].markdown
	            };

	            // create the function to define what happens on save in the markdown editor
	            var saveContent = function (updatedContent) {
	                data[field][index].markdown = updatedContent;
	                saveContentThenRefreshSection(collectionId, data.uri, data, field, idField);

	                // when finished in the markdown editor be sure to refresh the charts / tables / images list to show any newly added
	                refreshChartList(collectionId, data);
	                refreshTablesList(collectionId, data);
	                refreshEquationsList(collectionId, data);
	                refreshImagesList(collectionId, data);
	            };

	            loadMarkdownEditor(editedSectionValue, saveContent, data);
	        });

	        // attach delete handler
	        $('#' + idField + '-delete_' + index).click(function () {
	            swal({
	                title: "Warning",
	                text: "Are you sure you want to delete?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Delete",
	                cancelButtonText: "Cancel",
	                closeOnConfirm: false
	            }, function (result) {
	                if (result === true) {

	                    // delete the item from the data model
	                    data[field].splice(index, 1);

	                    // post content to the server and refresh accordion section view.
	                    saveContentThenRefreshSection(collectionId, data.uri, data, field, idField);

	                    swal({
	                        title: "Deleted",
	                        text: "This " + idField + " has been deleted",
	                        type: "success",
	                        timer: 2000
	                    });
	                }
	            });
	        });
	    });

	    // Attach add new handler.
	    $('#add-' + idField).off().one('click', function () {
	        data[field].push({markdown: "", title: ""});
	        saveContentThenRefreshSection(collectionId, data.uri, data, field, idField);
	    });

	    function sortable() {

	        var sortableStartPosition;

	        $('#sortable-' + idField).sortable({
	            start: function (event, ui) {

	                // remember the index of the item at the start of drag + drop
	                sortableStartPosition = ui.item.index();
	                //console.log("sortable start: " + sortableStartPosition);
	            },
	            stop: function (event, ui) {

	                // determine the new index of the item after being dropped.
	                var sortableEndPosition = ui.item.index();
	                //console.log("sortable update: Start: " + sortableStartPosition + " now: " + sortableEndPosition) ;

	                var sectionsArray = data[field];
	                var item = data[field][sortableStartPosition];

	                // Move the item from the start drag position to the end drop position in the data model.
	                sectionsArray.splice(sortableStartPosition, 1);
	                sectionsArray.splice(sortableEndPosition, 0, item);

	                saveContentThenRefreshSection(collectionId, data.uri, data, field, idField);
	            }
	        });
	    }

	    sortable();

	    function saveContentThenRefreshSection(collectionId, path, data, field, idField) {
	        putContent(collectionId, path, JSON.stringify(data),
	            success = function () {
	                Florence.Editor.isDirty = false;
	                refreshMarkdownContentAccordionSection(collectionId, data, field, idField);
	                refreshPreview(data.uri);
	            },
	            error = function (response) {
	                if (response.status === 400) {
	                    sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                }
	                else {
	                    handleApiError(response);
	                }
	            }
	        );
	    }
	}

	function markDownEditorSetLines() {
	  var textarea = $("#wmd-input");
	  // var linesHolder = $('.markdown-editor-line-numbers');
	  var textareaWidth = textarea.width();
	  var charWidth = 7;
	  var lineHeight = 21;
	  var textareaMaxChars = Math.floor(textareaWidth / charWidth);
	  var lines = textarea.val().split('\n');
	  var linesLi = '';
	  var cursorEndPos = textarea.prop('selectionEnd');
	  var charMapArray = [];
	  var charMapArrayJoin = [];
	  var lineLengthArray = [];
	  var contentLength = textarea.val().length;
	  var cumulativeLineLength = 0;
	  // var cursorLine = textarea.prop('selectionStart').split('\n').length;
	  $.each(lines, function(index){
	    var lineNumber = index + 1;
	    var lineLength = this.length;
	    var lineWrap = Math.round(lineLength / textareaMaxChars);
	    // var lineWrap = Math.floor(lineLength / textareaMaxChars);
	    // var lineWrap = Math.ceil(lineLength / textareaMaxChars);

	    //console.log('max chars: ' + textareaMaxChars);
	    //console.log('line length: ' + lineLength);

	    var numberOfLinesCovered = StringUtils.textareaLines(this, textareaMaxChars, 0, 0);
	    var liPaddingBottom = numberOfLinesCovered * lineHeight;

	    if(lineNumber === 1) {
	      cumulativeLineLength += lineLength;
	    } else {
	      cumulativeLineLength += lineLength + 1;
	      // console.log('+1');
	    }

	    linesLi += '<li id="markdownEditorLine-' + lineNumber + '" style="padding-bottom:' + liPaddingBottom +'px">&nbsp;</li>';
	    lineLengthArray.push(cumulativeLineLength);

	    //push to charmap
	    // charMapArray.push(this.replace(this.split(''), lineNumber));
	    // console.log(this.selectionStart);
	    //console.log('line wrap: ' + lineWrap + ' (' + lineLength / textareaMaxChars + ')');
	  });

	  if(linesLi) {
	    var linesOl = '<ol>' + linesLi + '</ol>';
	    $('#markdown-editor-line-numbers').html(linesOl);
	    // console.log(linesOl);
	  }

	  //sync scroll
	  // $('.markdown-editor-line-numbers ol').css('margin-top', -textarea.scrollTop());
	  // textarea.on('scroll', function () {
	  //   // var editorHeight = $('.wmd-input').height();
	  //   // var previewHeight = $('.wmd-preview').height();
	  //   // console.log(editorHeight);
	  //   var marginTop = $(this).scrollTop();
	  //   $('.markdown-editor-line-numbers ol').css('margin-top', -marginTop);
	  //   $('.wmd-preview').scrollTop(marginTop);
	  // });


	  //proportional scroll
	  //var $wmdscrollsync = $('.wmd-input, .wmd-preview');
	  //var wmdsync = function(e){
	  //    var $other = $wmdscrollsync.not(this).off('scroll'), other = $other.get(0);
	  //    var percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
	  //    other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);
	  //    setTimeout( function(){ $other.on('scroll', wmdsync ); },10);
	  //}
	  //$wmdscrollsync.on( 'scroll', wmdsync);



	  for (var i = 0; i < lineLengthArray.length; i++) {
	    if(cursorEndPos <= lineLengthArray[i]) {
	      // console.log(i + 1);
	      var activeLine = i + 1;
	      $('#markdownEditorLine-' + activeLine).addClass('active');
	      break;
	    }
	    // console.log(lineLengthArray[i]);
	    //Do something
	  }



	}
	function menuselect(classId) {
	  $.widget("custom.iconselectmenu", $.ui.selectmenu, {
	    _renderItem: function(ul, item) {
	      var li = $("<li>", {
	        text: item.label
	      });

	      if (item.disabled) {
	        li.addClass("ui-state-disabled");
	      }

	      $("<span>", {
	        style: item.element.attr("data-style"),
	        "class": "ui-icon " + item.element.attr("data-class")
	      })
	        .appendTo(li);

	      return li.appendTo(ul);
	    }
	  });

	  $(classId)
	    .iconselectmenu()
	    .iconselectmenu("menuWidget")
	    .addClass("ui-menu-icons customicons");
	}/**
	 * Overlays modal for selecting where a node of the browse tree is being moved to
	 * @param fromUrl - where the node is being moved from
	 */

	function moveBrowseNode(fromUrl) {
	    var moveToBtn = "<button class='btn btn--positive btn-browse-move-to'>Move here</button>",
	        moveInProgress = true, // flag to use to see state of move process
	        headerHeight = 98,
	        $browseTree = $('#browse-tree'),
	        $wrapper = $('.wrapper'),
	        overlay = $('<div class="overlay"></div>'),
	        browseTreeMoveHeader = $('<div class="workspace-menu__header"><h2>Select a location</h2></div>'),
	        $treeBrowser = $('.workspace-browse');

	    // Toggle buttons on selected item
	    showBrowseTreeModal();
	    toggleMoveHereButton();

	    // Switch off browse tree changes updating the preview or global pagePath
	    $('.js-browse__item-title').off().click(function (e) {
	        var $this = $(this),
	            itemUrl = $this.closest('.js-browse__item').attr('data-url');

	        // Set previously selected item to normal
	        toggleMoveHereButton();

	        if (itemUrl) {
	            treeNodeSelect(itemUrl);
	        } else {
	            selectParentDirectories($this);
	        }

	        openBrowseBranch($this);

	        // Toggle buttons on newly selected item
	        toggleMoveHereButton();

	        $('.btn-browse-move-to').click(function() {

	            // Data to be sent to Zebedee
	            var toUrl = $(this).closest('.js-browse__item').attr('data-url'),
	                moveData = {fromUrl: fromUrl, toUrl: toUrl};
	            console.log('Move data: ', moveData);

	            // Remove current event binding and return ordinary browse tree functionality
	            $('.js-browse__item-title').off();
	            bindBrowseTreeClick();

	            // Set state of move to finished
	            moveInProgress = false;

	            // Show ordinary browse tree buttons
	            toggleMoveHereButton();
	            hideBrowseTreeModal();

	        });

	    });

	    // Removes the usual buttons on browse tree items and replaces them with a single 'Move here' button
	    function toggleMoveHereButton() {
	        var $thisButtons = $('.page__buttons--list.selected'),
	            $moveToButton = $('.btn-browse-move-to');

	        // Remove previous, so they're not littered around the DOM or if move is finished
	        $moveToButton.remove();

	        // Toggle current buttons (show if move is finished or hide if move is in progress
	        $thisButtons.find('.js-browse__buttons--primary, .js-browse__buttons--secondary').toggle();

	        if (moveInProgress) {
	            // Hide existing buttons in selected item and add in new 'Move here' button
	            $thisButtons.append(moveToBtn);
	        }

	    }

	    function showBrowseTreeModal() {
	        // give blacked put appearance to page
	        $wrapper.append(overlay);
	        // add move header to browse tree
	        $browseTree.prepend(browseTreeMoveHeader);
	        // bring browse tree element in front of overlay
	        $browseTree.css({'z-index': 1001, 'position': 'relative'});
	        // resize browser height because adding header has taken up space
	        $treeBrowser.height($treeBrowser[0].offsetHeight - headerHeight);
	    }

	    function hideBrowseTreeModal() {
	        //remove overlay & header
	        overlay.remove();
	        browseTreeMoveHeader.remove();
	        // 'reset' z-index
	        $browseTree.css({'z-index': 1, 'position': 'relative'});
	        // calculate size after removing header
	        $treeBrowser.height($treeBrowser[0].offsetHeight + headerHeight);
	    }

	}
	function parseURL(url) {
	    var parser = document.createElement('a'),
	        searchObject = {},
	        queries, split, i;
	    // Let the browser do the work
	    parser.href = url;
	    // Convert query string to object
	    queries = parser.search.replace(/^\?/, '').split('&');
	    for( i = 0; i < queries.length; i++ ) {
	        split = queries[i].split('=');
	        searchObject[split[0]] = split[1];
	    }
	    return {
	        protocol: parser.protocol,
	        host: parser.host,
	        hostname: parser.hostname,
	        port: parser.port,
	        pathname: parser.pathname,
	        search: parser.search,
	        searchObject: searchObject,
	        hash: parser.hash
	    };
	}

	function postApproveCollection(collectionId) {
	    $.ajax({
	        url: "/zebedee/approve/" + collectionId,
	        dataType: 'json',
	        contentType: 'application/json',
	        crossDomain: true,
	        type: 'POST',
	        success: function () {
	            // $('.over').remove(); // Commented because I can't see what this does at the moment?
	            hidePanel({onHide: function(){
	                    // Select collections tab
	                    viewController('collections')
	                }
	            });
	        },
	        error: function (response) {
	            // $('.over').remove();
	            if (response.status === 409) {
	                sweetAlert("Cannot approve this collection", "It contains files that have not been approved.");
	            }
	            else {
	                handleApiError(response);
	            }
	        }
	    });
	}
	function saveAndCompleteContent(collectionId, path, content, recursive, redirectToPath) {

	    if (!recursive) {
	        recursive = false;
	    }

	    putContent(collectionId, path, content,
	        success = function () {
	            Florence.Editor.isDirty = false;
	            if (redirectToPath) {
	                completeContent(collectionId, path, recursive, redirectToPath);
	            } else {
	                completeContent(collectionId, path, recursive);
	            }
	        },
	        error = function (response) {
	            if (response.status === 400) {
	                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	            }
	            else {
	                handleApiError(response);
	            }
	        },
	        recursive);
	}

	function completeContent(collectionId, path, recursive, redirectToPath) {
	    var redirect = redirectToPath;
	    var safePath = checkPathSlashes(path);
	    if (safePath === '/') {
	        safePath = '';          // edge case for home
	    }

	    if (Florence.globalVars.welsh) {
	        var url = "/zebedee/complete/" + collectionId + "?uri=" + safePath + "/data_cy.json";
	    } else {
	        var url = "/zebedee/complete/" + collectionId + "?uri=" + safePath + "/data.json";
	    }

	    var url = url + '&recursive=' + recursive;

	    // Update content
	    $.ajax({
	        url: url,
	        dataType: 'json',
	        contentType: 'application/json',
	        type: 'POST',
	        success: function () {
	            if (redirect) {
	                createWorkspace(redirect, collectionId, 'edit');
	                return;
	            } else {
	                // Remove selection from 'working on: collection' tab
	                $('.js-nav-item--collection').hide();
	                $('.js-nav-item').removeClass('selected');
	                $('.js-nav-item--collections').addClass('selected');

	                viewCollections(collectionId);
	            }
	        },
	        error: function (response) {
	            handleApiError(response);
	        }
	    });
	}
	/**
	 * save content to zebedee, making it in progress in a collection.
	 * @param collectionId
	 * @param path
	 * @param content
	 * @param overwriteExisting - should the content be overwritten if it already exists?
	 * @param recursive - should we recurse the directory of the file and make all files under it in progress?
	 * @param success
	 * @param error
	 */
	function postContent(collectionId, path, content, overwriteExisting, recursive, success, error) {
	    // Temporary workaround for content disappearing from bulletins - store last 10 saves to local storage and update with server response later
	    postToLocalStorage(collectionId, path, content);


	    var safePath = checkPathSlashes(path);
	    if (safePath === '/') {
	        safePath = '';          // edge case for home
	    }

	    if (Florence.globalVars.welsh) {
	        var url = "/zebedee/content/" + collectionId + "?uri=" + safePath + "/data_cy.json";
	        var toAddLang = JSON.parse(content);
	        toAddLang.description.language = 'cy';
	        content = JSON.stringify(toAddLang);
	    } else {
	        var url = "/zebedee/content/" + collectionId + "?uri=" + safePath + "/data.json";
	    }

	    var url = url + '&overwriteExisting=' + overwriteExisting;
	    var url = url + '&recursive=' + recursive;

	    $.ajax({
	        url: url,
	        dataType: 'json',
	        contentType: 'application/json',
	        type: 'POST',
	        data: content,
	        success: function (response) {
	            addLocalPostResponse(response);
	            success(response);
	        },
	        error: function (response) {
	            addLocalPostResponse(response);
	            if (error) {
	                error(response);
	            } else {
	                handleApiError(response);
	            }
	        }
	    });
	}

	function postToLocalStorage(collectionId, path, content) {
	    var newSaveTime = new Date();
	    var newId = collectionId;
	    var newPath = path;
	    var newContent = JSON.parse(content);

	    console.log(newContent);
	    
	    var localBackup = localStorage.getItem('localBackup');

	    if (localBackup == null) {
	        // If storage item doesn't exist yet initialise it with first save
	        localBackup = [
	            {
	                collectionId: newId,
	                content: newContent,
	                path: newPath,
	                saveTime: newSaveTime,
	                postResponse: ''
	            }
	        ]
	    } else {
	        // Parse string back into JSON for reading and writing
	        localBackup = JSON.parse(localBackup);

	        var backupLength = localBackup.length;

	        // Remove oldest entry if array is full
	        if (backupLength == 10) {
	            localBackup.pop();
	        }

	        // Add new entry to the top of the array
	        localBackup.unshift(
	            {
	                collectionId: newId,
	                content: newContent,
	                path: newPath,
	                saveTime: newSaveTime,
	                postResponse: ''
	            }
	        );
	    }

	    localBackup = JSON.stringify(localBackup);
	    localStorage.setItem('localBackup', localBackup);
	}

	function addLocalPostResponse(response) {
	    var localBackup = JSON.parse(localStorage.getItem('localBackup'));
	    localBackup[0].postResponse = response;
	    localStorage.setItem('localBackup', JSON.stringify(localBackup));
	}
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
	            var userState = __webpack_require__(47);
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
	    var userState = __webpack_require__(47),
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
	function saveAndReviewContent(collectionId, path, content, recursive, redirectToPath) {

	    if (!recursive) {
	        recursive = false;
	    }

	    putContent(collectionId, path, content,
	        success = function () {
	            Florence.Editor.isDirty = false;
	            if (redirectToPath) {
	                postReview(collectionId, path, recursive, redirectToPath);
	            } else {
	                postReview(collectionId, path, recursive);
	            }
	        },
	        error = function (response) {
	            if (response.status === 400) {
	                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	            }
	            else {
	                handleApiError(response);
	            }
	        },
	        recursive);
	}

	function postReview(collectionId, path, recursive, redirectToPath) {
	    var redirect = redirectToPath;
	    var safePath = checkPathSlashes(path);
	    if (safePath === '/') {
	        safePath = '';          // edge case for home
	    }

	    if (Florence.globalVars.welsh) {
	        var url = "/zebedee/review/" + collectionId + "?uri=" + safePath + "/data_cy.json";
	    } else {
	        var url = "/zebedee/review/" + collectionId + "?uri=" + safePath + "/data.json";
	    }

	    var url = url + '&recursive=' + recursive;

	    // Open the file for editing
	    $.ajax({
	        url: url,
	        dataType: 'json',
	        contentType: 'application/json',
	        type: 'POST',
	        success: function () {
	            if (redirect) {
	                createWorkspace(redirect, collectionId, 'edit');
	                return;
	            } else {
	                // Remove selection from 'working on: collection' tab
	                $('.js-nav-item--collection').hide();
	                $('.js-nav-item').removeClass('selected');
	                $('.js-nav-item--collections').addClass('selected');

	                viewCollections(collectionId);
	            }
	        },
	        error: function () {
	            console.log('Error');
	        }
	    });
	}
	function postTeam(name) {

	    var encodedName = encodeURIComponent(name);
	    $.ajax({
	        url: "/zebedee/teams/" + encodedName,
	        dataType: 'json',
	        contentType: 'application/json',
	        type: 'POST',
	        data: JSON.stringify({
	            name: encodedName
	        }),
	        success: function () {

	            viewTeams(selectTableRowAndDisplayTeamDetails);

	            // on success of view teams, display new team details and highlight team in table
	            function selectTableRowAndDisplayTeamDetails() {
	                var rowToSelect = $("table").find("[data-id='" + name + "']");
	                viewTeamDetails(name, rowToSelect);
	            }

	        },
	        error: function (response) {
	            handleUserPostError(response);
	        }
	    });

	    /**
	     * Handle error response from creating the team.
	     * @param response
	     */
	    function handleUserPostError(response) {
	        if (response.status === 403 || response.status === 401) {
	            sweetAlert("You are not permitted to create teams.");
	        }
	        else if (response.status === 409) {
	            sweetAlert("Error", response.responseJSON.message, "error");
	        } else {
	            handleApiError(response);
	        }
	    }
	}

	function postTeamMember(name, email) {
	    var encodedName = encodeURIComponent(name);
	    $.ajax({
	        url: "/zebedee/teams/" + encodedName + "?email=" + email,
	        dataType: 'json',
	        contentType: 'application/json',
	        type: 'POST',
	        data: JSON.stringify({
	            name: email
	        }),
	        success: function () {
	            console.log('Team member added: ' + email);
	        },
	        error: function (response) {
	            handleUserPostError(response);
	        }
	    });

	    /**
	     * Handle error response from creating the team.
	     * @param response
	     */
	    function handleUserPostError(response) {
	        if (response.status === 403 || response.status === 401) {
	            sweetAlert("You are not permitted to add users.");
	        }
	        else if (response.status === 409) {
	            sweetAlert("Error", response.responseJSON.message, "error");
	        } else {
	            handleApiError(response);
	        }
	    }
	}
	function postUser(name, email, password, isAdmin, isEditor, isDataVisPublisher) {

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
	            email: email
	        }),
	        success: function () {
	            console.log('User created');
	            setPassword();
	        },
	        error: function (response) {
	            handleUserPostError(response);
	        }
	    });

	    /**
	     * Once the user is created do a separate post to the zebedee API
	     * to set the password.
	     */
	    function setPassword() {
	        postPassword(
	            success = function () {
	                console.log('Password set');
	                setPermissions();
	            },
	            error = null,
	            email,
	            password);
	    }

	    /**
	     * Once the user is created and the password is set, set the permissions for the user.
	     */
	    function setPermissions() {
	        postPermission(
	            success = function () {
	                sweetAlert("User created", "User '" + email + "' has been created", "success");
	                viewController('users');
	            },
	            error = null,
	            email = email,
	            admin = isAdmin,
	            editor = isEditor,
	            dataVisPublisher = isDataVisPublisher
	            );
	    }

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

	function publish(collectionId) {

	  // Open the file for editing
	  $.ajax({
	    url: "/zebedee/publish/" + collectionId,
	    dataType: 'json',
	    contentType: 'application/json',
	    crossDomain: true,
	    type: 'POST',
	    success: function (response) {
	      $('.over').remove();

	      if(response) {
	        sweetAlert("Published!", "Your collection has successfully published", "success");

	        $('.publish-selected').animate({right: "-50%"}, 500);
	        // Wait until the animation ends
	        setTimeout(function () {
	          viewController('publish');
	        }, 500);
	      } else {
	        console.log('An error has occurred during the publish process, please contact an administrator. ' + response);
	        sweetAlert("Oops!", 'An error has occurred during the publish process, please contact an administrator.', "error");
	      }
	    },
	    error: function (response) {
	      $('.over').remove();
	      handleApiError(response);
	    }
	  });
	}

	function unlock(collectionId) {

	  // Open the file for editing
	  $.ajax({
	    url: "/zebedee/unlock/" + collectionId,
	    dataType: 'json',
	    contentType: 'application/json',
	    crossDomain: true,
	    type: 'POST',
	    success: function () {
	      sweetAlert("Unlocked!", "Your collection has be unlocked from publishing", "success");
	      $('.publish-selected').animate({right: "-50%"}, 500);
	      // Wait until the animation ends
	      setTimeout(function () {
	        viewController('publish');
	      }, 500);
	    },
	    error: function (response) {
	      handleApiError(response);
	    }
	  });
	}

	function refreshPreview(url) {

	  if (url) {
	    var safeUrl = checkPathSlashes(url);
	    var newUrl = Florence.babbageBaseUrl + safeUrl;
	    document.getElementById('iframe').contentWindow.location.href = newUrl;
	    $('.browser-location').val(newUrl);
	  }
	  else {
	    var urlStored = Florence.globalVars.pagePath;
	    var safeUrl = checkPathSlashes(urlStored);
	    var newUrl = Florence.babbageBaseUrl + safeUrl;
	    document.getElementById('iframe').contentWindow.location.href = newUrl;
	    $('.browser-location').val(newUrl);
	  }
	}

	/**
	 * Manages related data
	 * @param collectionId
	 * @param data
	 * @param templateData
	 * @param field - JSON data key
	 * @param idField - HTML id for the template
	 */

	function renderRelatedItemAccordionSection(collectionId, data, templateData, field, idField) {
	    var list = templateData[field];
	    var dataTemplate = createRelatedItemAccordionSectionViewModel(idField, list, data);
	    var html = templates.editorRelated(dataTemplate);
	    $('#' + idField).replaceWith(html);
	    resolvePageTitlesThenRefresh(collectionId, data, templateData, field, idField);
	    $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
	}

	function refreshRelatedItemAccordionSection(collectionId, data, templateData, field, idField) {
	    var list = templateData[field];
	    var dataTemplate = createRelatedItemAccordionSectionViewModel(idField, list, data);
	    var html = templates.editorRelated(dataTemplate);
	    $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
	    initialiseRelatedItemAccordionSection(collectionId, data, templateData, field, idField);
	}

	function createRelatedItemAccordionSectionViewModel(idField, list, data) {
	    var dataTemplate;
	    var isPublication = (data.type === 'bulletin' || data.type === 'article' || data.type === 'compendium_chapter');

	    if (idField === 'article') {
	        dataTemplate = {list: list, idField: idField, idPlural: 'articles (DO NOT USE. TO BE DELETED)'};
	    } else if (idField === 'bulletin') {
	        dataTemplate = {list: list, idField: idField, idPlural: 'bulletins (DO NOT USE. TO BE DELETED)'};
	    } else if (idField === 'dataset') {
	        dataTemplate = {list: list, idField: idField, idPlural: 'datasets'};
	    } else if (idField === 'document') {
	        dataTemplate = {list: list, idField: idField, idPlural: 'bulletins | articles | compendia'};
	    } else if (idField === 'qmi' && isPublication) {
	        // Tell users not to use related QMIs if editing a publication (input being phased out)
	        dataTemplate = {list: list, idField: idField, idPlural: 'QMIs (DO NOT USE. TO BE DELETED)'}
	    } else if (idField === 'qmi') {
	        dataTemplate = {list: list, idField: idField, idPlural: 'QMIs'}
	    } else if (idField === 'methodology' && isPublication) {
	        // Tell users not to use related methodology if editing a publication (input being phased out)
	        dataTemplate = {list: list, idField: idField, idPlural: 'methodology (DO NOT USE. TO BE DELETED)'};
	    } else if (idField === 'methodology') {
	        dataTemplate = {list: list, idField: idField, idPlural: 'methodology'};
	    } else if (idField === 'link') {
	        dataTemplate = {list: list, idField: idField, idPlural: 'links'};
	    } else {
	        dataTemplate = {list: list, idField: idField};
	    }
	    return dataTemplate;
	}

	function initialiseRelatedItemAccordionSection(collectionId, data, templateData, field, idField) {

	    if (data[field]) {
	        $(data[field]).each(function (index) {
	            // Attach delete button handler.
	            $('#' + idField + '-delete_' + index).click(function () {
	                deleteItem(index);
	            });
	        });
	    }

	    // attach add button handler.
	    $('#add-' + idField).click(function () {
	        renderRelatedItemModal();
	    });

	    // Make sections sortable
	    function sortable() {
	        var sortableStartPosition;

	        $('#sortable-' + idField).sortable({
	            start: function (event, ui) {

	                // remember the index of the item at the start of drag + drop
	                sortableStartPosition = ui.item.index();
	                console.log("sortable start: " + sortableStartPosition);
	            },
	            stop: function (event, ui) {

	                // determine the new index of the item after being dropped.
	                var sortableEndPosition = ui.item.index();
	                console.log("sortable update: Start: " + sortableStartPosition + " now: " + sortableEndPosition);

	                var sectionsArray = data[field];
	                var item = data[field][sortableStartPosition];

	                // Move the item from the start drag position to the end drop position in the data model.
	                sectionsArray.splice(sortableStartPosition, 1);
	                sectionsArray.splice(sortableEndPosition, 0, item);

	                saveContentAndRefreshSection();
	            }
	        });
	    }

	    sortable();

	    function deleteItem(index) {
	        swal({
	            title: "Warning",
	            text: "Are you sure you want to delete this link?",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonText: "Delete",
	            cancelButtonText: "Cancel",
	            closeOnConfirm: false
	        }, function (result) {
	            if (result === true) {

	                showDeletedMessage();

	                // delete the item from the data model.
	                data[field].splice(index, 1);
	                templateData[field].splice(index, 1);

	                saveContentAndRefreshSection();
	            }
	        });
	    }

	    function saveContentAndRefreshSection() {
	        putContent(collectionId, data.uri, JSON.stringify(data),
	            success = function () {
	                Florence.Editor.isDirty = false;
	                refreshPreview(data.uri);
	                refreshRelatedItemAccordionSection(collectionId, data, templateData, field, idField);
	            },
	            error = function (response) {
	                if (response.status === 409) {
	                    sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                } else {
	                    handleApiError(response);
	                }
	            }
	        );
	    }

	    function showDeletedMessage() {
	        swal({
	            title: "Deleted",
	            text: "This " + idField + " has been deleted",
	            type: "success",
	            timer: 2000
	        });
	    }

	    function renderRelatedItemModal() {

	        var viewModel = {hasLatest: false}; //Set to true if 'latest' checkbox should show
	        var latestCheck; //Populated with true/false later to check state of checkbox

	        if (idField === 'article' || idField === 'bulletin' || idField === 'articles' || idField === 'bulletins' || idField === 'document' || idField === 'highlights') {
	            viewModel = {hasLatest: true};
	        }

	        $('.modal').remove();
	        var modal = templates.relatedModal(viewModel);
	        $('.workspace-menu').append(modal);
	        $('.modal-box input[type=text]').focus();

	        //Modal click events
	        $('.btn-uri-cancel').off().one('click', function () {
	            $('.modal').remove();
	            //createWorkspace(data.uri, collectionId, 'edit');
	        });

	        $('.btn-uri-get').click(function () {
	            var pastedUrl = $('#uri-input').val();
	            var dataUrl = checkPathParsed(pastedUrl);
	            var latestCheck = $('input[id="latest"]').prop('checked');
	            getPage(data, templateData, field, latestCheck, dataUrl);
	            $('.modal').remove();
	        });

	        $('.btn-uri-browse').off().one('click', function () {
	            var iframeEvent = document.getElementById('iframe').contentWindow;
	            iframeEvent.removeEventListener('click', Florence.Handler, true);
	            createWorkspace(data.uri, collectionId, '', null, true);
	            $('.modal').remove();

	            //Disable the editor
	            $('body').append(
	                "<div class='col col--5 panel modal-background'></div>"
	            );

	            //Add buttons to iframe window
	            var iframeNav = templates.iframeNav(viewModel);
	            $(iframeNav).hide().appendTo('.browser').fadeIn(600);

	            //Take iframe window to homepage/root
	            $('#iframe').attr('src', '/');

	            $('.btn-browse-cancel').off().one('click', function () {
	                createWorkspace(data.uri, collectionId, 'edit');
	                $('.iframe-nav').remove();
	                $('.modal-background').remove();
	            });

	            //Remove added markup if user navigates away from editor screen
	            $('a:not(.btn-browse-get)').click(function () {
	                $('.iframe-nav').remove();
	                $('.modal-background').remove();
	            });

	            $('.btn-browse-get').off().one('click', function () {
	                var dataUrl = getPathNameTrimLast();
	                latestCheck = $('input[id="latest"]').prop('checked');
	                $('.iframe-nav').remove();
	                $('.modal-background').remove();
	                getPage(data, templateData, field, latestCheck, dataUrl);
	            });
	        });
	    }

	    function getPage(data, templateData, field, latestCheck, dataUrl) {

	        var dataUrlData = dataUrl + "/data";
	        var latestUrl;
	        if (latestCheck) {
	            var tempUrl = dataUrl.split('/');
	            tempUrl.pop();
	            tempUrl.push('latest');
	            latestUrl = tempUrl.join('/');
	        } else {
	            latestUrl = dataUrl;
	        }

	        $.ajax({
	            url: dataUrlData,
	            dataType: 'json',
	            crossDomain: true,
	            success: function (page) {

	                if ((field === 'relatedBulletins' || field === 'statsBulletins') && page.type === 'bulletin') {
	                    initialiseField();
	                }
	                else if ((field === 'relatedDatasets' || field === 'datasets') && (page.type === 'dataset' || page.type === 'timeseries_dataset')) {
	                    initialiseField();
	                }
	                else if (field === 'relatedArticles' && (page.type === 'article' || page.type === 'article_download' || page.type === 'compendium_landing_page')) {
	                    initialiseField();
	                }
	                else if ((field === 'relatedDocuments') && (page.type === 'article' || page.type === 'article_download' || page.type === 'bulletin' || page.type === 'compendium_landing_page')) {
	                    initialiseField();
	                }
	                else if ((field === 'relatedDatasets' || field === 'datasets') && (page.type === 'dataset_landing_page' || page.type === 'compendium_data')) {
	                    initialiseField();
	                }
	                else if ((field === 'items') && (page.type === 'timeseries')) {
	                    initialiseField();
	                }
	                else if ((field === 'relatedData') && (page.type === 'dataset_landing_page' || page.type === 'timeseries' || page.type === 'compendium_data')) {
	                    initialiseField();
	                }
	                else if (field === 'relatedMethodology' && (page.type === 'static_qmi')) {
	                    initialiseField();
	                }
	                else if (field === 'relatedMethodologyArticle' && (page.type === 'static_methodology' || page.type === 'static_methodology_download')) {
	                    initialiseField();
	                }
	                else if (field === 'highlightedLinks' && (page.type === 'article' || page.type === 'article_download' || page.type === 'bulletin' || page.type === 'compendium_landing_page')) {
	                    initialiseField();
	                }
	                else if (field === 'links') {
	                    initialiseField();
	                }
	                else {
	                    sweetAlert("This is not a valid document");
	                    //createWorkspace(data.uri, collectionId, 'edit');
	                    return;
	                }

	                function initialiseField() {
	                    if (!data[field]) {
	                        data[field] = [];
	                        templateData[field] = [];
	                    }
	                }

	                data[field].push({uri: latestUrl});

	                var viewModelTitle = latestCheck ? '(Latest) ' + page.description.title : page.description.title;
	                var viewModel = {uri: latestUrl, description: {title: viewModelTitle}};
	                if (page.description.edition) {
	                    viewModel.description.edition = page.description.edition;
	                }
	                templateData[field].push(viewModel);

	                saveContentAndRefreshSection();
	                //saveRelated(collectionId, data.uri, data, templateData, field, idField);

	            },
	            error: function () {
	                console.log('No page data returned');
	            }
	        });
	    }
	}

	function resolvePageTitlesThenRefresh(collectionId, data, templateData, field, idField) {
	    var ajaxRequest = [];
	    $(templateData[field]).each(function (index, path) {
	        templateData[field][index].description = {};
	        var eachUri = path.uri;
	        var latest = eachUri.match(/\/latest\/?$/) ? true : false;
	        var dfd = $.Deferred();
	        getBabbagePageData(collectionId, eachUri,
	            success = function (response) {
	                templateData[field][index].description.title = latest ? '(Latest) ' + response.description.title : response.description.title;
	                if (response.description.edition) {
	                    templateData[field][index].description.edition = response.description.edition;
	                }
	                dfd.resolve();
	            },
	            error = function () {
	                sweetAlert("Error", field + ' address: ' + eachUri + ' is not found.', "error");
	                dfd.resolve();
	            }
	        );
	        ajaxRequest.push(dfd);
	    });

	    $.when.apply($, ajaxRequest).then(function () {
	        refreshRelatedItemAccordionSection(collectionId, data, templateData, field, idField);
	    });
	}
	function renameCompendiumChildren (arrayToRename, titleNoSpace, editionNoSpace) {
	  arrayToRename.forEach(function (elem, index, array) {
	    var x = elem.uri.split("/");
	    x.splice([x.length - 3], 2, titleNoSpace, editionNoSpace);
	    elem.uri = x.join("/");
	  });
	  return arrayToRename;
	}

	function renameDatasetChildren (arrayToRename, titleNoSpace) {
	  arrayToRename.forEach(function (elem, index, array) {
	    var x = elem.uri.split("/");
	    x.splice([x.length - 2], 1, titleNoSpace);
	    elem.uri = x.join("/");
	  });
	  return arrayToRename;
	}

	function renameContent(collectionId, path, newPath, success, error) {
	  $.ajax({
	    url: "/zebedee/contentrename/" + collectionId + "?uri=" + checkPathSlashes(path) + "&toUri=" + checkPathSlashes(newPath),
	    type: 'POST',
	    success: function (response) {
	      if (success)
	        success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	/**
	 * Manages the editor menus
	 * @param collectionId
	 * @param pageData
	 * @param isPageComplete - if present page has been approved
	 */

	function renderAccordionSections(collectionId, pageData, isPageComplete) {

	    var templateData = jQuery.extend(true, {}, pageData); // clone page data to add template related properties.
	    templateData.isPageComplete = isPageComplete;

	    if (pageData.type === 'home_page') {
	        var email = localStorage.getItem('loggedInAs');   // get user permissions
	        getUserPermission(
	            function (permission) {
	                if (permission.admin) {
	                    var html = templates.workEditT1(templateData);
	                    $('.workspace-menu').html(html);
	                    editServiceMessage(collectionId, pageData);
	                    accordion();
	                    t1Editor(collectionId, pageData, templateData);   //templateData used to resolve section titles
	                } else {
	                    $('.workspace-menu').html("<section class='panel workspace-edit'><div class='edit-section'>" +
	                        "<div class='edit-section__head'><h1>You cannot edit this page. Please contact an administrator</h1></div></div></section>");
	                }
	            },
	            function (error) {
	                sweetAlert("There is a problem with permissions. Please contact an administrator");
	            },
	            email
	        );
	    }

	    else if (pageData.type === 'home_page_census') {
	        var email = localStorage.getItem('loggedInAs');   // get user permissions
	        getUserPermission(
	            function (permission) {
	                if (permission.admin) {
	                    var html = templates.workEditT1Census(templateData);
	                    $('.workspace-menu').html(html);
	                    if (pageData.images) {
	                        loadImagesList(collectionId, pageData);
	                    }
	                    editBlocks(collectionId, pageData, templateData, 'sections', 'block');
	                    accordion();
	                    t1EditorCensus(collectionId, pageData, templateData);   //templateData used to resolve section titles
	                } else {
	                    $('.workspace-menu').html("<section class='panel workspace-edit'><div class='edit-section'>" +
	                        "<div class='edit-section__head'><h1>You cannot edit this page. Please contact an administrator</h1></div></div></section>");
	                }
	            },
	            function (error) {
	                sweetAlert("There is a problem with permissions. Please contact an administrator");
	            },
	            email
	        );
	    }

	    else if (pageData.type === 'taxonomy_landing_page') {
	        var html = templates.workEditT2(templateData);
	        $('.workspace-menu').html(html);
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'highlightedLinks', 'highlights');
	        accordion();
	        t2Editor(collectionId, pageData);
	    }

	    else if (pageData.type === 'product_page') {
	        var html = templates.workEditT3(templateData);
	        $('.workspace-menu').html(html);
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'items', 'timeseries');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'statsBulletins', 'bulletins');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedArticles', 'articles');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'datasets', 'datasets');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        accordion();
	        t3Editor(collectionId, pageData);
	    }

	    else if (pageData.type === 'bulletin') {
	        var html = templates.workEditT4Bulletin(templateData);
	        $('.workspace-menu').html(html);
	        if (pageData.charts) {
	            loadChartsList(collectionId, pageData);
	        }
	        if (pageData.tables) {
	            loadTablesList(collectionId, pageData);
	        }
	        if (pageData.equations) {
	            loadEquationsList(collectionId, pageData);
	        }
	        if (pageData.images) {
	            loadImagesList(collectionId, pageData);
	        }
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'sections', 'section');
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'accordion', 'tab');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedData', 'data');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        editTopics(collectionId, pageData, templateData, 'topics', 'topics');
	        addFile(collectionId, pageData, 'pdfTable', 'pdf');
	        renderExternalLinkAccordionSection(collectionId, pageData, 'links', 'link');
	        editDocumentCorrection(collectionId, pageData, templateData, 'versions', 'correction');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        bulletinEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'article') {
	        var html = templates.workEditT4Article(templateData);
	        $('.workspace-menu').html(html);
	        if (pageData.charts) {
	            loadChartsList(collectionId, pageData);
	        }
	        if (pageData.tables) {
	            loadTablesList(collectionId, pageData);
	        }
	        if (pageData.equations) {
	            loadEquationsList(collectionId, pageData);
	        }
	        if (pageData.images) {
	            loadImagesList(collectionId, pageData);
	        }
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'sections', 'section');
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'accordion', 'tab');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedData', 'data');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        editTopics(collectionId, pageData, templateData, 'topics', 'topics');
	        addFile(collectionId, pageData, 'pdfTable', 'pdf');
	        renderExternalLinkAccordionSection(collectionId, pageData, 'links', 'link');
	        editDocumentCorrection(collectionId, pageData, templateData, 'versions', 'correction');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        articleEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'article_download') {
	        var html = templates.workEditT4ArticleDownload(templateData);
	        $('.workspace-menu').html(html);
	        if (pageData.charts) {
	            loadChartsList(collectionId, pageData);
	        }
	        if (pageData.tables) {
	            loadTablesList(collectionId, pageData);
	        }
	        if (pageData.images) {
	            loadImagesList(collectionId, pageData);
	        }
	        editMarkdownWithNoTitle(collectionId, pageData, 'markdown', 'content');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedData', 'data');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        editTopics(collectionId, pageData, templateData, 'topics', 'topics');
	        addFile(collectionId, pageData, 'downloads', 'file');
	        renderExternalLinkAccordionSection(collectionId, pageData, 'links', 'link');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        editDocWithFilesCorrection(collectionId, pageData, 'versions', 'correction');
	        accordion();
	        ArticleDownloadEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'timeseries') {
	        var html = templates.workEditT5(templateData);
	        $('.workspace-menu').html(html);
	        editMarkdownOneObject(collectionId, pageData, 'section');
	        editMarkdownWithNoTitle(collectionId, pageData, 'notes', 'note');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedData', 'timeseries');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDatasets', 'dataset');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        editTopics(collectionId, pageData, templateData, 'topics', 'topics');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        timeseriesEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'compendium_landing_page') {
	        var html = templates.workEditT6(templateData);
	        $('.workspace-menu').html(html);
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedData', 'data');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        editTopics(collectionId, pageData, templateData, 'topics', 'topics');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        compendiumEditor(collectionId, pageData, templateData);     //templateData used to resolve chapter titles
	    }

	    else if (pageData.type === 'compendium_chapter') {
	        var html = templates.workEditT4Compendium(templateData);
	        $('.workspace-menu').html(html);
	        if (pageData.charts) {
	            loadChartsList(collectionId, pageData);
	        }
	        if (pageData.tables) {
	            loadTablesList(collectionId, pageData);
	        }
	        if (pageData.equations) {
	            loadEquationsList(collectionId, pageData);
	        }
	        if (pageData.images) {
	            loadImagesList(collectionId, pageData);
	        }
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'sections', 'section');
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'accordion', 'tab');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        renderExternalLinkAccordionSection(collectionId, pageData, 'links', 'link');
	        addFile(collectionId, pageData, 'pdfTable', 'pdf');
	        editDocumentCorrection(collectionId, pageData, templateData, 'versions', 'correction');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        compendiumChapterEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'compendium_data') {
	        var html = templates.workEditT8Compendium(templateData);
	        $('.workspace-menu').html(html);
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDatasets', 'dataset');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        addFileWithDetails(collectionId, pageData, 'downloads', 'file');
	        editDocWithFilesCorrection(collectionId, pageData, 'versions', 'correction');
	        accordion();
	        compendiumDataEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'static_landing_page') {
	        var html = templates.workEditT7Landing(templateData);
	        $('.workspace-menu').html(html);
	        editMarkdownWithNoTitle(collectionId, pageData, 'markdown', 'content');
	        accordion();
	        staticLandingPageEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'static_page') {
	        var html = templates.workEditT7(templateData);
	        $('.workspace-menu').html(html);
	        if (pageData.tables) {
	            loadTablesList(collectionId, pageData);
	        }

	        editMarkdownWithNoTitle(collectionId, pageData, 'markdown', 'content');
	        addFile(collectionId, pageData, 'downloads', 'file');
	        editIntAndExtLinks(collectionId, pageData, templateData, 'links', 'link');
	        accordion();
	        staticPageEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'static_article') {
	        var html = templates.workEditT7StaticArticle(templateData);
	        $('.workspace-menu').html(html);
	        if (pageData.charts) {
	            loadChartsList(collectionId, pageData);
	        }
	        if (pageData.tables) {
	            loadTablesList(collectionId, pageData);
	        }
	        if (pageData.equations) {
	            loadEquationsList(collectionId, pageData);
	        }
	        if (pageData.images) {
	            loadImagesList(collectionId, pageData);
	        }
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'sections', 'section');
	        editIntAndExtLinks(collectionId, pageData, templateData, 'links', 'link');
	        addFile(collectionId, pageData, 'downloads', 'file');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        staticArticleEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'static_qmi') {
	        var html = templates.workEditT7(templateData);
	        $('.workspace-menu').html(html);
	        editMarkdownWithNoTitle(collectionId, pageData, 'markdown', 'content');
	        addFile(collectionId, pageData, 'downloads', 'file');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDatasets', 'dataset');
	        renderExternalLinkAccordionSection(collectionId, pageData, 'links', 'link');
	        accordion();
	        qmiEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'static_foi') {
	        var html = templates.workEditT7(templateData);
	        $('.workspace-menu').html(html);
	        editMarkdownWithNoTitle(collectionId, pageData, 'markdown', 'content');
	        addFile(collectionId, pageData, 'downloads', 'file');
	        accordion();
	        foiEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'static_adhoc') {
	        var html = templates.workEditT7(templateData);
	        $('.workspace-menu').html(html);
	        editMarkdownWithNoTitle(collectionId, pageData, 'markdown', 'content');
	        addFile(collectionId, pageData, 'downloads', 'file');
	        accordion();
	        adHocEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'static_methodology') {
	        var html = templates.workEditT4Methodology(templateData);
	        $('.workspace-menu').html(html);
	        if (pageData.charts) {
	            loadChartsList(collectionId, pageData);
	        }
	        if (pageData.tables) {
	            loadTablesList(collectionId, pageData);
	        }
	        if (pageData.images) {
	            loadImagesList(collectionId, pageData);
	        }
	        if (pageData.equations) {
	            loadEquationsList(collectionId, pageData);
	        }
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'sections', 'section');
	        renderMarkdownContentAccordionSection(collectionId, pageData, 'accordion', 'tab');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDatasets', 'dataset');
	        addFile(collectionId, pageData, 'downloads', 'file');
	        editIntAndExtLinks(collectionId, pageData, templateData, 'links', 'link');
	        addFile(collectionId, pageData, 'pdfTable', 'pdf');
	        //editTopics (collectionId, pageData, templateData, 'topics', 'topics');  //ready 2b used
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        methodologyEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'static_methodology_download') {
	        var html = templates.workEditT7(templateData);
	        $('.workspace-menu').html(html);
	        editMarkdownWithNoTitle(collectionId, pageData, 'markdown', 'content');
	        addFile(collectionId, pageData, 'downloads', 'file');
	        addFile(collectionId, pageData, 'pdfDownloads', 'pdfFile');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDatasets', 'dataset');
	        editIntAndExtLinks(collectionId, pageData, templateData, 'links', 'link');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        methodologyDownloadEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'dataset_landing_page') {
	        var html = templates.workEditT8LandingPage(templateData);
	        $('.workspace-menu').html(html);
	        editMarkdownOneObject(collectionId, pageData, 'section', 'Notes');
	        addDataset(collectionId, pageData, 'datasets', 'edition');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDatasets', 'dataset');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodology', 'qmi');
	        renderRelatedItemAccordionSection(collectionId, pageData, templateData, 'relatedMethodologyArticle', 'methodology');
	        editTopics(collectionId, pageData, templateData, 'topics', 'topics');
	        editAlert(collectionId, pageData, templateData, 'alerts', 'alert');
	        accordion();
	        datasetLandingEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'dataset') {
	        var html = templates.workEditT8(templateData);
	        $('.workspace-menu').html(html);
	        editDatasetVersion(collectionId, pageData, 'versions', 'version');
	        editDatasetVersion(collectionId, pageData, 'versions', 'correction');
	        addFile(collectionId, pageData, 'supplementaryFiles', 'supplementary-files');
	        accordion();
	        datasetEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'timeseries_dataset') {
	        var html = templates.workEditT8(templateData);
	        $('.workspace-menu').html(html);
	        editDatasetVersion(collectionId, pageData, 'versions', 'version');
	        addFile(collectionId, pageData, 'supplementaryFiles', 'supplementary-files');
	        editDatasetVersion(collectionId, pageData, 'versions', 'correction');
	        accordion();
	        datasetEditor(collectionId, pageData);
	    }

	    else if (pageData.type === 'release') {
	        var html = templates.workEditT16(templateData);
	        $('.workspace-menu').html(html);
	        editMarkdownWithNoTitle(collectionId, pageData, 'markdown', 'prerelease');
	        editDate(collectionId, pageData, templateData, 'dateChanges', 'changeDate');
	        renderExternalLinkAccordionSection(collectionId, pageData, 'links', 'link');
	        //renderRelatedItemAccordionSection (collectionId, pageData, templateData, 'relatedDocuments', 'document');
	        //renderRelatedItemAccordionSection (collectionId, pageData, templateData, 'relatedDatasets', 'data');
	        accordion();
	        releaseEditor(collectionId, pageData, templateData);
	    }

	    else if (pageData.type === 'visualisation') {
	        var html = templates.workEditVisualisation(templateData);
	        $('.workspace-menu').html(html);
	        accordion();
	        visualisationEditor(collectionId, pageData, templateData);
	    }

	    else {

	        var workspace_menu_sub_edit =
	            '<section class="workspace-edit">' +
	            '  <p style="font-size:20px; color:red;">Page: ' + pageData.type + ' is not supported.</p>' +
	            '  <textarea class="fl-editor__headline" name="fl-editor__headline" style="height: 728px" cols="104"></textarea>' +
	            '  <nav class="edit-nav">' +
	            '  </nav>' +
	            '</section>';

	        $('.workspace-menu').html(workspace_menu_sub_edit);
	        $('.fl-editor__headline').val(JSON.stringify(pageData, null, 2));

	        refreshEditNavigation();

	        var editNav = $('.edit-nav');
	        editNav.off(); // remove any existing event handlers.

	        editNav.on('click', '.btn-edit-save', function () {
	            var pageDataToSave = $('.fl-editor__headline').val();
	            updateContent(collectionId, pageData.uri, pageDataToSave);
	        });

	        // complete
	        editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	            var pageDataToSave = $('.fl-editor__headline').val();
	            saveAndCompleteContent(collectionId, pageData.uri, pageDataToSave);
	        });

	        // review
	        editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	            var pageDataToSave = $('.fl-editor__headline').val();
	            saveAndReviewContent(collectionId, pageData.uri, pageDataToSave);
	        });
	    }

	    // Listen on all input within the workspace edit panel for dirty checks.
	    $('.workspace-edit :input').on('input', function () {
	        Florence.Editor.isDirty = true;
	        // remove the handler now we know content has changed.
	        //$(':input').unbind('input');
	        //console.log('Changes detected.');
	    });
	}

	function refreshEditNavigation() {
	    getCollection(Florence.collection.id,
	        success = function (collection) {
	            var pagePath = getPreviewUrl();
	            var pageFile = pagePath + '/data.json';
	            var lastCompletedEvent = getLastCompletedEvent(collection, pageFile);
	            var isPageComplete = !(!lastCompletedEvent || lastCompletedEvent.email === Florence.Authentication.loggedInEmail());

	            var editNav = templates.editNav({isPageComplete: isPageComplete});
	            $('.edit-nav').html(editNav);
	        },
	        error = function (response) {
	            handleApiError(response);
	        })
	}function resetPage() {
	    // Prevent default behaviour of all form submits throught Florence
	    $(document).on('submit', 'form', function(e) {
	        e.preventDefault();
	    });

	    // Fix for modal form submits not being detected
	    $(document).on('click', 'button', function() {
	        var $closestForm = $(this).closest('form');
	        $closestForm.submit(function(e) {
	            e.preventDefault();
	        });
	    });

	    // Stop anchors doing default behaviour
	    // $(document).on('click', 'a', function(e) {
	    //     e.preventDefault();
	    //     console.log('Anchor click stopped on: ', e);
	    // });

	    // $(document).on('click', 'form', function(e) {
	    //     e.preventDefault();
	    //     console.log('Form clicked');
	    // });

	    // $(document).on('click', 'button', function (e) {
	    //     e.preventDefault();
	    //     console.log(e);
	    // });

	    // $(document).on('submit', '#cancel-form', function(e) {
	    //     e.preventDefault();
	    //     console.log(e);
	    // });
	}/**
	 * Save new content.
	 * @param collectionId
	 * @param uri
	 * @param data - new content being posted for update
	 * @param collectionData - JSON for collection
	 */
	function saveContent(collectionId, uri, data, collectionData) {
	    postContent(collectionId, uri, JSON.stringify(data), false, false,
	        success = function (message) {
	            console.log("Updating completed " + message);
	            createWorkspace(uri, collectionId, 'edit', collectionData);
	        },
	        error = function (response) {
	            if (response.status === 409) {
	                sweetAlert("Cannot create this page", "It already exists.");
	            }
	            else {
	                handleApiError(response);
	            }
	        }
	    );
	}
	function saveNewCorrection (collectionId, path, success, error) {
	  var safePath = checkPathSlashes(path);
	  if (safePath === '/') {
	    safePath = '';          // edge case for home
	  }

	  var url = "/zebedee/version/" + collectionId + "?uri=" + safePath;

	  // Update content
	  $.ajax({
	    url: url,
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'POST',
	    success: function (response) {
	      success(response);
	    },
	    error: function (response) {
	      if (error) {
	        error(response);
	      } else {
	        handleApiError(response);
	      }
	    }
	  });
	}

	function setShortcuts(field, callback) {
	  $(field).select(function (e) {
	    $(field).on('keydown', null, 'ctrl+m', function (ev) {
	      var inputValue = $(field).val();
	      var start = e.target.selectionStart;
	      var end = e.target.selectionEnd;
	      var outputValue = [inputValue.slice(0, start), "^", inputValue.slice(start, end), "^", inputValue.slice(end)].join('');
	      $(field).val(outputValue);
	      ev.stopImmediatePropagation();
	      ev.preventDefault();
	      if(typeof callback === 'function') {
	        callback();
	      }
	    });
	    $(field).on('keyup', null, 'ctrl+q', function (ev) {
	      var inputValue = $(field).val();
	      var start = e.target.selectionStart;
	      var end = e.target.selectionEnd;
	      var outputValue = [inputValue.slice(0, start), "~", inputValue.slice(start, end), "~", inputValue.slice(end)].join('');
	      $(field).val(outputValue);
	      ev.stopImmediatePropagation();
	      if(typeof callback === 'function') {
	        callback();
	      }
	    });
	  });
	}function setupFlorence() {
	    window.templates = Handlebars.templates;
	    Handlebars.registerPartial("browseNode", templates.browseNode);
	    Handlebars.registerPartial("browseNodeDataVis", templates.browseNodeDataVis);
	    Handlebars.registerPartial("editNav", templates.editNav);
	    Handlebars.registerPartial("editNavChild", templates.editNavChild);
	    Handlebars.registerPartial("selectorHour", templates.selectorHour);
	    Handlebars.registerPartial("selectorMinute", templates.selectorMinute);
	    Handlebars.registerPartial("tickAnimation", templates.tickAnimation);
	    Handlebars.registerPartial("loadingAnimation", templates.loadingAnimation);
	    Handlebars.registerPartial("childDeletes", templates.childDeletes);
	    Handlebars.registerHelper('select', function (value, options) {
	        var $el = $('<select />').html(options.fn(this));
	        $el.find('[value="' + value + '"]').attr({'selected': 'selected'});
	        return $el.html();
	    });
	    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

	        switch (operator) {
	            case '==':
	                return (v1 == v2) ? options.fn(this) : options.inverse(this);
	            case '===':
	                return (v1 === v2) ? options.fn(this) : options.inverse(this);
	            case '<':
	                return (v1 < v2) ? options.fn(this) : options.inverse(this);
	            case '<=':
	                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
	            case '>':
	                return (v1 > v2) ? options.fn(this) : options.inverse(this);
	            case '>=':
	                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
	            case '&&':
	                return (v1 && v2) ? options.fn(this) : options.inverse(this);
	            case '||':
	                return (v1 || v2) ? options.fn(this) : options.inverse(this);
	            default:
	                return options.inverse(this);
	        }
	    });
	    //Check if array contains element
	    Handlebars.registerHelper('ifContains', function (elem, list, options) {
	        if (list.indexOf(elem) > -1) {
	            return options.fn(this);
	        }
	        return options.inverse(this);
	    });
	    // Add two values together. Primary usage was '@index + 1' to create numbered lists
	    Handlebars.registerHelper('plus', function (value1, value2) {
	        return value1 + value2;
	    });
	    // Add two values together. Primary usage was '@index + 1' to create numbered lists
	    Handlebars.registerHelper('lastEditedBy', function (array) {
	        if (array) {
	            var event = array[array.length - 1];
	            if (event) {
	                return 'Last edited ' + StringUtils.formatIsoDateString(new Date(event.date)) + " by " + event.email;
	            }
	        }
	        return '';
	    });
	    Handlebars.registerHelper('createdBy', function (array) {
	        if (array) {
	            var event = getCollectionCreatedEvent(array);
	            if (event) {
	                return 'Created ' + StringUtils.formatIsoDateString(new Date(event.date)) + " by " + event.email + '';
	            } else {
	                return "";
	            }
	        }
	        return "";
	    });
	    // If two strings match
	    Handlebars.registerHelper('if_eq', function (a, b, opts) {
	        if (a == b)
	            return opts.fn(this);
	        else
	            return opts.inverse(this);
	    });
	    // If two strings don't match
	    Handlebars.registerHelper('if_ne', function (a, b, opts) {
	        if (a != b)
	            return opts.fn(this);
	        else
	            return opts.inverse(this);
	    });

	    Handlebars.registerHelper('comma_separated_list', function (array) {
	        var asString = "";

	        if (array) {
	            array.forEach(function (item) {
	                asString = asString + item + ", ";
	            });
	            return asString.substring(0, asString.lastIndexOf(","));
	        }
	        return asString;
	    });

	    Handlebars.registerHelper('parent_dir', function (uri) {
	        var pathSections = uri.split("/");
	        if (pathSections.length > 0) {
	            return "/" + pathSections[pathSections.length -1];
	        }
	        return "";
	    });

	    Handlebars.registerHelper('debug', function (message, object) {
	        console.log("DEBUG: " + message + " " + JSON.stringify(object));
	        return "";
	    });


	    Florence.globalVars.activeTab = false;

	    // load main florence template
	    var florence = templates.florence;

	    $('body').append(florence);
	    Florence.refreshAdminMenu();

	    var adminMenu = $('.js-nav');
	    // dirty checks on admin menu
	    adminMenu.on('click', '.js-nav-item', function () {
	        if (Florence.Editor.isDirty) {
	            swal({
	                title: "Warning",
	                text: "If you do not come back to this page, you will lose any unsaved changes",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Continue",
	                cancelButtonText: "Cancel"
	            }, function (result) {
	                if (result === true) {
	                    Florence.Editor.isDirty = false;
	                    processMenuClick(this);
	                    return true;
	                } else {
	                    return false;
	                }
	            });
	        } else {
	            processMenuClick(this);
	        }
	    });


	    window.onbeforeunload = function () {
	        if (Florence.Editor.isDirty) {
	            return 'You have unsaved changes.';
	        }
	    };
	    viewController();


	    function processMenuClick(clicked) {
	        Florence.collection = {};

	        $('.js-nav-item--collection').hide();
	        $('.js-nav-item').removeClass('selected');
	        var menuItem = $(clicked);

	        menuItem.addClass('selected');


	        if (menuItem.hasClass("js-nav-item--collections")) {
	            viewController('collections');
	        } else if (menuItem.hasClass("js-nav-item--collection")) {
	            var thisCollection = CookieUtils.getCookieValue("collection");
	            viewCollections(thisCollection);
	            $(".js-nav-item--collections").addClass('selected');
	        } else if (menuItem.hasClass("js-nav-item--users")) {
	            viewController('users');
	        } else if (menuItem.hasClass("js-nav-item--teams")) {
	            viewController('teams');
	        } else if (menuItem.hasClass("js-nav-item--publish")) {
	            viewController('publish');
	        } else if (menuItem.hasClass("js-nav-item--reports")) {
	            viewController('reports');
	        } else if (menuItem.hasClass("js-nav-item--login")) {
	            viewController('login');
	        } else if (menuItem.hasClass("js-nav-item--logout")) {
	            logout();
	            viewController();
	        }
	    }

	    // Get ping times to zebedee and surface for user
	    var lastPingTime;
	    var pingTimes = [];

	    function doPing() {
	        var start = new Date().getTime();
	        $.ajax({
	            url: "/zebedee/ping",
	            dataType: 'json',
	            contentType: 'application/json',
	            type: 'POST',
	            data: JSON.stringify({
	                lastPingTime: lastPingTime
	            }),
	            success: function (response) {

	                // Handle session information
	                checkSessionTimeout(response);

	                var end = new Date().getTime();
	                var time = end - start;

	                lastPingTime = time;
	                pingTimes.push(time);
	                if (pingTimes.length > 5)
	                    pingTimes.shift();

	                var sum = 0;
	                for (var i = 0; i < pingTimes.length; ++i) {
	                    sum += pingTimes[i];
	                }

	                var averagePingTime = sum / pingTimes.length;

	                networkStatus(lastPingTime);

	                if (averagePingTime < 100) {
	                    console.log("ping time: pretty good! " + time + " average: " + averagePingTime + " " + pingTimes);
	                } else if (averagePingTime < 300) {
	                    console.log("ping time: not so good! " + time + " average: " + averagePingTime + " " + pingTimes);
	                } else {
	                    console.log("ping time: really bad! " + time);
	                }

	                pingTimer = setTimeout(function () {
	                    doPing();
	                }, 10000);
	            }
	        });
	    }

	    var pingTimer = setTimeout(function () {
	        doPing();
	    }, 10000);

	    // Alert user if ping states that their session is going to log out (log out if it's run out too)
	    var countdownIsShown = false,
	        secondCounter = 0;

	    function checkSessionTimeout(sessionData) {
	        var currentDateTime = new Date(),
	            sessionExpiry = new Date(sessionData.sessionExpiryDate),
	            timeLeftInSession = parseInt((sessionExpiry - currentDateTime)/1000);

	        if (timeLeftInSession <= 31 && !countdownIsShown) {
	            // Session is going to expire soon, warn user and give them option to reset session timer
	            countdownIsShown = true;
	            secondCounter = timeLeftInSession;
	            console.log("Session to expire in " + timeLeftInSession + " seconds");
	            sweetAlert({
	                type: "warning",
	                title: "Session expiring in <span id='session-expiry'>" + timeLeftInSession + "</span> seconds",
	                text: "You've not been active for sometime now, are you still using Florence?",
	                html: true,
	                confirmButtonText: "I'm still using Florence!"
	            }, function(response) {
	                if (response) {
	                    $.get("/zebedee/users?email=" + Florence.Authentication.loggedInEmail());
	                    countdownIsShown = false;
	                    console.log("Session timer reset");
	                }
	            });
	            // Update alert with amount of time user has left until they're logged out
	            var sessionCountdown = setInterval(function() {
	                secondCounter -= 1;
	                $('#session-expiry').html(secondCounter);

	                // If session has timed out & the warning hasn't been closed yet, log out the user and inform them why they've been logged out
	                if (secondCounter === 0 && countdownIsShown) {
	                    sweetAlert({
	                        type: "warning",
	                        title: "Your session has expired",
	                        text: "Florence was left inactive for too long so you have been logged out"
	                    });
	                    logout();
	                    countdownIsShown = false;
	                    clearInterval(sessionCountdown);
	                } else if (!countdownIsShown) {
	                    // User responded to warning so Florence is active now, clear the countdown
	                    clearInterval(sessionCountdown);
	                }
	            }, 1000);
	        }
	    }

	    // Reset default functions from certain elements - eg form submits
	    resetPage();

	    // Log every click that will be changing the state or data in Florence
	    $(document).on('click', 'a, button, input[type="button"], iframe, .table--primary tr, .js-nav-item, .page__item', function(e) {
	        var diagnosticJSON = JSON.stringify(new clickEventObject(e));
	        $.ajax({
	            url: "/zebedee/clickEventLog",
	            type: 'POST',
	            contentType: "application/json",
	            data: diagnosticJSON,
	            async: true,
	        });
	    });

	    function clickEventObject(event) {
	        this.user = localStorage.getItem('loggedInAs');
	        triggerTemp = {};
	        collectionTemp = {};

	        if (event.target.id) {
	            triggerTemp.elementId = event.target.id;
	        }

	        if ($(event.target).attr('class')) {
	            classes = [];
	            $.each($(event.target).attr('class').split(" "), function(index, value) {
	                if (value) {
	                    classes.push(value);
	                }
	            });
	            if (classes.length > 0) {
	                triggerTemp.elementClasses = classes;
	            }
	        }

	        if (Florence.collection.id) {
	            collectionTemp.id = Florence.collection.id;
	        }

	        if (Florence.collection.name) {
	            collectionTemp.name = Florence.collection.name;
	        }

	        if (Florence.collection.type) {
	            collectionTemp.type = Florence.collection.type;
	        }

	        if (triggerTemp.elementId || triggerTemp.elementClasses) {
	            this.trigger = triggerTemp;
	        }

	        if (collectionTemp.id || collectionTemp.name || collectionTemp.type) {
	            this.collection = collectionTemp
	        }
	    }

	    // Check running version versus latest and notify user if they don't match
	    var runningVersion,
	        userWarned = false;
	    function checkVersion() {
	        return fetch('assets/version.json')
	            .then(function(response) {
	                return response.json();
	            })
	            .then(function(responseJson) {
	                return responseJson;
	            })
	            .catch(function(err) {
	                console.log("Error getting latest Florence version: ", err);
	                return err
	            });
	    }

	    checkVersion().then(function(response) {
	        runningVersion = response;
	    });

	    setInterval(function() {
	        // Get the latest version and alert user if it differs from version stored on load (but only if the user hasn't been warned already, so they don't get spammed after being warned already)
	        if (!userWarned) {
	            checkVersion().then(function (response) {
	                if (response.major !== runningVersion.major || response.minor !== runningVersion.minor || response.build !== runningVersion.build) {
	                    console.log("New version of Florence available: ", response.major + "." + response.minor + "." + response.build);
	                    swal({
	                        title: "New version of Florence available",
	                        type: "info",
	                        showCancelButton: true,
	                        closeOnCancel: false,
	                        closeOnConfirm: false,
	                        confirmButtonText: "Refresh Florence",
	                        cancelButtonText: "Don't refresh"
	                    }, function (isConfirm) {
	                        userWarned = true;
	                        if (isConfirm) {
	                            location.reload();
	                        } else {
	                            swal("Warning", "Florence could be unstable without the latest version", "warning")
	                        }
	                    });
	                    runningVersion = response;
	                }
	            });
	        }
	    }, 10000)
	}

	function releaseEditor(collectionId, data) {
	    var setActiveTab, getActiveTab;
	    var renameUri = false;
	    var pageDataRequests = [];
	    var pages = {};

	    $(".edit-accordion").on('accordionactivate', function (event, ui) {
	        setActiveTab = $(".edit-accordion").accordion("option", "active");
	        if (setActiveTab !== false) {
	            Florence.globalVars.activeTab = setActiveTab;
	        }
	    });

	    getActiveTab = Florence.globalVars.activeTab;
	    accordion(getActiveTab);
	    getLastPosition();

	    processCollection(collectionId, 'noSave');

	    $("#title").on('input', function () {
	        renameUri = true;
	        data.description.title = $(this).val();
	    });
	    $("#provisionalDate").on('input', function () {
	        data.description.provisionalDate = $(this).val();
	    });
	    var dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'});
	    if (!data.description.finalised) {
	        $('.release-date').on('change', function () {
	            var publishTime = parseInt($('#release-hour').val()) + parseInt($('#release-min').val());
	            var toIsoDate = $('#releaseDate').datepicker("getDate");
	            data.description.releaseDate = new Date(parseInt(new Date(toIsoDate).getTime()) + publishTime).toISOString();
	        });
	    } else {
	        $('.release-date').on('change', function () {
	            swal({
	                title: "Warning",
	                text: "You will need to add an explanation for this change. Are you sure you want to proceed?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Continue",
	                cancelButtonText: "Cancel"
	            }, function (result) {
	                if (result === true) {
	                    saveOldDate(collectionId, data, dateTmp);
	                    var publishTime = parseInt($('#release-hour').val()) + parseInt($('#release-min').val());
	                    var toIsoDate = $('#releaseDate').datepicker("getDate");
	                    data.description.releaseDate = new Date(parseInt(new Date(toIsoDate).getTime()) + publishTime).toISOString();
	                } else {
	                    $('#releaseDate').val(dateTmpFormatted);
	                }
	            });
	        });
	    }

	    var date = new Date(data.description.releaseDate);
	    var hour = date.getHours();
	    $('#release-hour').val(hour * 3600000);

	    var minutes = date.getMinutes();
	    $('#release-min').val(minutes * 60000);

	    $("#nextRelease").on('input', function () {
	        data.description.nextRelease = $(this).val();
	        
	    });
	    if (!data.description.contact) {
	        data.description.contact = {};
	    }
	    $("#contactName").on('input', function () {
	        data.description.contact.name = $(this).val();
	        
	    });
	    $("#contactEmail").on('input', function () {
	        data.description.contact.email = $(this).val();
	        
	    });
	    $("#contactTelephone").on('input', function () {
	        data.description.contact.telephone = $(this).val();
	        
	    });
	    $("#summary").on('input', function () {
	        data.description.summary = $(this).val();
	        
	    });

	    /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	    var checkBoxStatus = function (id) {
	        if (id === 'natStat') {
	            if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	                return false;
	            } else {
	                return true;
	            }
	        } else if (id === 'cancelled') {
	            if (data.description.cancelled === "false" || data.description.cancelled === false) {
	                return false;
	            } else {
	                return true;
	            }
	        } else if (id === 'finalised') {
	            if (data.description.finalised === "false" || data.description.finalised === false) {
	                return false;
	            } else {
	                return true;
	            }
	        }
	    };

	    // Gets status of checkbox and sets JSON to match
	    $("#natStat input[type='checkbox']").prop('checked', checkBoxStatus($('#natStat').attr('id'))).click(function () {
	        data.description.nationalStatistic = $("#natStat input[type='checkbox']").prop('checked') ? true : false;
	        
	    });

	    $("#cancelled input[type='checkbox']").prop('checked', checkBoxStatus($('#cancelled').attr('id'))).click(function () {
	        data.description.cancelled = $("#cancelled input[type='checkbox']").prop('checked') ? true : false;
	        if (data.description.cancelled) {
	            var editedSectionValue = {};
	            editedSectionValue.title = "Please enter the reason for the cancellation";
	            var saveContent = function (updatedContent) {
	                data.description.cancellationNotice = [updatedContent];
	                putContent(collectionId, data.uri, JSON.stringify(data),
	                    success = function () {
	                        Florence.Editor.isDirty = false;
	                        loadPageDataIntoEditor(data.uri, collectionId);
	                        refreshPreview(data.uri);
	                    },
	                    error = function (response) {
	                        if (response.status === 400) {
	                            sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                        }
	                        else {
	                            handleApiError(response);
	                        }
	                    }
	                );
	            };
	            loadMarkdownEditor(editedSectionValue, saveContent, data, 'notEmpty');
	        } else {
	            data.description.cancellationNotice = [];
	        }
	        
	    });

	    if (data.description.finalised) {
	        $("#finalised input[type='checkbox']").prop('checked', checkBoxStatus($('#finalised').attr('id'))).click(function (e) {
	            sweetAlert('You cannot change this field once it is finalised.');
	            e.preventDefault();
	        });
	    } else {
	        $("#finalised input[type='checkbox']").prop('checked', checkBoxStatus($('#finalised').attr('id'))).click(function () {
	            swal({
	                title: "Warning",
	                text: "You will not be able reset the date to provisional once you've done this. Are you sure you want to proceed?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonText: "Continue",
	                cancelButtonText: "Cancel"
	            }, function (result) {
	                if (result) {
	                    data.description.finalised = $("#finalised input[type='checkbox']").prop('checked') ? true : false;
	                    if (data.description.finalised) {
	                        // remove provisional date
	                        data.description.provisionalDate = "";
	                        $('.provisional-date').remove();
	                        $('#finalised').remove();
	                    }
	                } else {
	                    $("#finalised input[type='checkbox']").prop('checked', false);
	                }
	            });
	        });
	    }

	    $("#dateChange").on('input', function () {
	        data.dateChanges.previousDate = $(this).val();
	        
	    });

	    function saveOldDate(collectionId, data, oldDate) {
	        data.dateChanges.push({previousDate: oldDate, changeNotice: ""});
	        initialiseLastNoteMarkdown(collectionId, data, 'dateChanges', 'changeNotice');
	    }

	    $('#add-preview').click(function () {
	        //Check if it is article, bulletin or dataset
	        processCollection(collectionId);
	    });

	    function processCollection(collectionId, noSave) {
	        pageDataRequests.push(
	            getCollectionDetails(collectionId,
	                success = function (response) {
	                    pages = response;
	                },
	                error = function (response) {
	                    handleApiError(response);
	                }
	            )
	        );
	        $.when.apply($, pageDataRequests).then(function () {
	            if(pages.releaseUri && pages.releaseUri == data.uri) {
	                processPreview(data, pages);
	                if (noSave) {
	                    putContent(collectionId, data.uri, JSON.stringify(data),
	                      success = function () {
	                          Florence.Editor.isDirty = false;
	                          refreshPreview(data.uri);
	                      },
	                      error = function (response) {
	                          if (response.status === 400) {
	                              sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                          } else {
	                              handleApiError(response);
	                          }
	                      }
	                    );
	                } else {
	                    updateContent(collectionId, data.uri, JSON.stringify(data));
	                }
	            }
	        });
	    }

	    //Add uri to relatedDocuments or relatedDatasets
	    function processPreview(data, pages) {
	        data.relatedDocuments = [];
	        data.relatedDatasets = [];
	        data.relatedMethodology = [];
	        data.relatedMethodologyArticle = [];
	        _.each(pages.inProgress, function (page) {
	            if (page.type === 'article' || page.type === 'article_download' || page.type === 'bulletin' || page.type === 'compendium_landing_page') {
	                data.relatedDocuments.push({uri: page.uri});
	                //console.log(page.uri);
	            } else if (page.type === 'dataset_landing_page') {
	                data.relatedDatasets.push({uri: page.uri});
	            } else if (page.type === 'static_qmi') {
	                data.relatedMethodology.push({uri: page.uri});
	            } else if (page.type === 'static_methodology' || page.type === 'static_methodology_download') {
	                data.relatedMethodologyArticle.push({uri: page.uri});
	            }
	        });
	        _.each(pages.complete, function (page) {
	            if (page.type === 'article' || page.type === 'article_download' || page.type === 'bulletin' || page.type === 'compendium_landing_page') {
	                data.relatedDocuments.push({uri: page.uri});
	                //console.log(page.uri);
	            } else if (page.type === 'dataset_landing_page') {
	                data.relatedDatasets.push({uri: page.uri});
	            } else if (page.type === 'static_qmi') {
	                data.relatedMethodology.push({uri: page.uri});
	            } else if (page.type === 'static_methodology' || page.type === 'static_methodology_download') {
	                data.relatedMethodologyArticle.push({uri: page.uri});
	            }
	        });
	        _.each(pages.reviewed, function (page) {
	            if (page.type === 'article' || page.type === 'article_download' || page.type === 'bulletin' || page.type === 'compendium_landing_page') {
	                data.relatedDocuments.push({uri: page.uri});
	                //console.log(page.uri);
	            } else if (page.type === 'dataset_landing_page') {
	                data.relatedDatasets.push({uri: page.uri});
	            } else if (page.type === 'static_qmi') {
	                data.relatedMethodology.push({uri: page.uri});
	            } else if (page.type === 'static_methodology' || page.type === 'static_methodology_download') {
	                data.relatedMethodologyArticle.push({uri: page.uri});
	            }
	        });
	    }

	    // Check whether release is being added back into collection and the published flag should be toggled to truthy
	    function checkPublishedFlag(data) {
	        return new Promise (function(resolve, reject) {
	            if (!data.description.published) {
	                getCollection(collectionId, success = function (collectionData) {
	                    if (collectionData.releaseUri == data.uri) {
	                        data.description.published = true;
	                    }
	                    resolve()
	                }, error = function (error) {
	                    reject(error);
	                });
	            } else {
	                resolve();
	            }
	        });
	    }

	    //Save and update preview page
	    //Get collection content

	    // Save
	    var editNav = $('.edit-nav');
	    editNav.off(); // remove any existing event handlers.

	    editNav.on('click', '.btn-edit-save', function () {
	        save(updateContent);
	    });

	    // completed to review
	    editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	        save(saveAndCompleteContent);
	    });

	    // reviewed to approve
	    editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	        save(saveAndReviewContent);
	    });

	    function save(onSave) {
	        // Check whether the publish flag needs to be toggle - this is async so needs to be a promise
	        checkPublishedFlag(data).then(function() {
	            // Once publish flag is checked then continue with rest of save
	            checkRenameUri(collectionId, data, renameUri, onSave);
	        }).catch(function(error) {
	            console.log("Error getting collection data: ", error);
	        });

	    }
	}

	function t1Editor(collectionId, data, templateData) {

	  var newSections = [];
	  var setActiveTab, getActiveTab;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);

	  resolveTitleT1(collectionId, data, templateData, 'sections');

	  // Metadata edition and saving
	  if (Florence.globalVars.welsh) {
	    $("#title").on('input', function () {
	      $(this).textareaAutoSize();
	      data.description.title = $(this).val();
	    });
	  } else {
	    $(".title").remove();
	  }
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });


	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save();
	    updateContent(collectionId, '', JSON.stringify(data));
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    //pageData = $('.fl-editor__headline').val();
	    save();
	    saveAndCompleteContent(collectionId, '', JSON.stringify(data));
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save();
	    saveAndReviewContent(collectionId, '', JSON.stringify(data));
	  });

	  function save() {
	    // sections
	    var orderSections = $("#sortable-section").sortable('toArray');
	    $(orderSections).each(function (indexS, nameS) {
	      var uri = data.sections[parseInt(nameS)].statistics.uri;
	      var safeUri = checkPathSlashes(uri);
	      var link = data.sections[parseInt(nameS)].theme.uri;
	      newSections[parseInt(indexS)] = {
	        theme: {uri: link},
	        statistics: {uri: safeUri}
	      };
	    });
	    data.sections = newSections;
	  }
	}

	function resolveTitleT1(collectionId, data, templateData, field) {
	  var ajaxRequest = [];
	  $(templateData[field]).each(function (index, path) {
	    var eachUri = path.statistics.uri;
	    var dfd = $.Deferred();
	    getBabbagePageData(collectionId, eachUri,
	      success = function (response) {
	        templateData[field][index].statistics.title = response.description.title;
	        dfd.resolve();
	      },
	      error = function () {
	        sweetAlert("Error", field + ' address: ' + eachUri + ' is not found.', "error");
	        dfd.resolve();
	      }
	    );
	    ajaxRequest.push(dfd);
	  });

	  $.when.apply($, ajaxRequest).then(function () {
	    var dataTemplate = templateData[field];
	    var html = templates.workEditT1Sections(dataTemplate);
	    $('#to-populate').replaceWith(html);

	    //Edit section
	    $(data.sections).each(function (index, section) {
	//  lastIndexSections = index + 1;
	      $("#section-edit_" + index).on('click', function () {
	        swal ({
	          title: "Warning",
	          text: "If you do not come back to this page, you will lose any unsaved changes",
	          type: "warning",
	          showCancelButton: true,
	          confirmButtonText: "Continue",
	          cancelButtonText: "Cancel"
	        }, function(result) {
	          if (result === true) {
	            var iframeEvent = document.getElementById('iframe').contentWindow;
	            iframeEvent.removeEventListener('click', Florence.Handler, true);
	            createWorkspace('/', collectionId, '', null, true);

	            $('#' + index).replaceWith(
	              '<div id="' + index + '" class="edit-section__sortable-item">' +
	              '  <textarea id="uri_' + index + '" placeholder="Go to the related document and click Get"></textarea>' +
	              '  <button class="btn-page-get" id="section-get_' + index + '">Get</button>' +
	              '  <button class="btn-page-cancel" id="section-cancel_' + index + '">Cancel</button>' +
	              '</div>');
	            $("#section-cancel_" + index).hide();

	            $("#section-get_" + index).one('click', function () {
	              var pastedUrl = $('#uri_' + index).val();
	              if (!pastedUrl) {
	                pastedUrl = getPathNameTrimLast();
	              } else {
	                pastedUrl = checkPathParsed(pastedUrl);
	              }
	              var sectionUrlData = pastedUrl + "/data";

	              $.ajax({
	                url: sectionUrlData,
	                dataType: 'json',
	                crossDomain: true,
	                success: function (sectionData) {
	                  if (sectionData.type === 'timeseries') {
	                    data.sections.splice(index, 1,
	                      {
	                        theme: {uri: getTheme(sectionData.uri)},
	                        statistics: {uri: sectionData.uri}
	                      });
	                    putContent(collectionId, '', JSON.stringify(data),
	                      success = function (response) {
	                        console.log("Updating completed " + response);
	                        Florence.Editor.isDirty = false;
	                        createWorkspace('/', collectionId, 'edit');
	                      },
	                      error = function (response) {
	                        if (response.status === 400) {
	                          sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                        }
	                        else {
	                          handleApiError(response);
	                        }
	                      }
	                    );
	                  } else {
	                    sweetAlert("This is not a time series");
	                  }
	                },
	                error: function () {
	                  console.log('No page data returned');
	                }
	              });
	            });

	            $("#section-cancel_" + index).show().one('click', function () {
	              createWorkspace('', collectionId, 'edit');
	            });
	          }
	        });
	      });
	    });

	    function sortableSections() {
	      $("#sortable-section").sortable();
	    }

	    sortableSections();

	  });
	}

	function getTheme(uri) {
	  var parts = uri.split('/');
	  var theme = parts.splice(0, 2);
	  return theme.join('/');
	}
	function t1EditorCensus(collectionId, data, templateData) {

	  var newBlocks = [], newImage = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });

	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {
	    // Blocks
	    var orderBlocks = $("#sortable-block").sortable('toArray');
	    $(orderBlocks).each(function (indexB, titleB) {
	      if (!data.sections[parseInt(titleB)].title) {
	        var uri = data.sections[parseInt(titleB)].uri;
	        var size = data.sections[parseInt(titleB)].size;
	        var safeUri = checkPathSlashes(uri);
	        newBlocks[indexB] = {uri: safeUri, size: size};
	      } else {
	        var uri = data.sections[parseInt(titleB)].uri;
	        var title = data.sections[parseInt(titleB)].title;
	        var size = data.sections[parseInt(titleB)].size;
	        var image = data.sections[parseInt(titleB)].image;
	        var text = data.sections[parseInt(titleB)].text;
	        newBlocks[indexB] = {uri: uri, title: title, text: text, image: image, size: size};
	      }
	    });
	    data.sections = newBlocks;
	    // images
	    var orderImage = $("#sortable-image").sortable('toArray');
	    $(orderImage).each(function (indexImage, nameImage) {
	      var uri = data.images[parseInt(nameImage)].uri;
	      var title = data.images[parseInt(nameImage)].title;
	      var filename = data.images[parseInt(nameImage)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.images = newImage;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }

	}

	function t2Editor(collectionId, data) {

	  var setActiveTab, getActiveTab;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);

	  // Metadata load, edition and saving
	  $("#title").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	    updateContent(collectionId, data.uri, JSON.stringify(data));
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	    saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data));
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	    saveAndReviewContent(collectionId, data.uri, JSON.stringify(data));
	  });
	}

	function t3Editor(collectionId, data) {

	  var setActiveTab, getActiveTab;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  // Metadata load, edition and saving
	  $("#title").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	    updateContent(collectionId, data.uri, JSON.stringify(data));
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	    saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data));
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	    saveAndReviewContent(collectionId, data.uri, JSON.stringify(data));
	  });

	}

	function ArticleDownloadEditor(collectionId, data) {

	//  var index = data.release;
	  var newFiles = [], newChart = [], newTable = [], newImage = [], newData = [], newLinks = [], newRelatedQmi = [], newRelatedMethodology = [], newDocuments = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  // Metadata load, edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#edition").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.edition = $(this).val();
	  });
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }

	  $("#nextRelease").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.nextRelease = $(this).val();
	  });
	  if (!data.description.contact) {
	    data.description.contact = {};
	  }
	  $("#contactName").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.name = $(this).val();
	  });
	  $("#contactEmail").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.email = $(this).val();
	  });
	  $("#contactTelephone").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.telephone = $(this).val();
	  });
	  $("#abstract").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description._abstract = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	   is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	  var checkBoxStatus = function () {
	    if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	      return false;
	    }
	    return true;
	  };

	  $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	    data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {

	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // Sections
	    data.markdown = [$('#content-markdown').val()];

	    // charts
	    var orderChart = $("#sortable-chart").sortable('toArray');
	    $(orderChart).each(function (indexCh, nameCh) {
	      var uri = data.charts[parseInt(nameCh)].uri;
	      var title = data.charts[parseInt(nameCh)].title;
	      var filename = data.charts[parseInt(nameCh)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newChart[indexCh] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.charts = newChart;
	    // tables
	    var orderTable = $("#sortable-table").sortable('toArray');
	    $(orderTable).each(function (indexTable, nameTable) {
	      var uri = data.tables[parseInt(nameTable)].uri;
	      var title = data.tables[parseInt(nameTable)].title;
	      var filename = data.tables[parseInt(nameTable)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newTable[indexTable] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.tables = newTable;
	    // images
	    var orderImage = $("#sortable-image").sortable('toArray');
	    $(orderImage).each(function (indexImage, nameImage) {
	      var uri = data.images[parseInt(nameImage)].uri;
	      var title = data.images[parseInt(nameImage)].title;
	      var filename = data.images[parseInt(nameImage)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.images = newImage;

	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-file").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#file-title_' + nameF).val();
	      var file = data.downloads[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.downloads = newFiles;
	    // External links
	    var orderLink = $("#sortable-link").sortable('toArray');
	    $(orderLink).each(function (indexL, nameL) {
	      var displayText = data.links[parseInt(nameL)].title;
	      var link = $('#link-uri_' + nameL).val();
	      newLinks[indexL] = {uri: link, title: displayText};
	    });
	    data.links = newLinks;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}


	function articleEditor(collectionId, data) {

	  var newChart = [], newTable = [], newEquation = [], newImage = [], newLinks = [], newFiles = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#edition").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.edition = $(this).val();
	  });

	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }

	  $("#nextRelease").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.nextRelease = $(this).val();
	  });
	  if (!data.description.contact) {
	    data.description.contact = {};
	  }
	  $("#contactName").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.name = $(this).val();
	  });
	  $("#contactEmail").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.email = $(this).val();
	  });
	  $("#contactTelephone").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.telephone = $(this).val();
	  });
	  $("#abstract").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description._abstract = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	   is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	  var checkBoxStatus = function () {
	    if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	      return false;
	    } else {
	      return true;
	    }
	  };

	  $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	    data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {

	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // charts
	    var orderChart = $("#sortable-chart").sortable('toArray');
	    $(orderChart).each(function (indexCh, nameCh) {
	      var uri = data.charts[parseInt(nameCh)].uri;
	      var title = data.charts[parseInt(nameCh)].title;
	      var filename = data.charts[parseInt(nameCh)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newChart[indexCh] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.charts = newChart;
	    // tables
	    var orderTable = $("#sortable-table").sortable('toArray');
	    $(orderTable).each(function (indexTable, nameTable) {
	      var uri = data.tables[parseInt(nameTable)].uri;
	      var title = data.tables[parseInt(nameTable)].title;
	      var filename = data.tables[parseInt(nameTable)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newTable[indexTable] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.tables = newTable;
	    // equations
	    var orderEquation = $("#sortable-equation").sortable('toArray');
	    $(orderEquation).each(function (indexEquation, nameEquation) {
	      var uri = data.equations[parseInt(nameEquation)].uri;
	      var title = data.equations[parseInt(nameEquation)].title;
	      var filename = data.equations[parseInt(nameEquation)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newEquation[indexEquation] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.equations = newEquation;
	    // images
	    var orderImage = $("#sortable-image").sortable('toArray');
	    $(orderImage).each(function (indexImage, nameImage) {
	      var uri = data.images[parseInt(nameImage)].uri;
	      var title = data.images[parseInt(nameImage)].title;
	      var filename = data.images[parseInt(nameImage)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.images = newImage;
	    // External links
	    var orderLink = $("#sortable-link").sortable('toArray');
	    $(orderLink).each(function (indexL, nameL) {
	      var displayText = data.links[parseInt(nameL)].title;
	      var link = $('#link-uri_' + nameL).val();
	      newLinks[indexL] = {uri: link, title: displayText};
	    });
	    data.links = newLinks;
	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-pdf").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#pdf-title_' + nameF).val();
	      var file = data.pdfTable[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.pdfTable = newFiles;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function bulletinEditor(collectionId, data) {

	    var newChart = [], newTable = [], newEquation = [], newImage = [], newLinks = [], newFiles = [];
	    var setActiveTab, getActiveTab;
	    var renameUri = false;

	    $(".edit-accordion").on('accordionactivate', function (event, ui) {
	        setActiveTab = $(".edit-accordion").accordion("option", "active");
	        if (setActiveTab !== false) {
	            Florence.globalVars.activeTab = setActiveTab;
	        }
	    });

	    getActiveTab = Florence.globalVars.activeTab;
	    accordion(getActiveTab);
	    getLastPosition();

	    // Metadata load, edition and saving
	    $("#title").on('input', function () {
	        renameUri = true;
	        $(this).textareaAutoSize();
	        data.description.title = $(this).val();
	    });
	    $("#edition").on('input', function () {
	        renameUri = true;
	        $(this).textareaAutoSize();
	        data.description.edition = $(this).val();
	    });

	    if (!data.description.releaseDate) {
	        $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	            data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	        });
	    } else {
	        dateTmp = data.description.releaseDate;
	        var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	        $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	            data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	        });
	    }

	    $("#nextRelease").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.nextRelease = $(this).val();
	    });
	    if (!data.description.contact) {
	        data.description.contact = {};
	    }
	    $("#contactName").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.name = $(this).val();
	    });
	    $("#contactEmail").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.email = $(this).val();
	    });
	    $("#contactTelephone").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.telephone = $(this).val();
	    });
	    $("#summary").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.summary = $(this).val();
	    });
	    $("#headline1").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.headline1 = $(this).val();
	    });
	    $("#headline2").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.headline2 = $(this).val();
	    });
	    $("#headline3").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.headline3 = $(this).val();
	    });
	    $("#keywordsTag").tagit({
	        availableTags: data.description.keywords,
	        singleField: true,
	        allowSpaces: true,
	        singleFieldNode: $('#keywords')
	    });
	    $('#keywords').on('change', function () {
	        data.description.keywords = $('#keywords').val().split(',');
	    });
	    $("#metaDescription").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.metaDescription = $(this).val();
	    });

	    /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	     is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	    var checkBoxStatus = function () {
	        if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	            return false;
	        }
	        return true;
	    };

	    $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	        data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
	    });

	    // Save
	    var editNav = $('.edit-nav');
	    editNav.off(); // remove any existing event handlers.

	    editNav.on('click', '.btn-edit-save', function () {
	        save(updateContent);
	    });

	    // completed to review
	    editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	        save(saveAndCompleteContent);
	    });

	    // reviewed to approve
	    editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	        save(saveAndReviewContent);
	    });

	    function save(onSave) {

	        Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	        // charts
	        var orderChart = $("#sortable-chart").sortable('toArray');
	        $(orderChart).each(function (indexCh, nameCh) {
	            var uri = data.charts[parseInt(nameCh)].uri;
	            var title = data.charts[parseInt(nameCh)].title;
	            var filename = data.charts[parseInt(nameCh)].filename;
	            var safeUri = checkPathSlashes(uri);
	            newChart[indexCh] = {uri: safeUri, title: title, filename: filename};
	        });
	        data.charts = newChart;
	        // tables
	        var orderTable = $("#sortable-table").sortable('toArray');
	        $(orderTable).each(function (indexTable, nameTable) {
	            var uri = data.tables[parseInt(nameTable)].uri;
	            var title = data.tables[parseInt(nameTable)].title;
	            var filename = data.tables[parseInt(nameTable)].filename;
	            var safeUri = checkPathSlashes(uri);
	            newTable[indexTable] = {uri: safeUri, title: title, filename: filename};
	        });
	        data.tables = newTable;
	        // equations
	        var orderEquation = $("#sortable-equation").sortable('toArray');
	        $(orderEquation).each(function (indexEquation, nameEquation) {
	            var uri = data.equations[parseInt(nameEquation)].uri;
	            var title = data.equations[parseInt(nameEquation)].title;
	            var filename = data.equations[parseInt(nameEquation)].filename;
	            var safeUri = checkPathSlashes(uri);
	            newEquation[indexEquation] = {uri: safeUri, title: title, filename: filename};
	        });
	        data.equations = newEquation;
	        // images
	        var orderImage = $("#sortable-image").sortable('toArray');
	        $(orderImage).each(function (indexImage, nameImage) {
	            var uri = data.images[parseInt(nameImage)].uri;
	            var title = data.images[parseInt(nameImage)].title;
	            var filename = data.images[parseInt(nameImage)].filename;
	            var safeUri = checkPathSlashes(uri);
	            newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
	        });
	        data.images = newImage;
	        // External links
	        var orderLink = $("#sortable-link").sortable('toArray');
	        $(orderLink).each(function (indexL, nameL) {
	            var displayText = data.links[parseInt(nameL)].title;
	            var link = $('#link-uri_' + nameL).val();
	            newLinks[indexL] = {uri: link, title: displayText};
	        });
	        data.links = newLinks;
	        // Files are uploaded. Save metadata
	        var orderFile = $("#sortable-pdf").sortable('toArray');
	        $(orderFile).each(function (indexF, nameF) {
	            var title = $('#pdf-title_' + nameF).val();
	            var file = data.pdfTable[parseInt(nameF)].file;
	            newFiles[indexF] = {title: title, file: file};
	        });
	        data.pdfTable = newFiles;

	        checkRenameUri(collectionId, data, renameUri, onSave);
	    }
	}

	function timeseriesEditor(collectionId, data) {

	  var setActiveTab, getActiveTab;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#nextRelease").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.nextRelease = $(this).val();
	  });
	  if (!data.description.contact) {
	    data.description.contact = {};
	  }
	  $("#contactName").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.name = $(this).val();
	  });
	  $("#contactEmail").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.email = $(this).val();
	  });
	  $("#contactTelephone").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.telephone = $(this).val();
	  });
	  $("#number").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.number = $(this).val();
	  });
	  $("#keyNote").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.keyNote = $(this).val();
	  });
	  $("#unit").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.unit = $(this).val();
	  });
	  $("#preUnit").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.preUnit = $(this).val();
	  });
	  $("#source").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.source = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	   is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	  var checkBoxStatus = function () {
	    if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	      return false;
	    } else {
	      return true;
	    }
	  };

	  $("#metadata-list #natStat input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	    data.description.nationalStatistic = $("#metadata-list #natStat input[type='checkbox']").prop('checked') ? true : false;
	  });

	  var isIndexStatus = function () {
	    if (data.description.isIndex === true) {
	      return true;
	    } else {
	      return false;
	    }
	  };

	  $("#metadata-list #isIndex input[type='checkbox']").prop('checked', isIndexStatus).click(function () {
	    data.description.isIndex = $("#metadata-list #isIndex input[type='checkbox']").prop('checked') ? true : false;
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    if (Florence.globalVars.welsh) {
	      sweetAlert('You cannot perform this operation in Welsh.');
	    } else {
	      Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	      updateContent(collectionId, data.uri, JSON.stringify(data));
	    }
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    if (Florence.globalVars.welsh) {
	      sweetAlert('You cannot perform this operation in Welsh.');
	    } else {
	      Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	      saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data));
	    }
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();
	    saveAndReviewContent(collectionId, data.uri, JSON.stringify(data));
	  });

	}

	function compendiumChapterEditor(collectionId, data) {

	    var newChart = [], newTable = [], newEquation = [], newImage = [], newLinks = [];
	    var parentUrl = getParentPage(data.uri);
	    var setActiveTab, getActiveTab;

	    //Add parent link onto page
	    loadParentLink(collectionId, data, parentUrl);

	    $(".edit-accordion").on('accordionactivate', function (event, ui) {
	        setActiveTab = $(".edit-accordion").accordion("option", "active");
	        if (setActiveTab !== false) {
	            Florence.globalVars.activeTab = setActiveTab;
	        }
	    });

	    getActiveTab = Florence.globalVars.activeTab;
	    accordion(getActiveTab);
	    getLastPosition();

	    // Metadata edition and saving
	    $("#title").on('input', function () {
	        $(this).textareaAutoSize();
	        sweetAlert("Cannot remame this page here", "Go back to parent page and use the rename function there");
	    });
	    $("#headline").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.headline = $(this).val();
	    });
	    if (!data.description.releaseDate) {
	        $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	            data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	        });
	    } else {
	        dateTmp = data.description.releaseDate;
	        var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	        $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	            data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	        });
	    }
	    $("#nextRelease").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.nextRelease = $(this).val();
	    });
	    if (!data.description.contact) {
	        data.description.contact = {};
	    }
	    $("#contactName").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.name = $(this).val();
	    });
	    $("#contactEmail").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.email = $(this).val();
	    });
	    $("#contactTelephone").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.telephone = $(this).val();
	    });
	    $("#abstract").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description._abstract = $(this).val();
	    });
	    $("#keywordsTag").tagit({
	        availableTags: data.description.keywords,
	        singleField: true,
	        allowSpaces: true,
	        singleFieldNode: $('#keywords')
	    });
	    $('#keywords').on('change', function () {
	        data.description.keywords = $('#keywords').val().split(',');
	    });
	    $("#metaDescription").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.metaDescription = $(this).val();
	    });

	    /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	     is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	    var checkBoxStatus = function () {
	        if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	            return false;
	        } else {
	            return true;
	        }
	    };

	    $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	        data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
	    });

	    // Save
	    var editNav = $('.edit-nav');
	    editNav.off(); // remove any existing event handlers.

	    editNav.on('click', '.btn-edit-save', function () {
	        save();
	        updateContent(collectionId, data.uri, JSON.stringify(data));
	    });

	    // completed to review
	    editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	        save();
	        saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data), false, parentUrl);
	    });

	    // reviewed to approve
	    editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	        save();
	        saveAndReviewContent(collectionId, data.uri, JSON.stringify(data), false, parentUrl);
	    });


	    function save() {

	        Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	        // charts
	        var orderChart = $("#sortable-chart").sortable('toArray');
	        $(orderChart).each(function (indexCh, nameCh) {
	            var uri = data.charts[parseInt(nameCh)].uri;
	            var title = data.charts[parseInt(nameCh)].title;
	            var filename = data.charts[parseInt(nameCh)].filename;
	            var safeUri = checkPathSlashes(uri);
	            newChart[indexCh] = {uri: safeUri, title: title, filename: filename};
	        });
	        data.charts = newChart;

	        // tables
	        var orderTable = $("#sortable-table").sortable('toArray');
	        $(orderTable).each(function (indexTable, nameTable) {
	            var uri = data.tables[parseInt(nameTable)].uri;
	            var title = data.tables[parseInt(nameTable)].title;
	            var filename = data.tables[parseInt(nameTable)].filename;
	            var safeUri = checkPathSlashes(uri);
	            newTable[indexTable] = {uri: safeUri, title: title, filename: filename};
	        });
	        data.tables = newTable;
	        var orderEquation = $("#sortable-equation").sortable('toArray');
	        $(orderEquation).each(function (indexEquation, nameEquation) {
	            var uri = data.equations[parseInt(nameEquation)].uri;
	            var title = data.equations[parseInt(nameEquation)].title;
	            var filename = data.equations[parseInt(nameEquation)].filename;
	            var safeUri = checkPathSlashes(uri);
	            newEquation[indexEquation] = {uri: safeUri, title: title, filename: filename};
	        });
	        data.equations = newEquation;
	        // images
	        var orderImage = $("#sortable-image").sortable('toArray');
	        $(orderImage).each(function (indexImage, nameImage) {
	            var uri = data.images[parseInt(nameImage)].uri;
	            var title = data.images[parseInt(nameImage)].title;
	            var filename = data.images[parseInt(nameImage)].filename;
	            var safeUri = checkPathSlashes(uri);
	            newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
	        });
	        data.images = newImage;

	        // External links
	        var orderLink = $("#sortable-link").sortable('toArray');
	        $(orderLink).each(function (indexL, nameL) {
	            var displayText = data.links[parseInt(nameL)].title;
	            var link = $('#link-uri_' + nameL).val();
	            newLinks[indexL] = {uri: link, title: displayText};
	        });
	        data.links = newLinks;
	    }
	}

	function compendiumDataEditor(collectionId, data) {

	    var newFiles = [];
	    var parentUrl = getParentPage(data.uri);
	    var setActiveTab, getActiveTab;

	    //Add parent link onto page
	    loadParentLink(collectionId, data, parentUrl);

	    $(".edit-accordion").on('accordionactivate', function (event, ui) {
	        setActiveTab = $(".edit-accordion").accordion("option", "active");
	        if (setActiveTab !== false) {
	            Florence.globalVars.activeTab = setActiveTab;
	        }
	    });

	    getActiveTab = Florence.globalVars.activeTab;
	    accordion(getActiveTab);
	    getLastPosition();

	    // Metadata edition and saving
	    $("#title").on('input', function () {
	        $(this).textareaAutoSize();
	        sweetAlert("Cannot remame this page here", "Go back to parent page and use the rename function there");
	    });
	    $("#summary").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.summary = $(this).val();
	    });
	    //if (!Florence.collection.date) {                    //overwrite scheduled collection date
	    if (!data.description.releaseDate) {
	        $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	            data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	        });
	    } else {
	        dateTmp = data.description.releaseDate;
	        var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	        $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	            data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	        });
	    }
	    //} else {
	    //    $('.release-date').hide();
	    //}
	    $("#nextRelease").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.nextRelease = $(this).val();
	    });
	    if (!data.description.contact) {
	        data.description.contact = {};
	    }
	    $("#contactName").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.name = $(this).val();
	    });
	    $("#contactEmail").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.email = $(this).val();
	    });
	    $("#contactTelephone").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.contact.telephone = $(this).val();
	    });
	    $("#datasetId").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.datasetId = $(this).val();
	    });
	    $("#keywordsTag").tagit({
	        availableTags: data.description.keywords,
	        singleField: true,
	        allowSpaces: true,
	        singleFieldNode: $('#keywords')
	    });
	    $('#keywords').on('change', function () {
	        data.description.keywords = $('#keywords').val().split(',');
	    });
	    $("#metaDescription").on('input', function () {
	        $(this).textareaAutoSize();
	        data.description.metaDescription = $(this).val();
	    });

	    /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	     is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	    var checkBoxStatus = function () {
	        if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	            return false;
	        } else {
	            return true;
	        }
	    };
	    $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	        data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
	    });

	    // Save
	    var editNav = $('.edit-nav');
	    editNav.off(); // remove any existing event handlers.

	    editNav.on('click', '#save', function () {
	        save();
	        updateContent(collectionId, data.uri, JSON.stringify(data));
	    });

	    // completed to review
	    editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	        //pageData = $('.fl-editor__headline').val();
	        save();
	        saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data), parentUrl);
	    });

	    // reviewed to approve
	    editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	        save();
	        saveAndReviewContent(collectionId, data.uri, JSON.stringify(data), parentUrl);
	    });

	    function save() {

	        Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	        // Files are uploaded. Save metadata
	        var orderFile = $("#sortable-file").sortable('toArray');
	        $(orderFile).each(function (indexF, nameF) {
	            var title = $('#file-title_' + nameF).val();
	            var fileDescription = $("#file-summary_" + nameF).val();
	            var file = data.downloads[parseInt(nameF)].file;
	            newFiles[indexF] = {title: title, fileDescription: fileDescription, file: file};
	        });
	        data.downloads = newFiles;
	    }
	}

	function compendiumEditor(collectionId, data, templateData) {

	//  var index = data.release;
	  var newChapters = [];
	  var lastIndexChapter, lastIndexDataset;
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  resolveTitleT6(collectionId, data, templateData, 'chapters');
	  resolveTitleT6(collectionId, data, templateData, 'datasets');

	  // Metadata load, edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#edition").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.edition = $(this).val();
	  });
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }
	  $("#nextRelease").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.nextRelease = $(this).val();
	  });
	  if (!data.description.contact) {
	    data.description.contact = {};
	  }
	  $("#contactName").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.name = $(this).val();
	  });
	  $("#contactEmail").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.email = $(this).val();
	  });
	  $("#contactTelephone").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.telephone = $(this).val();
	  });
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  $("#headline").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.headline = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	   is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	  var checkBoxStatus = function () {
	    if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	      return false;
	    }
	    return true;
	  };

	  $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	    data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
	  });

	  //Add new chapter
	  $("#add-chapter").one('click', function () {
	    var chapterTitle;
	    $('#sortable-chapter').append(
	      '<div id="' + lastIndexChapter + '" class="edit-section__sortable-item">' +
	      '<textarea class="auto-size" id="new-chapter-title" placeholder="Type title here and click add"></textarea>' +
	      '<div class="edit-section__buttons">' +
	      '<button class="btn-markdown-edit" id="chapter-add">Edit chapter</button>' +
	      '</div>' +
	      '</div>');
	    $('#new-chapter-title').on('input', function () {
	      $(this).textareaAutoSize();
	      chapterTitle = $(this).val();
	    });
	    $('#chapter-add').on('click', function () {
	      if (chapterTitle.length < 5) {
	        sweetAlert("This is not a valid file title");
	        return true;
	      } else {
	        loadT6Creator(collectionId, data.description.releaseDate, 'compendium_chapter', data.uri, chapterTitle);
	      }
	    });
	  });

	  //Add new table (only one per compendium)
	  if (!data.datasets || data.datasets.length === 0) {
	    $("#add-compendium-data").one('click', function () {
	      var tableTitle;
	      $('#sortable-compendium-data').append(
	        '<div id="' + lastIndexDataset + '" class="edit-section__item">' +
	        '<textarea class="auto-size" id="new-compendium-data-title" placeholder="Type title here and click add"></textarea>' +
	        '<div class="edit-section__buttons">' +
	        '<button class="btn-markdown-edit" id="compendium-data-add">Edit data</button>' +
	        '</div>' +
	        '</div>');
	      $('#new-compendium-data-title').on('input', function () {
	        $(this).textareaAutoSize();
	        tableTitle = $(this).val();
	      });
	      $('#compendium-data-add').on('click', function () {
	        if (tableTitle.length < 5) {
	          sweetAlert("This is not a valid file title");
	          return true;
	        } else {
	          loadT6Creator(collectionId, data.description.releaseDate, 'compendium_data', data.uri, tableTitle);
	        }
	      });
	    });
	  } else {
	    $('#add-compendium-data').hide().one('click', function () {
	      sweetAlert('At the moment you can have one section here.');
	    });
	  }

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {

	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // Chapters
	    var orderRelatedChapter = $("#sortable-chapter").sortable('toArray');
	    $(orderRelatedChapter).each(function (indexC, nameC) {
	      var uri = data.chapters[parseInt(nameC)].uri;
	      var safeUri = checkPathSlashes(uri);
	      newChapters[indexC] = {uri: safeUri};
	    });
	    data.chapters = newChapters;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function resolveTitleT6(collectionId, data, templateData, field) {
	  var ajaxRequest = [];
	  $(templateData[field]).each(function (index, path) {
	    templateData[field][index].description = {};
	    var eachUri = path.uri;
	    var dfd = $.Deferred();
	    getPageDataTitle(collectionId, eachUri,
	      function (response) {
	        templateData[field][index].description.title = response.title;
	        dfd.resolve();
	      },
	      function () {
	        sweetAlert("Error", field + ' address: ' + eachUri + ' is not found.', "error");
	        dfd.resolve();
	      }
	    );
	    ajaxRequest.push(dfd);
	  });

	  $.when.apply($, ajaxRequest).then(function () {
	    var dataTemplate = templateData[field];
	    if (field === 'datasets') {
	      var html = templates.workEditT6Dataset(dataTemplate);
	    } else {
	      var html = templates.workEditT6Chapter(dataTemplate);
	    }
	    $('#' + field).replaceWith(html);

	    if (field === 'datasets') {
	      editData(collectionId, data);
	    } else {
	      editChapters(collectionId, data);
	    }
	  });
	}

	function editChapters(collectionId, data) {
	  // Edit chapters
	  // Load chapter to edit
	  $(data.chapters).each(function (index) {
	    lastIndexChapter = index + 1;

	    //open document
	    $("#chapter-edit_" + index).click(function () {
	      var selectedChapter = data.chapters[index].uri;
	      createWorkspace(selectedChapter, collectionId, 'edit');
	    });

	    $('#chapter-edit-label_' + index).click(function () {
	      var selectedChapter = data.chapters[index].uri;
	      getPageData(collectionId, selectedChapter,
	        function (pageData) {
	          var markdown = pageData.description.title;
	          var editedSectionValue = {title: 'Compendium chapter title', markdown: markdown};
	          var saveContent = function (updatedContent) {
	            pageData.description.title = updatedContent;
	            var childTitle = updatedContent.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	            putContent(collectionId, pageData.uri, JSON.stringify(pageData),
	              function () {
	                //save children change and move
	                checkRenameUri(collectionId, pageData, true, updateContent);
	                putContent(collectionId, data.uri, JSON.stringify(data),
	                  function () {
	                    // on success update dataset uri in parent and save
	                    data.chapters[index].uri = data.uri + "/" + childTitle;
	                  },
	                  function (response) {
	                    if (response.status === 409) {
	                      sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                    } else {
	                      handleApiError(response);
	                    }
	                  }
	                );
	              },
	              function (message) {
	                if (message.status === 400) {
	                  sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                }
	                else {
	                  handleApiError(message);
	                }
	              }
	            );
	          };
	          loadMarkdownEditor(editedSectionValue, saveContent, pageData);
	        },
	        function (message) {
	          handleApiError(message);
	        }
	      );
	    });

	    // Delete
	    $("#chapter-delete_" + index).click(function () {
	      swal({
	        title: "Warning",
	        text: "You are going to delete the chapter this link refers to. Are you sure you want to proceed?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Continue",
	        cancelButtonText: "Cancel",
	        closeOnConfirm: false
	      }, function (result) {
	        if (result === true) {
	          var selectedChapter = data.chapters[index].uri;
	          var path = data.uri;
	          $("#" + index).remove();
	          data.chapters.splice(index, 1);
	          putContent(collectionId, path, JSON.stringify(data),
	            function () {
	              swal({
	                title: "Deleted",
	                text: "This file has been deleted",
	                type: "success",
	                timer: 2000
	              });
	              Florence.Editor.isDirty = false;
	              deleteContent(collectionId, selectedChapter, function () {
	                refreshPreview(path);
	                loadPageDataIntoEditor(path, collectionId);
	              }, error);
	            },
	            function (response) {
	              if (response.status === 400) {
	                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	              }
	              else {
	                handleApiError(response);
	              }
	            }
	          );
	        }
	      });
	    });
	  });

	  function sortableSections() {
	    $("#sortable-chapter").sortable();
	  }

	  sortableSections();
	}

	function editData(collectionId, data) {
	  // Edit data reference table
	  // Load table to edit
	  if (!data.datasets || data.datasets.length === 0) {
	    lastIndexDataset = 0;
	  } else {
	    $(data.datasets).each(function (index) {
	      //open document
	      var selectedData = data.datasets[index].uri;
	      $("#compendium-data-edit_" + index).click(function () {
	        refreshPreview(selectedData);
	        viewWorkspace(selectedData, collectionId, 'edit');
	      });

	      $('#compendium-data-edit-label_' + index).click(function () {
	        getPageData(collectionId, selectedData,
	          function (pageData) {
	            var markdown = pageData.description.title;
	            var editedSectionValue = {title: 'Compendium dataset title', markdown: markdown};
	            var saveContent = function (updatedContent) {
	              pageData.description.title = updatedContent;
	              var childTitle = updatedContent.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	              putContent(collectionId, pageData.uri, JSON.stringify(pageData),
	                function () {
	                  //save children changes
	                  //move
	                  checkRenameUri(collectionId, pageData, true, updateContent);
	                  putContent(collectionId, data.uri, JSON.stringify(data),
	                    function () {
	                      // on success update dataset uri in parent and save
	                      data.datasets[index].uri = data.uri + "/" + childTitle;
	                    },
	                    function (response) {
	                      if (response.status === 409) {
	                        sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                      } else {
	                        handleApiError(response);
	                      }
	                    }
	                  );
	                },
	                function (message) {
	                  if (message.status === 400) {
	                    sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                  }
	                  else {
	                    handleApiError(message);
	                  }
	                }
	              );
	            };
	            loadMarkdownEditor(editedSectionValue, saveContent, pageData);
	          },
	          function (message) {
	            handleApiError(message);
	          }
	        );
	      });

	      // Delete
	      $("#compendium-data-delete_" + index).click(function () {
	        //var result = confirm("You are going to delete the chapter this link refers to. Are you sure you want to proceed?");
	        swal({
	          title: "Warning",
	          text: "You are going to delete the chapter this link refers to. Are you sure you want to proceed?",
	          type: "warning",
	          showCancelButton: true,
	          confirmButtonText: "Delete",
	          cancelButtonText: "Cancel",
	          closeOnConfirm: false
	        }, function (result) {
	          if (result === true) {
	            var selectedData = data.datasets[index].uri;
	            var path = data.uri;
	            $("#" + index).remove();
	            data.datasets.splice(index, 1);
	            putContent(collectionId, path, JSON.stringify(data),
	              function () {
	                swal({
	                  title: "Deleted",
	                  text: "This file has been deleted",
	                  type: "success",
	                  timer: 2000
	                });
	                Florence.Editor.isDirty = false;
	                deleteContent(collectionId, selectedData, function () {
	                  refreshPreview(path);
	                  loadPageDataIntoEditor(path, collectionId);
	                }, error);
	              },
	              function (response) {
	                if (response.status === 400) {
	                  sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                }
	                else {
	                  handleApiError(response);
	                }
	              }
	            );
	          }
	        });
	      });
	    });
	  }
	}

	function adHocEditor(collectionId, data) {

	  var newFiles = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  $("#metadata-f").remove();
	  $("#metadata-md").remove();
	  $("#metadata-q").remove();
	  $("#metadata-s").remove();
	  $("#summary-p").remove();
	  $("#contact-p").remove();
	  $("#natStat").remove();
	  $("#survey-p").remove();
	  $("#frequency-p").remove();
	  $("#compilation-p").remove();
	  $("#geoCoverage-p").remove();
	  $("#sampleSize-p").remove();
	  $(".lastRevised-p").remove();

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  //if (!Florence.collection.date) {                    //overwrite scheduled collection date
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }
	  //} else {
	  //    $('.release-date').hide();
	  //}
	  $("#reference").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    var isNumber = $(this).val();
	    if (isNumber.match(/^\d+$/)) {
	      data.description.reference = isNumber;
	    } else {
	      sweetAlert('This needs to be a number');
	    }
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {

	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // Sections
	    data.markdown = [$('#content-markdown').val()];
	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-file").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#file-title_' + nameF).val();
	      var file = data.downloads[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.downloads = newFiles;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function foiEditor(collectionId, data) {

	  var newFiles = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  $("#metadata-ad").remove();
	  $("#metadata-md").remove();
	  $("#metadata-q").remove();
	  $("#metadata-s").remove();
	  $("#summary-p").remove();
	  $("#contact-p").remove();
	  $("#natStat").remove();
	  $("#survey-p").remove();
	  $("#frequency-p").remove();
	  $("#compilation-p").remove();
	  $("#geoCoverage-p").remove();
	  $("#sampleSize-p").remove();
	  $(".lastRevised-p").remove();
	  $("#reference-p").remove();

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  //if (!Florence.collection.date) {                    //overwrite scheduled collection date
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }
	  //} else {
	  //    $('.release-date').hide();
	  //}
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {
	    // Sections
	    data.markdown = [$('#content-markdown').val()];
	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-file").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#file-title_' + nameF).val();
	      var file = data.downloads[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.downloads = newFiles;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function methodologyDownloadEditor(collectionId, data) {

	  var newFiles = [], newPdfFiles = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  $("#metadata-ad").remove();
	  $("#metadata-f").remove();
	  $("#metadata-q").remove();
	  $("#metadata-s").remove();
	  $("#summary-p").remove();
	  $("#natStat").remove();
	  $("#survey-p").remove();
	  $("#frequency-p").remove();
	  $("#compilation-p").remove();
	  $("#geoCoverage-p").remove();
	  $("#sampleSize-p").remove();
	  $(".lastRevised-p").remove();
	  $("#reference-p").remove();

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  if (!data.description.contact) {
	    data.description.contact = {};
	  }
	  $("#contactName").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.name = $(this).val();
	  });
	  $("#contactEmail").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.email = $(this).val();
	  });
	  $("#contactTelephone").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.telephone = $(this).val();
	  });
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {
	    // Sections
	    data.markdown = [$('#content-markdown').val()];
	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-file").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#file-title_' + nameF).val();
	      var file = data.downloads[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.downloads = newFiles;
	    // PDF files are uploaded. Save metadata
	    var orderPdfFile = $("#sortable-pdfFile").sortable('toArray');
	    $(orderPdfFile).each(function (indexP, nameP) {
	      var pdfTitle = $('#pdfFile-title_' + nameP).val();
	      var pdfFile = data.pdfDownloads[parseInt(nameP)].file;
	      newPdfFiles[indexP] = {title: pdfTitle, file: pdfFile};
	    });
	    data.pdfDownloads = newPdfFiles;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}


	function methodologyEditor(collectionId, data) {

	  var newChart = [], newTable = [], newEquation = [], newImage = [], newFiles = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  // Metadata load, edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  //if (!Florence.collection.date) {                        //overwrite scheduled collection date
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    //dateTmp = $('#releaseDate').val();
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }
	  //} else {
	  //    $('.release-date').hide();
	  //}
	  if (!data.description.contact) {
	    data.description.contact = {};
	  }
	  $("#contactName").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.name = $(this).val();
	  });
	  $("#contactEmail").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.email = $(this).val();
	  });
	  $("#contactTelephone").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.telephone = $(this).val();
	  });
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {
	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // charts
	    var orderChart = $("#sortable-chart").sortable('toArray');
	    $(orderChart).each(function (indexCh, nameCh) {
	      var uri = data.charts[parseInt(nameCh)].uri;
	      var title = data.charts[parseInt(nameCh)].title;
	      var filename = data.charts[parseInt(nameCh)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newChart[indexCh] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.charts = newChart;
	    // tables
	    var orderTable = $("#sortable-table").sortable('toArray');
	    $(orderTable).each(function (indexTable, nameTable) {
	      var uri = data.tables[parseInt(nameTable)].uri;
	      var title = data.tables[parseInt(nameTable)].title;
	      var filename = data.tables[parseInt(nameTable)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newTable[indexTable] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.tables = newTable;
	    // equations
	    var orderEquation = $("#sortable-equation").sortable('toArray');
	    $(orderEquation).each(function (indexEquation, nameEquation) {
	      var uri = data.equations[parseInt(nameEquation)].uri;
	      var title = data.equations[parseInt(nameEquation)].title;
	      var filename = data.equations[parseInt(nameEquation)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newEquation[indexEquation] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.equations = newEquation;
	    // images
	    var orderImage = $("#sortable-image").sortable('toArray');
	    $(orderImage).each(function (indexImage, nameImage) {
	      var uri = data.images[parseInt(nameImage)].uri;
	      var title = data.images[parseInt(nameImage)].title;
	      var filename = data.images[parseInt(nameImage)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.images = newImage;

	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-file").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#file-title_' + nameF).val();
	      var file = data.downloads[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.downloads = newFiles;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function qmiEditor(collectionId, data) {

	  var newFiles = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  $("#metadata-ad").remove();
	  $("#metadata-f").remove();
	  $("#metadata-md").remove();
	  $("#metadata-s").remove();
	  $("#summary-p").remove();
	  $(".release-date").remove();
	  $("#reference-p").remove();

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  if (!data.description.contact) {
	    data.description.contact = {};
	  }
	  $("#contactName").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.name = $(this).val();
	  });
	  $("#contactEmail").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.email = $(this).val();
	  });
	  $("#contactTelephone").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.telephone = $(this).val();
	  });
	  $("#survey").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.surveyName = $(this).val();
	  });
	  $("#frequency").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.frequency = $(this).val();
	  });
	  $("#compilation").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.compilation = $(this).val();
	  });
	  $("#geoCoverage").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.geographicCoverage = $(this).val();
	  });
	  $("#sampleSize").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.sampleSize = $(this).val();
	  });
	  if (!data.description.lastRevised) {
	    $('#lastRevised').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.lastRevised = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.lastRevised;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#lastRevised').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.lastRevised = new Date($('#lastRevised').datepicker('getDate')).toISOString();
	    });
	  }
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	   is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	  var checkBoxStatus = function () {
	    if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	      return false;
	    }
	    return true;
	  };

	  $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	    data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {

	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // Sections
	    data.markdown = [$('#content-markdown').val()];
	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-file").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#file-title_' + nameF).val();
	      var file = data.downloads[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.downloads = newFiles;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function staticArticleEditor(collectionId, data) {

	  var newChart = [], newTable = [], newEquation = [], newImage = [], newLinks = [], newFiles = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  // Metadata load, edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  //if (!Florence.collection.date) {                        //overwrite scheduled collection date
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    //dateTmp = $('#releaseDate').val();
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }
	  //} else {
	  //    $('.release-date').hide();
	  //}
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {

	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // charts
	    var orderChart = $("#sortable-chart").sortable('toArray');
	    $(orderChart).each(function (indexCh, nameCh) {
	      var uri = data.charts[parseInt(nameCh)].uri;
	      var title = data.charts[parseInt(nameCh)].title;
	      var filename = data.charts[parseInt(nameCh)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newChart[indexCh] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.charts = newChart;
	    // tables
	    var orderTable = $("#sortable-table").sortable('toArray');
	    $(orderTable).each(function (indexTable, nameTable) {
	      var uri = data.tables[parseInt(nameTable)].uri;
	      var title = data.tables[parseInt(nameTable)].title;
	      var filename = data.tables[parseInt(nameTable)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newTable[indexTable] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.tables = newTable;
	    // equations
	    var orderEquation = $("#sortable-equation").sortable('toArray');
	    $(orderEquation).each(function (indexEquation, nameEquation) {
	      var uri = data.equations[parseInt(nameEquation)].uri;
	      var title = data.equations[parseInt(nameEquation)].title;
	      var filename = data.equations[parseInt(nameEquation)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newEquation[indexEquation] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.equations = newEquation;
	    // images
	    var orderImage = $("#sortable-image").sortable('toArray');
	    $(orderImage).each(function (indexImage, nameImage) {
	      var uri = data.images[parseInt(nameImage)].uri;
	      var title = data.images[parseInt(nameImage)].title;
	      var filename = data.images[parseInt(nameImage)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.images = newImage;
	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-file").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#file-title_' + nameF).val();
	      var file = data.downloads[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.downloads = newFiles;
	    // links
	    var orderLink = $("#sortable-link").sortable('toArray');
	    $(orderLink).each(function (indexL, nameL) {
	      if (data.links[parseInt(nameL)].title) {
	        var name = data.links[parseInt(nameL)].title;
	        var link = data.links[parseInt(nameL)].uri;
	        newLinks[indexL] = {uri: link, title: name};
	      } else {
	        var link = data.links[parseInt(nameL)].uri;
	        newLinks[indexL] = {uri: link};
	      }
	    });
	    data.links = newLinks;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function staticLandingPageEditor(collectionId, data) {

	  var newSections = [], newLinks = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);


	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Edit content
	  // Load and edition
	  $(data.sections).each(function (index) {

	    $('#section-uri_' + index).on('paste', function () {
	      setTimeout(function () {
	        var pastedUrl = $('#section-uri_' + index).val();
	        var safeUrl = checkPathParsed(pastedUrl);
	        $('#section-uri_' + index).val(safeUrl);
	      }, 50);
	    });

	    if (!$('#section-uri_' + index).val()) {
	      $('<button class="btn-edit-save-and-submit-for-review" id="section-get_' + index + '">Go to</button>').insertAfter('#section-uri_' + index);

	      $('#section-get_' + index).click(function () {
	        var iframeEvent = document.getElementById('iframe').contentWindow;
	        iframeEvent.removeEventListener('click', Florence.Handler, true);
	        createWorkspace(data.uri, collectionId, '', null, true);
	        $('#section-get_' + index).html('Copy link').off().one('click', function () {
	          var uriCheck = getPathNameTrimLast();
	          var uriChecked = checkPathSlashes(uriCheck);
	          data.sections[index].uri = uriChecked;
	          putContent(collectionId, data.uri, JSON.stringify(data),
	            success = function (response) {
	              console.log("Updating completed " + response);
	              Florence.Editor.isDirty = false;
	              viewWorkspace(data.uri, collectionId, 'edit');
	              refreshPreview(data.uri);
	              var iframeEvent = document.getElementById('iframe').contentWindow;
	              iframeEvent.addEventListener('click', Florence.Handler, true);
	            },
	            error = function (response) {
	              if (response.status === 400) {
	                  sweetAlert("Cannot edit this page", "It is already part of another collection.");
	              }
	              else {
	                handleApiError(response);
	              }
	            }
	          );
	        });
	      });
	    }

	    $("#section-edit_" + index).click(function () {
	      var editedSectionValue = {
	        "title": $('#section-title_' + index).val(),
	        "markdown": $("#section-markdown_" + index).val()
	      };

	      var saveContent = function (updatedContent) {
	        data.sections[index].summary = updatedContent;
	        data.sections[index].title = $('#section-title_' + index).val();
	        data.sections[index].uri = $('#section-uri_' + index).val();
	        updateContent(collectionId, data.uri, JSON.stringify(data));
	      };

	      loadMarkdownEditor(editedSectionValue, saveContent, data);
	    });

	    // Delete
	    $("#section-delete_" + index).click(function () {
	      swal ({
	        title: "Warning",
	        text: "Are you sure you want to delete?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Delete",
	        cancelButtonText: "Cancel",
	        closeOnConfirm: false
	      }, function(result) {
	        if (result === true) {
	          $("#" + index).remove();
	          data.sections.splice(index, 1);
	          updateContent(collectionId, data.uri, JSON.stringify(data));
	          swal({
	            title: "Deleted",
	            text: "This section has been deleted",
	            type: "success",
	            timer: 2000
	          });
	        }
	      });
	    });

	      // Tooltips
	    $(function () {
	      $('#section-uri_' + index).tooltip({
	        items: '#section-uri_' + index,
	        content: 'Copy link or click Go to, navigate to page and click Copy link. Then add a title and click Edit',
	        show: "slideDown", // show immediately
	        open: function (event, ui) {
	          ui.tooltip.hover(
	            function () {
	              $(this).fadeTo("slow", 0.5);
	            });
	        }
	      });
	    });

	    $(function () {
	      $('#section-title_' + index).tooltip({
	        items: '#section-title_' + index,
	        content: 'Type a title and click Edit',
	        show: "slideDown", // show immediately
	        open: function (event, ui) {
	          ui.tooltip.hover(
	            function () {
	              $(this).fadeTo("slow", 0.5);
	            });
	        }
	      });
	    });
	  });

	  //Add new content
	  $("#add-section").one('click', function () {
	    swal ({
	      title: "Warning",
	      text: "If you do not come back to this page, you will lose any unsaved changes",
	      type: "warning",
	      showCancelButton: true,
	      confirmButtonText: "Continue",
	      cancelButtonText: "Cancel"
	    }, function(result) {
	      if (result === true) {
	        data.sections.push({uri: "", title: "", summary: ""});
	        updateContent(collectionId, data.uri, JSON.stringify(data));
	      } else {
	        loadPageDataIntoEditor(data.uri, collectionId);
	      }
	    });
	  });

	  function sortableContent() {
	    $("#sortable-section").sortable();
	  }

	  sortableContent();

	  renderExternalLinkAccordionSection(collectionId, data, 'links', 'link');

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {

	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // Sections
	    var orderSection = $("#sortable-section").sortable('toArray');
	    $(orderSection).each(function (indexS, nameS) {
	      var summary = data.sections[parseInt(nameS)].summary;
	        // Fixes title or uri not saving unless markdown edited
	        var title = $('#section-title_' + nameS).val();
	        var uri = $('#section-uri_' + nameS).val();
	      //var title = data.sections[parseInt(nameS)].title;
	      //var uri = data.sections[parseInt(nameS)].uri;
	      var uriChecked = checkPathSlashes(uri);
	      newSections[indexS] = {uri: uriChecked, title: title, summary: summary};
	    });
	    data.sections = newSections;
	    // External links
	    var orderLink = $("#sortable-link").sortable('toArray');
	    $(orderLink).each(function (indexL, nameL) {
	      var displayText = data.links[parseInt(nameL)].title;
	      var link = $('#link-uri_' + nameL).val();
	      newLinks[indexL] = {uri: link, title: displayText};
	    });
	    data.links = newLinks;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function staticPageEditor(collectionId, data) {

	  var newLinks = [], newFiles = [], newChart = [], newTable = [], newImage = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);

	  $("#metadata-ad").remove();
	  $("#metadata-f").remove();
	  $("#metadata-md").remove();
	  $("#metadata-q").remove();
	  $("#contact-p").remove();
	  $("#natStat").remove();
	  $("#survey-p").remove();
	  $("#frequency-p").remove();
	  $("#compilation-p").remove();
	  $("#geoCoverage-p").remove();
	  $("#sampleSize-p").remove();
	  $(".lastRevised-p").remove();
	  $("#reference-p").remove();

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {
	    // Sections
	    data.markdown = [$('#content-markdown').val()];
	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-file").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#file-title_' + nameF).val();
	      var file = data.downloads[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.downloads = newFiles;
	    // charts
	    var orderChart = $("#sortable-chart").sortable('toArray');
	    $(orderChart).each(function (indexCh, nameCh) {
	      var uri = data.charts[parseInt(nameCh)].uri;
	      var title = data.charts[parseInt(nameCh)].title;
	      var filename = data.charts[parseInt(nameCh)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newChart[indexCh] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.charts = newChart;
	    // tables
	    var orderTable = $("#sortable-table").sortable('toArray');
	    $(orderTable).each(function (indexTable, nameTable) {
	      var uri = data.tables[parseInt(nameTable)].uri;
	      var title = data.tables[parseInt(nameTable)].title;
	      var filename = data.tables[parseInt(nameTable)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newTable[indexTable] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.tables = newTable;
	    // images
	    var orderImage = $("#sortable-image").sortable('toArray');
	    $(orderImage).each(function (indexImage, nameImage) {
	      var uri = data.images[parseInt(nameImage)].uri;
	      var title = data.images[parseInt(nameImage)].title;
	      var filename = data.images[parseInt(nameImage)].filename;
	      var safeUri = checkPathSlashes(uri);
	      newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
	    });
	    data.images = newImage;
	    // links
	    var orderLink = $("#sortable-link").sortable('toArray');
	    $(orderLink).each(function (indexL, nameL) {
	      if (data.links[parseInt(nameL)].title) {
	        var name = data.links[parseInt(nameL)].title;
	        var link = data.links[parseInt(nameL)].uri;
	        newLinks[indexL] = {uri: link, title: name};
	      } else {
	        var link = data.links[parseInt(nameL)].uri;
	        newLinks[indexL] = {uri: link};
	      }
	    });
	    data.links = newLinks;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function datasetEditor(collectionId, data) {

	  var newFiles = [];
	  var setActiveTab, getActiveTab;
	  var parentUrl = getParentPage(data.uri);

	  //Add parent link onto page
	  loadParentLink(collectionId, data, parentUrl);


	  $(".edit-accordion").on('accordionactivate', function () {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save();
	    updateContent(collectionId, data.uri, JSON.stringify(data));
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    //pageData = $('.fl-editor__headline').val();
	    save();
	    saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data), false, parentUrl);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save();
	    saveAndReviewContent(collectionId, data.uri, JSON.stringify(data), false, parentUrl);
	  });

	  function save() {
	    // Files are uploaded. Save metadata
	    var orderFile = $("#sortable-supplementary-files").sortable('toArray');
	    $(orderFile).each(function (indexF, nameF) {
	      var title = $('#supplementary-files-title_' + nameF).val();
	      var file = data.supplementaryFiles[parseInt(nameF)].file;
	      newFiles[indexF] = {title: title, file: file};
	    });
	    data.supplementaryFiles = newFiles;
	    // Notes
	    data.section = {markdown: $('#one-markdown').val()};
	  }
	}function datasetLandingEditor(collectionId, data) {

	  var newDatasets = [], newRelatedDocuments = [], newRelatedQmi = [], newRelatedMethodology = [];
	  var setActiveTab, getActiveTab;
	  var renameUri = false;

	  $(".edit-accordion").on('accordionactivate', function (event, ui) {
	    setActiveTab = $(".edit-accordion").accordion("option", "active");
	    if (setActiveTab !== false) {
	      Florence.globalVars.activeTab = setActiveTab;
	    }
	  });

	  getActiveTab = Florence.globalVars.activeTab;
	  accordion(getActiveTab);
	  getLastPosition();

	  resolveTitleT8(collectionId, data, 'datasets');

	  // Metadata edition and saving
	  $("#title").on('input', function () {
	    renameUri = true;
	    $(this).textareaAutoSize();
	    data.description.title = $(this).val();
	  });
	  $("#summary").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.summary = $(this).val();
	  });
	  //if (!Florence.collection.date) {                      //overwrite scheduled collection date
	  if (!data.description.releaseDate) {
	    $('#releaseDate').datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($(this).datepicker({dateFormat: 'dd MM yy'})[0].value).toISOString();
	    });
	  } else {
	    dateTmp = data.description.releaseDate;
	    var dateTmpFormatted = $.datepicker.formatDate('dd MM yy', new Date(dateTmp));
	    $('#releaseDate').val(dateTmpFormatted).datepicker({dateFormat: 'dd MM yy'}).on('change', function () {
	      data.description.releaseDate = new Date($('#releaseDate').datepicker('getDate')).toISOString();
	    });
	  }
	  //} else {
	  //    $('.release-date').hide();
	  //}
	  $("#nextRelease").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.nextRelease = $(this).val();
	  });
	  if (!data.description.contact) {
	    data.description.contact = {};
	  }
	  $("#contactName").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.name = $(this).val();
	  });
	  $("#contactEmail").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.email = $(this).val();
	  });
	  $("#contactTelephone").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.contact.telephone = $(this).val();
	  });
	  $("#datasetId").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.datasetId = $(this).val();
	  });
	  $("#keywordsTag").tagit({
	    availableTags: data.description.keywords,
	    singleField: true,
	    allowSpaces: true,
	    singleFieldNode: $('#keywords')
	  });
	  $('#keywords').on('change', function () {
	    data.description.keywords = $('#keywords').val().split(',');
	  });
	  $("#metaDescription").on('input', function () {
	    $(this).textareaAutoSize();
	    data.description.metaDescription = $(this).val();
	  });

	  /* The checked attribute is a boolean attribute, which means the corresponding property is true if the attribute
	   is present at all—even if, for example, the attribute has no value or is set to empty string value or even "false" */
	  var checkBoxStatus = function () {
	    if (data.description.nationalStatistic === "false" || data.description.nationalStatistic === false) {
	      return false;
	    } else {
	      return true;
	    }
	  };
	  $("#metadata-list input[type='checkbox']").prop('checked', checkBoxStatus).click(function () {
	    data.description.nationalStatistic = $("#metadata-list input[type='checkbox']").prop('checked') ? true : false;
	  });

	  // Save
	  var editNav = $('.edit-nav');
	  editNav.off(); // remove any existing event handlers.

	  editNav.on('click', '.btn-edit-save', function () {
	    save(updateContent);
	  });

	  // completed to review
	  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	    save(saveAndCompleteContent);
	  });

	  // reviewed to approve
	  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	    save(saveAndReviewContent);
	  });

	  function save(onSave) {

	    Florence.globalVars.pagePos = $(".workspace-edit").scrollTop();

	    // Datasets are uploaded. Save metadata
	    var orderDataset = $("#sortable-edition").sortable('toArray');
	    $(orderDataset).each(function (indexF, nameF) {
	      var file = data.datasets[parseInt(nameF)].uri;
	      newDatasets[indexF] = {uri: file};
	    });
	    data.datasets = newDatasets;

	    checkRenameUri(collectionId, data, renameUri, onSave);
	  }
	}

	function resolveTitleT8(collectionId, data, field) {
	  var ajaxRequest = [];
	  var templateData = $.extend(true, {}, data);
	  $(templateData[field]).each(function (index, path) {
	    templateData[field][index].description = {};
	    var eachUri = path.uri;
	    var dfd = $.Deferred();
	    getPageDataTitle(collectionId, eachUri,
	      function (response) {
	        templateData[field][index].description.edition = response.edition;
	        templateData[field][index].uri = eachUri;
	        dfd.resolve();
	      },
	      function () {
	        sweetAlert("Error", field + ' address: ' + eachUri + ' is not found.', "error");
	        dfd.resolve();
	      }
	    );
	    ajaxRequest.push(dfd);
	  });

	  $.when.apply($, ajaxRequest).then(function () {
	    var dataTemplate = templateData[field];
	    var html = templates.workEditT8LandingDatasetList(dataTemplate);
	    $('#edition').replaceWith(html);
	    addEditionEditButton(collectionId, data, templateData);
	  });
	}

	function addEditionEditButton(collectionId, data, templateData) {
	  // Load dataset to edit
	  $(templateData.datasets).each(function (index) {
	    //open document
	    $("#edition-edit_" + index).click(function () {
	      var selectedEdition = data.datasets[index].uri;
	      Florence.globalVars.activeTab = '';
	      createWorkspace(selectedEdition, collectionId, 'edit');
	    });

	    $('#edition-edit-label_' + index).click(function () {
	      var selectedEdition = data.datasets[index].uri;
	      getPageData(collectionId, selectedEdition,
	        function (pageData) {
	          var markdown = pageData.description.edition;
	          var editedSectionValue = {title: 'Edition title', markdown: markdown};
	          var saveContent = function (updatedContent) {
	            pageData.description.edition = updatedContent;
	            var childTitle = updatedContent.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
	            putContent(collectionId, pageData.uri, JSON.stringify(pageData),
	              function () {
	                //save children changes and move
	                checkRenameUri(collectionId, pageData, true, updateContent);
	                //update dataset uri in parent and save
	                data.datasets[index].uri = data.uri + "/" + childTitle;
	                putContent(collectionId, data.uri, JSON.stringify(data),
	                  function () {},
	                  function (response) {
	                    if (response.status === 409) {
	                      sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                    } else {
	                      handleApiError(response);
	                    }
	                  }
	                );
	              },
	              function (message) {
	                if (message.status === 400) {
	                  sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                }
	                else {
	                  handleApiError(message);
	                }
	              }
	            );
	          };
	          loadMarkdownEditor(editedSectionValue, saveContent, pageData);
	        },
	        function (message) {
	          handleApiError(message);
	        }
	      );
	    });

	    // Delete (assuming datasets in makeEditSection - not dynamic fields here)
	    $('#edition-delete_' + index).click(function () {
	      swal({
	        title: "Warning",
	        text: "Are you sure you want to delete this edition?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Delete",
	        cancelButtonText: "Cancel",
	        closeOnConfirm: false
	      }, function (result) {
	        if (result === true) {
	          swal({
	            title: "Deleted",
	            text: "This edition has been deleted",
	            type: "success",
	            timer: 2000
	          });
	          var position = $(".workspace-edit").scrollTop();
	          Florence.globalVars.pagePos = position;
	          $('#edition-delete_' + index).parent().remove();
	          $.ajax({
	            url: "/zebedee/content/" + collectionId + "?uri=" + data.datasets[index].uri,
	            type: "DELETE",
	            success: function (res) {
	              console.log(res);
	            },
	            error: function (res) {
	              console.log(res);
	            }
	          });
	          data.datasets.splice(index, 1);
	          updateContent(collectionId, data.uri, JSON.stringify(data));
	        }
	      });
	    });
	  });

	  function sortableSections() {
	    $("#sortable-edition").sortable();
	  }

	  sortableSections();
	}

	function transfer(source, destination, uri) {
	  var transferRequest = {
	    source: source,
	    destination: destination,
	    uri: uri
	  };
	  $.ajax({
	    url: "/zebedee/transfer",
	    type: "POST",
	    dataType: "json",
	    contentType: 'application/json',
	    data: JSON.stringify(transferRequest),
	    success: function() {
	      console.log(' file has been moved');
	    },
	    error: function() {
	      console.log('error moving file');
	    }
	  });
	}

	function treeNodeSelect(url) {
	    var urlPart = url.replace(Florence.babbageBaseUrl, '');

	    // BEING REMOVED BECAUSE BABBAGE IS NOW RENDERING SAME AS NORMAL PAGE - Remove the trailing slash on visualisations so the node select works as expected (unless at root)
	    // if (urlPart !== '/') {
	    //     urlPart = urlPart.replace(/\/+$/, '');
	    // }

	    var $selectedListItem = $('[data-url="' + urlPart + '"]'); //get first li with data-url with url
	    $('.js-browse__item.selected').removeClass('selected');
	    $selectedListItem.addClass('selected');

	    // Hide container for item and buttons for previous and show selected one
	    $('.page__container.selected').removeClass('selected');
	    $selectedListItem.find('.page__container:first').addClass('selected');

	    // Hide previous displayed page buttons and show selected one
	    if ($selectedListItem.find('.page__buttons:first')) {
	        $('.page__buttons.selected').removeClass('selected');
	        $selectedListItem.find('.page__buttons:first').addClass('selected');
	    }

	    //page-list-tree
	    $('.tree-nav-holder ul').removeClass('active');
	    $selectedListItem.parents('ul').addClass('active');
	    $selectedListItem.closest('li').children('ul').addClass('active');

	    // Update browse tree scroll position
	    browseScrollPos();

	    // Open active directories
	    selectParentDirectories($selectedListItem);
	}
	/*
	*   Function that are applied just to UI/styling and aren't specific to certain screens or functions
	 */

	var $delegatedSelector = $('#main'); // This should be the highest point event handlers are delegated up to

	// Add focus styling to selects
	var $closestWrap;
	$delegatedSelector.on('focus', '.select-wrap select', function(e) {
	    $closestWrap = $(e.target).closest('.select-wrap');
	    $closestWrap.toggleClass('select-wrap--focus');
	});

	$delegatedSelector.on('focusout', '.select-wrap select', function(e) {
	    $closestWrap.toggleClass('select-wrap--focus');
	});

	// Function to add loading icon to a button
	function loadingBtn(selector) {
	    var loadingHTML = $(templates.loadingAnimation()).css('top', '-3px'); // -3px to get animation in centre of button

	    selector
	        .width(selector.width()).height(selector.height()) // make btn keep width & height with loading icon
	        .empty() // remove button text
	        .append(loadingHTML); // Load loading animation template into button
	}function uiTidyUp() {
		//wrap selects with <div class="select-wrap">
		// $('select').wrap('<span class="select-wrap"></span>');
		console.log('uiTidyup');
		$(function() {
	 
	    $( 'select' )
	      .selectmenu()
	      .selectmenu( "menuWidget" )
	        .addClass( "overflow" );
	  });
	}function updateContent(collectionId, path, content, redirectToPath) {
	    putContent(collectionId, path, content,
	        success = function () {
	            Florence.Editor.isDirty = false;
	            if (redirectToPath) {
	                createWorkspace(redirectToPath, collectionId, 'edit');
	                return;
	            } else {
	                //createWorkspace(path, collectionId, 'edit');
	                refreshPreview(path);
	                loadPageDataIntoEditor(path, collectionId);
	            }
	        },
	        error = function (response) {
	            if (response.status === 409) {
	                sweetAlert("Cannot edit this page", "It is already part of another collection.");
	            } else {
	                handleApiError(response);
	            }
	        }
	    );
	}
	/**
	 * Show the change password screen to change the password for the given email.
	 * @param email - The email address of the user to change the password for.
	 * @param authenticate - true if the existing password for the user needs to be entered.
	 */
	function viewChangePassword(email, authenticate) {

	  var viewModel = {
	    authenticate: authenticate
	  };
	  
	  $('body').append(templates.changePassword(viewModel));

	  $('.change-password-overlay__inner input:first').focus(); // Put focus on first input

	  $('#update-password').on('click', function () {
	    var oldPassword = $('#password-old').val();
	    var newPassword = $('#password-new').val();
	    var confirmPassword = $('#password-confirm').val();

	    if(newPassword !== confirmPassword) {
	      sweetAlert('The passphrases provided do not match', 'Please enter the new passphrase again and confirm it.');
	    } else if(!newPassword.match(/.+\s.+\s.+\s.+/)) {
	      sweetAlert('The passphrase does not have four words', 'Please enter a new passphrase and confirm it.');
	    } else if(newPassword.length < 15) {
	      sweetAlert('The passphrase is too short', 'Please make sure it has at least 15 characters (including spaces).');
	    } else {
	      submitNewPassword(newPassword, oldPassword);
	    }
	  });

	  $('#update-password-cancel').on('click', function () {
	    $('.change-password-overlay').stop().fadeOut(200).remove();
	  });

	  function submitNewPassword(newPassword, oldPassword) {
	    postPassword(
	      success = function () {
	        console.log('Password updated');
	        sweetAlert("Password updated", "", "success");
	        $('.change-password-overlay').stop().fadeOut(200).remove();

	        if(authenticate) {
	          postLogin(email, newPassword);
	        }
	      },
	      error = function (response) {
	        if (response.status === 403 || response.status === 401) {
	          if (authenticate) {
	            sweetAlert('The password you entered is incorrect. Please try again');
	          } else {
	            sweetAlert('You are not authorised to change the password for this user');
	          }
	        }
	      },
	      email,
	      newPassword,
	      oldPassword);
	  }
	}


	function viewCollectionDetails(collectionId, $this) {

	    getCollectionDetails(collectionId,
	        success = function (response) {
	            populateCollectionDetails(response, collectionId, $this);
	        },
	        error = function (response) {
	            handleApiError(response);
	        }
	    );

	    function populateCollectionDetails(collection, collectionId) {

	        Florence.setActiveCollection(collection);

	        // Set published date
	        if (!collection.publishDate) {
	            collection.date = '[manual collection]';
	        } else if (collection.publishDate && collection.type === 'manual') {
	            collection.date = '[manual collection] Originally scheduled for ' + StringUtils.formatIsoFull(collection.publishDate);
	        } else {
	            collection.date = StringUtils.formatIsoFull(collection.publishDate);
	        }

	        // Set collection progress
	        ProcessPages(collection.inProgress);
	        ProcessPages(collection.complete);
	        ProcessPages(collection.reviewed);

	        // Set collection approval state
	        var approvalStates = {inProgress: false, thrownError: false, completed: false};
	        switch (collection.approvalStatus) {
	            case (undefined): {
	                collection.approvalState = '';
	                break;
	            }
	            case ('IN_PROGRESS'): {
	                approvalStates.inProgress = true;
	                break;
	            }
	            case ('COMPLETE'): {
	                approvalStates.completed = true;
	                break;
	            }
	            case ('ERROR'): {
	                approvalStates.thrownError = true;
	                break;
	            }
	        }
	        collection.approvalState = approvalStates;

	        var showPanelOptions = {
	            html: window.templates.collectionDetails(collection)
	        };
	        showPanel($this, showPanelOptions);

	        var deleteButton = $('#collection-delete'),
	            collectionCanBeDeleted = collection.inProgress.length === 0
	                && collection.complete.length === 0
	                && collection.reviewed.length === 0
	                && collection.timeseriesImportFiles.length === 0
	                && collection.pendingDeletes.length <= 0;
	        if (collectionCanBeDeleted) {
	            deleteButton.show().click(function () {
	                swal({
	                    title: "Warning",
	                    text: "Are you sure you want to delete this collection?",
	                    type: "warning",
	                    showCancelButton: true,
	                    confirmButtonText: "Continue",
	                    cancelButtonText: "Cancel",
	                    closeOnConfirm: false
	                }, function (result) {
	                    if (result === true) {
	                        deleteCollection(collectionId,
	                            function () {
	                                swal({
	                                    title: "Collection deleted",
	                                    type: "success",
	                                    timer: 2000
	                                });
	                                viewCollections();
	                            },
	                            function (error) {
	                                viewCollectionDetails(collectionId);
	                                sweetAlert('File has not been deleted. Contact an administrator', error, "error");
	                            })
	                    } else {
	                    }
	                });
	            });
	        } else {
	            deleteButton.hide();
	        }

	        var $approveBtn = $('.btn-collection-approve'),
	            $editBtn = $('.btn-collection-edit'),
	            $workOnBtn = $('.btn-collection-work-on'),
	            collectionIsApproved = collection.approvalState.inProgress || collection.approvalState.thrownError;

	        if (collectionIsApproved) {
	            // Collection has been approved and is generating PDF, timeseries etc so disable buttons
	            $workOnBtn.addClass('btn--disabled').attr('disabled', true);
	            $approveBtn.addClass('btn--disabled').attr('disabled', true);
	        } else if (showApproveButton(collection)) {
	            // Collection has been reviewed and is ready for approval, so show button and bind click
	            $approveBtn.show().one('click', function () {
	                postApproveCollection(collection.id);
	            });
	        } else {
	            // You can't approve collections unless there is nothing left to be reviewed, hide approve button
	            $approveBtn.hide();
	        }

	        //edit collection
	        $editBtn.click(function () {
	            editCollection(collection);
	        });

	        //page-list
	        $('.page__item:not(.delete-child)').click(function () {
	            $('.page-list li').removeClass('selected');
	            $('.page__buttons').hide();
	            $('.page__children').hide();

	            var $this = $(this),
	                $buttons = $this.next('.page__buttons'),
	                $childrenPages = $buttons.length > 0 ? $buttons.next('.page__children') : $this.next('.page__children');

	            $this.parent('li').addClass('selected');
	            $buttons.show();
	            $childrenPages.show();
	        });

	        $('.btn-page-edit').click(function () {
	            var path = $(this).attr('data-path');
	            var language = $(this).attr('data-language');
	            if (language === 'cy') {
	                var safePath = checkPathSlashes(path);
	                Florence.globalVars.welsh = true;
	            } else {
	                var safePath = checkPathSlashes(path);
	                Florence.globalVars.welsh = false;
	            }
	            getPageDataDescription(collectionId, safePath,
	                success = function () {
	                    createWorkspace(safePath, collectionId, 'edit', collection);
	                },
	                error = function (response) {
	                    handleApiError(response);
	                }
	            );
	        });

	        $('.page-delete').click(function () {
	            var path = $(this).attr('data-path');
	            var language = $(this).attr('data-language');

	            //Shows relevant alert text - SweetAlert doesn't return a true or false in same way that confirm() does so have to write each alert with delete function called after it
	            function deleteAlert(text) {
	                swal({
	                    title: "Warning",
	                    text: text,
	                    type: "warning",
	                    showCancelButton: true,
	                    confirmButtonText: "Delete",
	                    cancelButtonText: "Cancel",
	                    closeOnConfirm: false
	                }, function (result) {
	                    if (result === true) {
	                        //if (language === 'cy' && !(path.match(/\/bulletins\//) || path.match(/\/articles\//))) {
	                        if (language === 'cy') {
	                            path = path + '/data_cy.json';
	                        }
	                        deleteContent(collectionId, path, function () {
	                                viewCollectionDetails(collectionId);
	                                swal({
	                                    title: "Page deleted",
	                                    text: "This page has been deleted",
	                                    type: "success",
	                                    timer: 2000
	                                });
	                            }, function (error) {
	                                handleApiError(error);
	                            }
	                        );
	                    }
	                });
	            }

	            //if (path.match(/\/bulletins\//) || path.match(/\/articles\//)) {
	            //  deleteAlert("This will delete the English and Welsh content of this page, if any. Are you sure you want to delete this page from the collection?");
	            //} else if (language === 'cy') {
	            deleteAlert("Are you sure you want to delete this page from the collection?");
	            //} else {
	            //  deleteAlert("This will delete the English and Welsh content of this page, if any. Are you sure you want to delete this page from the collection?");
	            //}
	        });

	        $('.delete-marker-remove').click(function () {
	            var selection = $('.page-list').find('.selected');
	            var uri = $(this).attr('data-path');
	            removeDeleteMarker(uri, function() {
	                // selection.remove();
	                getCollectionDetails(collectionId,
	                    success = function (response) {
	                        populateCollectionDetails(response, collectionId, $this);
	                    },
	                    error = function (response) {
	                        handleApiError(response);
	                    }
	                );
	                sweetAlert('Undo', "Deletion removed", 'success');
	            });
	        });

	        $('.btn-collection-cancel').click(function () {
	            hidePanel({});
	        });

	        $workOnBtn.click(function () {
	            var collectionState = __webpack_require__(8);
	            collectionState.set(collection);
	            var workspaceController = __webpack_require__(26);
	            workspaceController.init();
	            // Florence.globalVars.welsh = false;
	            // createWorkspace('', collectionId, 'browse', collection);
	        });

	        setCollectionDetailsHeight();
	    };

	    function ProcessPages(pages) {
	        _.sortBy(pages, 'uri');
	        _.each(pages, function (page) {
	            page.uri = page.uri.replace('/data.json', '');
	            return page;
	        });
	    }

	    function setCollectionDetailsHeight() {
	        var panelHeight = parseInt($('.panel--off-canvas').height());

	        var headHeight = parseInt($('.slider__head').height());
	        var headPadding = parseInt($('.slider__head').css('padding-bottom'));

	        var contentPadding = parseInt($('.slider__content').css('padding-bottom'));

	        var navHeight = parseInt($('.slider__nav').height());
	        var navPadding = (parseInt($('.slider__nav').css('padding-bottom'))) + (parseInt($('.slider__nav').css('padding-top')));

	        var contentHeight = panelHeight - (headHeight + headPadding + contentPadding + navHeight + navPadding);
	        $('.slider__content').css('height', contentHeight);
	    }

	    function showApproveButton(collection) {
	        // If the collection contains deletes...
	        if (collection.pendingDeletes && collection.pendingDeletes.length > 0) {
	            // Check that the current user is not the owner of any of the deletes.
	            for (i = 0; i < collection.pendingDeletes.length; i++) {
	                var pendingDelete = collection.pendingDeletes[i];
	                if (pendingDelete.user == localStorage.getItem('loggedInAs')) {
	                    $("#approval-permission-blocked").show();
	                    return false;
	                }
	            }

	            return (collection.inProgress.length === 0 && collection.complete.length === 0
	                && collection.reviewed.length >= 0) || (collection.timeseriesImportFiles.length > 0);
	        }
	        return (collection.inProgress.length === 0 && collection.complete.length === 0
	            && collection.reviewed.length > 0) || (collection.timeseriesImportFiles.length > 0);
	    }
	}function viewCollections(collectionId) {

	    var result = {};
	    var pageDataRequests = []; // list of promises - one for each ajax request.
	    pageDataRequests.push(
	        $.ajax({
	            url: "/zebedee/collections",
	            type: "get",
	            success: function (data) {
	                result.data = data;
	            },
	            error: function (jqxhr) {
	                handleApiError(jqxhr);
	            }
	        })
	    );
	    pageDataRequests.push(
	        getTeams(
	            success = function (team) {
	                result.team = team;
	            },
	            error = function (response) {
	                handleApiError(response);
	            }
	        )
	    );

	    $.when.apply($, pageDataRequests).then(function () {

	        var response = [], teams = [], date = "";

	        $.each(result.data, function (i, collection) {
	            var approvalStates = {inProgress: false, thrownError: false, completed: false};

	            if (collection.approvalStatus != "COMPLETE") {

	                // Set publish date
	                if (!collection.publishDate) {
	                    date = '[manual collection]';
	                } else if (collection.publishDate && collection.type === 'manual') {
	                    date = StringUtils.formatIsoDateString(collection.publishDate) + ' [rolled back]';
	                } else {
	                    date = StringUtils.formatIsoDateString(collection.publishDate);
	                }

	                // Set approval state
	                switch (collection.approvalStatus) {
	                    case (undefined): {
	                        break;
	                    }
	                    case ('IN_PROGRESS'): {
	                        approvalStates.inProgress = true;
	                        break;
	                    }
	                    case ('COMPLETE'): {
	                        approvalStates.completed = true;
	                        break;
	                    }
	                    case ('ERROR'): {
	                        approvalStates.thrownError = true;
	                        break;
	                    }
	                }

	                response.push({id: collection.id, name: collection.name, date: date, approvalState: approvalStates});
	            }
	        });

	        var isDataVis = false;
	        if (Florence.Authentication.userType() === "DATA_VISUALISATION") {
	            isDataVis = true;
	        }
	        var collectionsHtml = templates.collectionList({response: response, teams: result.team.teams, isDataVis: isDataVis});
	        $('.section').html(collectionsHtml);

	        if (collectionId) {
	            viewCollectionDetails(collectionId, $('.js-selectable-table tr[data-id="' + collectionId + '"]'));
	        }

	        $('.js-selectable-table tbody tr').click(function () {
	            var collectionId = $(this).attr('data-id');
	            viewCollectionDetails(collectionId, $(this));
	        });

	        $("#team-tag").tagit({
	            singleField: true,
	            singleFieldNode: $('#team-input')
	        });

	        $('.ui-autocomplete-input').hide();

	        $('select#team').change(function () {
	            $('#team-tag').tagit('createTag', $("#team option:selected").text());
	        });

	        $('#team-input').change(function () {
	            teams = $('#team-input').val().split(',');
	            //After creating the array tagit leaves an empty string if all elements are removed
	            if (teams.length === 1 && teams[0] === "") {
	                teams = [];
	            }
	        });

	        $('form input[type=radio]').click(function () {

	            if ($(this).val() === 'manual') {
	                $('#scheduledPublishOptions').hide();
	            } else if ($(this).val() === 'scheduled') {
	                $('#scheduledPublishOptions').show();
	            } else if ($(this).val() === 'custom') {
	                $('#customScheduleOptions').show();
	                $('#releaseScheduleOptions').hide();
	            } else if ($(this).val() === 'release') {
	                $('#customScheduleOptions').hide();
	                $('#releaseScheduleOptions').show();
	            }
	        });


	        $(function () {
	            var today = new Date();
	            $('#date').datepicker({
	                minDate: today,
	                dateFormat: 'dd/mm/yy',
	                constrainInput: true
	            });
	        });


	        $('.btn-select-release').on("click", function (e) {
	            e.preventDefault();
	            viewReleaseSelector();
	        });

	        $('.form-create-collection').submit(function (e) {
	            e.preventDefault();
	            createCollection(teams);
	        });
	    });
	}function viewController(view) {

	    if (Florence.Authentication.isAuthenticated()) {

	        if (view === 'collections') {
	            viewCollections();
	        }
	        else if (view === 'users') {
	            viewUsers();
	        }
	        else if (view === 'teams') {
	            viewTeams();
	        }
	        else if (view === 'login') {
	            viewLogIn();
	        }
	        else if (view === 'publish') {
	            viewPublish();
	        }
	        else if (view === 'reports') {
	            viewReports();
	        }
	        else {
	            viewController('collections');
	        }
	    }
	    else {
	        viewLogIn();
	    }
	}

	function viewLogIn() {

	    var login_form = templates.login;
	    $('.section').html(login_form);

	    $('.form-login').submit(function (e) {
	        e.preventDefault();
	        loadingBtn($('#login'));
	        var email = $('.fl-user-and-access__email').val();
	        var password = $('.fl-user-and-access__password').val();
	        postLogin(email, password);
	    });
	}

	function viewPublish() {
	    var manual = '[manual collection]';

	    $.ajax({
	        url: "/zebedee/collections",
	        type: "get",
	        crossDomain: true,
	        success: function (collections) {
	            $(collections).each(function (i) {
	                if (!collections[i].type || (collections[i].type === 'manual')) {
	                    collections[i].publishDate = manual;
	                }
	            });
	            populatePublishTable(collections);
	        },
	        error: function (response) {
	            handleApiError(response);
	        }
	    });

	    var result = [];

	    function populatePublishTable(collections) {


	        var collectionsByDate = _.chain(collections)
	            .filter(function (collection) {
	                return collection.approvalStatus == "COMPLETE"
	            })
	            .sortBy('publishDate')
	            .groupBy('publishDate')
	            .value();

	        for (var key in collectionsByDate) {
	            var response = [];
	            if (key === manual) {
	                var formattedDate = manual;
	            } else {
	                var formattedDate = StringUtils.formatIsoFull(key);
	            }
	            $(collectionsByDate[key]).each(function (n) {
	                var id = collectionsByDate[key][n].id;
	                response.push(id);
	            });
	            result.push({date: formattedDate, ids: response});
	        }

	        var publishList = templates.publishList(result);
	        $('.section').html(publishList);

	        $('.js-selectable-table tbody tr').click(function () {
	            var collections = $(this).attr('data-collections').split(',');
	            Florence.collectionToPublish.publishDate = $(this).find('td').html();
	            viewPublishDetails(collections);

	            var showPanelOptions = {
	                html: false,
	                moveCenteredPanel: true
	            };
	            showPanel($(this), showPanelOptions);
	            // $('.panel--centred').animate({marginLeft: "0%"}, 800);
	        });
	    }
	}

	function viewPublishDetails(collections) {

	    var manual = '[manual collection]';
	    var result = {
	        date: Florence.collectionToPublish.publishDate,
	        subtitle: '',
	        collectionDetails: [],
	        pendingDeletes: []
	    };
	    var pageDataRequests = []; // list of promises - one for each ajax request to load page data.
	    var onlyOne = 0;

	    $.each(collections, function (i, collectionId) {
	        onlyOne += 1;
	        pageDataRequests.push(
	            getCollectionDetails(collectionId,
	                success = function (response) {
	                    if (result.date === manual) {
	                        result.collectionDetails.push({
	                            id: response.id,
	                            name: response.name,
	                            pageDetails: response.reviewed,
	                            pageType: 'manual',
	                            pendingDeletes: response.pendingDeletes
	                        });
	                    } else {
	                        result.collectionDetails.push({
	                            id: response.id,
	                            name: response.name,
	                            pageDetails: response.reviewed
	                        });
	                    }
	                },
	                error = function (response) {
	                    handleApiError(response);
	                }
	            )
	        );
	    });

	    if (onlyOne < 2) {
	        result.subtitle = 'The following collection has been approved';
	    } else {
	        result.subtitle = 'The following collections have been approved';
	    }

	    $.when.apply($, pageDataRequests).then(function () {
	        var publishDetails = templates.publishDetails(result);
	        $('.panel--off-canvas').html(publishDetails);
	        bindAccordions();

	        $('.btn-collection-publish').click(function () {
	            var collection = $(this).closest('.js-accordion').find('.collection-name').attr('data-id');
	            console.log(collection);
	            publish(collection);
	        });

	        $('.btn-collection-unlock').click(function () {
	            var collection = $(this).closest('.js-accordion').find('.collection-name').attr('data-id');
	            console.log(collection);

	            if (result.date !== manual) {
	                swal({
	                        title: "Are you sure?",
	                        text: "If unlocked, this collection will not be published on " + result.date + " unless it is approved" +
	                        " again",
	                        type: "warning",
	                        showCancelButton: true,
	                        confirmButtonColor: "#6d272b",
	                        confirmButtonText: "Yes, unlock it!",
	                        closeOnConfirm: false
	                    },
	                    function () {
	                        unlock(collection);
	                    });
	            } else {
	                unlock(collection);
	            }
	        });

	        //page-list
	        $('.page__item:not(.delete-child)').click(function () {
	            $('.page-list li').removeClass('selected');
	            $('.page__buttons').hide();
	            $('.page__children').hide();

	            // $(this).parent('li').addClass('selected');
	            // $(this).next('.page__buttons').show();

	            var $this = $(this),
	                $buttons = $this.next('.page__buttons'),
	                $childrenPages = $buttons.length > 0 ? $buttons.next('.page__children') : $this.next('.page__children');

	            $this.parent('li').addClass('selected');
	            $buttons.show();
	            $childrenPages.show();
	        });

	        $('.btn-collection-cancel').click(function () {
	            var hidePanelOptions = {
	                onHide: false,
	                moveCenteredPanel: true
	            };

	            hidePanel(hidePanelOptions);
	        });
	    });
	}
	/**
	 * Load the release selector screen and populate the list of available releases.
	 */
	function viewReleaseSelector() {

	    var html = templates.releaseSelector();
	    $('body').append(html);

	    var releases = [];
	    PopulateReleasesForUri("/releasecalendar/data?view=upcoming", releases);

	    $('.btn-release-selector-cancel').on('click', function () {
	        $('.release-select').stop().fadeOut(200).remove();
	    });

	    var $searchInput = $('#release-search-input');
	    $searchInput.focus();
	    $searchInput.on('input', function () {
	        var searchText = $(this).val();
	        populateReleasesList(releases, searchText);
	    });

	    function PopulateReleasesForUri(baseReleaseUri, releases) {
	        //console.log("populating release for uri " + baseReleaseUri);
	        $.ajax({
	                url: baseReleaseUri,
	                type: "get",
	                success: function (data) {
	                    populateRemainingReleasePages(data, releases, baseReleaseUri);
	                },
	                error: function (response) {
	                    handleApiError(response);
	                }
	            }
	        );
	    }

	    /**
	     * Take the data from the response of getting the first release page and
	     * determine if there are any more pages to get.
	     * @param data
	     */
	    function populateRemainingReleasePages(data, releases, baseReleaseUri) {
	        var pageSize = 10;
	        _(data.result.results).each(function (release) {
	            releases.push(release);
	        });

	        // if there are more results than the existing page size, go get them.
	        if (data.result.numberOfResults > pageSize) {

	            var pagesToGet = Math.ceil((data.result.numberOfResults - pageSize) / pageSize);
	            var pageDataRequests = []; // list of promises - one for each ajax request to load page data.

	            for (var i = 2; i < pagesToGet + 2; i++) {
	                var dfd = getReleasesPage(baseReleaseUri, i, releases);
	                pageDataRequests.push(dfd);
	            }

	            $.when.apply($, pageDataRequests).then(function () {
	                populateReleasesList(releases);
	            });
	        } else {
	            populateReleasesList(releases);
	        }
	    }

	    /**
	     * Get the release page for the given index and add the response to the given releases array.
	     * @param i
	     * @param releases
	     * @returns {*}
	     */
	    function getReleasesPage(baseReleaseUri, i, releases) {
	        //console.log("getting page  " + i + " for " + baseReleaseUri);
	        var dfd = $.Deferred();
	        $.ajax({
	            url: baseReleaseUri + '&page=' + i,
	            type: "get",
	            success: function (data) {
	                _(data.result.results).each(function (release) {
	                    releases.push(release);
	                });
	                dfd.resolve();
	            },
	            error: function (response) {
	                handleApiError(response);
	                dfd.resolve();
	            }
	        });
	        return dfd;
	    }

	    /**
	     * Populate the releases list from the given array of releases.
	     * @param releases
	     */
	    function populateReleasesList(releases, filter) {
	        var releaseList = $('#release-list');
	        releaseList.find('tr').remove(); // remove existing table entries

	        _(_.sortBy(releases, function (release) {
	            return release.description.releaseDate
	        }))
	            .each(function (release) {
	                if (!filter || (release.description.title.toUpperCase().indexOf(filter.toUpperCase()) > -1)) {
	                    var date = StringUtils.formatIsoFullDateString(release.description.releaseDate);
	                    releaseList.append('<tr data-id="' + release.description.title + '" data-uri="' + release.uri + '"><td>' + release.description.title + '</td><td>' + date + '</td></tr>');
	                }
	            });

	        releaseList.find('tr').on('click', function () {
	            var releaseTitle = $(this).attr('data-id');
	            var releaseUri = $(this).attr('data-uri'),
	                $releaseTitle = $('.selected-release');
	            Florence.CreateCollection.selectedRelease = {uri: releaseUri, title: releaseTitle};


	            $releaseTitle.show().text(releaseTitle);
	            $('.release-select').stop().fadeOut(200).remove();
	        })
	    }
	}/**
	 * Display panel with selected report's details
	 *
	 * @param collection = selected collection data object
	 * @param isPublished = boolean flag of whether selected collection is published or not
	 * @param $this = jQuery object of selected item from table
	 */

	function viewReportDetails(collection, isPublished, $this) {

	    var details, reportDetails, published, events;

	    // get the event details
	    $.ajax({
	        url: "/zebedee/collectionHistory/" + collection.id,
	        type: "get",
	        crossDomain: true,
	        success: function (events) {

	            // format eventDate to user readable date
	            $(events).each(function (i) {
	                var formattedDate = events[i].eventDetails.date;
	                events[i].formattedDate = StringUtils.formatIsoFull(formattedDate);
	            });

	            if (isPublished) {


	                $.ajax({
	                    url: "/zebedee/publishedCollections/" + collection.id,
	                    type: "GET",
	                    crossDomain: true,
	                    success: function (collection) {

	                        var collection = collection[0];

	                        var date = collection.publishEndDate;
	                        collection.formattedDate = StringUtils.formatIsoFull(date);

	                        // Load details with published data
	                        if (!collection.publishResults || collection.publishResults.length === 0) {
	                            return;
	                        }

	                        var success = collection.publishResults[collection.publishResults.length - 1];
	                        var duration = (function () {

	                            if (collection.publishStartDate && collection.publishEndDate) {
	                                var start = new Date(collection.publishStartDate);
	                                var end = new Date(collection.publishEndDate);
	                            } else {
	                                var start = new Date(success.transaction.startDate);
	                                var end = new Date(success.transaction.endDate);
	                            }
	                            return end - start;
	                        })();


	                        if (collection.publishStartDate) {
	                            var starting = StringUtils.formatIsoFullSec(collection.publishStartDate);
	                        } else {
	                            var starting = StringUtils.formatIsoFullSec(success.transaction.startDate);
	                        }

	                        // var verifiedCount = collection.verifiedCount;
	                        // var verifyFailedCount = collection.verifyFailedCount;
	                        // var verifyInprogressCount = collection.verifyInprogressCount;
	                        details = {
	                            name: collection.name,
	                            // verifiedCount: verifiedCount,
	                            // verifyInprogressCount: verifyInprogressCount,
	                            // verifyFailedCount: verifyFailedCount,
	                            date: collection.formattedDate,
	                            starting: starting,
	                            duration: duration,
	                            success: success,
	                            events: events
	                        };

	                        var showPanelOptions = {
	                            html: templates.reportPublishedDetails(details),
	                            moveCenteredPanel: true
	                        };

	                        showPanel($this, showPanelOptions);
	                        bindAccordions();
	                        bindTableOrdering();

	                    },
	                    error: function (response) {
	                        handleApiError(response);
	                    }
	                });



	            } else {

	                // Load details with unpublished data
	                details = {
	                    name: collection.name,
	                    events: events
	                };

	                var showPanelOptions = {
	                    html: templates.reportUnpublishedDetails(details),
	                    moveCenteredPanel: true
	                };
	                showPanel($this, showPanelOptions);
	            }

	            bindAccordions();

	            $('.btn-collection-cancel').click(function () {
	                var hidePanelOptions = {
	                    moveCenteredPanel: true
	                };
	                hidePanel(hidePanelOptions)
	            });

	        },
	        error: function (response) {
	            handleApiError(response);
	        }
	    });

	}

	function bindTableOrdering() {
	    // Bind table ordering functionality to publish times
	    var $publishTimeHeadings = $('.publish-times-table th');
	    $publishTimeHeadings.click(function () {

	        // Get table, reverse order and rebuild it
	        var table = $(this).parents('table').eq(0);
	        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
	        this.asc = !this.asc;
	        if (!this.asc) {
	            rows = rows.reverse();
	        }
	        for (var i = 0; i < rows.length; i++) {
	            table.append(rows[i]);
	        }

	        /* TODO Get sorting arrows working - also code commented out in related SCSS */
	        // Update active classes to show sort direction in UI
	        $publishTimeHeadings.removeClass('active active--asc active--desc');
	        var tableDirection = "asc";
	        if (!this.asc) {
	            tableDirection = "desc";
	        }
	        var activeClass = "active active--" + tableDirection;
	        $(this).addClass(activeClass);
	    });

	    function comparer(index) {
	        return function (a, b) {
	            var valA = getCellValue(a, index), valB = getCellValue(b, index);
	            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
	        }
	    }

	    function getCellValue(row, index) {
	        return $(row).children('td').eq(index).html()
	    }

	}function viewReports() {

	    $.ajax({
	        url: "/zebedee/publishedCollections",
	        type: "GET",
	        crossDomain: true,
	        success: function (collections) {
	            getUnpublishedCollections(collections);
	        },
	        error: function (response) {
	            handleApiError(response);
	        }
	    });

	    function getUnpublishedCollections(publishedCollections) {
	        $.ajax({
	            url: "/zebedee/collections",
	            type: "GET",
	            crossDomain: true,
	            success: function(response) {
	                var collections = [];
	                collections["published"] = publishedCollections;
	                collections["unpublished"] = response;
	                populateTable(collections);
	            },
	            error: function (response) {
	                handleApiError(response)
	            }
	        })
	    }

	    function populateTable(collections) {
	        var collections = collections;
	        //console.log(collections);

	        // Build published collections objects
	        // // var publishedCollections = _.chain(collections.published)
	        // //     .filter(function (collection) {
	        // //         return collection.publishResults && collection.publishResults.length > 0;
	        // //     })
	        // //     .value();
	        //
	        //
	        // console.log(publishedCollections);
	        // $(publishedCollections).each(function (n, coll) {
	        //     var date = publishedCollections[n].
	        //     if (coll.publishResults && coll.publishResults.length > 0) {
	        //
	        //         if (coll.publishStartDate) {
	        //             var date = coll.publishStartDate;
	        //         } else {
	        //             var date = coll.publishResults[coll.publishResults.length - 1].transaction.startDate;
	        //         }
	        //
	        //         publishedCollections[n].formattedDate = StringUtils.formatIsoFull(date);
	        //     }
	        // });
	        //
	        // collections["published"] = publishedCollections;

	        var publishedCollections = collections.published;

	        $(publishedCollections).each(function (i) {
	            publishedCollections[i].order = i;
	        });

	        // Format the publishDate to user readable and add into JSON
	        $(publishedCollections).each(function (i) {
	            var formattedDate = collections["published"][i].publishDate;
	            collections["published"][i].formattedDate = StringUtils.formatIsoFull(formattedDate);
	        });

	        // Pass data to template 
	        var reportList = templates.reportList(collections);
	        $('.section').html(reportList);

	        // Bind click on unpublished collection
	        $('.unpublished').click(function() {
	            var i = $(this).attr('data-collections-order');
	            var isPublished = false;
	            viewReportDetails(collections.unpublished[i], isPublished, $(this));

	            selectTr($(this));
	        });

	        // Bind click on published collection
	        $('.published').click(function () {
	            var i = $(this).attr('data-collections-order');
	            var isPublished = true;
	            viewReportDetails(collections.published[i], isPublished, $(this));

	            selectTr($(this));
	        });

	        function selectTr($this) {
	            // $('.publish-select-table tbody tr').removeClass('selected');
	            // $this.addClass('selected');
	            // $('.publish-selected').animate({right: "0%"}, 800);
	            // $('.publish-select').animate({marginLeft: "0%"}, 500);
	            var showPanelOptions = {

	            }
	        }
	    }
	}
	/**
	 * Display the details of the team with the given name.
	 * @param teamName
	 * @param $this = jQuery object of selected table item
	 */
	function viewTeamDetails(teamName, $this) {

	    getTeams(
	        success = function (team) {
	            populateTeamDetails(team, $this);
	        },
	        error = function (response) {
	            handleApiError(response);
	        },
	        teamName
	    );

	    function populateTeamDetails(team, $this) {

	        var showPanelOptions = {
	            html: window.templates.teamDetails(team)
	        };
	        showPanel($this, showPanelOptions);

	        $('.btn-team-delete').click(function () {
	            swal({
	                title: "Confirm deletion",
	                text: "Please enter the name of the team you want to delete",
	                type: "input",
	                inputPlaceHolder: "Name",
	                showCancelButton: true,
	                closeOnConfirm: false,
	                confirmButtonText: "Delete",
	                animation: "slide-from-top"
	            }, function (result) {
	                console.log(result);
	                if (result) {
	                    if (result === teamName) {
	                        var encodedName = encodeURIComponent(teamName);
	                        deleteTeam(encodedName);
	                    } else {
	                        sweetAlert("Oops!", 'The name you entered did not match the team you want to delete.');
	                    }
	                }
	            });
	        });

	        $('.btn-team-cancel').click(function () {
	            hidePanel({});
	        });

	        $('.btn-team-edit-members').click(function () {
	            populateMembers(team);
	        });
	    }
	}

	function populateMembers(team) {
	    var userArray, userNotInTeam;
	    getUsers(
	        function (users) {
	            userArray = _.pluck(users, "email");
	            //console.log("UA: " + userArray);
	            userNotInTeam = _.difference(userArray, team.members);
	            //console.log("UNIT: " + userNotInTeam);
	            var teamsHtml = templates.teamEdit({team: team, user: userNotInTeam});
	            $('.section').append(teamsHtml);

	            $('#team-search-input').on('input', function () {
	                var searchText = $(this).val();
	                populateUsersList(userNotInTeam, searchText);
	            });

	            $('.btn-team-selector-cancel').click(function () {
	                $('.team-select').stop().fadeOut(200).remove();
	                viewTeamDetails(team.name);
	            });

	            $('.user-list').on('click', '.btn-team-add', function() {
	                console.log('you clicked add');
	                var $this = $(this),
	                    $li = $this.parent('li'),
	                    $email = $this.data('email');
	                $li.remove();
	                moveUser($email, true)
	                postTeamMember(team.name, $email);
	                userNotInTeam = _.difference(userNotInTeam, [$email]);

	            });


	            $('.team-list').on('click', '.btn-team-remove', function() {
	                console.log('you clicked remove');
	                var $this = $(this),
	                    $li = $this.parent('li'),
	                    $email = $this.data('email');
	                $li.remove();
	                moveUser($email, false)
	                deleteTeamMember(team.name, $email);
	                userNotInTeam.push($email);
	            });

	            //dragAndDrop();
	        },
	        function (jqxhr) {
	            handleApiError(jqxhr);
	        }
	    );

	    /**
	     * Populate the users list from the given array of users.
	     * @param users
	     */
	    function populateUsersList(users, filter) {
	        var userList = $('.user-list');
	        userList.find('li').remove(); // remove existing table entries

	        _(_.sortBy(users, function (user) {
	            return user;
	        }))
	            .each(function (user) {
	                if (!filter || (user.toUpperCase().indexOf(filter.toUpperCase()) > -1)) {
	                    userList.append('<li >' + user + ' <button class="btn-team-list btn-team-add" data-email="' + user + '">Add</button></li>');
	                }
	            });
	        //dragAndDrop();
	    }

	    //function dragAndDrop() {
	    //    $('.user-list > li').draggable({
	    //        appendTo: 'document',
	    //        helper: 'clone',
	    //        cursor: 'move'
	    //    });
	    //
	    //    $('.team-list > li').draggable({
	    //        appendTo: 'document',
	    //        helper: 'clone',
	    //        cursor: 'move'
	    //    });
	    //
	    //    $('.user-list').droppable({
	    //        accept: ".team-list > li",
	    //        drop: function (event, ui) {
	    //            var targetElem = $(this).attr("id");
	    //            $(this).addClass("ui-state-highlight");
	    //            $(ui.draggable).appendTo(this);
	    //            deleteTeamMember(team.name, ui.draggable[0].firstChild.textContent);
	    //            userNotInTeam.push(ui.draggable[0].firstChild.textContent);
	    //        }
	    //    });
	    //
	    //    $('.team-list').droppable({
	    //        accept: ".user-list > li",
	    //        drop: function (event, ui) {
	    //            var targetElem = $(this).attr("id");
	    //            $(this).addClass("ui-state-highlight");
	    //            $(ui.draggable).appendTo(this);
	    //            postTeamMember(team.name, ui.draggable[0].firstChild.textContent);
	    //            userNotInTeam = _.difference(userNotInTeam, [ui.draggable[0].firstChild.textContent]);
	    //        }
	    //    });
	    //};

	    /**
	     * Handle moving list items between lsits.
	     * @param user - email string
	     * @param beingAdded - true or false
	     */
	    function moveUser(user, beingAdded) {
	        if (beingAdded) {
	            button = '<button class="btn-team-list btn-team-remove" data-email="' + user + '">Remove</button>';
	        } else {
	            button = '<button class="btn-team-list btn-team-add" data-email="' + user + '">Add</button>';
	        }
	        var str = '<li>' + user + ' ' + button + '</li>';

	        if (beingAdded) {
	            $('.team-list').prepend(str);
	        } else {
	            $('.user-list').prepend(str);
	        }
	    }
	}


	function viewTeams(selectTableRowAndDisplayTeamDetails) {

	    getTeams(
	        success = function (data) {
	            populateTeamsTable(data.teams);

	            // on creation of new team highlight row in table and display team details
	            if (selectTableRowAndDisplayTeamDetails) {
	                selectTableRowAndDisplayTeamDetails();
	            }
	        },
	        error = function (jqxhr) {
	            handleApiError(jqxhr);
	        }
	    );

	    function populateTeamsTable(data) {
	        var teamsHtml = templates.teamList(data);
	        $('.section').html(teamsHtml);

	        $('.js-selectable-table tbody tr').click(function () {
	            var teamId = $(this).attr('data-id');
	            viewTeamDetails(teamId, $(this));
	        });

	        $('.form-create-team').submit(function (e) {
	            e.preventDefault();

	            var teamName = $('#create-team-name').val();

	            if (teamName.length < 1) {
	                sweetAlert("Please enter a user name.");
	                return;
	            }

	            teamName = teamName.trim();
	            postTeam(teamName);
	        });
	    }
	}


	/**
	 * Display the details of the user with the given email.
	 *
	 * @param email
	 * @param $this = jQuery object of selected table item
	 */
	function viewUserDetails(email, $this) {

	    getUsers(
	        success = function (user) {
	            populateUserDetails(user, email, $this);
	        },
	        error = function (response) {
	            handleApiError(response);
	        },
	        email
	    );

	    var isAdmin, isEditor, isVisPublisher;
	    function populateUserDetails(user, email, $this) {
	        getUserPermission(
	            function (permission) {
	                isAdmin = permission.admin;
	                isEditor = permission.editor;
	                isVisPublisher = permission.dataVisPublisher;

	                addPermissionToJSON(user);

	                var showPanelOptions = {
	                    html: window.templates.userDetails(user)
	                };
	                showPanel($this, showPanelOptions);

	                $('.btn-user-change-password').click(function () {
	                    var currentPasswordRequired = false;

	                    if (email == Florence.Authentication.loggedInEmail()) {
	                        currentPasswordRequired = true;
	                    }

	                    viewChangePassword(email, currentPasswordRequired);
	                });

	                $('.btn-user-delete').click(function () {
	                    swal({
	                        title: "Confirm deletion",
	                        text: "Please enter the email address of the user you want to delete",
	                        type: "input",
	                        inputPlaceHolder: "Email address",
	                        showCancelButton: true,
	                        closeOnConfirm: false,
	                        confirmButtonText: "Delete",
	                        animation: "slide-from-top"
	                    }, function (result) {
	                        console.log(result);
	                        if (result) {
	                            if (result === email) {
	                                swal({
	                                    title: "User deleted",
	                                    text: "This user has been deleted",
	                                    type: "success",
	                                    timer: 2000
	                                });
	                                deleteUser(email);
	                            } else {
	                                sweetAlert("Oops!", 'The email you entered did not match the user you want to delete.')
	                            }
	                        }
	                    });
	                });

	                $('.btn-user-cancel').click(function () {
	                    hidePanel({});
	                });
	            },
	            function (error) {handleApiError(error);},
	            email
	        );

	    }

	    /*
	     * Add permissions object to JSON so accessible to handlebars template
	     * @param user - JSON object
	     */
	    function addPermissionToJSON (user) {
	        user['permission'] = permissionStr(isAdmin, isEditor, isVisPublisher);
	    }


	    /*
	     * Logic to work out user role
	     * @param isAdmin - true/false
	     * @param isEditor - true/false
	     * @return the user's role as string
	     */
	    function permissionStr (isAdmin, isEditor, isVisPublisher) {
	        var permissionStr;
	        if (!isAdmin && !isEditor) {permissionStr = 'viewer';}
	        if (isEditor && !isVisPublisher) {permissionStr = 'publisher';}
	        if (isEditor && isVisPublisher) {permissionStr = 'visualisation publisher';}
	        if (isAdmin) {permissionStr = "admin";}

	        return permissionStr;
	    }
	}function viewUsers(view) {
	    var loggedUser = localStorage.getItem('loggedInAs');
	    getUsers(
	        success = function (data) {
	            //based on user permission will show the options to create different users
	            getUserPermission(
	                function (permission) {
	                    populateUsersTable(data, permission);
	                },
	                function (error) {
	                    handleApiError(error);
	                },
	                loggedUser
	            );
	        },
	        error = function (jqxhr) {
	            handleApiError(jqxhr);
	        }
	    );

	    function populateUsersTable(data, permission) {
	        var orderedUsers = _.sortBy(data, 'name');
	        var dataTemplate = {data: orderedUsers, permission: permission};
	        var usersHtml = templates.userList(dataTemplate);
	        var isAdmin = false;
	        var isDataVisPublisher = false;
	        var isEditor = false;
	        $('.section').html(usersHtml);


	        $('.js-selectable-table tbody tr').click(function () {
	            var userId = $(this).attr('data-id');
	            viewUserDetails(userId, $(this));
	        });

	        $('.radioBtnDiv').change(function () {
	            if ($('input:checked').val() === 'admin') {
	                isAdmin = true;
	                isEditor = true;
	                isDataVisPublisher = false;
	            }
	            else if ($('input:checked').val() === 'publisher') {
	                isAdmin = false;
	                isEditor = true;
	                isDataVisPublisher = false;
	            }
	            else if ($('input:checked').val() === 'dataVisPublisher') {
	                isAdmin = false;
	                isEditor = false;
	                isDataVisPublisher = true;
	            }
	            else {
	                isAdmin = false;
	                isEditor = false;
	                isDataVisPublisher = false;
	            }
	        });

	        $('.form-create-user').submit(function (e) {
	            e.preventDefault();

	            var username = $('#create-user-username').val();
	            var email = $('#create-user-email').val();
	            var password = $('#create-user-password').val();

	            if (username.length < 1) {
	                sweetAlert("Please enter a user name.");
	                return;
	            }

	            if (email.length < 1) {
	                sweetAlert("Please enter a user name.");
	                return;
	            }

	            if (password.length < 1) {
	                sweetAlert("Please enter a password.");
	                return;
	            }
	            postUser(username, email, password, isAdmin, isEditor, isDataVisPublisher);
	            viewUsers();
	        });
	    }
	}

	function viewWorkspace(path, collectionId, menu) {

	  var currentPath = '';
	  if (path) {
	    currentPath = path;
	  }
	  Florence.globalVars.pagePath = currentPath;

	  if (menu === 'browse') {
	    $('.nav__item--workspace').removeClass('selected');
	    $("#browse").addClass('selected');
	    loadBrowseScreen(collectionId, 'click');
	  }
	  else if (menu === 'create') {
	    $('.nav__item--workspace').removeClass('selected');
	    $("#create").addClass('selected');
	    loadCreateScreen(currentPath, collectionId);
	  }
	  else if (menu === 'edit') {
	    $('.nav__item--workspace').removeClass('selected');
	    $("#edit").addClass('selected');
	    loadPageDataIntoEditor(currentPath, collectionId);
	  }
	}

	/**
	 * Editor screen for uploading visualisations
	 * @param collectionId
	 * @param data
	 */

	function visualisationEditor(collectionId, data) {
	    var path = data.uri,
	        $fileInput = $('#input-vis'),
	        $fileForm = $('#upload-vis'),
	        i, setActiveTab, getActiveTab;

	    // Active tab
	    $(".edit-accordion").on('accordionactivate', function () {
	        setActiveTab = $(".edit-accordion").accordion("option", "active");
	        if (setActiveTab !== false) {
	            Florence.globalVars.activeTab = setActiveTab;
	        }
	    });
	    getActiveTab = Florence.globalVars.activeTab;
	    accordion(getActiveTab);
	    getLastPosition();

	    // Update hidden select to display all HTML files in ZIP
	    var selectOptions = ["<option value=''>-- Select an HTML file to preview --</option>"],
	        $selectWrapper = $('#select-vis-wrapper');

	    for (i = 0; i < data.filenames.length; i++) {
	        selectOptions.push("<option value='" + data.filenames[i] + "'>" + data.filenames[i] + "</option>")
	    }
	    $selectWrapper.find('select').empty().append(selectOptions.join(''));
	    $selectWrapper.show();
	    $('#browser-location').hide();
	    $('.browser.disabled').removeClass('disabled');

	    // Bind to select's change and toggle preview to selected HTML file
	    $('#select-vis-preview').change(function() {
	        refreshVisPreview("/" + $(this).val());
	    });

	    // Disable preview when navigating back to browse tab
	    $('#browse').click(function() {
	        $selectWrapper.hide();
	        $('#browser-location').show();
	        $('.browser').addClass('disabled');
	        updateBrowserURL("/");
	        $('#iframe').attr('src', Florence.babbageBaseUrl);
	    });

	    // Submit new ZIP file
	    bindZipSubmit();

	    // Bind file save to the change event of the file input
	    $fileInput.on('change', function() {
	        data.zipTitle = ($(this).val()).split('\\').pop();
	        $fileForm.submit();
	    });

	    // Bind save buttons
	    var editNav = $('.edit-nav');
	    editNav.off(); // remove any existing event handlers.

	    editNav.on('click', '.btn-edit-save', function () {
	        save();
	    });

	    editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
	        saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data), true);
	    });

	    editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
	        saveAndReviewContent(collectionId, data.uri, JSON.stringify(data), true);
	    });


	    /* FUNCTIONS */
	    function bindZipSubmit() {
	        // Upload ZIP file
	        $('#upload-vis').on('submit', function (e) {
	            e.preventDefault();
	            e.stopImmediatePropagation();

	            var formdata = new FormData($(this)[0]),
	                file = this[0].files[0];

	            if (!$('#input-vis')) {
	                sweetAlert("Please choose a file before submitting");
	                return false;
	            }

	            $('.input__file').attr('data-file-title', 'File uploading ...');

	            var fileNameNoSpace = file.name.replace(/[^a-zA-Z0-9\.]/g, "").toLowerCase();
	            var uniqueIdNoSpace = data.uid.replace(/[^a-zA-Z0-9\.]/g, "").toLowerCase();
	            var contentUri = "/visualisations/" + uniqueIdNoSpace + "/content";
	            var uriUpload = contentUri + "/" + fileNameNoSpace;
	            var safeUriUpload = checkPathSlashes(uriUpload);

	            path = "/visualisations/" + uniqueIdNoSpace;

	            deleteAndUploadFile(
	                safeUriUpload, contentUri, formdata,
	                success = function () {
	                    unpackZip(safeUriUpload,
	                        success = function () {

	                            // On unpack of Zip refresh the reload editor and preview
	                            loadPageDataIntoEditor(path, collectionId);
	                        }
	                    );
	                }
	            )

	        });
	    }

	    // Refresh preview (don't use global refreshPreview function because we want do other functions at the same time when selecting different HTML files)
	    function refreshVisPreview(url) {
	        document.getElementById('iframe').contentWindow.location.href = Florence.babbageBaseUrl + path + url;
	    }

	    function deleteAndUploadFile(path, contentUri, formData, success) {
	        $.ajax({
	            url: "/zebedee/DataVisualisationZip/" + Florence.collection.id + "?zipPath=" + contentUri,
	            type: 'DELETE',
	            async: false,
	            cache: false,
	            contentType: false,
	            processData: false,
	            success: function (response) {
	                uploadFile(path, formData, success);
	            },
	            error: function (response) {
	                handleApiError(response);
	            }
	        });
	    }

	    function uploadFile(path, formData, success) {
	        // Send zip file to zebedee
	        $.ajax({
	            url: "/zebedee/content/" + Florence.collection.id + "?uri=" + path,
	            type: 'POST',
	            data: formData,
	            async: false,
	            cache: false,
	            contentType: false,
	            processData: false,
	            success: function (response) {
	                success(response);
	            },
	            error: function (response) {
	                handleApiError(response);
	            }
	        });
	    }

	    function unpackZip(zipPath, success, error) {
	        // Unpack contents of ZIP
	        console.log("Unpack: " + zipPath);
	        var url = "/zebedee/DataVisualisationZip/" + Florence.collection.id + "?zipPath=" + zipPath;

	        $.ajax({
	            url: url,
	            contentType: 'application/json',
	            type: 'POST',
	            success: function (response) {
	                success(response);
	            },
	            error: function (response) {
	                if (error) {
	                    error(response);
	                } else {
	                    handleApiError(response);
	                }
	            }
	        });
	    }

	    function save() {
	        putContent(collectionId, data.uri, JSON.stringify(data),
	            success = function () {
	                Florence.Editor.isDirty = false;
	                // refreshVisPreview();
	                // refreshPreview();
	                loadPageDataIntoEditor(data.uri, collectionId);
	            },
	            error = function (response) {
	                if (response.status === 409) {
	                    sweetAlert("Cannot edit this page", "It is already part of another collection.");
	                } else {
	                    handleApiError(response);
	                }
	            },
	            true
	        );
	    }
	}
	/**
	 * Registers service worker (in root of Florence)
	 */

	if (navigator.serviceWorker) {
	    navigator.serviceWorker.register('../florence/service-worker.js').then(function(registration) {
	        console.log('ServiceWorker registration successful with scope:',  registration.scope);
	    }).catch(function(error) {
	        console.log('ServiceWorker registration failed:', error);
	    });
	}
	/**
	 *  A simple jQuery accordion
	 *  Requires a container ('js-accordion'), a title ('js-accordion__title) and the content ('js-accordion__content')
	 **/

	function bindAccordions() {
	    var $accordions = $('.js-accordion'),
	        $title = $accordions.find('.js-accordion__title');

	    // if ($accordions.length === 1) {
	    //     $accordions.find('.js-accordion__content').addClass('accordion__content--borders');
	    // }

	    $title.click(function() {
	        var $this = $(this),
	            $activeAccordions = $('.js-accordion .active'),
	            active = false;

	        // Remove class that disables animations on load
	        $this.next('.js-accordion__content').removeClass('disable-animation');

	        // Detect whether the accordion is active already or not
	        if ($this.hasClass('active')) {
	            active = true;
	        }

	        // Deselect any accordions already active
	        $activeAccordions.closest('.js-accordion').removeClass('active');
	        $activeAccordions.removeClass('active');

	        // Activate clicked accordion if it wasn't already
	        if (!active) {
	            $this.closest('.js-accordion').addClass('active');
	            $this.addClass('active');
	            $this.next('.js-accordion__content').addClass('active');
	        }

	    });
	}
	/**
	 * Controls the enhanced file input type, inputs is hidden off of page so javascript performs functions that you'd see happen natively
	 */

	$(function() {
	    var $body = $('body');

	    // Update file name being displayed when a new one is uploaded
	    $body.on('change', '.input__file input', function() {
	        var $this = $(this),
	            fileName = ($this.val()).split('\\').pop(); // split file path by backslashes into an array and use last entry

	        $this.closest('label').attr('data-file-title', fileName);
	    });

	    // Focus state
	    var $fileInput;
	    $body.on('focusin', '.input__file input', function() {
	        $fileInput = $('.input__file');
	        $fileInput.addClass('focus');
	    });
	    $body.on('focusout', '.input__file input', function() {
	        $fileInput.removeClass('focus');
	    })
	});
	/**
	 * Hide panel off-screen
	 * @param options = options that can be passed to the function to perform
	 *
	 * @option onHide = function to run at the end of the hide animation
	 * @options moveCenteredPanel = if true then remove margin from the centered selectable panel
	 */

	function hidePanel(options) {
	    $('.js-selectable-table tbody tr').removeClass('selected');

	    if (options.onHide) {
	        // Run any functions set to run once the off-screen panel is hidden
	        $('.panel--off-canvas').stop().animate({right: "-50%"}, 500, function() {
	            options.onHide();
	        });
	    } else {
	        // Default to just hiding off-screen panel
	        $('.panel--off-canvas').stop().animate({right: "-50%"}, 500);
	    }

	    if (options.moveCenteredPanel) {
	        // Add the default margin back in for the centered panel
	        $('.panel--centred').animate({marginLeft: "25%"}, 800);
	    }
	}
	/**
	 * Animate off-screen panel to appear on-screen
	 *
	 * @param $this = the table item that has been selected
	 * @param options = object of options for the function to use
	 *
	 * @options html = contents of the panel/slider
	 * @options moveCenteredPanel = if true then remove margin from the centered selectable panel
	 */

	function showPanel($this, options) {

	    if ($this) {
	        $('.js-selectable-table tbody tr').removeClass('selected');
	        $this.addClass('selected');
	    }

	    if (options.html) {
	        $('.panel--off-canvas').html(options.html).animate({right: "0%"}, 500);
	    } else {
	        $('.panel--off-canvas').animate({right: "0%"}, 500);
	    }

	    if (options.moveCenteredPanel) {
	        // Remove the margin from the centered panel to make room for off-screen panel
	        $('.panel--centred').animate({marginLeft: "0"}, 500);
	    }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global window, global*/
	var util = __webpack_require__(2)
	var assert = __webpack_require__(6)
	var now = __webpack_require__(7)

	var slice = Array.prototype.slice
	var console
	var times = {}

	if (typeof global !== "undefined" && global.console) {
	    console = global.console
	} else if (typeof window !== "undefined" && window.console) {
	    console = window.console
	} else {
	    console = {}
	}

	var functions = [
	    [log, "log"],
	    [info, "info"],
	    [warn, "warn"],
	    [error, "error"],
	    [time, "time"],
	    [timeEnd, "timeEnd"],
	    [trace, "trace"],
	    [dir, "dir"],
	    [consoleAssert, "assert"]
	]

	for (var i = 0; i < functions.length; i++) {
	    var tuple = functions[i]
	    var f = tuple[0]
	    var name = tuple[1]

	    if (!console[name]) {
	        console[name] = f
	    }
	}

	module.exports = console

	function log() {}

	function info() {
	    console.log.apply(console, arguments)
	}

	function warn() {
	    console.log.apply(console, arguments)
	}

	function error() {
	    console.warn.apply(console, arguments)
	}

	function time(label) {
	    times[label] = now()
	}

	function timeEnd(label) {
	    var time = times[label]
	    if (!time) {
	        throw new Error("No such label: " + label)
	    }

	    var duration = now() - time
	    console.log(label + ": " + duration + "ms")
	}

	function trace() {
	    var err = new Error()
	    err.name = "Trace"
	    err.message = util.format.apply(null, arguments)
	    console.error(err.stack)
	}

	function dir(object) {
	    console.log(util.inspect(object) + "\n")
	}

	function consoleAssert(expression) {
	    if (!expression) {
	        var arr = slice.call(arguments, 1)
	        assert.ok(false, util.format.apply(null, arr))
	    }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, console) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(4);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(5);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3), __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}

	// based on node assert, original notice:

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	var util = __webpack_require__(2);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};

	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;

	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};

	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }

	    memos.actual.push(actual);
	    memos.expected.push(expected);

	    return objEquiv(actual, expected, strict, memos);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}


	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }

	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }

	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }

	  return expected.call({}, actual) === true;
	}

	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }

	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }

	  actual = _tryBlock(block);

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;

	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};

	assert.ifError = function(err) { if (err) throw err; };

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = now

	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	var store = __webpack_require__(9);

	var collectionState = {
	    get: function () {
	        return store.getState().editor.collectionData;
	    },
	    set: function (collectionData) {
	        store.dispatch({
	            type: "UPDATE_COLLECTION_DATA",
	            collectionData: collectionData
	        });
	    }
	};

	module.exports = collectionState;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {
	/* Imports */
	var Redux = __webpack_require__(10),
	    watch = __webpack_require__(24);

	/* Create store */
	var createStore = Redux.createStore,
	    initialState = {
	        baseUrl: "",
	        user: {
	            email: "",
	            hasSession: false,
	            sessonExpiryDate: "",
	            type: ""
	        },
	        activeView: {
	            name: "editor"
	        },
	        editor: {
	            collectionData: {},
	            activeScreen: "",
	            activeUrl: "",
	            previewUrl: "",
	            language: "english",
	            isDirty: false,
	            editorData: {}
	        }
	    },
	    store = createStore(florence);

	/* Watch store changes */
	var watchStore = watch(store.getState, 'user.email');
	store.subscribe(watchStore(function(newVal, oldVal, objectPath) {
	    console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
	}));

	function florence(state, action) {
	    // Set initial state
	    if (state === undefined) {
	        state = initialState;
	    }

	    // Parse to string, clone and parse back to object to keep original state immutable
	    var newState = JSON.parse(JSON.stringify(state));

	    // Reducer switch function, updates the state as necessary
	    switch (action.type) {
	        case ("UPDATE_BASE_URL"): {
	            newState.baseUrl = action.baseUrl;
	            break;
	        }
	        case ("UPDATE_ACTIVE_EDITOR_SCREEN"): {
	            newState.editor.activeScreen = action.activeId;
	            break;
	        }
	        case ("UPDATE_COLLECTION_DATA"): {
	            newState.editor.collectionData = action.collectionData;
	            break;
	        }
	        case ("UPDATE_USER_EMAIL"): {
	            newState.user.email = action.userEmail;
	            break;
	        }
	        case ("UPDATE_USER_TYPE"): {
	            newState.user.type = action.userType;
	            break;
	        }
	    }

	    console.log('ACTION: ', action);
	    console.log('OLD STATE: ', state);
	    console.log('NEW STATE: ', newState);
	    console.log('--------');

	    return newState
	}

	module.exports = store;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(11);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(19);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(21);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(22);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(23);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(20);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;

	var _isPlainObject = __webpack_require__(12);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(16);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(13),
	    isHostObject = __webpack_require__(14),
	    isObjectLike = __webpack_require__(15);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ponyfill = __webpack_require__(18);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root = undefined; /* global window */

	if (typeof global !== 'undefined') {
		root = global;
	} else if (typeof window !== 'undefined') {
		root = window;
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	var _createStore = __webpack_require__(11);

	var _isPlainObject = __webpack_require__(12);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(20);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });

	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];

	    if (process.env.NODE_ENV !== 'production') {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }

	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  if (process.env.NODE_ENV !== 'production') {
	    var unexpectedKeyCache = {};
	  }

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	var _compose = __webpack_require__(23);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  var last = funcs[funcs.length - 1];
	  var rest = funcs.slice(0, -1);
	  return function () {
	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	var getValue = __webpack_require__(25).get

	function defaultCompare (a, b) {
	  return a === b
	}

	function watch (getState, objectPath, compare) {
	  compare = compare || defaultCompare
	  var currentValue = getValue(getState(), objectPath)
	  return function w (fn) {
	    return function () {
	      var newValue = getValue(getState(), objectPath)
	      if (!compare(currentValue, newValue)) {
	        var oldValue = currentValue
	        currentValue = newValue
	        fn(newValue, oldValue, objectPath)
	      }
	    }
	  }
	}

	module.exports = watch


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
	  'use strict';

	  /*istanbul ignore next:cant test*/
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(this, function(){
	  'use strict';

	  var
	    toStr = Object.prototype.toString,
	    _hasOwnProperty = Object.prototype.hasOwnProperty;

	  function isEmpty(value){
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	        return true;
	    } else if (!isString(value)) {
	        for (var i in value) {
	            if (_hasOwnProperty.call(value, i)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	  }

	  function toString(type){
	    return toStr.call(type);
	  }

	  function isNumber(value){
	    return typeof value === 'number' || toString(value) === "[object Number]";
	  }

	  function isString(obj){
	    return typeof obj === 'string' || toString(obj) === "[object String]";
	  }

	  function isObject(obj){
	    return typeof obj === 'object' && toString(obj) === "[object Object]";
	  }

	  function isArray(obj){
	    return typeof obj === 'object' && typeof obj.length === 'number' && toString(obj) === '[object Array]';
	  }

	  function isBoolean(obj){
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }

	  function getKey(key){
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }

	  function set(obj, path, value, doNotReplace){
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isString(path)) {
	      return set(obj, path.split('.').map(getKey), value, doNotReplace);
	    }
	    var currentPath = path[0];

	    if (path.length === 1) {
	      var oldVal = obj[currentPath];
	      if (oldVal === void 0 || !doNotReplace) {
	        obj[currentPath] = value;
	      }
	      return oldVal;
	    }

	    if (obj[currentPath] === void 0) {
	      //check if we assume an array
	      if(isNumber(path[1])) {
	        obj[currentPath] = [];
	      } else {
	        obj[currentPath] = {};
	      }
	    }

	    return set(obj[currentPath], path.slice(1), value, doNotReplace);
	  }

	  function del(obj, path) {
	    if (isNumber(path)) {
	      path = [path];
	    }

	    if (isEmpty(obj)) {
	      return void 0;
	    }

	    if (isEmpty(path)) {
	      return obj;
	    }
	    if(isString(path)) {
	      return del(obj, path.split('.'));
	    }

	    var currentPath = getKey(path[0]);
	    var oldVal = obj[currentPath];

	    if(path.length === 1) {
	      if (oldVal !== void 0) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      }
	    } else {
	      if (obj[currentPath] !== void 0) {
	        return del(obj[currentPath], path.slice(1));
	      }
	    }

	    return obj;
	  }

	  var objectPath = function(obj) {
	    return Object.keys(objectPath).reduce(function(proxy, prop) {
	      if (typeof objectPath[prop] === 'function') {
	        proxy[prop] = objectPath[prop].bind(objectPath, obj);
	      }

	      return proxy;
	    }, {});
	  };

	  objectPath.has = function (obj, path) {
	    if (isEmpty(obj)) {
	      return false;
	    }

	    if (isNumber(path)) {
	      path = [path];
	    } else if (isString(path)) {
	      path = path.split('.');
	    }

	    if (isEmpty(path) || path.length === 0) {
	      return false;
	    }

	    for (var i = 0; i < path.length; i++) {
	      var j = path[i];
	      if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
	        obj = obj[j];
	      } else {
	        return false;
	      }
	    }

	    return true;
	  };

	  objectPath.ensureExists = function (obj, path, value){
	    return set(obj, path, value, true);
	  };

	  objectPath.set = function (obj, path, value, doNotReplace){
	    return set(obj, path, value, doNotReplace);
	  };

	  objectPath.insert = function (obj, path, value, at){
	    var arr = objectPath.get(obj, path);
	    at = ~~at;
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }
	    arr.splice(at, 0, value);
	  };

	  objectPath.empty = function(obj, path) {
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return void 0;
	    }

	    var value, i;
	    if (!(value = objectPath.get(obj, path))) {
	      return obj;
	    }

	    if (isString(value)) {
	      return objectPath.set(obj, path, '');
	    } else if (isBoolean(value)) {
	      return objectPath.set(obj, path, false);
	    } else if (isNumber(value)) {
	      return objectPath.set(obj, path, 0);
	    } else if (isArray(value)) {
	      value.length = 0;
	    } else if (isObject(value)) {
	      for (i in value) {
	        if (_hasOwnProperty.call(value, i)) {
	          delete value[i];
	        }
	      }
	    } else {
	      return objectPath.set(obj, path, null);
	    }
	  };

	  objectPath.push = function (obj, path /*, values */){
	    var arr = objectPath.get(obj, path);
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }

	    arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	  };

	  objectPath.coalesce = function (obj, paths, defaultValue) {
	    var value;

	    for (var i = 0, len = paths.length; i < len; i++) {
	      if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	        return value;
	      }
	    }

	    return defaultValue;
	  };

	  objectPath.get = function (obj, path, defaultValue){
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return defaultValue;
	    }
	    if (isString(path)) {
	      return objectPath.get(obj, path.split('.'), defaultValue);
	    }

	    var currentPath = getKey(path[0]);

	    if (path.length === 1) {
	      if (obj[currentPath] === void 0) {
	        return defaultValue;
	      }
	      return obj[currentPath];
	    }

	    return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	  };

	  objectPath.del = function(obj, path) {
	    return del(obj, path);
	  };

	  return objectPath;
	});


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
	/* Imports */
	var workspaceView = __webpack_require__(27),
	    navigationController = __webpack_require__(37),
	    browseController = __webpack_require__(40);

	var workspaceController = {
	    init: function() {
	        workspaceView.render();
	        navigationController.init();
	        browseController.init();
	    }
	};

	module.exports = workspaceController;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	
	var template = __webpack_require__(28);

	var workspaceView = {
	    render: function() {
	        document.getElementById('main').innerHTML = template();
	    }
	};

	module.exports = workspaceView;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(29);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "<nav class=\"panel col col--1 nav nav--workspace js-workspace-nav\" id=\"workspace-navigation\">\n</nav>\n<div class=\"panel col col--4 workspace-menu\" id=\"workspace-browse\">\n</div>\n<section class=\"panel col col--7 workspace-browser\" id=\"workspace-preview\">\n</section>\n";
	},"useData":true});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(30)['default'];


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;

	var _import = __webpack_require__(31);

	var base = _interopRequireWildcard(_import);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _SafeString = __webpack_require__(34);

	var _SafeString2 = _interopRequireWildcard(_SafeString);

	var _Exception = __webpack_require__(33);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var _import2 = __webpack_require__(32);

	var Utils = _interopRequireWildcard(_import2);

	var _import3 = __webpack_require__(35);

	var runtime = _interopRequireWildcard(_import3);

	var _noConflict = __webpack_require__(36);

	var _noConflict2 = _interopRequireWildcard(_noConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _SafeString2['default'];
	  hb.Exception = _Exception2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_noConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(console) {'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	exports.createFrame = createFrame;

	var _import = __webpack_require__(32);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(33);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var VERSION = '3.0.1';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 6;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function registerHelper(name, fn) {
	    if (toString.call(name) === objectType) {
	      if (fn) {
	        throw new _Exception2['default']('Arg not supported with multiple helpers');
	      }
	      Utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _Exception2['default']('Attempting to register a partial as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function () {
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} constuct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });

	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _Exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function (conditional, options) {
	    if (isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });

	  instance.registerHelper('with', function (context, options) {
	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!Utils.isEmpty(context)) {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
	        options = { data: data };
	      }

	      return fn(context, options);
	    } else {
	      return options.inverse(this);
	    }
	  });

	  instance.registerHelper('log', function (message, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, message);
	  });

	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 1,

	  // Can be overridden in the host environment
	  log: function log(level, message) {
	    if (typeof console !== 'undefined' && logger.level <= level) {
	      var method = logger.methodMap[level];
	      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports.logger = logger;
	var log = logger.log;

	exports.log = log;

	function createFrame(object) {
	  var frame = Utils.extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	/* [args, ]options */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;

	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#x27;',
	  '`': '&#x60;'
	};

	var badChars = /[&<>"'`]/g,
	    possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/*eslint-disable func-style, no-var */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	/*eslint-enable func-style, no-var */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};exports.isArray = isArray;

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;
	exports.checkRevision = checkRevision;

	// TODO: Remove this line and break up compilePartial

	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _import = __webpack_require__(32);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(33);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(31);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
	          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
	      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _Exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      return templateSpec[i];
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      depths = options.depths ? [context].concat(options.depths) : [context];
	    }

	    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _Exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _Exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
	  }
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    partial = options.partials[options.name];
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;

	  if (partial === undefined) {
	    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;
	/*global window */

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var navigationView = __webpack_require__(38),
	    store = __webpack_require__(9);

	var navigationController = {

	    init: function() {
	        navigationView.render();
	        this.bindClicks();
	        this.updateActiveInState('browse');
	    },

	    bindClicks: function () {
	        var $navItems = $('.js-workspace-nav__item');
	        $navItems.click(function() {
	            var $this = $(this);
	            navigationController.setActiveItem($navItems, $this.closest('li'));
	            navigationController.updateActiveInState($this.attr('id'));
	        });
	    },

	    setActiveItem: function($allItems, $activeItem) {
	        $allItems.removeClass('selected');
	        $activeItem.addClass('selected');
	    },

	    updateActiveInState: function(activeId) {
	        store.dispatch({
	            type: "UPDATE_ACTIVE_EDITOR_SCREEN",
	            activeId: activeId
	        })
	    }
	};

	module.exports = navigationController;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var template = __webpack_require__(39);

	var navigationView = {
	    render: function() {
	        document.getElementById('workspace-navigation').innerHTML = template();
	    }
	};

	module.exports = navigationView;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(29);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "\n<ul class=\"nav__list nav__list--workspace\">\n     <li class=\"nav__item nav__item--workspace nav__item--lang js-workspace-nav__item\" id=\"nav--workspace__welsh\"></li>\n\n     <li class=\"nav__item nav__item--workspace nav__item--browse js-workspace-nav__item selected\" id=\"browse\">\n         <a class=\"nav__link\" href=\"javascript:void(0)\">Browse</a>\n     </li>\n     <li class=\"nav__item nav__item--workspace nav__item--create js-workspace-nav__item\" id=\"create\">\n         <a class=\"nav__link\" href=\"javascript:void(0)\">Create</a>\n     </li>\n     <li class=\"nav__item nav__item--workspace nav__item--edit js-workspace-nav__item\" id=\"edit\">\n         <a class=\"nav__link\" href=\"javascript:void(0)\">Edit</a>\n     </li>\n     <li class=\"nav__item nav__item--workspace nav__item--import nav--workspace__import js-workspace-nav__item\" id=\"import\">\n         <a class=\"nav__link\" href=\"javascript:void(0)\">Import</a>\n     </li>\n </ul>";
	},"useData":true});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var browseView = __webpack_require__(41),
	    getBrowseTree = __webpack_require__(46),
	    userState = __webpack_require__(47);

	var browseController = {
	    init: function () {
	        getBrowseTree.then(function(browseTreeData) {
	            browseView.render(browseTreeData);
	            browseController.bindClick();
	        });
	    },

	    bindClick: function() {
	        $('.js-browse__item-title').click(function() {
	            var $this = $(this),
	                $thisItem = $this.closest('.js-browse__item'),
	                url = $thisItem.attr('data-url');

	            if (url) {
	                browseView.selectPage(url);
	            } else {
	                browseView.selectDirectory($this);
	            }

	            // TODO possibly need to set the scroll position of the browse tree, open up parent directories and show pages under directories?

	            if (userState.type.isPublisher()) {
	                // TODO update iframe to new URL

	            }
	        });
	    }
	};

	module.exports = browseController;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	
	var nodeTemplate = __webpack_require__(42),
	    getBrowseTree = __webpack_require__(46);

	var browseView = {

	    render: function (browseTreeData) {
	        document.getElementById('workspace-browse').innerHTML = nodeTemplate(browseTreeData);
	    },

	    selectDirectory: function($this) {
	        $('.page__item--directory').removeClass('selected'); // remove previous selections
	        $this.parents('.js-browse__item--directory').find('.page__item--directory:first').addClass('selected'); // select directories along parent path
	    },

	    selectPage: function(url) {

	        var $selectedListItem = $('[data-url="' + url + '"]'); //get first li with data-url with url
	        $('.js-browse__item.selected').removeClass('selected');
	        $selectedListItem.addClass('selected');

	        // Hide container for item and buttons for previous and show selected one
	        $('.page__container.selected').removeClass('selected');
	        $selectedListItem.find('.page__container:first').addClass('selected');

	        // Hide previous displayed page buttons and show selected one
	        if ($selectedListItem.find('.page__buttons:first')) {
	            $('.page__buttons.selected').removeClass('selected');
	            $selectedListItem.find('.page__buttons:first').addClass('selected');
	        }

	        //page-list-tree
	        $('.tree-nav-holder ul').removeClass('active');
	        $selectedListItem.parents('ul').addClass('active');
	        $selectedListItem.closest('li').children('ul').addClass('active');
	    }
	};

	module.exports = browseView;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(29);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    return " page__item--directory";
	},"3":function(depth0,helpers,partials,data) {
	    return " page__item--"
	    + this.escapeExpression(this.lambda((depth0 != null ? depth0.type : depth0), depth0));
	},"5":function(depth0,helpers,partials,data) {
	    return "<button class=\"btn btn--warning btn-browse-delete\">Delete</button>";
	},"7":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "-->\n                        <!--<div class=\"page__buttons page__buttons--list selected\">-->\n                            <!--<button class=\"btn btn--primary btn-browse-edit\">Edit</button>-->\n                            <!--<button class=\"btn btn--positive btn-browse-create\">Create</button>-->\n                            <!--"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isDeletable : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "-->\n                        <!--</div>-->\n                    <!--";
	},"9":function(depth0,helpers,partials,data) {
	    var stack1;

	  return " \n                    <ul class=\"js-browse__children active\">\n                        "
	    + ((stack1 = this.invokePartial(__webpack_require__(44),depth0,{"name":"browseNode","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
	    + " \n                        <!--"
	    + ((stack1 = __default(__webpack_require__(43)).call(depth0,(depth0 != null ? depth0.collectionOwner : depth0),"===","PUBLISHING_SUPPORT",{"name":"ifCond","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "-->\n                        <!--"
	    + ((stack1 = __default(__webpack_require__(43)).call(depth0,(depth0 != null ? depth0.collectionOwner : depth0),"===","DATA_VISUALISATION",{"name":"ifCond","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "-->\n                    </ul>\n";
	},"10":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "-->\n                            <!--"
	    + ((stack1 = this.invokePartial(__webpack_require__(44),depth0,{"name":"browseNode","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
	    + " -->\n                        <!--";
	},"12":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "-->\n                            <!--"
	    + ((stack1 = this.invokePartial(__webpack_require__(45),depth0,{"name":"browseVisNode","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
	    + " -->\n                        <!--";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

	  return "<section class=\"panel workspace-browse\">\n    <nav class=\"tree-nav-holder js-browse\">\n        <ul class=\"page-list page-list--tree active\">\n            <li class=\"js-browse__item selected\" data-url=\""
	    + alias2(alias1((depth0 != null ? depth0.uri : depth0), depth0))
	    + "\">\n                <div class=\"page__container selected\">\n                    <span class=\"js-browse__item-title page__item"
	    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.uri : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
	    + "\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.description : depth0)) != null ? stack1.title : stack1), depth0))
	    + "</span>\n                    <div class=\"page__buttons page__buttons--list selected\">\n                        <button class=\"btn btn--primary btn-browse-edit\">Edit</button>\n                        <button class=\"btn btn--positive btn-browse-create\">Create</button>\n                        "
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isDeletable : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\n                    </div>\n                    <!--"
	    + ((stack1 = __default(__webpack_require__(43)).call(depth0,(depth0 != null ? depth0.collectionOwner : depth0),"===","PUBLISHING_SUPPORT",{"name":"ifCond","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "-->\n                </div>\n                "
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "            </li>\n        </ul>\n    </nav>\n</section>";
	},"usePartial":true,"useData":true});

/***/ },
/* 43 */
/***/ function(module, exports) {

	
	module.exports = function (v1, operator, v2, options) {

	    switch (operator) {
	        case '==':
	            return (v1 == v2) ? options.fn(this) : options.inverse(this);
	        case '===':
	            return (v1 === v2) ? options.fn(this) : options.inverse(this);
	        case '<':
	            return (v1 < v2) ? options.fn(this) : options.inverse(this);
	        case '<=':
	            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
	        case '>':
	            return (v1 > v2) ? options.fn(this) : options.inverse(this);
	        case '>=':
	            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
	        case '&&':
	            return (v1 && v2) ? options.fn(this) : options.inverse(this);
	        case '||':
	            return (v1 || v2) ? options.fn(this) : options.inverse(this);
	        default:
	            return options.inverse(this);
	    }
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(29);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

	  return " \n    <li class=\"js-browse__item "
	    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.uri : depth0),{"name":"unless","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\" data-url=\""
	    + alias2(alias1((depth0 != null ? depth0.uri : depth0), depth0))
	    + "\">\n        <span class=\"page__container "
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.deleteMarker : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\">\n            <span class=\"js-browse__item-title page__item"
	    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.uri : depth0),{"name":"unless","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
	    + "\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.description : depth0)) != null ? stack1.title : stack1), depth0))
	    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.description : depth0)) != null ? stack1.edition : stack1),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</span>\n            <span class=\"page__buttons page__buttons--list\">\n\n                <span class=\"page__primary-buttons js-browse__buttons--primary "
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.deleteMarker : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\">\n                    <button class=\"btn btn--primary btn-browse-edit\">Edit</button>\n                    <button class=\"btn btn--positive btn-browse-create\">Create</button>\n                </span>\n\n\n                <button class=\"btn btn--primary btn-browse-delete-revert "
	    + ((stack1 = __default(__webpack_require__(43)).call(depth0,(depth0 != null ? depth0.deleteIsInCollection : depth0),"&&",(depth0 != null ? depth0.deleteMarker : depth0),{"name":"ifCond","hash":{},"fn":this.program(14, data, 0),"inverse":this.program(12, data, 0),"data":data})) != null ? stack1 : "")
	    + "\">Revert deletion</button>\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.deleteMarker : depth0),{"name":"if","hash":{},"fn":this.program(16, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isDeletable : depth0),{"name":"if","hash":{},"fn":this.program(19, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "            </span>\n        </span>\n        "
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":this.program(24, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "    </li>\n";
	},"2":function(depth0,helpers,partials,data) {
	    return "js-browse__item--directory";
	},"4":function(depth0,helpers,partials,data) {
	    return "deleted";
	},"6":function(depth0,helpers,partials,data) {
	    return " page__item--directory";
	},"8":function(depth0,helpers,partials,data) {
	    return " page__item--"
	    + this.escapeExpression(this.lambda((depth0 != null ? depth0.type : depth0), depth0));
	},"10":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "\n                : "
	    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.description : depth0)) != null ? stack1.edition : stack1), depth0));
	},"12":function(depth0,helpers,partials,data) {
	    return "hidden";
	},"14":function(depth0,helpers,partials,data) {
	    return "";
	},"16":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "                    "
	    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.deleteIsInCollection : depth0),{"name":"unless","hash":{},"fn":this.program(17, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\n";
	},"17":function(depth0,helpers,partials,data) {
	    return "* this file has been delete in another collection";
	},"19":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "                    <span class=\"js-browse__buttons--secondary "
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.deleteMarker : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\">\n                        <button class=\"js-browse__menu hamburger-icon hamburger-icon--page-item\">\n                            <span class=\"hamburger-icon__span\">toggle menu</span>\n                        </button>\n\n                        <span class=\"page__menu\">\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isMoveable : depth0),{"name":"if","hash":{},"fn":this.program(20, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isDeletable : depth0),{"name":"if","hash":{},"fn":this.program(22, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\n                        </span>\n                    </span>\n";
	},"20":function(depth0,helpers,partials,data) {
	    return "                                <button class=\"btn btn--primary btn-browse-move\">Move</button>";
	},"22":function(depth0,helpers,partials,data) {
	    return "                                <button class=\"btn btn--warning btn-browse-delete\">Delete</button>";
	},"24":function(depth0,helpers,partials,data) {
	    var stack1;

	  return " \n            <ul class=\"js-browse__children\">\n                "
	    + ((stack1 = this.invokePartial(__webpack_require__(44),depth0,{"name":"browseNode","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
	    + " \n            </ul>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
	},"usePartial":true,"useData":true});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(29);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    var stack1;

	  return " \n    <li class=\"js-browse__item\" data-url=\""
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.uri : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
	    + "\" >\n        <span class=\"page__container\">\n            <span class=\"js-browse__item-title page__item"
	    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.uri : depth0),{"name":"unless","hash":{},"fn":this.program(6, data, 0),"inverse":this.program(8, data, 0),"data":data})) != null ? stack1 : "")
	    + " "
	    + ((stack1 = __default(__webpack_require__(43)).call(depth0,((stack1 = (depth0 != null ? depth0.description : depth0)) != null ? stack1.title : stack1),"===","visualisations",{"name":"ifCond","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\">"
	    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.description : depth0)) != null ? stack1.title : stack1), depth0))
	    + "</span>\n            <div class=\"page__buttons page__buttons--list\">\n                "
	    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.uri : depth0),{"name":"unless","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.uri : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "            </div>\n        </span>\n        "
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":this.program(16, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "    </li>\n";
	},"2":function(depth0,helpers,partials,data) {
	    return this.escapeExpression(this.lambda((depth0 != null ? depth0.uri : depth0), depth0));
	},"4":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "/"
	    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.description : depth0)) != null ? stack1.title : stack1), depth0));
	},"6":function(depth0,helpers,partials,data) {
	    return " page__item--directory";
	},"8":function(depth0,helpers,partials,data) {
	    return " page__item--"
	    + this.escapeExpression(this.lambda((depth0 != null ? depth0.type : depth0), depth0));
	},"10":function(depth0,helpers,partials,data) {
	    return "datavis-directory";
	},"12":function(depth0,helpers,partials,data) {
	    return "<button class=\"btn btn--positive btn-browse-create-datavis\">Upload visualisation</button>";
	},"14":function(depth0,helpers,partials,data) {
	    return "                    <button class=\"btn btn--primary btn-browse-edit\">Edit</button>\n";
	},"16":function(depth0,helpers,partials,data) {
	    var stack1;

	  return " \n            <ul class=\"js-browse__children\">\n                "
	    + ((stack1 = this.invokePartial(__webpack_require__(45),depth0,{"name":"browseVisNode","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
	    + " \n            </ul>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
	},"usePartial":true,"useData":true});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	
	var collectionState = __webpack_require__(8);

	var getBrowseTree =
	    fetch("/zebedee/collectionBrowseTree/" + collectionState.get().id, {credentials: 'include'}).then(function(response) {
	        return response.json();
	    }).then(function(jsonResponse) {
	        return jsonResponse;
	    }).catch(function(error) {
	       return error
	    });

	module.exports = getBrowseTree;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	
	var store = __webpack_require__(9);

	var userState = {

	    type: {

	        get: function() {
	            // TODO this is only set on login, if user doesn't login because they have an active session already then it isn't set. We probably need this information from the server (it was stored in localStorage before, which doesn't seem ideal)
	            return store.getState().user.type;
	        },

	        set: function(userType) {
	            store.dispatch({
	                type: "UPDATE_USER_TYPE",
	                userType: userType
	            })
	        },

	        isDataVis: function() {
	            return userState.type.get() === "DATA_VISUALISATION";
	        },

	        isPublisher: function() {
	            return userState.type.get() === "PUBLISHING_SUPPORT";
	        }
	    },

	    email: {

	        get: function() {
	            return store.getState().user.email;
	        },

	        set: function(userEmail) {
	            store.dispatch({
	                type: "UPDATE_USER_EMAIL",
	                userEmail: userEmail
	            })
	        }
	    }
	};

	module.exports = userState;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	
	var store = __webpack_require__(9);

	var baseUrlState = {

	    get: function() {
	        return store.getState().baseUrl;
	    },

	    set: function(baseUrl) {
	        store.dispatch({
	            type: "UPDATE_BASE_URL",
	            baseUrl: baseUrl
	        });
	    }

	};

	module.exports = baseUrlState;

/***/ }
/******/ ]);