import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import NewArticle from './components/articles/NewArticle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Article from './components/articles/Article'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes> // Εδω λεμε στο συστημα σε ποια λινκ μπορει να παει και τι Component θα κανει render καθε φορα
          <Route exact path="/" element={<Home />} />
          <Route exact path="/article/:id"  element={<Article  />} />
          <Route exact path="/createArticle" element={<NewArticle  />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
