import React from "react";
import useStyles from "./styles.js";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

const Loader = ({title, icon}) => {
  const classes = useStyles({ isRch: false });

  return (
    <Dialog
      open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogTitle className={classes.loaderTitle}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box className={classes.loaderBody}>
            {icon}
            <h5>Attendere</h5>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

Loader.propTypes = {
  title: PropTypes.any,
  icon: PropTypes.node
};

export default Loader;
