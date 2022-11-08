import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonForm from "../../Components/ButtonForm/ButtonForm.jsx";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReplayIcon from "@material-ui/icons/Replay";
import IconButton from "@material-ui/core/IconButton";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Divider from "@material-ui/core/Divider";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { it } from "date-fns/locale";
import { useImperativeHandle } from "react";
import { Box } from "@material-ui/core";
import Card from "../Card/Card";

const useStyles = makeStyles((theme, props) => {
  return {
    BuyTicketContainer: {
      backgroundColor: "#008100",
      textAlign: "center",
      width: "100%",
      height: "100%",
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
        height:"48px",
        margin: "5px 10px 0 0"
    },
    numberI: {}
  };
});

const BuyForm = forwardRef((props, _ref) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    startStation: "",
    arriveStation: "",
    withChange: false,
    roundtrip: false,
    startDate: null,
    returnDate: null,
    adultsN: 1,
    kidsN: 0,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }
 
  const handleChangeStart = (event) => {
    setState({ ...state, startDate: event });
  };

  const handleChangeReturn = (event) => {
    setState({ ...state, returnDate: event });
  };

  useImperativeHandle(_ref, () => ({
    getFormState: () => {
      return state;
    },
  }));

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
              <input
                className={classes.inputField}
                name="startStation"
                type="text"
                placeholder="Cerca una stazione"
                value={state.startStation}
                onChange={handleChange}
                onFocus={() => props.isKeyboardOpened(true)}
                onBlur={() => props.isKeyboardOpened(false)}
              />
            </div>
            <div className={classes.swapIcon}>
              <IconButton
                edge="start"
                className={classes.swapIcon}
                color="inherit"
                aria-label="menu"
              >
                <SwapVertIcon color="#ffffff" />
              </IconButton>
            </div>
            <div className={classes.inputStation}>
              <label className={classes.inputLabel}>Stazione di arrivo*</label>
              <input
                className={classes.inputField}
                name="arriveStation"
                type="text"
                placeholder="Cerca una stazione"
                value={state.arriveStation}
                onChange={handleChange}
                onFocus={() => props.isKeyboardOpened(true)}
                onBlur={() => props.isKeyboardOpened(false)}
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
            <KeyboardDatePicker
              name="startDate"
              label="GG/MM/AAAA"
              inputVariant="outlined"
              value={state.startDate}
              onChange={handleChangeStart}
              disablePast
            />
          </MuiPickersUtilsProvider>
          <label className={classes.inputLabel}>Data e orario ritorno*</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={it}>
            <KeyboardDatePicker
              name="returnDate"
              label="GG/MM/AAAA"
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
            <div>
              <label className={classes.inputLabel}>Adulti</label>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <AddIcon color="#ffffff" />
              </IconButton>
              <input
                name="adultsN"
                type="number"
                value={state.adultsN}
                onChange={handleChange}
                className={classes.numberI}
                required
              />
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <RemoveIcon color="#ffffff" />
              </IconButton>
            </div>
            <div>
              <label className={classes.inputLabel}>Ragazzi</label>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <AddIcon color="#ffffff" />
              </IconButton>
              <input
                name="adultsN"
                type="number"
                defaultValue="0"
                value={state.kidsN}
                onChange={handleChange}
                className={classes.numberI}
                required
              />
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <RemoveIcon color="#ffffff" />
              </IconButton>
            </div>
          </Box>
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
