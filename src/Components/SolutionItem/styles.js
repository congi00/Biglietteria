import { makeStyles } from '@material-ui/core/styles';

const useStyles = (theme,props) => {
    return {
        cardStyle: {
            width: "90vw",
            height: "230px",
            color: "#4F4F4F",
            backgroundColor: "#fff",
            marginBottom: "30px",
            borderRadius: "8px",
            padding: "20px 0 5px 30px"
        }
    }
}

export default makeStyles(useStyles);