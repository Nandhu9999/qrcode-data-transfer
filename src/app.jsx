import React, { useState, useEffect } from "react";
import { Router, Link } from "wouter";

import Dashboard from "./pages/dashboard.jsx";

// Home function that is reflected across the site
export default function Home() {
  return (
    <Dashboard />
  );
}
