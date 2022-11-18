import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
  return {
    textInput: {
      backgroundColor: "#fff",
      boxSizing: "border-box",
      border: "2px solid #A7A7A7",
      fontStyle: "italic",
      height: "4vh",
      marginTop: "5px",
      borderRadius: "0px",
      backgroundColor: "#fff",
      padding: "8px",
      "& .MuiInput-underline:before": {
        border: "0px",
      },
    },
    boxField: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
      "& label": {
        color: "#fff",
        fontSize: "16px",
        marginBottom: "2px",
      },
    },
    dateField: {
      height: "4vh",
      backgroundColor: "#fff",
      marginTop: "5px",
      borderRadius: "0px",
    },
  };
};

export default makeStyles(useStyles);
