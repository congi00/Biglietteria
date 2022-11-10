import React from "react";
import useStyles from "./styles.js";
import { Card as MUICard } from "@material-ui/core";

function Card({ content }) {
  const classes = useStyles();

  return (
    <>
      {content.map(
        (cards) => (
          //<React.Fragment key={cards.key}>
          <MUICard className={classes.cardStyle} key={cards.key}>
            {cards.title && (
              <div className={classes.cardHeader}>{cards.title}</div>
            )}
            {cards.body && <div className={classes.cardBody}>{cards.body}</div>}
          </MUICard>
        )
        //</React.Fragment>
      )}
    </>
  );
}

export default Card;
