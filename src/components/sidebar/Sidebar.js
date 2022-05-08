import React, { useEffect, useRef, useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import './sidebar.css'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Toast } from 'primereact/toast'

const Sidebar = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const toast = useRef(null)

  const [selectedCategories, setSelectedCategories] = useState(
    categories.slice(0, 0),
  )

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    setIsLoading(true)
    const response = await axios.get('https://dataverse-backend-ui7oe775ka-ew.a.run.app/categories')
    if (response.status === 200) {
      setCategories(response.data)
      setIsLoading(false)
    }
  }

  // Προσθηκη νεας κατηγοριας στον σερβερ σε περιπτωση που δεν υπαρχει

  const addNewCategory = async (e) => {
    e.preventDefault()
    if (inputValue != '') {
      const response = await axios.post('https://dataverse-backend-ui7oe775ka-ew.a.run.app/categories', {
        name: inputValue,
      })
      if (response.status === 200) {
        getCategories()
        setInputValue('')
        toast.current.show({
          severity: 'success',
          summary: 'Success Message',
          detail: response.data,
          life: 3000,
        })
      }
      if (response.status === 201) {
        // getCategories()
        setInputValue('')
        toast.current.show({
          severity: 'error',
          summary: 'Warn Message',
          detail: response.data,
          life: 3000,
        })
      }
    }
  }

  // Διαγραφη κατηγοριας αν υπαρχει στον σερβερ

  const deleteCategory = async (e) => {
    e.preventDefault()
    if (inputValue != '') {
      console.log(inputValue)
      const response = await axios.delete('https://dataverse-backend-ui7oe775ka-ew.a.run.app/categories', {
        data: {
          name: inputValue,
        },
      })
      console.log(response.status)
      if (response.status === 200) {
        getCategories()
        setInputValue('')
        toast.current.show({
          severity: 'success',
          summary: 'Success Message',
          detail: response.data,
          life: 3000,
        })
      }
      if (response.status === 201 || response.status === 202) {
        // getCategories()
        setInputValue('')
        toast.current.show({
          severity: 'error',
          summary: 'Warn Message',
          detail: response.data,
          life: 3000,
        })
      }
    }
  }

  // Προσθηκη στον πινακα τις κατηγοριες που εχουμε κανει check
  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories]

    if (e.checked) {
      _selectedCategories.push(e.value)
    } else {
      for (let i = 0; i < _selectedCategories.length; i++) {
        const selectedCategory = _selectedCategories[i]

        if (selectedCategory.key === e.value.key) {
          _selectedCategories.splice(i, 1)
          break
        }
      }
    }

    setSelectedCategories(_selectedCategories)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-card">
        <h5>Category</h5>
        <ScrollPanel
          style={{ width: '100%', height: '200px' }}
          className="custombar1"
        >
          {!isLoading ? (
            categories.map((category) => (
              <div key={category._id} className="field-checkbox">
                <Checkbox
                  inputId={category._id}
                  name="category"
                  value={category}
                  onChange={onCategoryChange}
                  checked={selectedCategories.some(
                    (item) => item._id === category._id,
                  )}
                />
                <label htmlFor={category._id}>{category.name}</label>
              </div>
            ))
          ) : (
            <h3>Loading</h3>
          )}
        </ScrollPanel>
      </div>

      <div className="sidebar-fields">
        <InputText
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="sidebar-buttons">
          <Toast ref={toast} position="top-center" />
          <Button
            onClick={addNewCategory}
            label="Add"
            icon="pi pi-plus-circle"
            className="p-button-rounded p-button-success"
          />
          <Button
            onClick={deleteCategory}
            label="Delete"
            icon="pi pi-times"
            className="p-button-rounded p-button-danger"
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
