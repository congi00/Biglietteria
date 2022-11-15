import React, { Fragment, useRef, useState } from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import PassengersForm from "../Components/PassengersForm/PassengersForm.jsx";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { it } from "date-fns/locale";
import { getDateFormat, minutesFormat, getPriceFormat } from "../utils";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme, props) => {
  return {
    passengersInfos: {
      backgroundColor: "#008100",
      paddingTop: "100px",
      marginBottom: "120px",
      height: "100vh",
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
    },
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
            Totale: {getPriceFormat(totalPrices[currentPassenger.index - 1])} €
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
        <Box className={classes.recapBody}>
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
