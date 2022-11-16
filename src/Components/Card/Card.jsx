import React from "react";
import useStyles from "./styles.js";
import PropTypes from "prop-types";
import { Card as MUICard } from "@material-ui/core";

const Card = ({ content }) => {
  const classes = useStyles();

  return (
    <>
      {content.map(
        (cards) => (
          <MUICard className={classes.cardStyle} key={cards.key}>
            {cards.title && (
              <div className={classes.cardHeader}>{cards.title}</div>
            )}
            {cards.body && <div className={classes.cardBody}>{cards.body}</div>}
          </MUICard>
        )
      )}
    </>
  );
}

Card.propTypes = {
  content: PropTypes.array
};

export default Card;
