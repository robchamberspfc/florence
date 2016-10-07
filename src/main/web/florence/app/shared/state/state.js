
/* Imports */
var Redux = require('redux');
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
        workspace: {
            collectionData: {},
            browseTreeData: {},
            activeScreen: "",
            activeUrl: "",
            previewUrl: "",
            language: "english",
            isDirty: false,
            editorData: {}
        }
    },
    store = createStore(florence);

/* Watch store changes example */
// var watchStore = watch(store.getState, 'workspace.activeScreen');
// store.subscribe(watchStore(function(newVal, oldVal, objectPath) {
//     console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
// }));

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
        case ("UPDATE_BROWSE_TREE_DATA"): {
            newState.workspace.browseTreeData = action.browseTreeData;
            break;
        }
        case ("UPDATE_ACTIVE_WORKSPACE_SCREEN"): {
            newState.workspace.activeScreen = action.activeScreen;
            break;
        }
        case ("UPDATE_WORKSPACE_ACTIVE_URL"): {
            newState.workspace.activeUrl = action.activeUrl;
            break;
        }
        case ("UPDATE_COLLECTION_DATA"): {
            newState.workspace.collectionData = action.collectionData;
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
        case ("UPDATE_IS_DIRTY"): {
            newState.editor.isDirty = action.isDirty;
            break;
        }
        default: {
            console.log("State action type not recognised");
            break;
        }
    }

    // console.log('ACTION: ', action);
    // console.log('OLD STATE: ', state);
    // console.log('NEW STATE: ', newState);
    // console.log('--------');

    return newState
}

module.exports = store;