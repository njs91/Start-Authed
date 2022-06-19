import React, { StrictMode } from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

Modal.setAppElement('#root');

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
