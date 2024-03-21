import React from 'react';
import { createRoot } from 'react-dom/client';
//Import the routes 
import App from './routes/App';
//Import CSS
import './styles/global.css';
//Import Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

//ReactDOM.render(<App />, document.getElementById('app'))