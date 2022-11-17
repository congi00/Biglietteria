import React from "react";
import useStyles from "./styles.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const getBackTripPrice = (backTripPromo) => {
  let totalAmount = 0;
  backTripPromo.forEach((passenger) => {
    passenger.forEach((promo) => {
      totalAmount += promo.amount;
    });
  });
  return totalAmount;
};

const onBackActions = (
  decrementStep,
  step,
  serviceSelected,
  currentTrip,
  setCurrentTrip,
  setTotalPrice,
  totalPrice,
  backTripPromo
) => {
  console.log(totalPrice);
  switch (serviceSelected) {
    case "BUY_TICKET": {
      switch (step) {
        case 2: {
          if (currentTrip === "ritorno") {
            setCurrentTrip("andata");
            setTotalPrice(-totalPrice);
          } else decrementStep();
          break;
        }
        case 3: {
          if (currentTrip === "ritorno")
            setTotalPrice(-getBackTripPrice(backTripPromo));
          else setTotalPrice(-totalPrice);
          decrementStep();
          break;
        }
        case 4: {
          if (currentTrip === "ritorno") getBackTripPrice(backTripPromo);
          else setTotalPrice(-totalPrice);
          decrementStep();
          break;
        }
        default: {
          decrementStep();
          break;
        }
      }
      break;
    }
    default:
      break;
  }
};

const Header = ({
  decrementStep,
  step,
  serviceSelected,
  currentTrip,
  setCurrentTrip,
  setTotalPrice,
  totalPrice,
  backTripPromo,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="inherit" className={classes.header}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width={"100%"}>
          <Box>
            <IconButton
              onClick={() => {
                onBackActions(
                  decrementStep,
                  step,
                  serviceSelected,
                  currentTrip,
                  setCurrentTrip,
                  setTotalPrice,
                  totalPrice,
                  backTripPromo
                );
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
};

Header.propTypes = {
  decrementStep: PropTypes.func,
  step: PropTypes.number,
  serviceSelected: PropTypes.string,
  currentTrip: PropTypes.string,
  setCurrentTrip: PropTypes.func,
  setTotalPrice: PropTypes.func,
  totalPrice: PropTypes.number,
  backTripPromo: PropTypes.array,
};

export default Header;
