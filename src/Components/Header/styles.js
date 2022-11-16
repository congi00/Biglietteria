import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
  return {
    menuButton: {
      paddingTop: "10px",
    },
    header:{
      position: "relative",
      top:0,
      bottom:0,
      height: "80px",
      paddingTop: "10px"
    }
  };
};

export default makeStyles(useStyles);
