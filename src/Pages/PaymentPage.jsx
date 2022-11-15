import React, { Fragment, useRef, useState } from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { getDateFormat, minutesFormat, getPriceFormat } from "../utils";

const useStyles = makeStyles((theme, props) => {
  return {
    paymentPage: {
      backgroundColor: "#008100",
      paddingTop: "100px",
      marginBottom: "120px",
      height: "100vh",
    },
    paymentPageContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    recapBody: {
      display: "flex",
      paddingLeft: "20px",
      lineHeight: "10px",
    },
    methodBox: {
      width: "170px",
      textAlign: "center",
      backgroundColor: "yellow",
    },
  };
});

const getTotalPrice = (prices) => {
  let total = 0;
  prices.forEach((element) => {
    total += element;
  });
  return total;
};

const defaultValues = {
  FirstName: "",
  LastName: "",
};

function PaymentPage({
  searchingTicket,
  solutionRecap,
  totalPrices,
  setNextPassenger,
  setContactInfos,
  incrementStep,
  onGoNextBuy,
}) {
  const classes = useStyles();
  const [methodSelected, setMethodSelected] = useState("CONTANTI");
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
            Totale: {getPriceFormat(getTotalPrice(totalPrices))} €
          </Typography>
        </Box>
      ),
    },
  ];

  const detailsForm = [
    {
      title: "Scegli il metodo di pagamento",
      key: "paymentMethod",
      body: (
        <Box className={classes.paymentBody}>
          <div className={classes.methodBox}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setMethodSelected("CONTANTI");
              }}
            >
              <LocalAtmIcon fontSize="large" />
            </IconButton>
            <Typography variant="h5">CONTANTI</Typography>
            <Typography variant="h5" style={{ fontSize: "15px" }}>
              nessuna commissione
            </Typography>
          </div>
        </Box>
      ),
    },
    {
      title: (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" style={{ fontSize: "15px" }}>
            Importo Totale
          </Typography>
          <Typography variant="h5" style={{ fontSize: "15px" }}>
            {getPriceFormat(getTotalPrice(totalPrices))}€
          </Typography>
        </Box>
      ),
      key: "totalTitle",
    },
  ];

  return (
    <div className={classes.paymentPage}>
      <StepContainer onCancel={() => {}} onGoOn={() => {
        onGoNextBuy("verifyTrenitalia");
      }}>
        <div className={classes.paymentPageContainer}>
          <Card content={recapCard} />
          <Card content={detailsForm} />
        </div>
      </StepContainer>
    </div>
  );
}

export default PaymentPage;
