import React from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme, props) => {
  return {
    initialMenu: {
      backgroundColor: "#D7DADD",
      height: "100vh",
      paddingTop: "120px"
    },
    cardStyle: {
      width: "712px",
      marginLeft: "45px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px 0px 32px",
      borderBottomLeftRadius: "0",
      borderBottomRightRadius: "0"
    },
    cardTitleBox: {
      width: "100%",
      backgroundColor: "#EDEEEF",
      paddingLeft: "25px",
    },
    cardTitle: {
      fontFamily: "Gotham",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "20px",
      lineHeight: "32px",
      display: "flex",
      alignItems: "center",
      color: "#4F4F4F",
    },
    buttonContainer: {
      width: "100%",
      padding: "20px 20px 0",
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "start",
      textAlign: "center",
    },
    cardButton: {
      backgroundColor: "#4F4F4F",
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "400",
      boxShadow: "0px 4px 12px rgba(79, 79, 79, 0.5), inset 0px 2px 1px rgba(121, 121, 121, 0.5), inset 0px -2px 1px rgba(145, 156, 167, 0.7)",
      color: "#fff",
      width: "204px",
      height: "136px",
      margin: "10px",
    },
  };
});

const InitialMenu = ({ incrementStep, setServiceSelected }) => {
  const classes = useStyles();

  return (
    <div className={classes.initialMenu}>
      <StepContainer onCancel={() => {}} initialMenu>
        <Card className={classes.cardStyle}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.cardTitleBox}
          >
            <h1 className={classes.cardTitle}>Biglietto</h1>
          </Box>
          <Box className={classes.buttonContainer}>
            <Button
              className={classes.cardButton}
              onClick={() => {
                setServiceSelected("BUY_TICKET");
                incrementStep();
              }}
            >
              Acquisto biglietto
            </Button>
            <Button
              className={classes.cardButton}
              onClick={() => incrementStep()}
            >
              Cambio prenotazione
            </Button>
            <Button
              className={classes.cardButton}
              onClick={() => incrementStep()}
            >
              Cambio biglietto
            </Button>
            <Button
              className={classes.cardButton}
              onClick={() => incrementStep()}
            >
              Annullo biglietto
            </Button>
          </Box>
        </Card>
        <Card className={classes.cardStyle}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.cardTitleBox}
          >
            <h1 className={classes.cardTitle}>Abbonamento</h1>
          </Box>
          <Box className={classes.buttonContainer}>
            <Button
              className={classes.cardButton}
              onClick={() => {
                setServiceSelected("BUY_TICKET");
                incrementStep();
              }}
            >
              Acquisto abbonamento
            </Button>
            <Button
              className={classes.cardButton}
              onClick={() => incrementStep()}
            >
              Annullo abbonamento
            </Button>
          </Box>
        </Card>
        <Card className={classes.cardStyle}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.cardTitleBox}
          >
            <h1 className={classes.cardTitle}>Carta regalo</h1>
          </Box>
          <Box className={classes.buttonContainer}>
            <Button
              className={classes.cardButton}
              onClick={() => {
                setServiceSelected("BUY_TICKET");
                incrementStep();
              }}
            >
              Acquisto carta regalo
            </Button>
            <Button
              className={classes.cardButton}
              onClick={() => incrementStep()}
            >
              Annullo carta regalo
            </Button>
          </Box>
        </Card>
      </StepContainer>
    </div>
  );
}

InitialMenu.propTypes = {
  incrementStep: PropTypes.func,
  setServiceSelected: PropTypes.func
};

export default InitialMenu;
