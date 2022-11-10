import React, { Suspense } from "react";
import Header from "./Components/Header/Header.jsx";
import FindSolution from "./Pages/FindSolution.jsx";
import ChooseSolution from "./Pages/ChooseSolution.jsx";
import Loader from "./Components/Loader/Loader.jsx";
import reducer from "./reducer";
import { initialState } from "./reducer";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getSolutionsResponse, getSolutionInfoResponse } from "./mock.js";

const InitialMenu = React.lazy(() => import("./Pages/InitialMenu.jsx"));
const BuyTicket = React.lazy(() => import("./Pages/BuyTicket.jsx"));

const theme = createTheme();

theme.typography.h5 = {
  fontSize: "16px",
};

const TIMEOUT_API_REQUEST = 1000;

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const incrementStep = () => dispatch({ type: "INCREMENT_STEP" });

  const decrementStep = () => dispatch({ type: "DECREMENT_STEP" });

  const setServiceSelected = (serviceSelected) =>
    dispatch({ type: "SET_SERVICE_SELECTED", payload: { serviceSelected } });

  const searchingTicket = (searchingTicket) =>
    dispatch({ type: "SET_SEARCH_TICKET", payload: { searchingTicket } });

  const solutionRecap = (solutionRecap) =>
    dispatch({ type: "SET_SOLUTION_RECAP", payload: { solutionRecap } });

  const setIsLoading = (isLoading) =>
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading } });

  const setNextPassenger = () => 
  dispatch({ type: "SET_NEXT_PASSENGER" });

  const onGoNextBuy = (stepBuy) => {
    setIsLoading(true);
    setTimeout(() => {
      switch (stepBuy) {
        case "getSolution":
          onBridgeTrenitaliaResponse({
            endpoint: "getSolutions",
            result: getSolutionsResponse,
          });
          break;
        case "getInfo":
          onBridgeTrenitaliaResponse({
            endpoint: "getSolutionInfo",
            result: getSolutionInfoResponse,
          });
          break;
      }
      setIsLoading(false);
    }, TIMEOUT_API_REQUEST);
  };

  const onBridgeTrenitaliaResponse = (response) => {
    const { endpoint, result } = response;
    switch (endpoint) {
      case "getSolutions":
        //Increment step && update state solutions
        if (result?.data?.itineraries.length > 0) {
          dispatch({ type: "SET_SOLUTIONS", payload: { result } });
          incrementStep();
        } else alert("No solutions founded");
        break;
      case "getSolutionInfo": {
        dispatch({
          type: "SET_SOLUTION_DETAILS",
          payload: { result, currentPassenger: 1 },
        });
        incrementStep();
        break;
      }
      default: {
        break;
      }
    }
  };

  const isKeyboardOpened = (isKeyboardOpen) => {
    if (isKeyboardOpen) dispatch({ type: "FOCUSED" });
    else dispatch({ type: "UNFOCUSED" });
  };

  console.debug("App -> render -> state: ", state);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header decrementStep={decrementStep} />

        {state.isLoading && <Loader />}
        {
          <Suspense fallback={() => <Loader />}>
            {state.step === 0 && (
              <InitialMenu
                incrementStep={incrementStep}
                setServiceSelected={setServiceSelected}
              />
            )}

            {state.step === 1 && state.serviceSelected === "BUY_TICKET" && (
              <BuyTicket
                searchingTicket={searchingTicket}
                beforeCompiled={state.searchingTicket}
                onGoNextBuy={onGoNextBuy}
                isKeyboardOpened={isKeyboardOpened}
                keyboardOpened={state.keyboardOpened}
              />
            )}

            {state.step === 2 && state.serviceSelected === "BUY_TICKET" && (
              <FindSolution
                searchingTicket={state.searchingTicket}
                solutionRecap={solutionRecap}
                solutions={state.solutions}
                onGoNextBuy={onGoNextBuy}
              />
            )}

            {state.step === 3 && state.serviceSelected === "BUY_TICKET" && (
              <ChooseSolution
                searchingTicket={state.searchingTicket}
                backTrip={state.backTrip}
                currentPassenger={state.currentPassenger}
                solutionDetails={state.solutionDetails}
                solutionRecap={state.solutionRecap}
                setNextPassenger={setNextPassenger}
              />
            )}
          </Suspense>
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
