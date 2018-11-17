import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './Store/configureStore';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGraduationCap, faBuilding, faLock, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

library.add(faGraduationCap, faBuilding, faLock, faSignInAlt, faUserPlus);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
