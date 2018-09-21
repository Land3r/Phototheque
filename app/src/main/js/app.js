import React from 'react';
import { Route } from 'react-router-dom';
import { DefaultLayout } from './layouts';

// Application Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../res/scss/style.css';


const App = () => (
  <div>
    <Route path="/" name="Home" component={DefaultLayout} />
  </div>
);

export default App;
