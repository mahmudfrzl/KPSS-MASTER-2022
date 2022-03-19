import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import AdminSignup from "./components/sideMenu/AdminSignup";
import Router from "./components/sideMenu/Router";
import SideMenu from "./components/sideMenu/SideMenu";
import { ComponentThatHides } from "./layers/ComponentToHide";
import Dashboard from "./layers/Dashboard";


// import RegLogStore from "./store/RegLogStore";

const App = () => {
  return (

    <div>
      
       <Route exact path="/log-in" component={AdminSignup} />
        <ComponentThatHides/>
    </div>
  );
};

export default observer(App);
