import React, { useEffect, useState } from 'react'
import { Button, List, ListItem, TextField } from '@mui/material'

interface Country {
  name: { common: string }
}


function CountrysSelect() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [hiddenInputValue, setHiddenInputValue] = useState('')
  const [countryList, setCountryList] = useState<Country[]>([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data: Country[]) => {
        setCountryList(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSelectWrapperClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectWrapper = e.currentTarget
    const openList = selectWrapper.nextElementSibling
    const hiddenInput = openList?.nextElementSibling
    const openItems = openList?.querySelectorAll('.form-item')

    if (openList) {
      openList.classList.toggle('open')

      if (e.target !== selectWrapper) {
        openList.classList.remove('open')
      }
    }

    openItems?.forEach((item) => {
      item.addEventListener('click', function () {
        if (selectWrapper) {
          selectWrapper.innerText = selectWrapper.innerText
        }
        if (openList) {
          openList.classList.remove('open')
        }
        // if (hiddenInput) {
        //   hiddenInput.value = hiddenInput.dataset.value || ''
        // }
      })
    })
  }

  return (
    <div>
      <Button
        variant="contained"
        className={`select-btn ${isOpen ? 'open' : ''}`}
        onClick={handleSelectWrapperClick}
      >
        {selectedItem}
      </Button>
      <List className={`form-list country ${isOpen ? 'open' : ''}`}>
        {countryList.map((country) => (
          <ListItem
            key={country.name.common}
            button
            data-value={country.name.common}
            // onClick={(e) => handleSelectWrapperClick(e)}
          >
            {country.name.common}
          </ListItem>
        ))}
      </List>
      <TextField type="hidden" value={hiddenInputValue} />
    </div>
  )
}
export default CountrysSelect