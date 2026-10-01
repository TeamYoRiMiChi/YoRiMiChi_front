import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureAuthentication } from './config/cognito';
import { initializeAuthMode } from './config/authMode';
import { store } from './app/store';
import App from './App';
import './index.css';


try {
await initializeAuthMode();
configureAuthentication();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
} catch (error) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <div role="alert">
      <p>サーバーに接続できません。起動状態を確認して再読み込みしてください。</p>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>再読み込み</button>
    </div>,
  );
}
