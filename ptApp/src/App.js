import React, { useState } from "react";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
//import Calender from "./components/Calender";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./App.css";

function App() {
  const [value, setValue] = useState("one");
  const handleChange = (e, value) => {
    setValue(value);
  };
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal Training App</Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            style={{ marginLeft: "30%" }}
          >
            <Tab value="one" label="Customers" />
            <Tab value="two" label="Training" />
         {/*<Tab value="three" label="Calender" />*/}
          </Tabs>
        </Toolbar>
      </AppBar>
      {value === "one" && <Customers />}
      {value === "two" && <Trainings />}
      {/*value === "three" && <Calender />*/}
    </div>
  );
}

export default App;
