import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
  return {
    buttonsFormBox: {
      display: "flex",
      justifyContent: "center",
    },
    stationSection: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
    },
    inputField: {
      border: "2px solid #A7A7A7",
      fontStyle: "italic",
      height: "4vh",
      width: "100%",
      marginTop: "5px",
      borderRadius: "0px",
      backgroundColor: "#fff",
      padding: "8px",
      "& .MuiInput-underline:before": {
        border: "0px",
      },
    },
    inputLabel: {
      color: "#fff",
      fontFamily: "Gotham",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "19px",
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
      letterSpacing: "0.5px",
    },
    checkBox: {
      // appearance: "none",
      backgroundColor: "transparent",
      margin: "5px",
      font: "inherit",
      color: "#fff",
      width: "20px",
      height: "20px",
      border: "2px solid #fff",
      borderRadius: "0",
      transform: "translateY(-0.075em)",
    },
    swapIcon: {
      height: "20px",
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
      fontSize: "25px",
      marginRight: "10px",
      textAlign: "center",
      position: "relative",
      top: "7px",
    },
    cartaBox: {
      display: "flex",
      justifyContent: "space-between",
      margin: "20px 0 20px 0",
    },
    linkCard: {
      color: "yellow",
      textDecoration: "underline",
    },
    calendarBox: {
      color: "#222",
      backgroundColor: "#fff",
      borderRadius: "5px",
      padding: "8px",
      marginRight: "20px",
    },
    dateField: {
      height: "4vh",
      width: "200px",
      backgroundColor: "#fff",
    },
    timeField: {
      height: "4vh",
      width: "100px",
      backgroundColor: "#fff",
    },
    dateContainer: {
      margin: "20px",
      width: "60vw",
      display: "flex",
      justifyContent: "space-around",
      position: "relative",
      left: "10vw"
    },
  };
};

export default makeStyles(useStyles);
