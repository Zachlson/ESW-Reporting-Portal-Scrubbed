import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Data from "./pages/data";
import Reports from "./pages/reports";
import Trends from "./pages/trends";
import Preview from "./pages/preview";
import Header from "./common/Header.jsx";
import Footer from "./common/Footer";
import { useEffect, useState } from "react";
import TicketStore from "./stores/ticketStore";
import AgreementStore from "./stores/agreementStore";
import ConfigStore from "./stores/configStore";
import Loading from "./common/Loading";
import MemberStore from "./stores/memberStore";
import Login from "./pages/login";

function App() {
  const [loading, setLoading] = useState(true);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [generalTicketData, setGeneralTicketData] = useState([]);
  const [generalConfigData, setGeneralConfigData] = useState([]);
  const [generalAgreementData, setGeneralAgreementData] = useState([]);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const ticketStore = new TicketStore();
    const configStore = new ConfigStore();
    const agreementStore = new AgreementStore();
    const memberStore = new MemberStore();
    setIsLoggedIn(
      localStorage.getItem("esw_logged_in_status") === "logged_in"
        ? true
        : false
    );
    setUser(localStorage.getItem("esw_user_name"));
    // await memberStore.getGeneralMemberData().then((res) => {
    //   setCategoryFilters(res);
    // });
    // await ticketStore.getGeneralTicketData().then((res) => {
    //   setGeneralTicketData(res);
    // });
    // await configStore.getGeneralConfigData().then((res) => {
    //   setGeneralConfigData(res);
    // });
    // await agreementStore.getGeneralAgreementsData().then((res) => {
    //   setGeneralAgreementData(res);
    // });
    setCategoryFilters(memberStore.getGeneralMemberData());
    setGeneralTicketData(ticketStore.getGeneralTicketData());
    setGeneralConfigData(configStore.getGeneralConfigData());
    setGeneralAgreementData(agreementStore.getGeneralAgreementsData());
    setLoading(false);
    return () => {};
  }, []);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
  } else if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="App">
        <Router>
          <Header userName={user} />
          <div className="container">
            <Switch>
              <Route
                exact={true}
                path="/"
                render={(props) => (
                  <Data
                    {...props}
                    setLoading={setLoading}
                    categoryFilters={categoryFilters}
                    setCategoryFilters={setCategoryFilters}
                    generalTicketData={generalTicketData}
                    generalConfigData={generalConfigData}
                    generalAgreementData={generalAgreementData}
                  />
                )}
              />
              <Route
                exact={true}
                path="/trends"
                render={(props) => (
                  <Trends
                    {...props}
                    generalTicketData={generalTicketData}
                    generalConfigData={generalConfigData}
                    generalAgreementData={generalAgreementData}
                  />
                )}
              />
              <Route exact={true} path="/reports" component={Reports} />
              <Route
                exact={true}
                path="/preview"
                render={(props) => (
                  <Preview
                    {...props}
                    generalTicketData={generalTicketData}
                    generalConfigData={generalConfigData}
                    generalAgreementData={generalAgreementData}
                  />
                )}
              />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
