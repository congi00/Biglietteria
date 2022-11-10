import React from "react";
import useStyles from "./styles.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Loader() {
  const classes = useStyles({ isRch: false });

  return (
    <Dialog
      open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogTitle className={classes.loaderTitle}>
        {"RICERCA IN CORSO"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box className={classes.loaderBody}>
            <CircularProgress disableShrink />
            <h5>Attendere</h5>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default Loader;
