import React from 'react';
import './App.css';
import Fetch from './components/Fetch';
require('dotenv').config();

const url = ``;

const App = () => (
  <div>
    <Fetch url={url} />
  </div>
);
export default App;
