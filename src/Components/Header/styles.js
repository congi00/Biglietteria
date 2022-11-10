import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
  return {
    menuButton: {
      paddingTop: "10px",
    },
    appBar: {
      position: "fixed",
      left: 0,
      top: 0,
    },
  };
};

export default makeStyles(useStyles);
