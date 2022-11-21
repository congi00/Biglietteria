import React, { useState, useEffect } from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import PassengersDetails from "../Components/PassengersDetails/PassengersDetails.jsx";
import { getDateFormat, minutesFormat, getPriceFormat } from "../utils";
import PropTypes from "prop-types";

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

const PaymentPage = ({
  searchingTicket,
  solutionRecap,
  totalPrices,
  onGoNextBuy,
  servicePromo
}) => {
  const classes = useStyles();
  const [methodSelected, setMethodSelected] = useState("CONTANTI");
  const legsRecap = [solutionRecap[0]?.legs, solutionRecap[1]?.legs];
  console.log(methodSelected);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const recapCard = [
    {
      title: "Viaggio",
      key: "travel",
      body: (
        <Box className={classes.recapBody}>
          <Box className={classes.tripContainer}>
            <PassengersDetails
              typeTrip={"ANDATA"}
              legsRecap={legsRecap[0]}
              servicePromo={servicePromo}
              trip={0}
            />
            {searchingTicket.roundtrip && (
              <PassengersDetails
                typeTrip={"RITORNO"}
                legsRecap={legsRecap[1]}
                servicePromo={servicePromo}
                trip={1}
              />
            )}
          </Box>
          <Typography variant="h5">
            Totale: {getPriceFormat(totalPrices)} €
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
            {getPriceFormat(totalPrices)}€
          </Typography>
        </Box>
      ),
      key: "totalTitle",
    },
  ];

  return (
    <div className={classes.paymentPage}>
      <StepContainer
        onCancel={() => {}}
        onGoOn={() => {
          onGoNextBuy("verifyTrenitalia");
        }}
      >
        <div className={classes.paymentPageContainer}>
          <Card content={recapCard} />
          <Card content={detailsForm} />
        </div>
      </StepContainer>
    </div>
  );
};

PaymentPage.propTypes = {
  searchingTicket: PropTypes.object,
  solutionRecap: PropTypes.object,
  totalPrices: PropTypes.number,
  onGoNextBuy: PropTypes.func,
};

export default PaymentPage;
