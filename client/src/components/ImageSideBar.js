import { makeStyles } from "@material-ui/core/styles";
import BgImg from "../assets/bg-img.png";
import { Grid, Hidden } from "@material-ui/core";
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';

const useStyles = makeStyles({
  bgImg: {
    backgroundImage: `url(${BgImg})`,
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    opacity: "85%",
  },
  textWrapper: {
    position: 'absolute',
    width: '40%',
    top: '35%'
  },
  textContainer: {
    textAlign: 'center'
  },
  imgText: {
    color: '#ffffff',
    fontSize: '1.4em'
  },
  icon: { 
    fontSize: 50,
    color: '#ffffff'
  },
  iconContainer: {
    marginBottom: '15px'
  }
});
export default function ImageSideBar() {
  const classes = useStyles();
  return (
    <Hidden smDown>
      <Grid item xs={5} className={classes.bgImg}>
        <div className={classes.textWrapper}>
          <div className={classes.textContainer}>
            <div className={classes.iconContainer}>
              <SmsOutlinedIcon className={classes.icon} />
            </div>
            <div className={classes.imgText}>
              Converse with anyone <br/>
              with any language
            </div>
          </div>
        </div>
      </Grid>
    </Hidden>
  );
}
