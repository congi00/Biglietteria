import React from "react";
import useStyles from "./styles.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Box from "@material-ui/core/Box";

function Header({decrementStep}) {
  const classes = useStyles();

  return (
    <AppBar position="static" color="#ffffff" className={classes.appBar}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width={"100%"}>
          <Box>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon onClick={()=>decrementStep()}/>
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

export default Header;
