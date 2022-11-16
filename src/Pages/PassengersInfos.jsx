import React, { useRef, useState, useEffect } from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import PassengersForm from "../Components/PassengersForm/PassengersForm.jsx";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { getDateFormat, minutesFormat, getPriceFormat } from "../utils";

const useStyles = makeStyles((theme, props) => {
  return {
    passengersInfos: {
      backgroundColor: "#008100",
      paddingTop: "100px",
      marginBottom: "120px",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    passengersInfosContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    recapBody: {
      display: "flex",
      paddingLeft: "20px",
      lineHeight: "10px",
      color: "#fff"
    },
    infosBody:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      color: "#fff"
    }
  };
});

const defaultValues = {
  FirstName: "",
  LastName: "",
};

function PassengersInfos({
  keyboardOpened,
  searchingTicket,
  solutionRecap,
  currentPassenger,
  totalPrices,
  setNextPassenger,
  setContactInfos,
  incrementStep,
}) {
  const classes = useStyles();
  const refform = useRef();

  const totalPassengers = searchingTicket.adultsN + searchingTicket.kidsN;


  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const recapCard = [
    {
      title: "Viaggio",
      key: "travel",
      body: (
        <Box className={classes.recapBody}>
          <Typography variant="h5">
            {searchingTicket.startStation.name} -{" "}
            {searchingTicket.arriveStation.name}
          </Typography>
          {searchingTicket.roundtrip && (
            <Typography variant="h5">A/R</Typography>
          )}
          <Typography variant="h5">
            Andata:
            {getDateFormat(new Date(solutionRecap.legs[0].startDateTime))}{" "}
            {new Date(solutionRecap.legs[0].startDateTime).getHours()}
            {":"}
            {minutesFormat(
              new Date(solutionRecap.legs[0].startDateTime).getMinutes()
            )}
          </Typography>
          <Typography variant="h5">
            Totale: {getPriceFormat(totalPrices)} €
          </Typography>
        </Box>
      ),
    },
  ];

  const detailsForm = [
    {
      title: "Dati passeggeri",
      key: "dataPassenger",
      body: (
        <Box className={classes.infosBody}>
          <Typography variant="h5">
            Passeggero {currentPassenger.index} di {totalPassengers}
          </Typography>
          <PassengersForm
            ref={refform}
            setContactInfos={setContactInfos}
            defaultValues={defaultValues}
          />
        </Box>
      ),
    },
  ];

  return (
    <div className={classes.passengersInfos}>
      <StepContainer
        onCancel={() => {}}
        onGoOn={() => {
          refform.current.submit();
          if (currentPassenger.index === totalPassengers)
            incrementStep()
          else if (currentPassenger.index < searchingTicket.adultsN) {
            setNextPassenger("adult");
          } else {
            setNextPassenger("kids");
          }
        }}
        keyboardOpened={keyboardOpened}
      >
        <div className={classes.passengersInfosContainer}>
          <Card content={recapCard} />
          <Card content={detailsForm} />
        </div>
      </StepContainer>
    </div>
  );
}

export default PassengersInfos;
