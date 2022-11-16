import React from "react";
import useStyles from "./styles.js";
import PropTypes from "prop-types";

const SolutionItem = ({ content }) => {
  const classes = useStyles();

  if (!content) return null;
  return (
    <>
      {content.map((sections) => (
        <div className={classes.cardStyle} key={sections.key}>
          {sections.title && (
            <div className={classes.cardHeader}>{sections.title}</div>
          )}
          {sections.body && (
            <div className={classes.cardBody}>{sections.body}</div>
          )}
        </div>
      ))}
    </>
  );
}

SolutionItem.propTypes = {
  content: PropTypes.array
};

export default SolutionItem;
