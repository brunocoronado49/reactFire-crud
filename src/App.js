import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WebsiteList from "./components/WebsiteList";
import WebsiteForm from "./components/WebsiteForm";
import Layout from "./components/Layout";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<WebsiteList/>}/>
          <Route path="/create-website" element={<WebsiteForm/>}/>
          <Route path="/edit-website/:id" element={<WebsiteForm/>}/>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
