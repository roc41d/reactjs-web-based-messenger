import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { Box, Button,
    Typography, } from "@material-ui/core";

const useStyles = makeStyles({
  removeUnderLineOnLink: {
    textDecoration: "none",
  },
  marginBottom25: {
    marginBottom: "25%",
  },
  textColorGray: {
    color: "#9c9c9c",
  },
  topBtn: {
    padding: '15px',
    boxShadow: '0 0 5px'
  },
});
export default function LinkHeader(props) {
  const classes = useStyles();
  return (
    <Box display="flex" className={classes.marginBottom25}>
      <Typography variant="subtitle1">{props.headerText} </Typography>
      <Link to="props.goToUrl" className={classes.removeUnderLineOnLink}>
        <Button size="large" color="primary" className={classes.topBtn}>
          {props.btnText}
        </Button>
      </Link>
    </Box>
  );
}
