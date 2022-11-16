import React, { useRef,useEffect } from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Box } from "@material-ui/core";
import BuyForm from "../Components/BuyForm/BuyForm.jsx";

const useStyles = makeStyles((theme, props) => {
  return {
    buyTicket: {
      backgroundColor: "#008100",
      paddingTop: "100px",
      marginBottom: "170px",
      height: "100vh"
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

function BuyTicket({
  searchingTicket,
  beforeCompiled,
  isKeyboardOpened,
  keyboardOpened,
  onGoNextBuy,
  setLastLeg
}) {
  const classes = useStyles();
  const formEl = useRef(null);
  let errors = [
    "Inserisci la stazione di partenza",
    "Inserisci la stazione di arrivo",
    "Inserisci la data di partenza",
    "Inserisci la data di ritorno",
    "Inserisci orario di partenza",
    "Inserisci orario di ritorno",
  ];

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className={classes.buyTicket}>
      <StepContainer
        onCancel={() => {}}
        onSearch={() => {
          const formState = formEl?.current?.getFormState();
          if (!formState.startStation) alert(errors[0]);
          else if (!formState.arriveStation) alert(errors[1]);
          else if (!formState.startDate) alert(errors[2]);
          else if (!formState.startTime) alert(errors[4]);
          else if (formState.roundtrip && !formState.returnDate)
            alert(errors[3]);
          else if (formState.roundtrip && !formState.returnTime)
            alert(errors[5]);
          else {
            onGoNextBuy("getSolution");
            searchingTicket(formState);
            setLastLeg(formState.startStation,formState.arriveStation)
          }
        }}
        keyboardOpened={keyboardOpened}
      >
        <div className={classes.buyTicketContainer}>
          <Box display="flex" justifyContent="center">
            <IconButton
              edge="start"
              className={classes.menuButton}
              style={{ color: 'white' }}
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
  );
}

BuyTicket.propTypes = {
  incrementStep: PropTypes.func,
};

export default BuyTicket;
