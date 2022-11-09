import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
    //console.log("Loader->style->theme: ", theme);
  return {
    root: {
      "& .MuiDialog-paperWidthSm": {
        width: (props) => {
          //console.log("Loader->style->isRch: ", props);
          return "500px";
        },
      },
    },
    loaderBox: {
      textAlign: "center",
    },
    loaderTitle: {
      fontWeight: "800",
    },
    loaderBody: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };
};

export default makeStyles(useStyles);
