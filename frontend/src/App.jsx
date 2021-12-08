import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import * as ROUTES from './Routes';
import NavBar from './Components/NavBar';
import './App.css';
import StoreProvider from './Global';

function App () {
  return (
    <StoreProvider props={
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to={ROUTES.HOME} />
          </Route>
          <Route path={ROUTES.HOME} component={ROUTES.Home}/>
          <Route path={ROUTES.AUTH} component={ROUTES.Auth}/>
          <Route path={ROUTES.REGISTER} component={ROUTES.Register}/>
          <Route path={ROUTES.SEARCH} component={ROUTES.SearchResult}/>
          <Route path={ROUTES.MANAGELISTING} component={ROUTES.ManageListing}/>
          <Route path={ROUTES.NEWLISTING} component={ROUTES.NewListing}/>
          <Route path={ROUTES.LISTINGPROFILE} component={ROUTES.ListingProfile}/>
          <Route path={ROUTES.VIEWLISTINGPROFILE} component={ROUTES.ViewListingProfile}/>
          <Route path={ROUTES.BOOKINGHISTORY} component={ROUTES.BookingHistory}/>
        </Switch>
      </Router>}
    />

  );
}

export default App;
