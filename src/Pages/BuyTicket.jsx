import React, { useRef, useEffect } from "react";
import Loader from "../Components/Loader/Loader.jsx";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
import { Box } from "@material-ui/core";
import BuyForm from "../Components/BuyForm/BuyForm.jsx";
import { useState } from "react";

const useStyles = makeStyles((theme, props) => {
  return {
    buyTicket: {
      backgroundColor: "#008100",
      paddingTop: "100px",
      marginBottom: "170px",
      height: "100vh",
    },
    buyTicketContainer: {
      textAlign: "center",
    },
    infoTitle: {
      fontFamily: "Gotham",
      fontStyle: "normal",
      fontWeight: 350,
      fontSize: "16px",
      lineHeight: "19px",
      display: "flex",
      alignItems: "center",
      color: "#fff",
    },
    buyForm: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px",
      gap: "32px",
      margin: "10px 5vw 0 5vw ",
    },
  };
});

const BuyTicket = ({
  searchingTicket,
  beforeCompiled,
  isKeyboardOpened,
  keyboardOpened,
  onGoNextBuy,
  setLastLeg,
  setIsError,
  isError,
}) => {
  const classes = useStyles();
  const formEl = useRef(null);
  const [errorN, setErrorN] = useState(null);
  let errors = [
    "Inserisci la stazione di partenza",
    "Inserisci la stazione di arrivo",
    "Inserisci la data di partenza",
    "Inserisci la data di ritorno",
    "Inserisci orario di partenza",
    "Inserisci orario di ritorno",
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {isError && (
        <Loader
          title={
            <div>
              ERRORE
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
                onClick={() => setIsError()}
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>
          }
          icon={<ErrorOutlineRoundedIcon />}
          description={errors[errorN]}
        />
      )}
      <div className={classes.buyTicket}>
        <StepContainer
          onCancel={() => {}}
          onSearch={() => {
            const formState = formEl?.current?.getFormState();
            if (!formState.startStation) {
              setErrorN(0);
              setIsError();
            } else if (!formState.arriveStation) {
              setErrorN(1);
              setIsError();
            } else if (!formState.startDate) {
              setErrorN(2);
              setIsError();
            } else if (!formState.startTime) {
              setErrorN(4);
              setIsError();
            } else if (formState.roundtrip && !formState.returnDate) {
              setErrorN(3);
              setIsError();
            } else if (formState.roundtrip && !formState.returnTime) {
              setErrorN(5);
              setIsError();
            } else {
              onGoNextBuy("getSolution");
              searchingTicket(formState);
              setLastLeg(formState.startStation, formState.arriveStation);
            }
          }}
          keyboardOpened={keyboardOpened}
        >
          <div className={classes.buyTicketContainer}>
            <Box display="flex" justifyContent="center">
              <IconButton
                edge="start"
                className={classes.menuButton}
                style={{ color: "white" }}
                aria-label="menu"
              >
                <HelpOutlineIcon />
              </IconButton>
              <h2 className={classes.infoTitle}>Scopri il servizio</h2>
            </Box>
            <Box className={classes.buyForm}>
              <BuyForm
                ref={formEl}
                beforeCompiled={beforeCompiled}
                isKeyboardOpened={isKeyboardOpened}
              />
            </Box>
          </div>
        </StepContainer>
      </div>
    </>
  );
};

BuyTicket.propTypes = {
  searchingTicket: PropTypes.func,
  beforeCompiled: PropTypes.object,
  isKeyboardOpened: PropTypes.func,
  keyboardOpened: PropTypes.bool,
  onGoNextBuy: PropTypes.func,
  setLastLeg: PropTypes.func,
  setIsError: PropTypes.func,
  isError: PropTypes.bool,
};

export default BuyTicket;
