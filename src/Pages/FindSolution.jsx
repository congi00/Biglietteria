import React from "react";
import StepContainer from "../Components/StepContainer/StepContainer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Components/Card/Card.jsx";
import { Box } from "@material-ui/core";
import SolutionItem from "../Components/SolutionItem/SolutionItem.jsx";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { minutesFormat, getPriceFormat, getDateFormat, getTimeFormat } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const NUM_ELEMENTS_PAGE = 5;

const useStyles = makeStyles((theme, props) => {
  return {
    findSolution: {
      backgroundColor: "#008100",
      paddingTop: "100px",
      marginBottom: "170px",
      height: "100%",
    },
    findSolutionContainer: {
      paddingTop: "20px",
      backgroundColor: "#008100",
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    solutionsBox: {
      display: "flex",
      flexDirection: "column",
      width: "90vw",
      color: "#fff",
      paddingTop: "40px",
    },
    recapBody: {
      display: "flex",
      paddingLeft: "20px",
      lineHeight: "10px",
    },
    dataRecap: {
      marginRight: "40px",
      color: "#fff",
      fontSize: "25px",
    },
    dataRecapTitle: {
      fontWeight: "100",
    },
    boldClass: {
      fontWeight: "700",
    },
    thinClass: {
      fontWeight: "400",
    },
    solutionText: {
      marginBottom: "0",
      marginTop: "10px",
      fontSize: "20px",
    },
    divider: {
      backgroundColor: "#4F4F4F",
      margin: "0px 60px -25px 0px",
    },
    arrowRight: {
      width: "100%",
      height: "10px",
      textAlign: "right",
    },
    paginationBox: {
      display: "flex",
    },
    paginationBoxEnd: {
      justifyContent: "end",
    },
    paginationBoxBtw: {
      justifyContent: "space-between",
    },
    paginationContent: {
      color: "yellow",
    },
    opacityOn: {
      opacity: "0.5",
    },
    opacityOff: {
      opacity: "1",
    },
    linkCard: {
      color: "yellow",
      textDecoration: "underline",
      paddingLeft: 0,
      position: "relativa",
      bottom: "10px",
    },
    checkBox: {
      // appearance: "none",
      backgroundColor: "transparent",
      margin: "0 10px -5px 0",
      font: "inherit",
      color: "#fff",
      width: "20px",
      height: "20px",
      border: "2px solid #fff",
      borderRadius: "0",
      transform: "translateY(-0.075em)",
      "&::before": {
        content: "",
        width: "0.65em",
        height: "0.65em",
        transform: "scale(0)",
        transition: "120ms transform ease-in-out",
        boxShadow: "inset 1em 1em var(#ccc)",
      },
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

const getSaleability = (trains) => {
  let saleability = true;
  trains.forEach((train) => {
    if (train.saleability === "NOT_ELIGIBLE") {
      saleability = false;
    }
  });
  return saleability;
};

const nextPage = (paginationData) => {
  return paginationData + 1;
};

const backPage = (paginationData) => {
  return paginationData - 1;
};

const getTotalPage = (solutions) => {
  let solutionsLenght = solutions.length;
  return solutionsLenght % NUM_ELEMENTS_PAGE === 0
    ? solutionsLenght / NUM_ELEMENTS_PAGE
    : Number.parseInt(solutionsLenght / NUM_ELEMENTS_PAGE) + 1;
};

/**
 *
 * @param {*} param0
 * @returns
 */

function FindSolution({
  searchingTicket,
  solutions,
  currentTrip,
  onGoNextBuy,
  solutionRecap,
}) {
  const classes = useStyles();
  const [paginationData, setPaginationData] = useState({
    totalPage: 0,
    currentPage: 0,
  });
  const isGoing = currentTrip === "andata";
  const [availableSolution, setAvailableSolution] = useState(false);
  const [solutionViewed, setSolutionViewed] = useState([]);

  useEffect(() => {
    const _solutionViewed = availableSolution
      ? solutions.data.itineraries.filter((solution) =>
          getSaleability(solution?.legs)
        )
      : solutions.data.itineraries;
    setPaginationData({
      ...paginationData,
      totalPage: getTotalPage(_solutionViewed || []),
    });

    setSolutionViewed(_solutionViewed);
  }, [paginationData,solutions.data.itineraries,availableSolution]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const propContent = [
    {
      title: "Viaggio di " + currentTrip,
      key: "goTravel",
      body: (
        <Box className={classes.recapBody}>
          <div className={classes.dataRecap}>
            <h5 className={classes.dataRecapTitle}>Stazione di partenza </h5>
            <h5 className={classes.dataRecapTitle}>Stazione di arrivo </h5>
            <h5 className={classes.dataRecapTitle}>Data e ora di partenza </h5>
            <h5 className={classes.dataRecapTitle}>Adulti </h5>
            <h5 className={classes.dataRecapTitle}>Ragazzi </h5>
            <h5 className={classes.dataRecapTitle}>CartaFreccia </h5>
          </div>
          <div className={classes.dataRecap}>
            <h5>
              {isGoing
                ? searchingTicket.startStation.name
                : searchingTicket.arriveStation.name}
            </h5>
            <h5>
              {isGoing
                ? searchingTicket.arriveStation.name
                : searchingTicket.startStation.name}
            </h5>
            <h5>
              {isGoing
                ? getDateFormat(
                    new Date(searchingTicket.startDate)
                  )
                : getDateFormat(
                    new Date(searchingTicket.returnDate)
                  )}
                  { " " }
              {isGoing
                ? getTimeFormat(
                    new Date(searchingTicket.startTime)
                  )
                : getTimeFormat(
                    new Date(searchingTicket.returnTime)
                  )}
            </h5>
            <h5>{searchingTicket.adultsN}</h5>
            <h5>{searchingTicket.kidsN}</h5>
            <Button
              className={classes.linkCard}
              href="/"
              component={Link}
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              Inserisci CartaFreccia
            </Button>
          </div>
        </Box>
      ),
    },
  ];

  const solutionContent = solutionViewed.map((solution, index) => {
    const startTime = new Date(solution?.legs[0].startDateTime);
    const endTime = new Date(
      solution?.legs[solution?.legs.length - 1].endDateTime
    );
    const duration = solution?.journeyDuration.split(":");
    const saleability = getSaleability(solution?.legs);
    let structSolution = {
      key: index + "_Solution",
      body: (
        <div
          className={`${!saleability ? classes.opacityOn : classes.opacityOff}`}
        >
          <h5 className={classes.thinClass + " " + classes.solutionText}>
            {solution?.legs[0].startStop?.shortDescription} -{" "}
            {
              solution?.legs[solution?.legs.length - 1].endStop
                ?.shortDescription
            }
          </h5>

          <Box
            display="flex"
            justifyContent="space-between"
            paddingRight={"60px"}
          >
            <h5 className={classes.solutionText} style={{ fontSize: "30px" }}>
              {startTime.getHours()}:{minutesFormat(startTime.getMinutes())} -{" "}
              {endTime.getHours()}:{minutesFormat(endTime.getMinutes())}
            </h5>
            <div>
              {saleability ? (
                <h5
                  className={classes.thinClass + " " + classes.solutionText}
                  style={{ fontSize: "30px" }}
                >
                  da <b>{getPriceFormat(solution?.price)} €</b>
                </h5>
              ) : (
                <h5
                  className={classes.thinClass + " " + classes.solutionText}
                  style={{ fontSize: "30px" }}
                >
                  Non acquistabile
                </h5>
              )}
            </div>
          </Box>
          <h5
            className={classes.thinClass + " " + classes.solutionText}
            style={{ margin: "0 0 20px" }}
          >
            {parseInt(duration[0])}h {duration[1]}min
          </h5>

          <div className={classes.arrowRight}>
            <Divider variant="middle" className={classes.divider} />
            <IconButton
              edge="start"
              className={classes.arrowButton}
              color="inherit"
              aria-label="menu"
              disabled={!saleability}
              onClick={() => {
                solutionRecap(solution);
                onGoNextBuy("getInfo");
              }}
            >
              <ArrowForwardIosIcon color="#ffffff" />
            </IconButton>
          </div>

          <Box display="flex">
            <h5
              className={classes.thinClass + " " + classes.solutionText}
              style={{ marginRight: "20px" }}
            >
              Cambi: <b>{solution?.legs.length - 1}</b>
            </h5>
            <h5 className={classes.thinClass + " " + classes.solutionText}>
              Treno: <b>{getTrains([...solution?.legs])}</b>
            </h5>
          </Box>
        </div>
      ),
    };
    return structSolution;
  });

  // console.log("FindSolution -> render -> paginationData: ", paginationData);
  return (
    <div className={classes.findSolution}>
      <StepContainer onCancel={() => {}}>
        <div className={classes.findSolutionContainer}>
          {paginationData.currentPage === 0 && <Card content={propContent} />}

          <Box className={classes.solutionsBox}>
            <div>
              <Typography variant="h5">
                Seleziona la soluzione scelta del Cliente per visualizzare le
                offerte
              </Typography>
            </div>
            <div
              style={{ margin: "20px 0", fontSize: "20px", display: "flex" }}
            >
              <input
                name="roundtrip"
                type="checkbox"
                className={classes.checkBox}
                checked={availableSolution}
                onChange={() => {
                  setAvailableSolution(!availableSolution);
                  setPaginationData({
                    totalPage: getTotalPage(solutionViewed || []),
                    currentPage: 0,
                  });
                }}
              />
              <Typography variant="h5">
                Mostra solo le soluzioni disponibili
              </Typography>
            </div>

            <SolutionItem
              content={solutionContent.slice(
                paginationData.currentPage * NUM_ELEMENTS_PAGE,
                (paginationData.currentPage + 1) * NUM_ELEMENTS_PAGE
              )}
            />

            <div
              className={`${classes.paginationBox} ${
                paginationData.currentPage >= 1
                  ? classes.paginationBoxBtw
                  : classes.paginationBoxEnd
              }`}
            >
              {paginationData.currentPage >= 1 && (
                <Button
                  className={classes.paginationContent}
                  href="/"
                  component={Link}
                  onClick={(event) => {
                    event.preventDefault();
                    setPaginationData({
                      ...paginationData,
                      currentPage: backPage(paginationData.currentPage),
                    });
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  {"<"} Soluzioni precedenti
                </Button>
              )}

              {solutionContent.length >= NUM_ELEMENTS_PAGE &&
                (paginationData.currentPage + 1) * NUM_ELEMENTS_PAGE <
                  solutionContent.length && (
                  <Button
                    className={classes.paginationContent}
                    href="/"
                    component={Link}
                    onClick={(event) => {
                      event.preventDefault();
                      setPaginationData({
                        ...paginationData,
                        currentPage: nextPage(paginationData.currentPage),
                      });
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    Soluzioni successive{" >"}
                  </Button>
                )}
            </div>
          </Box>
        </div>
      </StepContainer>
    </div>
  );
}

export default FindSolution;
