import React from 'react';
import AddForm from './AddForm/AddForm';
import MapView from './MapView/MapView'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar/NavBar';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Data from './util/Data';
import Button from "@material-ui/core/Button";

class App extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      data: [],
      term: "",
      results: [],
      clicked: false
    };

    this.searchLoo = this.searchLoo.bind(this);
    this.clicked = this.clicked.bind(this);

  }

  clicked() {

    // GET call for Loo data
    Data.getData().then((data) => {
      this.setState({
        data: data,
        results: data,
      });
    });
    
    // Conditional rendering
    this.setState({
      clicked: true
    })

  }

  // Autocomplete algorithm that returns relevant results
  searchLoo(search) {
    if (search.length < 3 && search !== '') {
      return [];
    } else if (search === '') {
      let data = this.state.data;
      this.setState({results: data })
      return
    }

    const terms = search.toLowerCase().split(" ");
    let termsDict = {};
    terms.map((element) => {
      termsDict[element] = Data.soundEx(element);
    });

    let results = [];
    let bool;

    this.state.data.filter((result) => {
      bool = false;
      const arr = [
        result.name.toLowerCase().split(" "),
        result.rough_location.toLowerCase().split(" "),
        result.nearest_station.toLowerCase().split(" "),
      ];

      arr.filter((items) => {
        for (let value of Object.keys(termsDict)) {
          items.map((element) => {
            if (Data.soundEx(element) === termsDict[value]) {
              bool = true;
            }
            // console.log(bool);
          });
          if (bool) {
            break;
          }
        }
      });
      if (bool) {
        results.push(result);
      }
    });

    this.setState({ results: results });
  
  }


  render() {
    
    const results = this.state.results;
    let data;

    if (this.state.clicked) {

      data = results.map((result) => (
        <div className="result" key={result._id.$oid}>
          <br></br>
          <Card className="root">
            <CardContent>
              <Typography className="title" color="textSecondary" gutterBottom>
                {result.name}
              </Typography>
              <Typography variant="h5" component="h2"></Typography>
              <Typography className="pos" color="textSecondary">
                {result.nearest_location}
              </Typography>
              <Typography variant="body2" component="p">
                {result.rough_location}
                <br />
                {result.address}
                <br></br>
                Code: {result.code}
                <br></br>
                Accessible: {result.accessible}
                <br></br>
              </Typography>
            </CardContent>
          </Card>
        </div>
      ));
    } 
    
    else 
    
    {
      data = (
        <div className="main-page">
          <h1>Welcome to the London Loo Codes!</h1>
          <p>
            This is a community-driven information exchange platform about loos and their entrance codes across
            London.
          </p>
          <p>Beware that this is currently just a prototype. <br></br> 
          For instance, the search field is a bit buggy at the moment. I also need a better algorithm perhaps!</p>
          <p>Feel free to <a href="mailto:gokhanarkan@me.com">email me</a> if you have any suggestions.</p>
          <p>Click below to check toilet data now.</p>
          <Button variant="contained" color="primary" onClick={this.clicked}>
            Show data
          </Button>
        </div>
      );


    }
    return (
      <div>
        <NavBar searchTerm={this.searchLoo} />
        <Router>
          <Switch>
            <Route path="/add">
              <Add />
            </Route>
            <Route path="/map">
              <Map />
            </Route>
            <Route path="/">
              <Container>
                <div>
                  {data}
                </div>
              </Container>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

function Add() {

  return (
    <Container>
      <AddForm />
    </Container>
  );

}

function Map() {
  return (
    <Container>
      <MapView />
    </Container>
  );
}

export default App;
