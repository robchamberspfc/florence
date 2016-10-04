
var store = require('shared/state/state.js');

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
