import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const MapView = ({ positions }) => {
  const center = [51.5133236, -0.1127138];
  return (
    <MapContainer center={center} zoom={12}>
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
    </MapContainer>
  );
};

export default MapView;
