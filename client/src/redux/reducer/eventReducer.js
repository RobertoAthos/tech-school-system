
const initialState = {
  // initialState for get all todos
  isLoading: false,
  events: [],
  error: null,

  // initialState for create a todo
  isLoadingPost: false,
  successPost: null,
  errorPost: null,

  // initialState for delete a todo
  isLoadingDelete: false,
  successDelete: null,
  errorDelete: null,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    // all todo gets reducers
    case 'GET_EVENTS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_EVENTS_SUCCESS':
      return {
        isLoading: false,
        events: action.payload,
        error: null,
      };
    case 'GET_EVENTS_FAILURE':
      return {
        isLoading: false,
        events: [],
        error: action.payload,
      };

    // single todo create reducers
    case 'POST_EVENTS_REQUEST':
      return {
        ...state,
        isLoadingPost: true,
      };
    case 'POST_EVENTS_SUCCESS':
      return {
        ...state,
        isLoadingPost: false,
        successPost: action.payload,
        errorPost: null,
      };
    case 'POST_EVENTS_FAILURE':
      return {
        ...state,
        isLoadingPost: false,
        successPost: null,
        errorPost: action.payload,
      };

    // single todo delete reducers
    case 'DELETE_EVENTS_REQUEST':
      return {
        ...state,
        isLoadingDelete: true,
      };
    case 'DELETE_EVENTS_SUCCESS':
      return {
        ...state,
        isLoadingDelete: false,
        successDelete: action.payload,
        errorDelete: null,
      };
    case 'DELETE_EVENTS_FAILURE':
      return {
        ...state,
        isLoadingDelete: false,
        successDelete: null,
        errorDelete: action.payload,
      };

    default:
      return state;
  }
};

export default eventsReducer;