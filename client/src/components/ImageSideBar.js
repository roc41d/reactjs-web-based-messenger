import { makeStyles } from "@material-ui/core/styles";
import BgImg from "../assets/bg-img.png";
import { Grid, Hidden } from "@material-ui/core";

const useStyles = makeStyles({
  bgImg: {
    backgroundImage: `url(${BgImg})`,
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    opacity: "85%",
  }
});
export default function ImageSideBar() {
  const classes = useStyles();
  return (
    <Hidden smDown>
      <Grid item xs={5} className={classes.bgImg}>
      </Grid>
    </Hidden>
  );
}
