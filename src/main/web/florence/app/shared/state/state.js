
/* Imports */
var Redux = require('redux'),
    watch = require('redux-watch');

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
        case ("UPDATE_EMAIL"): {
            newState.user.email = action.email;
            break
        }
        case ("UPDATE_ACTIVE_EDITOR_SCREEN"): {
            newState.editor.activeScreen = action.activeId;
            break;
        }
        case ("UPDATE_COLLECTION_DATA"): {
            newState.editor.collectionData = action.collectionData;
        }
    }

    console.log('ACTION: ', action);
    console.log('OLD STATE: ', state);
    console.log('NEW STATE: ', newState);
    console.log('--------');

    return newState
}

module.exports = store;