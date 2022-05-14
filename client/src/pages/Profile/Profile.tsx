import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { observer } from 'mobx-react-lite'
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
import EditIcon from '@mui/icons-material/Edit'

import { useRootStore } from 'stores/Root'
import Spinner from 'components/Spinner/Spinner'

import styles from './Styles.module.scss'

const Profile = () => {
  const { user, loading } = useRootStore()
  const { t } = useTranslation()

  const [language, setLanguage] = useState('en')

  const handleUploadClick = async (event: any) => {
    await user.uploadPhoto(event.target.files[0])
  }

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item>
          {loading.has ? (
            <Spinner />
          ) : (
            <label htmlFor="upload-file">
              <input
                id="upload-file"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleUploadClick}
                style={{ display: 'none' }}
              />
              <div className={styles.avatar}>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  alt="Upload"
                  src={user.getPhotoUrl()}
                  sx={{ width: 100, height: 100 }}
                />
                <EditIcon className={styles.editIcon} />
              </div>
            </label>
          )}
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

export default observer(Profile)
