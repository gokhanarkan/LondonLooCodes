import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Data from '../util/Data';

const selectValues = [
    {
        value: "Y"
    },
    {
        value: "N"
    },
    {
        value: "Don't Know"
    }
]

// Styles
const useStyles = makeStyles((theme) => ({
  button: {
    margin: "auto",
    padding: "auto",
    marginTop: "1ch",
    width: "75%",
    display: "flex",
    marginBottom: "2ch",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      margin: "auto",
      padding: "auto",
      display: "flex",
    },
  },
  h1: {
      textAlign: "center",
  },
  root: {
    paddingLeft: "25%",
    paddingRight: "25%",
    "& .MuiTextField-root": {
        width: "100%",
        marginBottom: "1ch"
    },
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      padding: "0",
    },
  },
}));


export default function FormPropsTextFields() {
  const classes = useStyles();
  
  // Initilasing states /hooks/
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [code, setCode] = React.useState("");
  const [station, setStation] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [accessible, setAccessible] = React.useState("Don't Know");
  const [gender, setGender] = React.useState("Don't Know");
  const [comments, setComments] = React.useState("");

  // Form Status for conditional rendering
  // const [status, setStatus] = React.useState(false);

  // Hande values
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };
  const handleChangeStation = (event) => {
    setStation(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleChangeAccessible = (event) => {
      setAccessible(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeComments = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      "name": {name},
      "rough_location": {location},
      "code": {code},
      "nearest_station": {station},
      "address": {address},
      "accessible": {accessible},
      "gender_neutral": {gender},
      "comments": {comments}
    }
    
    // Submit code
    Data.postData(formData);
    
  };


  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <h1 className={classes.h1}>Contribute</h1>
        <TextField
          required
          id="standard-required"
          label="Name"
          variant="outlined"
          onChange={handleChangeName}
        />
        <TextField
          required
          id="standard-required"
          label="Rough Location"
          variant="outlined"
          onChange={handleChangeLocation}
        />
        <TextField
          required
          id="standard-required"
          label="Code"
          variant="outlined"
          onChange={handleChangeCode}
        />
        <TextField
          id="yes-or-no"
          select
          required
          label="Accessible"
          value={accessible}
          onChange={handleChangeAccessible}
          helperText="Is this loo accessible?"
          variant="outlined"
        >
          {selectValues.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="yes-or-no"
          select
          required
          label="Gender Neutral"
          value={gender}
          onChange={handleChangeGender}
          helperText="Is this loo gender neutral?"
          variant="outlined"
        >
          {selectValues.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="standard-required"
          label="Nearest Station"
          variant="outlined"
          onChange={handleChangeStation}
          helperText="Best of your knowledge!"
        />
        <TextField
          id="standard-required"
          label="Address or Postcode"
          variant="outlined"
          onChange={handleChangeAddress}
        />
        <TextField
          id="standard-basic"
          label="Additional Comments"
          variant="outlined"
          onChange={handleChangeComments}
        />
      </div>
      <Button
        color="primary"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        variant="outlined"
        type="submit"
      >
        SEND
      </Button>
    </form>
  );
}