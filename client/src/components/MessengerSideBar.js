import { fade, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  InputBase
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  search: {
    position: 'relative',
    borderRadius: "5px",
    backgroundColor: "#e6f1ff",
    marginLeft: 0,
    padding: "10px"
  },
  searchIcon: {
    padding: "3px",
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "gray"
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    // padding: 
    paddingLeft: "30px",
  },
  searchHeaderText: {
    fontWeight: "bold",
    fontSize: "1.3em",
    marginBottom: "10px"
  },
  searchContainer: {
    padding: "10px 15px"
  }
});
export default function MessengerSideBar() {
  const classes = useStyles();
  return (
    <Hidden smDown>
      <Grid item xs={3}>
        <div>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="condor" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="more">
                  <MoreHorizIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
        <div className={classes.searchContainer}>
          <div className={classes.searchHeaderText}>Chats</div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </div>
        <div>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="santiago"
                secondary="Do you have any plans?"
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="count">
                  <Chip color="primary" size="small" label="3" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </Grid>
    </Hidden>
  );
}
