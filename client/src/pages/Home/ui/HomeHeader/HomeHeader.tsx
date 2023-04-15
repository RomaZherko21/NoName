import { MdKeyboardArrowDown } from 'react-icons/md'
import { useTranslation } from 'react-i18next'

import { AppBar, Box, Button, Toolbar } from '@mui/material'

import logo from 'shared/assets/images/logo/white-transparent-logo.svg'

function HomeHeader() {
  const { t } = useTranslation()
  return (
    <AppBar
      sx={{
        backgroundColor: 'background.homeHeader',
        left: 0,
        right: 0,
        ml: 'auto',
        mr: 'auto',
        width: '80%',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderRadius: 1.5,
        mt: 2
      }}
      position="fixed"
    >
      <Toolbar
        disableGutters
        sx={{ px: 2, py: 0, justifyContent: 'space-between', alignItems: 'center' }}
      >
        <img
          alt="NoName logo"
          src={logo}
          style={{
            width: 90
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button color="inherit"> {t('home:components')}</Button>
          <Button color="inherit" endIcon={<MdKeyboardArrowDown />}>
            {t('home:pages')}
          </Button>
          <Button color="inherit">{t('home:docs')}</Button>
        </Box>

        <Button variant="contained">{t('home:purchaseNow')}</Button>
      </Toolbar>
    </AppBar>
  )
}
export default HomeHeader
