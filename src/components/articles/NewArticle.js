import React, { useEffect, useRef, useState } from 'react'
import './new_article.css'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'


const NewArticle = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')

  const toast = useRef(null) // Reference ποτε να εμφανιστει το popup
  const navigate = useNavigate()

  const onCategoryChange = (e) => {
    setCategory(e.value)
  }


  useEffect(() => {
    getCategories()
  }, [])
  

  const getCategories = async () => {
    const response = await axios.get(
      'https://dataverse-server-ui7oe775ka-ew.a.run.app/categories',
    )
    if (response.status === 200) {
      setCategories(response.data)
    }
  }

  /**
   * Συναρτηση createArticle και αναλογα αν ο χρηστης κανει εισαγωγη description η οχι κανει post
   * request και θετει στον σερβερ ως default null σε περιπτωση που δεν βαλει περιγραφη
   */
  const createArticle = async (e) => {
    e.preventDefault()
    if (title != '' && content != '' && category.name != null) {
      const response = await axios.post(
        'https://dataverse-server-ui7oe775ka-ew.a.run.app/articles/newArticle',
        {
          title: title,
          content: content,
          description: description,
          category: category.name,
        },
      )
      if (response.status === 200) {
        toast.current.show({
          severity: 'success',
          summary: 'Success Message',
          detail: response.data,
          life: 2000,
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
      if (response.status === 400) {
        toast.current.show({
          severity: 'error',
          summary: 'Warn Message',
          detail: response.data,
          life: 2000,
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    }
  }

  return (
    <div className="newArticle">
      <div className="newArticle-container">
        <Toast ref={toast} position="top-center" />
        <h1>New Article</h1>

        <div className="title">
          <span className="p-float-label">
            <InputText
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="title">Username</label>
          </span>
        </div>
        <div className="content">
          <span className="p-float-label">
            <InputTextarea
              rows={7}
              onChange={(e) => setContent(e.target.value)}
            />
            <label htmlFor="content">Content</label>
          </span>
        </div>
        <div className="title">
          <span className="p-float-label">
            <InputText
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="description">Description</label>
          </span>
        </div>
        <div className="category">
          <Dropdown
            value={category}
            options={categories}
            onChange={onCategoryChange}
            optionLabel="name"
            placeholder="Select Category"
          />
          <div className="newArticle-buttons">
            <Button
              onClick={createArticle}
              label="Create"
              icon="pi pi-plus-circle"
              className="p-button-rounded p-button-success"
            />
            <Button
              onClick={(e) => {
                e.preventDefault()
                navigate('/')
              }}
              label="Cancel"
              icon="pi pi-times"
              className="p-button-rounded p-button-danger"
              aria-label="Cancel"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewArticle
