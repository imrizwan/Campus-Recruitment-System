import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './Store/configureStore';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGraduationCap, faBuilding, faLock, faSignInAlt, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import registerServiceWorker from './registerServiceWorker';

//const store = configureStore();

library.add(faGraduationCap, faBuilding, faLock, faSignInAlt, faUserPlus, faUser);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
