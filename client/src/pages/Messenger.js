import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, InputBase } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MessengerSideBar from "../components/MessengerSideBar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles({
  chatHeader: {
    display: "flex",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 15px #eee",
  },
  chatHeaderNameSection: {
    flex: 1,
  },
  userNameText: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  onlineText: {
    fontSize: "0.9em",
    color: "gray",
    marginLeft: "12px",
  },
  chatHeaderNameBtn: {
    flex: 1,
    textAlign: "right",
  },
  moreBtn: {
    color: "gray",
  },
  messengerGrid: {
    height: "100vh",
    backgroundColor: "#f7f7f7",
  },
  onlineIconSpan: {
    position: "relative",
    top: "4px",
  },
  onlineIcon: {
    fontSize: "1rem",
    color: "#00ff00",
  },
  chatContainer: {
    display: "flex",
  },
  messageInputContainer: {
    position: "fixed",
    bottom: "20px",
    width: "72.5%",
  },
  messageInput: {
    position: "relative",
    borderRadius: "5px",
    backgroundColor: "#e6e6e6",
    marginLeft: 0,
    padding: "10px",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    // padding:
    paddingLeft: "30px",
  },
  padding20: {
    padding: "20px"
  }
});

export default function Messenger() {
  const classes = useStyles();
  return (
    <Grid container spacing={0}>
      <MessengerSideBar />
      <Grid item md={9} xs={12} className={classes.messengerGrid}>
        <div>
          <div className={classes.chatHeader}>
            <div className={classes.chatHeaderNameSection}>
              <span className={classes.userNameText}>santiago</span>
              <span className={classes.onlineText}>
                <span className={classes.onlineIconSpan}>
                  <FiberManualRecordIcon className={classes.onlineIcon} />
                </span>
                Online
              </span>
            </div>
            <div className={classes.chatHeaderNameBtn}>
              <MoreHorizIcon className={classes.moreBtn} />
            </div>
          </div>

          <div className={classes.padding20}>
            <div>
              <div>
                <div>user1</div>
              </div>
              <div>
                <div>user2</div>
              </div>
              <div>
                <div>user1</div>
              </div>
            </div>
            <div className={classes.messageInputContainer}>
            <div className={classes.messageInput}>
              <InputBase
                placeholder="Type a message"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
