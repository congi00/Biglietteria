import React from "react";
import useStyles from "./styles.js";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";

function StepContainer(props) {
  const classes = useStyles();

  //console.log("%c StepContainer render props: ", "color:#f22", props);
  return (
    <div>
      <div>{props.children}</div>
      { !props.keyboardOpened &&
        <AppBar position="fixed" color="#ffffff" className={classes.appBar}>
          <Toolbar>
            {props.onCancel && (
              <Button onClick={() => props.onCancel()} variant="outlined">
                Annulla
              </Button>
            )}
            {props.onSearch && (
              <Button onClick={() => props.onSearch()} variant="outlined">
                Cerca
              </Button>
            )}
          </Toolbar>
        </AppBar>
      }
    </div>
  );
}

StepContainer.propTypes = {
  onCancel: PropTypes.func,
};

export default StepContainer;
