import "./App.css";
import "semantic-ui-css/semantic.min.css";

import Welcomepage from "../src/views/welcomepage";
import Login from "../src/views/login"
import CreateAccout from "../src/views/createaccout";
import AuthUser from '../src/views/authuser'
import UserInfo from "../src/views/userinfo";
import Chat from "./views/chatbase";

import { UserContextProvider } from "../src/Context/usercontext"

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App font-link">
      <header className="App-header font-link">
        <UserContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Welcomepage />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <CreateAccout />
              </Route>
              <AuthUser path="/user">
                <UserInfo />
              </AuthUser>
              <Route path="/:userName">
                <Chat />
              </Route>
            </Switch>
          </BrowserRouter>
        </UserContextProvider>
      </header>
    </div>
  );
}

export default App;
