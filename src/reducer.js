export const initialState = { step: 0, serviceSelected: null ,isLoading: false};

const reducer = (state, action) => {
  console.log("%c Reducer state, action: ", "#367", state, action);
  switch (action.type) {
    case "INCREMENT_STEP":
      return { ...state, step: state.step + 1 };
    case "DECREMENT_STEP":
      return { ...state, step: state.step - 1 };
    case "SET_IS_LOADING":
      return { ...state, isLoading:  action.payload.isLoading };
    case "SET_SERVICE_SELECTED":
      return { ...state, serviceSelected: action.payload.serviceSelected };
    case "SET_SEARCH_TICKET":
      return { ...state, searchingTicket: action.payload.searchingTicket };
    case "FOCUSED":
      return { ...state, keyboardOpened: true }
    case "UNFOCUSED":
      return { ...state, keyboardOpened: false }
    case "SET_SOLUTIONS":
      return { ...state,solutions: action.payload.result }
    case "SET_SOLUTION_DETAILS":
      return { ...state,solutionDetails: action.payload.result }
    case "SET_SOLUTION_RECAP":
      return { ...state,solutionRecap: action.payload.solutionRecap }
    default:
      throw new Error();
  }
};

export default reducer;
