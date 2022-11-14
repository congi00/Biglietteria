import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
  return {
    stepper: {
      top: "auto",
      height: "168px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bottom: 0,
    },
    initialCanel:{
      width: "280px",
      border: "3px solid #ccc",
      fontWeight: "700",
      height: "70px",
      borderRadius: "50px"
    }
  };
};

export default makeStyles(useStyles);
