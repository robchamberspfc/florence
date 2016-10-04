
var store = require('shared/state/state');

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