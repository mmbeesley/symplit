//Packages
import React from "react";
import { Switch, Route } from "react-router-dom";
//Components
import Home from "./components/Organisms/Home/Home";
// import About from "./components/About/About";
// import Terms from "./components/About/Terms";
// import Privacy from "./components/About/Privacy";
// import Contact from "./components/About/Contact";
// import FAQ from "./components/About/FAQ";
import Books from "./components/Organisms/Books/Books";
import SingleBook from "./components/Organisms/SingleBook/SingleBook";
// import SingleChapter from "./components/SingleChapter";
// import Account from "./components/Account";
import Practice from "./components/Organisms/Practice/Practice";
// import Membership from "./components/Membership";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/about" component={About} />
    <Route path="/about/terms" component={Terms} />
    <Route path="/about/privacy" component={Privacy} />
    <Route path="/about/contact" component={Contact} />
    <Route path="/about/FAQ" component={FAQ} /> */}
    <Route path="/books" component={Books} />
    <Route exact distinct path="/book/:book/" component={SingleBook} />
    {/* <Route
      exact
      distinct
      path="/book/:book/:chapter/"
      component={SingleChapter}
    /> */}
    <Route
      exact
      distinct
      path="/practice/:book/:chapter/:section"
      component={Practice}
    />
    {/* <Route path="/memberships" component={Membership} />
    <Route path="/account" component={Account} /> */}
  </Switch>
);
