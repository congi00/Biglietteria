import React, { useState } from "react";
import useStyles from "./styles.js";
import PropTypes from "prop-types";
import { getDateFormat, minutesFormat, getPriceFormat } from "../../utils";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

const getBoxDescription = (element, index, singleD, multipleD) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div key={index}>
          {element.totalNumb}
          {element.totalNumb > 1 ? multipleD : singleD}
          {element.description}{" "}
        </div>
      </Grid>
      <Grid item xs={6} style={{textAlign: "right"}}>
        {getPriceFormat(element.price*element.totalNumb) + " €"}
      </Grid>
    </Grid>
  );
};

const getPassengersPromo = (trip, leg, servicePromo) => {
  let totalPassengers = [[], []];

  servicePromo[trip]?.forEach((passenger) => {
    let alreadyExist = false;
    let indexExist = null;

    if (passenger.passengerType === "adulto") {
      totalPassengers[0]?.forEach((passengersInfos, index) => {
        if (passenger[leg].description === passengersInfos.description) {
          alreadyExist = true;
          indexExist = index;
        }
      });
      if (alreadyExist) {
        totalPassengers[0][indexExist].totalNumb += 1;
      } else
        totalPassengers[0].push({
          totalNumb: 1,
          description: passenger[leg].description,
          price: passenger[leg].realAmount
        });
    } else {
      totalPassengers[1]?.forEach((passengersInfos, index) => {
        if (passenger[leg].description === passengersInfos.description) {
          alreadyExist = true;
          indexExist = index;
        }
      });
      if (alreadyExist) totalPassengers[1][indexExist].totalNumb += 1;
      else
        totalPassengers[1].push({
          totalNumb: 1,
          description: passenger[leg].description,
          price: passenger[leg].realAmount
        });
    }
  });

  console.log("totalPassengers: ", totalPassengers);

  return totalPassengers.map((typeP, index) =>
    typeP.map((element) => {
      if (index === 0)
        return getBoxDescription(element, index, "Adulto, ", "Adulti, ");
      else return getBoxDescription(element, index, "Ragazzo, ", "Ragazzi, ");
    })
  );
};

const PassengersDetails = ({ typeTrip, legsRecap, servicePromo, trip }) => {
  const classes = useStyles();
  return (
    <div style={{ paddingTop: "15px" }}>
      <Typography variant="h5">VIAGGIO DI {typeTrip}</Typography>
      {legsRecap.map((leg, index) => {
        return (
          <div key={"Tratta_" + index}>
            <Box className={classes.infosRoute}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    Tratta {index + 1} di {legsRecap.length}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    {getDateFormat(new Date(leg.startDateTime))}
                    {"  "}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "0" }}>
                  <Typography variant="h5">
                    {leg.startStop.shortDescription +
                      " (" +
                      new Date(leg.startDateTime).getHours() +
                      ":" +
                      minutesFormat(new Date(leg.startDateTime).getMinutes()) +
                      ") "}
                    {" - "}
                    {leg.endStop.shortDescription +
                      " (" +
                      new Date(leg.endDateTime).getHours() +
                      ":" +
                      minutesFormat(new Date(leg.endDateTime).getMinutes()) +
                      ") "}
                  </Typography>
                </Grid>

                <Grid item xs={12} style={{ paddingTop: "0" }}>
                  <Typography variant="h5">
                    {leg.routeInfo.vehicleDescription +
                      " " +
                      leg.routeInfo.routeId}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ paddingTop: "0", lineHeight: "27px" }}
                >
                  {getPassengersPromo(trip, index, servicePromo)}
                </Grid>
              </Grid>
            </Box>
          </div>
        );
      })}
    </div>
  );
};

PassengersDetails.propTypes = {
  typeTrip: PropTypes.string,
  legsRecap: PropTypes.array,
  servicePromo: PropTypes.array,
  trip: PropTypes.number,
};

export default PassengersDetails;
