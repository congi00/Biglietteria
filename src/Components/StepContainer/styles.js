import { makeStyles } from "@material-ui/core/styles";

const useStyles = (theme, props) => {
  return {
    stepper: {
      top: "auto",
      height: "168px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bottom: 0,
    },
    initialCanel:{
      width: "280px",
      border: "3px solid #ccc !important",
      fontWeight: "700 !important",
      fontSize: '20px !important',
      height: "70px",
      borderRadius: "50px !important"
    },
    cancelButton:{
      width: '274px',
      height: '64px',
      border: '4px solid #D3D3D3 !important',
      borderRadius: '0 !important',
      fontWeight: '600 !important',
      fontSize: '20px !important',
    },
    findButton:{
      background: '#FFC627',
      boxShadow: '0px 6px 16px -4px rgba(237, 169, 0, 0.5), inset 0px 2px 1px #FFDC7D, inset 0px -2px 1px #EDA900',
      borderRadius: '0 !important',
      fontWeight: '600 !important',
      fontSize: '20px !important',
      width: '274px',
      height: '64px',
      marginLeft: "130px"
    }
  };
};

export default makeStyles(useStyles);
