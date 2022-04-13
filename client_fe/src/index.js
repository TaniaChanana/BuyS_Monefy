import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './components/banker/reportWebVitals';
import { StateProvider } from './components/banker/StateProvider';
import reducer,{initialState} from './components/banker/reducer'

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </React.StrictMode>
 ,   
  document.getElementById('root')
);
 reportWebVitals();
