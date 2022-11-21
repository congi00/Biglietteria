import React, { useRef, useEffect } from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import Loader from "../Components/Loader/Loader.jsx";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Card from "../Components/Card/Card.jsx";
import PassengersForm from "../Components/PassengersForm/PassengersForm.jsx";
import PassengersDetails from "../Components/PassengersDetails/PassengersDetails.jsx";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getDateFormat, minutesFormat, getPriceFormat } from "../utils";
import PropTypes from "prop-types";
import { useState } from "react";

const useStyles = makeStyles((theme, props) => {
  return {
    passengersInfos: {
      backgroundColor: "#008100",
      paddingTop: "120px",
      paddingBottom: "230px",
      height: "100%",
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
      lineHeight: "25px !important",
      color: "#fff",
      marginBottom: "40px",
    },
    infosBody: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      color: "#fff",
    },
    detailsBar: {
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
    },
    tripContainer: {
      color: "#fff",
    },
    divider: {
      backgroundColor: "#fff",
      border: "1px solid #fff",
      marginLeft: "0",
      marginRight: "0"
    },
    totalGrid:{
      color: "#fff",
      marginBottom: "10px"
    }
  };
});

const defaultValues = {
  FirstName: "",
  LastName: "",
  BirthDate: null,
};

const PassengersInfos = ({
  keyboardOpened,
  searchingTicket,
  solutionRecap,
  servicePromo,
  currentPassenger,
  totalPrices,
  setNextPassenger,
  setContactInfos,
  incrementStep,
  isError,
  setIsError,
}) => {
  const classes = useStyles();
  const refform = useRef();
  const [errorDescription, setErrorDescription] = useState("");
  const [details, setDetails] = useState(false);
  const goDate = new Date(solutionRecap[0].legs[0].startDateTime);
  const backDate = new Date(solutionRecap[1]?.legs[0].startDateTime);
  const legsRecap = [solutionRecap[0]?.legs, solutionRecap[1]?.legs];
  const totalPassengers = searchingTicket.adultsN + searchingTicket.kidsN;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const recapCard = [
    {
      title: "Viaggio",
      key: "travel",
      body: (
        <div>
          <Box className={classes.recapBody}>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <Typography variant="h5">
                  {searchingTicket.startStation.name} -{" "}
                  {searchingTicket.arriveStation.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                {searchingTicket.roundtrip && (
                  <Typography variant="h5">A/R</Typography>
                )}
              </Grid>
              <Grid item xs={6} style={{ paddingTop: "0" }}>
                <Typography variant="h5">
                  Andata:
                  {getDateFormat(goDate)}{" "}
                  {new Date(solutionRecap[0].legs[0].startDateTime).getHours()}
                  {":"}
                  {minutesFormat(
                    new Date(
                      solutionRecap[0].legs[0].startDateTime
                    ).getMinutes()
                  )}
                </Typography>
              </Grid>

              <Grid item xs={6} style={{ paddingTop: "0" }}>
                {searchingTicket.roundtrip && (
                  <Typography variant="h5">
                    Ritorno:
                    {getDateFormat(backDate)}{" "}
                    {new Date(
                      solutionRecap[1].legs[0].startDateTime
                    ).getHours()}
                    {":"}
                    {minutesFormat(
                      new Date(
                        solutionRecap[1].legs[0].startDateTime
                      ).getMinutes()
                    )}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "0" }}>
                <Typography variant="h5">
                  Totale: {getPriceFormat(totalPrices)} €
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.detailsBar}>
            <Typography variant="h5">Dettagli viaggio</Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              color="inherit"
              onClick={() => {
                setDetails(!details);
              }}
            >
              {details ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            </IconButton>
          </Box>
          {details && (
            <>
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
              <Grid className={classes.totalGrid} container spacing={3}>
                <Grid
                  item
                  xs={6}
                  style={{
                    paddingTop: "0",
                    lineHeight: "27px",
                  }}
                >
                  <Typography variant="h5">Totale da pagare:</Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    paddingTop: "0",
                    lineHeight: "27px",
                    textAlign: "right",
                  }}
                >
                  <Typography variant="h5">{getPriceFormat(totalPrices)} €</Typography>
                </Grid>
              </Grid>
            </>
          )}
          <Divider variant="middle" className={classes.divider} />
        </div>
      ),
    },
  ];

  const detailsForm = [
    {
      title: "Dati passeggeri",
      key: "dataPassenger",
      body: (
        <Box className={classes.infosBody}>
          <Typography variant="h5" style={{ marginBottom: "40px" }}>
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
      {isError && (
        <Loader
          title={
            <div>
              ERRORE
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
                onClick={() => setIsError()}
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>
          }
          icon={<ErrorOutlineRoundedIcon />}
          description={errorDescription}
        />
      )}
      <StepContainer
        onCancel={() => {}}
        onGoOn={async () => {
          let missingField = await refform.current.submit();
          if (missingField.length === 0){
            if (currentPassenger.index === totalPassengers) incrementStep();
            else if (currentPassenger.index < searchingTicket.adultsN) {
              setNextPassenger("adult");
            } else {
              setNextPassenger("kids");
            }
          }else {
            switch (missingField[0]) {
              case "FirstName": {
                setErrorDescription("Inserire il nome");
                setIsError();
                break;
              }
              case "LastName": {
                setErrorDescription("Inserire il cognome");
                setIsError();
                break;
              }
              default:
                break;
            }
          }
        }}
        keyboardOpened={keyboardOpened}
      >
        <div className={classes.passengersInfosContainer}>
          <div style={{ marginBottom: "40px" }}>
            <Card content={recapCard} />
          </div>
          <Card content={detailsForm} />
        </div>
      </StepContainer>
    </div>
  );
};

PassengersInfos.propTypes = {
  keyboardOpened: PropTypes.bool,
  searchingTicket: PropTypes.object,
  servicePromo: PropTypes.array,
  solutionRecap: PropTypes.object,
  currentPassenger: PropTypes.object,
  totalPrices: PropTypes.number,
  setNextPassenger: PropTypes.func,
  setContactInfos: PropTypes.func,
  incrementStep: PropTypes.func,
  isError: PropTypes.bool,
  setIsError: PropTypes.func,
};

export default PassengersInfos;
