import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import './MapView.css';
import Data from "../util/Data";

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geodata: []
    }

    Data.getGeoJson().then((response) => {
      this.setState({geodata: response});
    });

  }

  render() {
    const center = [51.5133236, -0.1127138];
    if (this.state.geodata.length < 1) {

      return <div></div>;

    } else {
      const positions = this.state.geodata.features;
      return (
        <div>
          <h1>In Development Map View</h1>
          <Map center={center} zoom={12}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {positions.map((position) => (
              <Marker position={position.geometry.coordinates}>
                <Popup>
                  Name: {position.properties.name}
                  <br />
                  Code: {position.properties.code}
                  <br />
                  Nearest Station: {position.properties.nearest_station}
                  <br />
                  Accessible: {position.properties.accessible}
                  <br />
                  Genter Neutral: {position.properties.gender_neutral}
                </Popup>
              </Marker>
            ))}
          </Map>
        </div>
      );
    }
  }
}

export default MapView;
