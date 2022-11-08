import React from "react";
import useStyles from "./styles.js";

function SolutionItem({ content }) {
  const classes = useStyles();

  if (!content) return null;
  return (
    <>
      {content.map((sections) => (
        <div className={classes.cardStyle} key={sections.key}>
          {sections.title && (
            <div className={classes.cardHeader}>{sections.title}</div>
          )}
          {sections.body && <div className={classes.cardBody}>{sections.body}</div>}
        </div>
      ))}
    </>
  );
}

export default SolutionItem;
