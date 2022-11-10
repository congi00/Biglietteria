import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {getPriceFormat} from "../../utils";

const useStyles = makeStyles((theme, props) => {
    return {
        promBox: {
      }
    };
  });

function PromotionsWidget({serviceSelected}) {
  const classes = useStyles();
  const item = serviceSelected?.item;

  console.log("PromotionsWidget -> render -> props",serviceSelected)
  return (
      <div className={classes.promBox} >
        <Typography variant="h5">SERVIZIO {item?.description}</Typography> 
        <Typography variant="h5">Seleziona l'offerta</Typography> 
      </div>
  );
}

export default PromotionsWidget;
