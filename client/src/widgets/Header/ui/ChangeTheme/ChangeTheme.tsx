import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { IconButton } from '@mui/material'
import { toggleThemeContext } from 'app/theme'
import { MdOutlineWbSunny } from 'react-icons/md'
import { HiOutlineMoon } from 'react-icons/hi'

function ChangeTheme() {
  const { toggleTheme, isDefaultTheme } = useContext(toggleThemeContext)

  return (
    <IconButton onClick={toggleTheme}>
      {isDefaultTheme ? <HiOutlineMoon /> : <MdOutlineWbSunny />}
    </IconButton>
  )
}

export default observer(ChangeTheme)
