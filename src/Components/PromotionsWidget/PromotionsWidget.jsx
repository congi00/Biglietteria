import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box  from "@material-ui/core/Box";
import {getPriceFormat} from "../../utils";

const useStyles = makeStyles((theme, props) => {
    return {
        promBox: {
      }
    };
  });

function PromotionsWidget({serviceSelected,promotionsSelection}) {
  const classes = useStyles();
  const item = serviceSelected?.item;

  console.log("PromotionsWidget -> render -> serviceSelected",serviceSelected)
  console.log("PromotionsWidget -> render -> promotionsSelection",promotionsSelection)
  return (
      <div className={classes.promBox} >
        <Typography variant="h5">SERVIZIO {item?.description}</Typography> 
        <Typography variant="h5">Seleziona l'offerta</Typography> 
        {promotionsSelection.map((item)=>{
            
            return(
                <Box>
                    <div>{item.description}</div>
                    <div>{getPriceFormat(item.price)}</div>
                </Box>
                
            );
        })}
      </div>
  );
}

export default PromotionsWidget;
