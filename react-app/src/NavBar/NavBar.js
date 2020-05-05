import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MapIcon from "@material-ui/icons/Map";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";


// Styles
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      margin: 0,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  addLocation: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
    },
  },
  mapView: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
    },
  },
  routeLink: {
    color: "white",
    textDecoration: "none",
  },
  homeButton: {
    display: "none",
    [theme.breakpoints.down("sm")]:{
      display: "flex"
    }
  },
  menuTitle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    }
  }
  
  sendData = (term) => {
    this.props.searchTerm(term);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              <a href="/" className={classes.routeLink}>
                London Loo Codes
              </a>
            </Typography>
            <a href="/" className={classes.routeLink}>
              <MenuItem className={classes.homeButton}>
                <IconButton color="inherit">
                  <HomeIcon />
                </IconButton>
              </MenuItem>
            </a>
            <a href="/add" className={classes.routeLink}>
              <MenuItem className={classes.addLocation}>
                <IconButton color="inherit">
                  <AddLocationIcon />
                </IconButton>
                <p className={classes.menuTitle}>Add Location</p>
              </MenuItem>
            </a>
            <a href="/map" className={classes.routeLink}>
              <MenuItem className={classes.mapView}>
                <IconButton color="inherit">
                  <MapIcon />
                </IconButton>
                <p className={classes.menuTitle}>Map View</p>
              </MenuItem>
            </a>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e, value) => {
                  this.sendData(e.target.value);
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
