import React from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import ButtonClasses from "../Components/ButtonClasses/ButtonClasses.jsx";
import PromotionsWidget from "../Components/PromotionsWidget/PromotionsWidget.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import {
  getDateFormat,
  minutesFormat,
  getStartArriveH,
  getPriceFormat,
} from "../utils";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme, props) => {
  return {
    recap: {
      color: "#fff",
      paddingRight: "20px",
    },
    chooseSolution: {
      height: "100%",
      backgroundColor: "#008100",
      paddingTop: "100px",
      marginBottom: "170px",
    },
    chooseSolutionContainer: {
      paddingTop: "20px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    servicesContainer: {
      display: "flex",
      backgroundColor: "#EDEEEF",
      height: "150px",
      padding: "35px 0",
      marginBottom: "20px",
    },
    passengerBox: {
      width: "90vw",
      border: "1px solid #fff",
      marginBottom: "60px",
    },
    infosRoute: {
      color: "#fff",
      marginBottom: "40px",
      padding: "0 0 20px 40px",
    },
    passengerInfos: {
      color: "#fff",
      padding: "20px 0 20px 40px",
    },
    linkContent: {
      color: "yellow",
    },
  };
});

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
    let codePromo = item.code.split(";")[0];
    let description = item.description.split(" - ")[1];
    let indexOfService = servicesAvailable
      .map((service) => service.code)
      .indexOf(code);
    if (indexOfService === -1)
      servicesAvailable.push({
        code: code,
        codePromo: item.code,
        description: description,
        price: item.amount,
      });
    else if (servicesAvailable[indexOfService].price > item.amount)
      servicesAvailable[indexOfService].price = item.amount;
  });

  return servicesAvailable;
};

const getFirstAvailablePromo = (promos) => {
  for (let i = 0; i < promos?.length; i++) {
    if (promos[i].maxQtyAllowed > 0) return promos[i];
  }
  return null;
};

const getPromotions = (code, promotions, passType) => {
  let promotionsAvailable = [];
  promotions.map((item) => {
    let compareCode = item.code.split(";")[1];
    if (compareCode === code)
      promotionsAvailable.push({
        code: item.code,
        description: item.description.split(" - ")[0],
        availability: item.maxQtyAllowed > 1,
        price:
          passType === "adult"
            ? item.customDataField.adultAmount
            : item.customDataField.childAmount,
      });
  });

  return promotionsAvailable;
};

const setInitialServicesSel = (legsRecap, servicesAvailable) => {
  let totalItems = [];
  legsRecap.map((leg) => {
    totalItems.push({ item: servicesAvailable });
  });
  return totalItems;
};

const setFinalSelectedServices = (
  serviceSelected,
  setPromoSelected,
  promotions,
  currentPassenger,
  setTotalPrice
) => {
  let totalPrice = 0;
  serviceSelected.forEach((service, index) => {
    setPromoSelected(index, service.item.codePromo);
    promotions.map((item) => {
      let compareCode = item.code;
      if (compareCode === service.item.codePromo)
        totalPrice +=
          currentPassenger.passType === "adult"
            ? item.customDataField.adultAmount
            : item.customDataField.childAmount;
    });
  });
  setTotalPrice(currentPassenger.index, totalPrice);
  console.log("totalPrice: ", totalPrice);
};

function ChooseSolution({
  searchingTicket,
  currentPassenger,
  decrementStep,
  solutionDetails,
  solutionRecap,
  setNextPassenger,
  incrementStep,
  loadPromotions,
  setPromoSelected,
  setTotalPrice,
  resetCurrentPassenger,
  currentTrip,
  setCurrentTrip,
  onGoNextBuy
}) {
  const classes = useStyles();
  const legsRecap = solutionRecap?.legs;
  const promo = getFirstAvailablePromo(solutionDetails?.data?.purchasableItems);
  const purchasableItems = solutionDetails?.data.purchasableItems;
  const startTime = new Date(legsRecap[0].startDateTime);
  const endTime = new Date(legsRecap[legsRecap.length - 1].endDateTime);
  const totalPassengers = searchingTicket.adultsN + searchingTicket.kidsN;
  const duration = solutionRecap?.journeyDuration.split(":");
  const servicesAvailable = getServicesAvailable(purchasableItems);
  const [serviceSelected, setServiceSelected] = useState(
    setInitialServicesSel(legsRecap, servicesAvailable[0])
  );

  console.log("ChooseSolution -> render -> serviceSelected: ", serviceSelected);

  useEffect(() => {
    const totalP = searchingTicket.adultsN + searchingTicket.kidsN;
    const promotionChoice = [];
    solutionRecap.legs.forEach((element) => {
      console.log(promo);
      promotionChoice.push(promo?.code); //"20;30"
    });
    const servicesSelected = [];
    for (let i = 0; i < totalP; i++) {
      servicesSelected.push([...promotionChoice]);
    }
    loadPromotions(servicesSelected);
  }, [promo]);

  console.log("ChooseSolution -> render -> solutionDetails: ", solutionDetails);
  console.log("ChooseSolution -> render -> solutionRecap: ", solutionRecap);
  console.log(
    "ChooseSolution -> render -> servicesAvailable[0]: ",
    servicesAvailable[0]
  );

  const propContent = [
    {
      title: "Viaggio di " + currentTrip,
      key: "goTravel",
      body: (
        <div className={classes.recap}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {legsRecap[0].startStop?.shortDescription} -{" "}
                {legsRecap[legsRecap.length - 1].endStop?.shortDescription}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" style={{ fontSize: "30px" }}>
                {startTime.getHours()}:{minutesFormat(startTime.getMinutes())} -{" "}
                {endTime.getHours()}:{minutesFormat(endTime.getMinutes())}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                style={{
                  fontSize: "30px",
                  fontWeight: "200",
                  textAlign: "right",
                }}
              >
                da <b>{getPriceFormat(solutionRecap?.price)} €</b>
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: "0" }}>
              <Typography variant="h5">
                {parseInt(duration[0])}h {duration[1]}min
              </Typography>
            </Grid>
            <Grid item xs={3} style={{ paddingTop: "0" }}>
              <Typography variant="h5">
                Cambi: <b>{legsRecap.length - 1}</b>
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: "0" }}>
              <Typography variant="h5">
                Treno: <b>{getTrains([...legsRecap])}</b>
              </Typography>
            </Grid>
          </Grid>
        </div>
      ),
    },
  ];

  return (
    <div className={classes.chooseSolution}>
      <StepContainer
        onCancel={() => {}}
        onGoOn={() => {
          if (
            currentTrip === "andata" &&
            searchingTicket.roundtrip &&
            currentPassenger.index === totalPassengers
          ) {
            setCurrentTrip("ritorno");
            onGoNextBuy("getSolutions");
            decrementStep();
          } else if (
            (!searchingTicket.roundtrip &&
            currentPassenger.index === totalPassengers) ||
            (currentTrip === "ritorno" && currentPassenger.index === totalPassengers)
          ) {
            setFinalSelectedServices(
              serviceSelected,
              setPromoSelected,
              purchasableItems,
              currentPassenger,
              setTotalPrice
            );
            resetCurrentPassenger();
            incrementStep();
          } else if (currentPassenger.index < searchingTicket.adultsN) {
            setFinalSelectedServices(
              serviceSelected,
              setPromoSelected,
              purchasableItems,
              currentPassenger,
              setTotalPrice
            );

            // setTotalPrice(getTotalPrice(serviceSelected,))
            setNextPassenger("adult", serviceSelected);
          } else {
            setFinalSelectedServices(
              serviceSelected,
              setPromoSelected,
              purchasableItems,
              currentPassenger,
              setTotalPrice
            );
            setNextPassenger("kids", serviceSelected);
          }
        }}
      >
        <div className={classes.chooseSolutionContainer}>
          <Card content={propContent} />
          <div className={classes.passengerBox}>
            <Grid container spacing={3} className={classes.passengerInfos}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Passeggero {currentPassenger.index} di {totalPassengers} -{" "}
                  {currentPassenger.passType === "adult" ? "Adulto" : "Ragazzo"}
                </Typography>
              </Grid>
              <Grid item xs={3} style={{ paddingTop: "0" }}>
                <Typography variant="h5">CartaFreccia</Typography>
              </Grid>
              <Grid item xs={6} style={{ paddingTop: "0" }}>
                <Button
                  className={classes.linkContent}
                  href="/"
                  component={Link}
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  Inserisci CartaFreccia
                </Button>
              </Grid>
            </Grid>
            {legsRecap.map((leg, index) => {
              return (
                <div key={"Tratta_" + index}>
                  <Box className={classes.infosRoute}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h5">
                          Tratta {index + 1} di {legsRecap.length}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} style={{ paddingTop: "0" }}>
                        <Typography variant="h5">
                          {leg.routeInfo.vehicleDescription +
                            " " +
                            leg.routeInfo.routeId}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} style={{ paddingTop: "0" }}>
                        <Typography variant="h5">
                          Da {leg.startStop.shortDescription} a{" "}
                          {leg.endStop.shortDescription}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} style={{ paddingTop: "0" }}>
                        <Typography variant="h5">
                          {getDateFormat(new Date(leg.startDateTime))}
                          {"  "}
                          {getStartArriveH(
                            new Date(leg.startDateTime),
                            new Date(leg.endDateTime)
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className={classes.servicesContainer}>
                    {servicesAvailable.map((item, i) => {
                      return (
                        <div
                          onClick={() => {
                            let serviceUpdate = [...serviceSelected];
                            serviceUpdate[index] = {
                              ...serviceUpdate[index],
                              item: item,
                            };
                            setServiceSelected(serviceUpdate);
                          }}
                          key={"solution_" + index + "." + i}
                        >
                          <ButtonClasses
                            item={item}
                            codeSelected={serviceSelected[index]?.item?.code}
                          />
                        </div>
                      );
                    })}
                  </Box>
                  <Box>
                    <PromotionsWidget
                      leg={index}
                      serviceSelected={serviceSelected[index]}
                      globalServiceSelected={serviceSelected}
                      currentPassenger={currentPassenger.index}
                      setServiceSelected={setServiceSelected}
                      promotionsSelection={getPromotions(
                        serviceSelected[index]?.item.code,
                        purchasableItems,
                        currentPassenger.passType
                      )}
                    />
                  </Box>
                </div>
              );
            })}
          </div>
        </div>
      </StepContainer>
    </div>
  );
}

export default ChooseSolution;
