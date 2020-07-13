import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { AuthContextProvider } from "./contexts/authContext"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
