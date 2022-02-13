import { Empty } from "antd";
import { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cevaplar from "../Content/Cevaplar/Cevaplar";
import Dersler from "../Content/Ders/Dersler";
import Subjects from "../Content/Konular/Subjects";
import ListMedias from "../Content/Medias/ListMedias";
import PushNotification from "../Content/Notification/PushNotification";
import Note from "../Content/Notlar/Note";
import Sorular from "../Content/Soru/Sorular";
import Testler from "../Content/Testler/Testler";

import AdminSignup from "./AdminSignup";
import SideMenu from "./SideMenu";

const Router = () => {
  return (
    <Switch>
       <Route exact path="/">
         <Redirect to='/log-in'  />
       </Route>


      <Route exact path="/sorular" component={Sorular} />
      <Route exact path="/dersler" component={Dersler} />
      <Route exact path="/konular" component={Subjects} />
      <Route exact path="/testler" component={Testler} />
      <Route exact path="/notlar" component={Note} />
      <Route exact path="/cevaplar" component={Cevaplar} />
      <Route exact path="/sosial-linkler" component={ListMedias} />
      <Route exact path="/bildirimler" component={PushNotification} />
      <Route>
        <Empty description="Sayfa bulunamadı" />
      </Route>
      
    </Switch>
  );
};

export default Router;
