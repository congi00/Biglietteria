import React from "react";
import useStyles from "./styles.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const onBackActions = (decrementStep, step, serviceSelected,currentTrip,setCurrentTrip, setTotalPrice, totalPrice) => {
  console.log(totalPrice)
  switch(serviceSelected){
    case "BUY_TICKET": {
      switch(step){
        case 2: {
          if(currentTrip === "ritorno")
            setCurrentTrip("andata")
          else
            decrementStep();
          break;
        }
        case 3: {
          if(currentTrip === "ritorno")
            setCurrentTrip("andata")
          else
            setTotalPrice(-totalPrice);
          decrementStep();
          break;
        }
        default:{
          decrementStep();
          break;
        }
      }
      break;
    }
    default:
      break;
  }
}



const Header = ({ decrementStep, step, serviceSelected, currentTrip, setCurrentTrip, setTotalPrice, totalPrice}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="inherit" className={classes.header}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width={"100%"}>
          <Box>
            <IconButton
              onClick={() => {
                onBackActions(decrementStep,step,serviceSelected, currentTrip, setCurrentTrip, setTotalPrice, totalPrice)
              }} 
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              edge="end"
              className="menuButton"
              color="inherit"
              aria-label="menu"
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


Header.propTypes = {
  decrementStep: PropTypes.func,
  step: PropTypes.number, 
  serviceSelected: PropTypes.string,
  currentTrip: PropTypes.string,
  setCurrentTrip: PropTypes.func,
  setTotalPrice: PropTypes.func, 
  totalPrice: PropTypes.number
};

export default Header;
