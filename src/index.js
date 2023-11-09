// import { App } from 'components/App';
import AppWithMemoExample from 'components/AppWithMemoExample';
import { ModalContextProvider } from 'context/ModalContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ModalContextProvider>
    <AppWithMemoExample />
  </ModalContextProvider>
);
