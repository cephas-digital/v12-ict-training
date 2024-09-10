import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import PageRender from "./PageRender";
import Home from "./screens/home";

const Routers = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:id" element={<PageRender />} />
        <Route path="/:page/:id/:step" element={<PageRender />} />
      </Routes>
    </div>
  );
};

export default Routers;
