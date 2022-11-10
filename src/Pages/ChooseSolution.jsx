import React from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import ButtonClasses from "../Components/ButtonClasses/ButtonClasses.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import { getDateFormat, getStartArriveH } from "../utils";

const useStyles = makeStyles((theme, props) => {
  return {
    ChooseSolution: {
      marginBottom: "100px",
    },
    servicesContainer: {
      
    },
  };
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

const getServicesAvailable = (promotions) => {
  let servicesAvailable = [];
  promotions.map((item) => {
    let code = item.code.split(";")[1];
    let description = item.description.split(" - ")[1];
    if (servicesAvailable.map((service) => service.code).indexOf(code) === -1)
      servicesAvailable.push({ code: code, description: description });
  });

  return servicesAvailable;
};

function ChooseSolution({
  searchingTicket,
  currentPassenger,
  backTrip,
  solutionDetails,
  solutionRecap,
  setNextPassenger,
}) {
  const classes = useStyles();
  const legsRecap = solutionRecap?.legs;
  const purchasableItems = solutionDetails?.data.purchasableItems;
  const startTime = new Date(legsRecap[0].startDateTime);
  const endTime = new Date(legsRecap[legsRecap.length - 1].endDateTime);
  const totalPassengers = searchingTicket.adultsN + searchingTicket.kidsN;
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
                {legsRecap[0].startStop?.shortDescription} -{" "}
                {legsRecap[legsRecap.length - 1].endStop?.shortDescription}
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
                Cambi: <b>{legsRecap.length - 1}</b>
              </h5>
            </Grid>
            <Grid item xs={6}>
              <h5>
                Treno: <b>{getTrains([...legsRecap])}</b>
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
            <h5>
              Passeggero {currentPassenger} di {totalPassengers} - Adulto
            </h5>
            <h5>CartaFreccia</h5>
          </Box>
          {legsRecap.map((leg, index) => {
            return (
              <>
                <Box>
                  <h5>
                    Tratta {index + 1} di {legsRecap.length}
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
                  <h5>
                    {getDateFormat(new Date(leg.startDateTime))}
                    {"  "}
                    {getStartArriveH(
                      new Date(leg.startDateTime),
                      new Date(leg.endDateTime)
                    )}
                  </h5>
                </Box>
                <Box className={classes.servicesContainer}>
                  {getServicesAvailable(purchasableItems).map((item) => {
                    return <ButtonClasses title={item.description} />;
                  })}
                </Box>
              </>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className={classes.ChooseSolution}>
      <StepContainer
        onCancel={() => {}}
        onGoOn={() => {
          if (
            !backTrip &&
            searchingTicket.roundtrip &&
            currentPassenger === totalPassengers
          )
            console.log("Scelta delle promozioni per il viaggio di ritorno");
          else if (
            !searchingTicket.roundtrip &&
            currentPassenger === totalPassengers
          )
            console.log("Fine scelta promozioni");
          else setNextPassenger();
        }}
      >
        <div className={classes.findSolutionContainer}>
          <Card content={propContent} />
        </div>
      </StepContainer>
    </div>
  );
}

export default ChooseSolution;
