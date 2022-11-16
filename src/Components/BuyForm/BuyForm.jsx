import React, { forwardRef, useMemo } from "react";
import useStyles from "./styles.js";
import PropTypes from "prop-types";
import ButtonForm from "../../Components/ButtonForm/ButtonForm.jsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReplayIcon from "@material-ui/icons/Replay";
import IconButton from "@material-ui/core/IconButton";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
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

const internalStations = stations.data.stations.map((station, index) => {
  return {
    id: station[0],
    name: station[1],
    latitude: station[2],
    longitude: station[3],
  };
});

const MAX_PASSENGERS = 5;

const BuyForm = forwardRef(({isKeyboardOpened , beforeCompiled}, _ref) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    startStation: beforeCompiled?.startStation || null,
    arriveStation: beforeCompiled?.arriveStation || null,
    withChange: beforeCompiled?.withChange || false,
    roundtrip: beforeCompiled?.roundtrip || false,
    startDate: beforeCompiled?.startDate || null,
    returnDate: beforeCompiled?.returnDate || null,
    startTime: beforeCompiled?.startTime || null,
    returnTime: beforeCompiled?.returnTime || null,
    adultsN: beforeCompiled?.adultsN || 1,
    kidsN: beforeCompiled?.kidsN || 0,
  });

  const getLastLeg = () => {
    const leg = JSON.parse(localStorage.getItem("lastLeg"));
    console.log(leg);
    setState({
      ...state,
      startStation: leg?.start,
      arriveStation: leg?.arrive,
    });
  };

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

  const handleChangeStartT = (event) => {
    setState({ ...state, startTime: event });
  };

  const handleChangeReturnT = (event) => {
    setState({ ...state, returnTime: event });
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

  const { arriveStation, startStation } = state;

  const startOptionMemo = useMemo(() => {
    if (arriveStation) {
      return internalStations.filter(
        (station) => station.name !== arriveStation.name
      );
    }
    return internalStations;
  }, [arriveStation]);

  const arriveOptionMemo = useMemo(() => {
    if (startStation) {
      return internalStations.filter(
        (station) => station.name !== startStation.name
      );
    }
    return internalStations;
  }, [startStation]);

  const propContent = [
    {
      key: "stationsDates",
      body: (
        <>
          <Box className={classes.buttonsFormBox}>
            <ButtonForm
              onClick={getLastLeg}
              title="Ripeti ultima tratta"
              icon={<ReplayIcon />}
            />
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
                onInputChange={(event, value) => {
                  if (value === null || value === "")
                    handleChangeStation(null, "startStation");
                }}
                filterOptions={filterOptions}
                getOptionLabel={(station) => station.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.inputField}
                    margin="normal"
                    onFocus={() => isKeyboardOpened(true)}
                    onBlur={() => isKeyboardOpened(false)}
                    placeholder="Cerca una stazione"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </div>
            <div className={classes.swapIcon}>
              <IconButton
                edge="start"
                style={{ color: "white" }}
                aria-label="menu"
                onClick={() => swapStations()}
              >
                <SwapVertIcon fontSize="large" />
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
                onInputChange={(event, value) => {
                  if (value === null || value === "")
                    handleChangeStation(null, "arriveStation");
                }}
                filterOptions={filterOptions}
                getOptionLabel={(station) => station.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.inputField}
                    margin="normal"
                    onFocus={() => isKeyboardOpened(true)}
                    onBlur={() => isKeyboardOpened(false)}
                    placeholder="Cerca una stazione"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </div>
            <div className={classes.withChange}>
              <label className={classes.inputLabel}>
                <input
                  className={classes.checkBox}
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
                className={classes.checkBox}
                name="roundtrip"
                type="checkbox"
                checked={state.roundtrip}
                onChange={handleChangeCheck}
              />
              Andata e ritorno
            </label>
          </div>

          <div>
            <label className={classes.inputLabel}>Data e orario andata*</label>
            <div className={classes.dateContainer}>
              <IconButton
                edge="start"
                className={classes.calendarBox}
                aria-label="menu"
                onClick={() => swapStations()}
              >
                <DateRangeRoundedIcon fontSize="large" />
              </IconButton>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={it}>
                <DatePicker
                  className={classes.dateField}
                  name="startDate"
                  placeholder="GG/MM/AAAA"
                  inputVariant="outlined"
                  value={state.startDate}
                  onChange={handleChangeStart}
                  disablePast
                />
                <TimePicker
                  className={classes.timeField}
                  placeholder="HH:MM"
                  inputVariant="outlined"
                  value={state.startTime}
                  onChange={handleChangeStartT}
                  disablePast
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div>
            <label className={classes.inputLabel}>Data e orario ritorno*</label>
            <div className={classes.dateContainer}>
              <IconButton
                edge="start"
                className={classes.calendarBox}
                aria-label="menu"
                onClick={() => swapStations()}
              >
                <DateRangeRoundedIcon fontSize="large" />
              </IconButton>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={it}>
                <DatePicker
                  className={classes.dateField}
                  name="returnDate"
                  placeholder="GG/MM/AAAA"
                  inputVariant="outlined"
                  value={state.returnDate}
                  onChange={handleChangeReturn}
                  minDate={state.startDate}
                  disabled={!state.roundtrip}
                />
                <TimePicker
                  className={classes.timeField}
                  placeholder="HH:MM"
                  inputVariant="outlined"
                  value={state.returnTime}
                  onChange={handleChangeReturnT}
                  disablePast
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
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
              <div>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  disabled={state.adultsN === 0}
                  onClick={() => handleChangeInputN("-", "adults")}
                >
                  <RemoveIcon color="inherit" />
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
                  onClick={() => handleChangeInputN("+", "adults")}
                >
                  <AddIcon color="inherit" />
                </IconButton>
              </div>
            </div>
            <div className={classes.passengersBox}>
              <label className={classes.inputLabel}>Ragazzi</label>
              <div>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  disabled={state.kidsN === 0}
                  onClick={() => handleChangeInputN("-", "kids")}
                >
                  <RemoveIcon color="inherit" />
                </IconButton>
                <input
                  name="adultsN"
                  type="number"
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
                  onClick={() => handleChangeInputN("+", "kids")}
                >
                  <AddIcon color="inherit" />
                </IconButton>
              </div>
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

BuyForm.propTypes = {
  isKeyboardOpened: PropTypes.func, 
  beforeCompiled: PropTypes.object
};

export default BuyForm;
