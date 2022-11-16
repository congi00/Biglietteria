import { makeStyles } from '@material-ui/core/styles';

const useStyles = (theme,props) => {
    return {
        promBox: {
          color: "#fff",
          padding: "40px 0 20px 40px",
        },
        itemBox: {
          margin: "0 0 10px 40px !important",
          width: "80vw !important",
          height: "105px !important",
          backgroundColor: "#fff",
          padding: "20px !important",
        },
        choiceSit: {
          color: "#fff",
          width: "86vw",
          display: "flex",
          textAlign: "right",
          justifyContent: "right",
          margin: "25px 0px 20px",
        },
        descriptionItem: {
          fontSize: "20px",
          fontWeight: "600",
        },
        priceItem: {
          textAlign: "right",
          fontSize: "30px",
          fontWeight: "600",
        },
        opacityOn: {
          opacity: "0.5",
        },
        opacityOff: {
          opacity: "1",
        },
      };
}

export default makeStyles(useStyles);