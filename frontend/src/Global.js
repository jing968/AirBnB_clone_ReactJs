import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const GlobalVars = React.createContext(null);

const StoreProvider = ({ props }) => {
  const [authToken, setAuthToken] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(false);
  const [views, setViews] = useState(false);

  const global = {
    authtoken: [authToken, setAuthToken],
    email: [email, setEmail],
    navProfile: [profile, setProfile],
    navViews: [views, setViews]
  }

  return <GlobalVars.Provider value={global}>{props}</GlobalVars.Provider>
}

StoreProvider.propTypes = {
  props: PropTypes.node
};

export default StoreProvider;
