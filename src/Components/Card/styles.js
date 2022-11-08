import { makeStyles } from '@material-ui/core/styles';

const useStyles = (theme,props) => {
    return {
        cardStyle:{
            width: "80vw",
            backgroundColor: "unset",
            borderRadius: "0px",
            border: "1px solid #fff",
            
        },
        cardHeader:{
            backgroundColor: "#EDEEEF",
            height: "56px",
            width:"100%",
            textAlign:"left",
            padding: "20px 0 0 20px",
            fontFamily: "Gotham",
            fontSize: "20px",
            fontWeight: "400",
            lineHeight: "32px",
            letterSpacing: "0px"
        },
        cardBody:{
            padding: "20px",
            
        }
    }
}

export default makeStyles(useStyles);