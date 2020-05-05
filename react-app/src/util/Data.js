import axios from "axios";

const Data = {
  

  getData() {

    return axios
      .get("https://huookxl2na.execute-api.eu-west-2.amazonaws.com/gokhan")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },


  getGeoJson() {
    return axios
      .get("https://huookxl2na.execute-api.eu-west-2.amazonaws.com/geojson")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },


  postData(data) {
    axios
      .post(
        "https://huookxl2na.execute-api.eu-west-2.amazonaws.com/postloo",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
        }
      )
      .then((response) => {
        alert("Your contribution sent succesfully. It will be checked and added very soon!");
        return response;
      })
      .catch((err) => {
        alert("Error happened. Please try again later.");
        return err;
      });

  },


  soundEx(s) {
    let a = s.toLowerCase().split(""),
      f = a.shift(),
      r = "",
      codes = {
        a: "",
        e: "",
        i: "",
        o: "",
        u: "",
        b: 1,
        f: 1,
        p: 1,
        v: 1,
        c: 2,
        g: 2,
        j: 2,
        k: 2,
        q: 2,
        s: 2,
        x: 2,
        z: 2,
        d: 3,
        t: 3,
        l: 4,
        m: 5,
        n: 5,
        r: 6,
      };

    r =
      f +
      a
        .map(function (v, i, a) {
          return codes[v];
        })
        .filter(function (v, i, a) {
          return i === 0 ? v !== codes[f] : v !== a[i - 1];
        })
        .join("");

    return (r + "000").slice(0, 4).toUpperCase();
  },


};


export default Data;