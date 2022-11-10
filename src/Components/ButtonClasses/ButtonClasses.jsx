import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme, props) => {
    return {
      formButton: {
          backgroundColor: "#4F4F4F",
          color: "#fff",
          width: "243px",
          height: "96px",
          margin: "10px",
          boxShadow:" 0px 4px 12px rgba(79, 79, 79, 0.5), inset 0px 2px 1px rgba(121, 121, 121, 0.5), inset 0px -2px 1px rgba(145, 156, 167, 0.7)",
          fontSize: "16px"
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
      </div>
  );
}

export default ButtonClasses;
