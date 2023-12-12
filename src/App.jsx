import React from "react"
import "./fontello/css/linkshortener.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import './App.scss'
import LinkShortener from "./components/LinkShortener"

function App() {

  return (
    <div className="app">
      <div className="link-shortener-app">
        <Header />
        <LinkShortener />
        <Footer />
      </div>
    </div>
  )
}

export default App
