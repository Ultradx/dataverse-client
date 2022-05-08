import React, { useEffect, useRef, useState } from 'react'
import './new_article.css'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Article = () => {
  /**
   * States που χρειαζομασται για να εμφανιζουμε τις τιμες στα πεδια
   */
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useRef(null)
  const navigate = useNavigate()
  const { id } = useParams() // Παραμετρος Id 

  // Συναρτηση που μας επιτρεπει να κανουμε get request στον server
  const getArticle = async () => {
    const response = await axios.get(
      `https://dataverse-backend-ui7oe775ka-ew.a.run.app/articles/${id}`,
    )
    if (response.status === 200) {
      setTitle(response.data.title)
      setContent(response.data.content)
      setDescription(response.data.description)
    }
  }

  // Συναρτηση που μας επιτρεπει να διαγραψουμε το συγκεκριμενο article και στην συνεχεια αναλογα με το response εμφανιζουμε ενα popup
  const deleteArticle = async (e) => {
    e.preventDefault()
    const response = await axios.delete(
      `https://dataverse-backend-ui7oe775ka-ew.a.run.app/articles/deleteArticle/${id}`,
    )
    if (response.status === 200) {
      toast.current.show({
        severity: 'success',
        summary: 'Success Message',
        detail: response.data,
        life: 1000,
      })
      setTimeout(() => {
        navigate(`/`)
      }, 1000)
    }
    if (response.status === 400) {
      toast.current.show({
        severity: 'error',
        summary: 'Warn Message',
        detail: response.data,
        life: 2000,
      })
      setTimeout(() => {
        navigate(`/`)
      }, 2000)
    }
  }

  /**
   * Συναρτηση update παιρνει τις παραμετρους id και content και οταν επιστρεψει response εμφανιζει popup 
   */
  const updateArticle = async (e) => {
    e.preventDefault()
    if (title != '' && content != '') {
      const response = await axios.post(
        'https://dataverse-backend-ui7oe775ka-ew.a.run.app/articles/editArticle',
        {
          id: id,
          content: content,
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
          navigate(`/article/${id}`)
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
          navigate(`/article/${id}`)
        }, 2000)
      }
    }
  }

  
  useEffect(() => {
    setIsLoading(true)
    getArticle()
    setIsLoading(false)
  }, [])

  return (
    <div className="newArticle">
      {!isLoading ? (
        <div className="newArticle-container">
          <Toast ref={toast} position="top-center" />
          <h1>New Article</h1>
          <div className="title">
            <span className="p-float-label">
              <InputText id="title" value={title} disabled />
              <label htmlFor="title">Title</label>
            </span>
          </div>
          <div className="content">
            <span className="p-float-label">
              <InputTextarea
                rows={7}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <label htmlFor="content">Content</label>
            </span>
          </div>
          <div className="title">
            <span className="p-float-label">
              <InputText id="description" value={description} disabled />
              <label htmlFor="description">Description</label>
            </span>
          </div>
          <div className="category">
            <div className="newArticle-buttons">
              <span className="p-buttonset">
                <Button
                  onClick={updateArticle}
                  label="Update"
                  icon="pi pi-check"
                  className="p-button-rounded"
                />
                <Button
                  onClick={deleteArticle}
                  label="Delete"
                  icon="pi pi-trash"
                  className="p-button-rounded"
                  aria-label="Delete"
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/')
                  }}
                  label="Cancel"
                  icon="pi pi-times"
                  className="p-button-rounded"
                  aria-label="Cancel"
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  )
}

export default Article
