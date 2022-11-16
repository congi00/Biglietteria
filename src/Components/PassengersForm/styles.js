import { makeStyles } from '@material-ui/core/styles';

const useStyles = (theme,props) => {
    return {
        textInput: {
          backgroundColor: "#fff",
          boxSizing: "border-box",
          border: "2px solid #A7A7A7",
        },
        boxField: {
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
          "& label": {
            color: "#fff",
            fontSize: "16px",
            marginBottom: "2px",
          },
        },
      };
}

export default makeStyles(useStyles);