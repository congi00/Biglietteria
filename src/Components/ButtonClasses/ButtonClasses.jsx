import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {getPriceFormat} from "../../utils";

const useStyles = makeStyles((theme, props) => {
    return {
      formButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 44px",
        backgroundColor: "#FFFFFF",
        border: "4px solid #008100",
        borderRadius: "100px",
      }
    };
  });

function ButtonClasses(props) {
  const classes = useStyles();

  return (
    
      <div className={classes.formButton}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          {props.icon}
        </IconButton>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="h5">da {getPriceFormat(props.price)}€</Typography>
      </div>
  );
}

export default ButtonClasses;
