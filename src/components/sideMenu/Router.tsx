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
import { ProtectedRoute } from "./ProtectedRoute";
import SideMenu from "./SideMenu";

const Router = () => {
  return (
    <Switch>
       <Route exact path="/">
         <Redirect to='/log-in'/>
       </Route>


      <ProtectedRoute exact path="/sorular" component={Sorular} />
      <ProtectedRoute exact path="/dersler" component={Dersler} />
      <ProtectedRoute exact path="/konular" component={Subjects} />
      <ProtectedRoute exact path="/testler" component={Testler} />
      <ProtectedRoute exact path="/notlar" component={Note} />
      <ProtectedRoute exact path="/cevaplar" component={Cevaplar} />
      <ProtectedRoute exact path="/sosial-linkler" component={ListMedias} />
      <ProtectedRoute exact path="/bildirimler" component={PushNotification} />
      <Route>
        <Empty description="Sayfa bulunamadı" />
      </Route>
      
    </Switch>
  );
};

export default Router;
