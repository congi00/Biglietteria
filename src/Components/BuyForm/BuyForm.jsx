import React, { forwardRef , useMemo} from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonForm from "../../Components/ButtonForm/ButtonForm.jsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReplayIcon from "@material-ui/icons/Replay";
import IconButton from "@material-ui/core/IconButton";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { it } from "date-fns/locale";
import { useImperativeHandle } from "react";
import { Box } from "@material-ui/core";
import Card from "../Card/Card";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import stations from "../../StationList/trenitalia_station_list.json";

/*
station.data['stations'].map((station, index) => {
    return station[1]
})
*/

const internalStations = stations.data.stations.map((station, index) => {
  return {
    id: station[0],
    name: station[1],
    latitude: station[2],
    longitude: station[3],
  };
});

const useStyles = makeStyles((theme, props) => {
  return {
    BuyTicketContainer: {
      backgroundColor: "#008100",
      textAlign: "center",
      width: "100%",
      height: "100%",
      paddingBottom: "40px",
    },
    infoTitle: {
      fontFamily: "Gotham",
      fontStyle: "normal",
      fontWeight: 350,
      fontSize: "16px",
      lineHeight: "19px",
      display: "flex",
      alignItems: "center",
      color: "#fff",
    },
    buyForm: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px",
      gap: "32px",
      width: "90vw",
      margin: "10px 5vw 0 5vw ",
      border: "1px solid #fff",
    },
    buttonsFormBox: {
      display: "flex",
      justifyContent: "center",
    },
    stationSection: {
      display: "flex",
      flexDirection: "column",
    },
    inputField: {
      border: "2px solid #A7A7A7",
      fontStyle: "italic",
      height: "5vh",
      width: "100%",
      marginTop: "5px",
      borderRadius: "0px",
      backgroundColor: "#fff",
      paddingLeft: "10px",
    },
    inputLabel: {
      color: "#fff",
      fontFamily: "Gotham",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "19px",
      display: "flex",
      alignItems: "center",
    },
    formBuy: {
      width: "80%",
    },
    swapIcon: {
      textAlign: "right",
    },
    inputStation: {
      paddingRight: "80px",
    },
    withChange: {
      margin: "20px 0 20px 0",
    },
    divider: {
      backgroundColor: "#fff",
      border: "1px solid #fff",
      marginLeft: "0",
    },
    checkGo: {
      width: "100%",
      display: "flex",
      justifyContent: "end",
    },
    roundtripLabel: {
      margin: "20px 15px 0 0",
    },
    passengersSel: {
      display: "flex",
    },
    menuButton: {
      backgroundColor: "#E9E017",
      borderRadius: "0px",
      width: "75px",
      height: "48px",
      margin: "5px 10px 0 0",
    },
    numberI: {
      width: "75px",
      height: "48px",
      padding: "0 0 6px 10px",
      marginRight: "10px",
      textAlign: "center",
    },
    cartaBox: {
      display: "flex",
      justifyContent: "space-between",
      margin: "20px 0 20px 0",
    },
    paginationContent: {
      color: "yellow",
    },
  };
});

const MAX_PASSENGERS = 5;

const BuyForm = forwardRef((props, _ref) => {
  const {beforeCompiled} = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    startStation: beforeCompiled?.startStation || null,
    arriveStation: beforeCompiled?.arriveStation || null,
    withChange: beforeCompiled?.withChange || false,
    roundtrip: beforeCompiled?.roundtrip || false,
    startDate: beforeCompiled?.startDate || null,
    returnDate: beforeCompiled?.returnDate || null,
    adultsN: beforeCompiled?.adultsN || 1,
    kidsN: beforeCompiled?.kidsN || 0,
  });

  const handleChangeStation = (value, nameState) => {
    setState({ ...state, [nameState]: value });
  };

  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeStart = (event) => {
    setState({ ...state, startDate: event });
  };

  const handleChangeReturn = (event) => {
    setState({ ...state, returnDate: event });
  };

  const handleChangeInputN = (incDec, type) => {
    var totalPassengers = state.adultsN + state.kidsN;
    switch (type) {
      case "adults":
        if (incDec === "+") {
          if (totalPassengers < MAX_PASSENGERS)
            setState({ ...state, adultsN: state.adultsN + 1 });
        } else if (incDec === "-") {
          if (state.adultsN > 0)
            setState({ ...state, adultsN: state.adultsN - 1 });
        }
        break;
      case "kids":
        if (incDec === "+") {
          if (totalPassengers < MAX_PASSENGERS)
            setState({ ...state, kidsN: state.kidsN + 1 });
        } else if (incDec === "-") {
          if (state.kidsN > 0) setState({ ...state, kidsN: state.kidsN - 1 });
        }
        break;
      default:
        break;
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (station) => station.name,
  });

  const swapStations = () => {
    var tmp = startStation;
    setState({
      ...state,
      startStation: arriveStation,
      arriveStation: tmp,
    });
  };

  useImperativeHandle(_ref, () => ({
    getFormState: () => {
      return state;
    },
  }));


  const {arriveStation, startStation} = state

  const startOptionMemo = useMemo(() => {
    if(arriveStation){
      return internalStations.filter(
        (station) => station.name !== arriveStation.name
      )
    }
    return internalStations
  },[arriveStation]);

  const arriveOptionMemo = useMemo(() =>{
    if(startStation){
      return internalStations.filter(
        (station) => station.name !== startStation.name
      )
    }
    return internalStations
  },[startStation]);

  const propContent = [
    {
      key: "stationsDates",
      body: (
        <>
          <Box className={classes.buttonsFormBox}>
            <ButtonForm title="Ripeti ultima tratta" icon={<ReplayIcon />} />
            <ButtonForm
              title="Scegli stazione preferita"
              icon={<FavoriteIcon />}
            />
          </Box>
          <Box className={classes.stationSection}>
            <div className={classes.inputStation}>
              <label className={classes.inputLabel}>
                Stazione di partenza*
              </label>
              <Autocomplete
                freeSolo
                disableClearable
                value={startStation}
                options={startOptionMemo}
                onChange={(event, value) =>
                  handleChangeStation(value, "startStation")
                }
                onInputChange={(event,value) => {
                  if(value === null || value === "")
                    handleChangeStation(null, "startStation")
                }}
                filterOptions={filterOptions}
                getOptionLabel={(station) => station.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.inputField}
                    margin="normal"
                    onFocus={() => props.isKeyboardOpened(true)}
                    onBlur={() => props.isKeyboardOpened(false)}
                    placeholder="Cerca una stazione"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </div>
            <div className={classes.swapIcon}>
              <IconButton
                edge="start"
                className={classes.swapIcon}
                color="inherit"
                aria-label="menu"
                onClick={() => swapStations()}
              >
                <SwapVertIcon color="#ffffff" />
              </IconButton>
            </div>
            <div className={classes.inputStation}>
              <label className={classes.inputLabel}>Stazione di arrivo*</label>
              <Autocomplete
                freeSolo
                disableClearable
                value={arriveStation}
                options={arriveOptionMemo}
                onChange={(event, value) =>
                  handleChangeStation(value, "arriveStation")
                }
                onInputChange={(event,value) => {
                  if(value === null || value === "")
                    handleChangeStation(null, "arriveStation")
                }}
                filterOptions={filterOptions}
                getOptionLabel={(station) => station.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.inputField}
                    margin="normal"
                    onFocus={() => props.isKeyboardOpened(true)}
                    onBlur={() => props.isKeyboardOpened(false)}
                    placeholder="Cerca una stazione"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </div>
            <div className={classes.withChange}>
              <label className={classes.inputLabel}>
                <input
                  name="withChange"
                  type="checkbox"
                  checked={state.withChange}
                  onChange={handleChangeCheck}
                />
                Soluzioni senza cambi
              </label>
            </div>
          </Box>
          <Divider variant="middle" className={classes.divider} />
          <Box className={classes.stationSection}></Box>
          <div className={classes.checkGo}>
            <label
              className={`${classes.inputLabel} ${classes.roundtripLabel}`}
            >
              <input
                name="roundtrip"
                type="checkbox"
                checked={state.roundtrip}
                onChange={handleChangeCheck}
              />
              Andata e ritorno
            </label>
          </div>

          <label className={classes.inputLabel}>Data e orario andata*</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={it}>
            <DateTimePicker 
              name="startDate"
              label="GG/MM/AAAA HH:MM"
              inputVariant="outlined"
              value={state.startDate}
              onChange={handleChangeStart}
              disablePast
            />
          </MuiPickersUtilsProvider>
          <label className={classes.inputLabel}>Data e orario ritorno*</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={it}>
            <DateTimePicker 
              name="returnDate"
              label="GG/MM/AAAA HH:MM"
              inputVariant="outlined"
              value={state.returnDate}
              onChange={handleChangeReturn}
              minDate={state.startDate}
              disabled={!state.roundtrip}
            />
          </MuiPickersUtilsProvider>
        </>
      ),
    },
    {
      title: "Passeggeri (max 5)*",
      key: "passengersSelection",
      body: (
        <>
          <Box className={classes.passengersSel}>
            <div
              className={classes.passengersBox}
              style={{ marginRight: "100px" }}
            >
              <label className={classes.inputLabel}>Adulti</label>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => handleChangeInputN("+", "adults")}
              >
                <AddIcon color="#ffffff" />
              </IconButton>
              <input
                name="adultsN"
                type="number"
                value={state.adultsN}
                className={classes.numberI}
                required
                readOnly
              />
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => handleChangeInputN("-", "adults")}
              >
                <RemoveIcon color="#ffffff" />
              </IconButton>
            </div>
            <div className={classes.passengersBox}>
              <label className={classes.inputLabel}>Ragazzi</label>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => handleChangeInputN("+", "kids")}
              >
                <AddIcon color="#ffffff" />
              </IconButton>
              <input
                name="adultsN"
                type="number"
                defaultValue="0"
                value={state.kidsN}
                className={classes.numberI}
                readOnly
                required
              />
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => handleChangeInputN("-", "kids")}
              >
                <RemoveIcon color="#ffffff" />
              </IconButton>
            </div>
          </Box>
          <Divider
            variant="middle"
            className={classes.divider}
            style={{ marginTop: "20px" }}
          />
          <div className={classes.cartaBox}>
            <label className={classes.inputLabel}>CartaFreccia</label>
            <Button
              className={classes.paginationContent}
              href="/"
              component={Link}
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              Inserisci CartaFreccia
            </Button>
          </div>
          <label className={classes.inputLabel}>* campi obbligatori</label>
        </>
      ),
    },
  ];

  return (
    <form className={classes.formBuy}>
      <Card content={propContent} />
    </form>
  );
});

export default BuyForm;
