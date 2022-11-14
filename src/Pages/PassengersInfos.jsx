import React, { Fragment, useRef } from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
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

function PassengersInfos({
  keyboardOpened,
  searchingTicket,
  solutionRecap,
  currentPassenger,
  totalPrices,
}) {
  const classes = useStyles();
  const { register, handleSubmit, errors, unregister } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              ref={register({
                required: true,
              })}
            />
            {errors.firstName && <p> First name required</p>}
            <label>Last Name</label>
            <input type="text" name="lastName" ref={register} />
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={it}>
            <DatePicker
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                name="birthDate"
                views={["year", "month", "date"]}
                ref={register}
            />
            </MuiPickersUtilsProvider>

            
            {errors.lastName && <p> Last name required</p>}
            <button
              type="button"
              onClick={() => {
                unregister("lastName");
              }}
            >
              unregister lastName
            </button>
            <input type="submit" />
          </form>
        </Box>
      ),
    },
  ];

  return (
    <div className={classes.passengersInfos}>
      <StepContainer
        onCancel={() => {}}
        onGoOn={() => {}}
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
