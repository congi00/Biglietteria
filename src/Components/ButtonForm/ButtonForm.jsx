import React from "react";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./styles.js";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const ButtonForm = ({icon, title, onClick}) => {
  const classes = useStyles();

  return (
    <div className={classes.formButton} onClick={() => onClick()}>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        {icon}
      </IconButton>
      <Typography variant="h5">{title}</Typography>
    </div>
  );
}

ButtonForm.propTypes = {
  title: PropTypes.any,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export default ButtonForm;
