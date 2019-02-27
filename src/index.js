import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './Store/configureStore';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGraduationCap, faBuilding, faLock, faSignInAlt, faUserPlus, faUser, fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.slim.min.js";
import registerServiceWorker from './registerServiceWorker';

//const store = configureStore();

library.add(fab, fas, faGraduationCap, faBuilding, faLock, faSignInAlt, faUserPlus, faUser);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
