import React, { useEffect, useState } from 'react'
import './articles.css'
import logo from '../../assets/logo.png'
import { ScrollPanel } from 'primereact/scrollpanel'
import { ScrollTop } from 'primereact/scrolltop'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Dropdown } from 'primereact/dropdown'

const Articles = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState([]) // Φορτωση των articles σε εναν πινακα
  const [categories, setCategories] = useState([]) // Φορτωση κατηγοριων σε εναν πινακα
  const [category, setCategory] = useState(null)

  // Καυε φορα που αλλαζει ο χρηστης το πεδιο κατηγοριας θα αλλαζουν και τα αρθρα
  const onCategoryChange = (e) => {
    setCategory(e.value)
    getspecificArticles(e.value)
  }

  // Συναρτηση που θα εμφανιζει μονο ενα μερος του content
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string
  }

  useEffect(() => {
    getCategories()
    getspecificArticles()
  }, [])

  // Συναρτηση που θα επιστρεφει τις κατηγοριες
  const getCategories = async () => {
    setIsLoading(true)
    const response = await axios.get(
      'https://dataverse-backend-ui7oe775ka-ew.a.run.app/categories',
    )
    if (response.status === 200) {
      setCategories(response.data)
      setIsLoading(false)
    }
  }

  // Συναρτηση που θα επιστρεφει συγκεκριμενα αρθρα και σε περιπτωση που δεν υπαρχει καποιο αρθρο με
  // την συγκεκριμενη κατηγορια τοτε θετουμε setArticles με κενο πινακα
  const getspecificArticles = async (e) => {
    setIsLoading(true)
    console.log('category', e)
    if (e == undefined) {
      const response = await axios.post(
        'https://dataverse-backend-ui7oe775ka-ew.a.run.app/articles/specificArticles',
        {
          category: '',
        },
      )
      if (response.status === 200) {
        setArticles(response.data)
        setIsLoading(false)
      }
    } else {
      const response = await axios.post(
        'https://dataverse-backend-ui7oe775ka-ew.a.run.app/articles/specificArticles',
        {
          category: e.name,
        },
      )
      if (response.status === 200) {
        setArticles(response.data)
        setIsLoading(false)
      } else if (response.status === 201) {
        setArticles([])
        setIsLoading(false)
      }
    }
  }

  // const getArticles = async () => {
  //   setIsLoading(true)
  //   const response = await axios.get('http://localhost:5000/articles')
  //   if (response.status === 200) {
  //     setArticles(response.data)
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="articles">
      <ScrollTop />
      <Dropdown
        value={category}
        options={categories}
        onChange={onCategoryChange}
        optionLabel="name"
        placeholder="Select Category"
      />
      {articles ? ( // Αν υπαρχει εστω και ενα αρθρο εμφανισε το αλλιως μην εμφανισεις τιποτα
        <ScrollPanel style={{ width: '100%', height: '100%' }}>
          {articles.map((article) => (
            <div className="article-container">
              <article className="article-card">
                <div className="img-box">
                  <img src={logo} alt="" className="article-banner" />
                </div>

                <div className="article-content">
                  <a href="#">
                    <h3
                      className="article-title"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`article/${article._id}`)
                      }}
                    >
                      {article.title}
                    </h3>
                  </a>
                  <p className="article-text">
                    {truncate(article?.content, 150)}
                  </p>
                  <p className="article-desc">{truncate(article?.description, 100)}</p>
                  <p className="article-category">
                    Category: {article.category.name}
                  </p>
                </div>
              </article>
            </div>
          ))}
          <ScrollTop
            target="parent"
            threshold={100}
            className="custom-scrolltop"
            icon="pi pi-arrow-up"
          />
        </ScrollPanel>
      ) : (
        <h1>No Article Found</h1>
      )}
    </div>
  )
}

export default Articles
