import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { IconButton } from '@mui/material'
import { toggleThemeContext } from 'app/theme'
import { MdOutlineWbSunny } from 'react-icons/md'
import { HiOutlineMoon } from 'react-icons/hi'

function ChangeTheme() {
  const toggleTheme = useContext(toggleThemeContext)
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    const prevTheme = localStorage.getItem('theme.isDefault')
    setTheme(Boolean(prevTheme))
  }, [])

  function toggle() {
    toggleTheme()
    setTheme(!theme)
  }

  return (
    <IconButton onClick={toggle}>{theme ? <MdOutlineWbSunny /> : <HiOutlineMoon />}</IconButton>
  )
}

export default observer(ChangeTheme)
