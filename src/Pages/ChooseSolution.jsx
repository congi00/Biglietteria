import React from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme, props) => {
  return {};
});

const minutesFormat = (minutes) => {
  if (minutes < 9) return minutes + "0";
  else return minutes;
};

const getTrains = (trains) => {
  if (trains.length < 2) {
    return trains[0].routeInfo.vehicleDescription;
  }

  let trainString =
    trains[0].routeInfo.vehicleDescription + " " + trains[0].routeInfo.routeId;

  trains.forEach((train, index) => {
    if (index !== 0)
      trainString =
        trainString +
        "+" +
        trains[index].routeInfo.vehicleDescription +
        " " +
        trains[index].routeInfo.routeId;
  });
  return trainString;
};

function ChooseSolution({ solutionDetails, solutionRecap }) {
  const classes = useStyles();
  const startTime = new Date(solutionRecap?.legs[0].startDateTime);
  const endTime = new Date(
    solutionRecap?.legs[solutionRecap?.legs.length - 1].endDateTime
  );
  const duration = solutionRecap?.journeyDuration.split(":");
  console.log("ChooseSolution -> render -> solutionDetails: ", solutionDetails);
  console.log("ChooseSolution -> render -> solutionRecap: ", solutionRecap);

  const propContent = [
    {
      title: "Viaggio di andata",
      key: "goTravel",
      body: (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h5>
                {solutionRecap?.legs[0].startStop?.shortDescription} -{" "}
                {
                  solutionRecap?.legs[solutionRecap?.legs.length - 1].endStop
                    ?.shortDescription
                }
              </h5>
            </Grid>
            <Grid item xs={6}>
              <h5>
                {startTime.getHours()}:{minutesFormat(startTime.getMinutes())} -{" "}
                {endTime.getHours()}:{minutesFormat(endTime.getMinutes())}
              </h5>
            </Grid>
            <Grid item xs={3}>
              <h5>
                da{" "}
                <b>
                  {(parseFloat(solutionRecap?.price) / 100)
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  €
                </b>
              </h5>
            </Grid>
            <Grid item xs={12}>
              <h5>
                {parseInt(duration[0])}h {duration[1]}min
              </h5>
            </Grid>
            <Grid item xs={3}>
              <h5>
                Cambi: <b>{solutionRecap?.legs.length - 1}</b>
              </h5>
            </Grid>
            <Grid item xs={6}>
              <h5>
                Treno: <b>{getTrains([...solutionRecap?.legs])}</b>
              </h5>
            </Grid>
          </Grid>
        </div>
      ),
    },
    {
      key: "passengersI",
      body: (
        <div>
          <Box>
            <h5>Passeggero 1 di 1 - Adulto</h5>
            <h5>CartaFreccia</h5>
          </Box>
          {solutionRecap?.legs.map((leg, index) => {
            return (
              <Box>
                <h5>
                  Tratta {index + 1} di {solutionRecap?.legs.length}
                </h5>
                <h5>
                  {leg.routeInfo.vehicleDescription +
                    " " +
                    leg.routeInfo.routeId}
                </h5>
                <h5>
                  Da {leg.startStop.shortDescription} a{" "}
                  {leg.endStop.shortDescription}
                </h5>
              </Box>
            );
          })}
        </div>
      ),
    },
  ];

  console.log();
  return (
    <div className={classes.FindSolution}>
      <StepContainer onCancel={() => {}}>
        <div className={classes.findSolutionContainer}>
          <Card content={propContent} />
        </div>
      </StepContainer>
    </div>
  );
}

export default ChooseSolution;
