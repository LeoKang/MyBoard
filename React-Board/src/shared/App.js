import React, { useState } from "react";
import { Route } from "react-router-dom";
import {
  Main,
  Like,
  My,
  Login,
  Detail,
  Register,
  New,
  Profile,
} from "../pages/index";
import { Header, Footer, Menu } from "../components/index";
import { logger } from "./Logger";

const App = () => {
  logger.render("App", `Initial token check: ${localStorage.getItem("token")}`);
  const token = localStorage.getItem("token");
  
  // eslint-disable-next-line
  const [isLogin, setIsLogin] = useState(token && token !== "null" && token !== "undefined");

  const doLogin = () => {
    logger.success("App", "doLogin callback executed, setting isLogin = true");
    setIsLogin(true);
  };

  const doLogout = () => {
    logger.info("App", "doLogout callback executed, setting isLogin = false");
    setIsLogin(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Header doLogout={doLogout} isLogin={isLogin} />
        
        {/* Menu Wrapper */}
        <div className="flex justify-center items-center bg-white overflow-auto">
          <Route exact path="/" component={Menu} />
          <Route path="/like" component={Menu} />
          <Route path="/my" component={Menu} />
        </div>

        {/* Content Wrapper */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Route exact path="/" component={Main} />
          <Route path="/like" component={Like} />
          <Route path="/my" component={My} />
          <Route path="/detail/:pk" render={(routeProps) => <Detail post={routeProps} />} />
          <Route path="/new" render={() => <New isLogin={isLogin} />} />
          <Route path="/profile" render={() => <Profile isLogin={isLogin} />} />
          <Route path="/login" render={() => <Login doLogin={doLogin} isLogin={isLogin} />} />
          <Route path="/register" component={Register} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
