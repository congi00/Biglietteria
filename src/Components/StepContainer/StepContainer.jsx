import React from "react";
import useStyles from "./styles.js";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";

const StepContainer = ({children, onCancel, onSearch, initialMenu, onGoOn, keyboardOpened}) => {
  const classes = useStyles();

  return (
    <div>
      <div>{children}</div>
      {!keyboardOpened && (
        <AppBar position="fixed" color="inherit" className={classes.stepper}>
          <Toolbar>
            {onCancel && (
              <Button onClick={() => onCancel()} variant="outlined" className={initialMenu? classes.initialCanel : classes.cancelButton }>
                Annulla
              </Button>
            )}
            {onSearch && (
              <Button onClick={() => onSearch()} variant="outlined" className={classes.findButton}>
                Cerca
              </Button>
            )}
            {onGoOn && (
              <Button onClick={() => onGoOn()} variant="outlined" className={classes.findButton}>
                Prosegui
              </Button>
            )}
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

StepContainer.propTypes = {
  onCancel: PropTypes.func,
  onSearch: PropTypes.func,
  initialMenu: PropTypes.bool,
  onGoOn: PropTypes.func,
  keyboardOpened: PropTypes.bool,
  children: PropTypes.node
};

export default StepContainer;
