import { Empty } from "antd";
import { Switch, Route } from "react-router-dom";
import Cevaplar from "../Content/Cevaplar/Cevaplar";
import Dersler from "../Content/Ders/Dersler";
import Subjects from "../Content/Konular/Subjects";
import Note from "../Content/Notlar/Note";
import Sorular from "../Content/Soru/Sorular";
import Testler from "../Content/Testler/Testler";
import SideMenu from "./SideMenu";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/sorular" component={Sorular} />
      <Route exact path="/dersler" component={Dersler} />
      <Route exact path="/konular" component={Subjects} />
      <Route exact path="/testler" component={Testler} />
      <Route exact path="/notlar" component={Note} />
      <Route exact path="/cevaplar" component={Cevaplar} />

      <Route>
        <Empty description="Sayfa bulunamadı" />
      </Route>
    </Switch>
  );
};

export default Router;