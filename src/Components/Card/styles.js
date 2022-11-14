import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
  return {
    cardStyle: {
      width: "90vw",
      backgroundColor: "unset",
      borderRadius: "0px",
      border: "1px solid #fff",
    },
    cardHeader: {
      backgroundColor: "#EDEEEF",
      height: "56px",
      width: "100%",
      textAlign: "left",
      padding: "20px 0 0 20px",
      fontFamily: "Gotham",
      fontSize: "20px",
      fontWeight: "700",
      lineHeight: "15px",
      letterSpacing: "0.5px",
    },
    cardBody: {
      padding: "30px",
    },
  };
};

export default makeStyles(useStyles);
