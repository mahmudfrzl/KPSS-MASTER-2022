import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import SideMenu from "./components/sideMenu/SideMenu";
// import RegLogStore from "./store/RegLogStore";

const App = () => {
  return (
    <div>
      <SideMenu />
    </div>
  );
};

export default observer(App);
