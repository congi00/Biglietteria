import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
  return {
    menuButton: {
      paddingTop: "10px",
    },
    header:{
      height: "80px",
      paddingTop: "10px"
    }
  };
};

export default makeStyles(useStyles);
