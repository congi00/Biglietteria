import { makeStyles } from '@material-ui/core/styles';

const useStyles = (theme,props) => {
    return {
        formButton: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px 44px",
            backgroundColor: "#FFFFFF",
            border: "4px solid #D7DADD",
            borderRadius: "100px",
            marginLeft:"35px",
            cursor: "pointer"
          },
    }
}

export default makeStyles(useStyles);