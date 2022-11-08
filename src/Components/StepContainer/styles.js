import { makeStyles } from '@material-ui/core/styles';

const useStyles = (theme,props) => {
    return {
        appBar: {
            top: 'auto',
            bottom: 0,
        }
    }
}

export default makeStyles(useStyles);