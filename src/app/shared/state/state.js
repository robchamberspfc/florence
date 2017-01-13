const Redux = require('redux');

/* Reducer */
function florence(state = initialState, action) {
    // Parse to string, clone and parse back to object to keep original state immutable
    let newState = JSON.parse(JSON.stringify(state));

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
        case ("RESET_WORKSPACE"): {
            newState.workspace = initialState.workspace;
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
        case ("UPDATE_WORKSPACE_PREVIEW_URL"): {
            newState.workspace.activeUrl = action.previewUrl;
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
            newState.workspace.isDirty = action.isDirty;
            break;
        }
        case ("UPDATE_EDITOR_DATA"): {
            newState.workspace.editorData = action.editorData;
            break;
        }
        default: {
            console.log("State action '%s' not recognised", action.type);
        }
    }

    return newState
}

/* Create store */
const createStore = Redux.createStore;
const initialState = {
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
    };
const store = createStore(florence, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = store;