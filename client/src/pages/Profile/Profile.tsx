import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import { useRootStore } from 'stores/Root'

const Profile = () => {
  const { user } = useRootStore()
  const { t } = useTranslation()

  const [language, setLanguage] = useState('en')

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 146, height: 146 }}
          />
        </Grid>
        <Grid item>
          <List>
            <ListItem disablePadding>
              <ListItemText primary={t('user:name')} secondary={user.name} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary={t('user:surname')}
                secondary={user.surname}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={t('user:email')} secondary={user.email} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={t('user:role')} secondary={user.role} />
            </ListItem>
          </List>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t('common.language')}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label={t('common.language')}
              onChange={(event: SelectChangeEvent) => {
                i18next.changeLanguage(event.target.value as string)
                setLanguage(event.target.value as string)
              }}
            >
              <MenuItem value="en">{t('common.english')}</MenuItem>
              <MenuItem value="ru">{t('common.russian')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Profile
