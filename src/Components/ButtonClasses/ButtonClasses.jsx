import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getPriceFormat } from "../../utils";

const useStyles = makeStyles((theme, props) => {
  return {
    formButton: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "12px 44px",
      backgroundColor: "#FFFFFF",
      border: "4px solid #D7DADD",
      borderRadius: "100px",
      marginLeft:"35px",
      cursor: "pointer"
    },
    //#008100
    
  };
});

function ButtonClasses(props) {
  const classes = useStyles();

  return (
    <div className={classes.formButton} style={{borderColor: props.codeSelected === props.item.code? "#008100" : "#D7DADD"}}>
      <Typography variant="h5">{props.item.description}</Typography>
      <Typography variant="h5">
        da {getPriceFormat(props.item.price)}€
      </Typography>
    </div>
  );
}

export default ButtonClasses;
