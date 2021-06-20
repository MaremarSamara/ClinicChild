import React from "react";
import "./App.css";
import SideMenu from "./components/SideMenu";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import Home from "./pages/home";
import LabPage from "./pages/lab";
import Requiredsample from "./pages/requiredsample";
import Service from "./pages/service";
import InsurancePage from "./pages/insurancecompany";
// functional component example
const App = () => {
  return(
    <main className="page-container">
    <BrowserRouter>
      <SideMenu/>
      <div className="body-container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/labs/:labName?" component={LabPage}/>
            <Route exact path="/insurancecompanys/:insuranceName?" component={InsurancePage}/>
            <Route exact path="/labs/service/:labphone" component={Service}/>
            <Route exact path="/labs/requiredsample/:labphone" component={Requiredsample}/>
          </Switch>
      </div>
      </BrowserRouter>
    </main>
  )
}




export default App;