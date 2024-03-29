import React, { Suspense } from "react";
import Header from "./Components/Header/Header.jsx";
import FindSolution from "./Pages/FindSolution.jsx";
import ChooseSolution from "./Pages/ChooseSolution.jsx";
import PassengersInfos from "./Pages/PassengersInfos.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import Loader from "./Components/Loader/Loader.jsx";
import reducer from "./reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { initialState } from "./reducer";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getSolutionsResponse, getSolutionInfoResponse } from "./mock.js";

const InitialMenu = React.lazy(() => import("./Pages/InitialMenu.jsx"));
const BuyTicket = React.lazy(() => import("./Pages/BuyTicket.jsx"));

const theme = createTheme();

theme.typography.h5 = {
  fontSize: "20px",
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

  const solutionRecap = (solutionRecap) => {
    let newSolRecap = [...state.solutionRecap];
    newSolRecap.push(solutionRecap)
    dispatch({ type: "SET_SOLUTION_RECAP", payload: { newSolRecap } });
  };

  const loadPromotions = (promoSelected) => {
    let updateState = [...state.servicePromo];
    updateState.push(promoSelected);
    dispatch({ type: "SET_SERVICIES_SELECTED", payload: { updateState } });
  };

  const reloadPromotions = () => {
    let updateState = [...state.servicePromo];
    updateState.pop();
    dispatch({ type: "SET_SERVICIES_SELECTED", payload: { updateState } });
  }

  const setLastLeg = (start, arrive) => {
    localStorage.setItem(
      "lastLeg",
      JSON.stringify({ start: start, arrive: arrive })
    );
  };

  const setIsLoading = (isLoading) =>
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading } });

  const setIsPrinting = (isPrinting) =>
    dispatch({ type: "SET_IS_PRINTING", payload: { isPrinting } });

  const setIsError = () =>
    dispatch({ type: "SET_IS_ERROR"})

  const setNextPassenger = (passType) =>
    dispatch({ type: "SET_NEXT_PASSENGER", payload: { passType } });

  const setCurrentTrip = (currentTrip) =>
    dispatch({ type: "SET_CURRENT_TRIP", payload: { currentTrip } });

  const setTotalPrice = (totalPrice) => {
    let totalPriceState = state.totalPrices;
    totalPriceState += totalPrice;
    dispatch({ type: "SET_TOTAL_PRICE", payload: { totalPriceState } });
  };

  const resetCurrentPassenger = () =>
    dispatch({
      type: "RESET_CURRENT_PASSENGER",
      payload: {
        currentPassenger: {
          index: 1,
          passType: state.searchingTicket.adultsN ? "adult" : "child",
        },
      },
    });

  const setPromoSelected = (leg, promo) => {
    let servicePromo = [...state.servicePromo];
    if (state.currentTrip === "andata")
      servicePromo[0][state.currentPassenger.index - 1][leg] = promo;
    else servicePromo[1][state.currentPassenger.index - 1][leg] = promo;
    console.log("App -> SetPromoSelected -> servicePromo -> ",servicePromo)
    dispatch({ type: "SET_PROMO_CHOICE", payload: { servicePromo } });
  };

  const setContactInfos = (data) => {
    let passengersInfos = [...state.passengersInfos];
    passengersInfos.push(data);
    dispatch({ type: "SET_PASSENGER_INFO", payload: { passengersInfos } });
  };

  const onGoNextBuy = (stepBuy) => {
    if (stepBuy === "verifyTrenitalia") setIsPrinting(true);
    else setIsLoading(true);

    setTimeout(() => {
      switch (stepBuy) {
        case "getSolution":
          onBridgeTrenitaliaResponse({
            endpoint: "getSolutions",
            result: getSolutionsResponse,
          });
          break;
        case "getInfo": {
          onBridgeTrenitaliaResponse({
            endpoint: "getSolutionInfo",
            result: getSolutionInfoResponse,
          });
          break;
        }
        case "verifyTrenitalia": {
          onBridgeTrenitaliaResponse({
            endpoint: "verifyTrenitalia",
          });
          break;
        }
        default:
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
          if (state.currentTrip === "andata") incrementStep();
        } else alert("No solutions founded");
        break;
      case "getSolutionInfo": {
        dispatch({
          type: "SET_SOLUTION_DETAILS",
          payload: {
            result,
            currentPassenger: {
              index: 1,
              passType: state.searchingTicket.adultsN ? "adult" : "child",
            },
          },
        });
        incrementStep();
        break;
      }
      case "verifyTrenitalia": {
        console.log("Receipt");
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
        <Header
          decrementStep={decrementStep}
          step={state.step}
          serviceSelected={state.serviceSelected}
          currentTrip={state.currentTrip}
          setCurrentTrip={setCurrentTrip}
          setTotalPrice={setTotalPrice}
          totalPrice={state.totalPrices}
          backTripPromo={state.servicePromo[1]}
          reloadPromotions={reloadPromotions}
        />

        {state.isLoading && (
          <Loader
            title={"RICERCA IN CORSO"}
            icon={<CircularProgress disableShrink />}
            description={"Attendere"}
          />
        )}
        {state.isPrinting && (
          <Loader
            title={"STAMPA PRESCONTRINO IN CORSO"}
            icon={<ReceiptIcon />}
            description={"Attendere"}
          />
        )}
        {
          <Suspense
            fallback={() => (
              <Loader
                title={"RICERCA IN CORSO"}
                icon={<CircularProgress disableShrink />}
              />
            )}
          >
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
                setLastLeg={setLastLeg}
                keyboardOpened={state.keyboardOpened}
                setIsError={setIsError}
                isError={state.isError}
              />
            )}

            {state.step === 2 && state.serviceSelected === "BUY_TICKET" && (
              <FindSolution
                searchingTicket={state.searchingTicket}
                solutionRecap={solutionRecap}
                solutions={state.solutions}
                currentTrip={state.currentTrip}
                onGoNextBuy={onGoNextBuy}
              />
            )}

            {state.step === 3 && state.serviceSelected === "BUY_TICKET" && (
              <ChooseSolution
                searchingTicket={state.searchingTicket}
                backTrip={state.backTrip}
                incrementStep={incrementStep}
                decrementStep={decrementStep}
                currentPassenger={state.currentPassenger}
                solutionDetails={state.solutionDetails}
                solutionRecap={state.solutionRecap}
                setNextPassenger={setNextPassenger}
                loadPromotions={loadPromotions}
                setPromoSelected={setPromoSelected}
                setTotalPrice={setTotalPrice}
                resetCurrentPassenger={resetCurrentPassenger}
                currentTrip={state.currentTrip}
                setCurrentTrip={setCurrentTrip}
                onGoNextBuy={onGoNextBuy}
              />
            )}
            {state.step === 4 && state.serviceSelected === "BUY_TICKET" && (
              <PassengersInfos
                keyboardOpened={state.keyboardOpened}
                isKeyboardOpened={isKeyboardOpened}
                searchingTicket={state.searchingTicket}
                solutionRecap={state.solutionRecap}
                currentPassenger={state.currentPassenger}
                totalPrices={state.totalPrices}
                servicePromo={state.servicePromo}
                setNextPassenger={setNextPassenger}
                setContactInfos={setContactInfos}
                incrementStep={incrementStep}
                isError={state.isError}
                setIsError={setIsError}
              />
            )}
            {state.step === 5 && state.serviceSelected === "BUY_TICKET" && (
              <PaymentPage
                searchingTicket={state.searchingTicket}
                solutionRecap={state.solutionRecap}
                totalPrices={state.totalPrices}
                setNextPassenger={setNextPassenger}
                setContactInfos={setContactInfos}
                incrementStep={incrementStep}
                onGoNextBuy={onGoNextBuy}
                servicePromo={state.servicePromo}
              />
            )}
          </Suspense>
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
