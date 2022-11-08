import React from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme, props) => {
  return {
    cardStyle: {
      width: "80vw",
      marginLeft: "10vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px 0px 32px",
      gap: "32px",
      marginTop: "30px"
    },
    cardTitleBox: {
      width: "100%",
      backgroundColor: "#EDEEEF",
      paddingLeft: "7%",
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
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "start",
      textAlign: "center"
    },
    cardButton: {
      backgroundColor: "#4F4F4F",
      color: "#fff",
      width: "200px",
      height: "136px",
      margin: "10px",
    },
  };
});

function InitialMenu({ incrementStep, setServiceSelected }) {
  const classes = useStyles();

  return (
    <div className="InitialMenu">
      <StepContainer onCancel={() => {}}>
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
      </StepContainer>
    </div>
  );
}

InitialMenu.propTypes = {
  incrementStep: PropTypes.func,
};

export default InitialMenu;
