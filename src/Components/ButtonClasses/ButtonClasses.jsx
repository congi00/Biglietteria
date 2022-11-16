import React from "react";
import useStyles from "./styles.js";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { getPriceFormat } from "../../utils";


const ButtonClasses = ({codeSelected,item}) => {
  const classes = useStyles();

  return (
    <div className={classes.formButton} style={{borderColor: codeSelected === item.code? "#008100" : "#D7DADD"}}>
      <Typography variant="h5">{item.description}</Typography>
      <Typography variant="h5">
        da {getPriceFormat(item.price)}€
      </Typography>
    </div>
  );
}

ButtonClasses.propTypes = {
  codeSelected: PropTypes.string,
  item: PropTypes.object
};

export default ButtonClasses;
