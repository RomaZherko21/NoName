import { useState, useRef, useEffect } from 'react'
import {
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Box,
  Tooltip,
  InputAdornment,
  Button,
  Select,
  MenuItem,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'
import DateRangeIcon from '@mui/icons-material/DateRange'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'

import selectFile from 'assets/svg/selectFiles.svg'
import { Genre } from 'shared/types'

import { NewBookModel } from './model'

function NewBook() {
  const { t } = useTranslation()
  const hiddenFileInput = useRef<any>(null)
  const [image, setImage] = useState<any>(null)
  const [selectGenres, setSelectGenres] = useState<any>([])

  useEffect(() => {
    NewBookModel.fetchGenres()
  }, [])

  function handleChange(event: SelectChangeEvent<typeof selectGenres>) {
    const {
      target: { value },
    } = event
    setSelectGenres(typeof value === 'string' ? value.split(',') : value)
  }

  function handleUploadFile(event: any) {
    setImage(event.target.files[0])
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('page:newBook')}
      </Typography>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Grid container sx={{ p: 4, pb: 8 }}>
          <Grid item md={4}>
            <Typography variant="h6">{t('user:basicDetails')}</Typography>
          </Grid>
          <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField fullWidth type="email" label={t('book:nameOfTheBook')} sx={{ mb: 3 }} />
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              {t('book:description')}
            </Typography>
            <ReactQuill
              theme="snow"
              value={NewBookModel.description}
              onChange={(e: any) => NewBookModel.changeDescription(e.target.value)}
              style={{ height: 400, borderRadius: '8px' }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('book:images')}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {t('book:imagesOnTheWebsite')}
            </Typography>
          </Grid>
          <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                p: 4,
                border: '1px dashed #2d3748',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => hiddenFileInput.current.click()}
            >
              <input
                id="upload-file"
                name="avatar"
                type="file"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={handleUploadFile}
                style={{ display: 'none' }}
              />
              <Box>
                <img alt="Select file" src={selectFile} style={{ height: 100, width: 100 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {t('book:actions.selectFile')}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {t('book:actions.selectiveHint')}
                </Typography>
              </Box>
            </Box>
            {image && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    border: '1px solid #2d3748',
                    borderRadius: '8px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    mt: 2,
                    mb: 3,
                  }}
                >
                  <Box display="flex" gap="8px">
                    <Box display="flex" alignItems="center">
                      <ContentCopyIcon fontSize="small" color="action" />
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <Typography variant="subtitle2">{image.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {image.size} KB
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Tooltip title="Remove" placement="bottom">
                      <Button onClick={() => setImage(null)}>
                        <ClearIcon fontSize="medium" color="action" />
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="flex-end" gap="10px">
                  <Button variant="text" onClick={() => setImage(null)}>
                    {t('book:actions.remove')}
                  </Button>
                  <Button variant="contained">{t('book:actions.upload')}</Button>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('book:author')}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {t('book:actions.authorHint')}
            </Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              fullWidth
              type="text"
              size="medium"
              label={t('book:author')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('book:genres')}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {t('book:actions.genresHint')}
            </Typography>
          </Grid>
          <Grid item md={8}>
            <Select multiple value={selectGenres} onChange={handleChange} size="medium" fullWidth>
              {NewBookModel.genres &&
                NewBookModel.genres.map((genre: Genre) => (
                  <MenuItem key={genre.id} value={genre.name}>
                    {genre.name}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('book:year')}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {t('book:actions.yearHint')}
            </Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              fullWidth
              type="number"
              size="medium"
              label={t('book:year')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('book:quantity')}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {t('book:actions.quantityHint')}
            </Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              fullWidth
              type="number"
              size="medium"
              label={t('book:quantity')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ProductionQuantityLimitsIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Button variant="text" color="error">
            {t('translation:actions.delete')}
          </Button>
        </Box>
        <Box display="flex" gap="10px">
          <Button variant="outlined">{t('user:actions.cancel')}</Button>
          <Button variant="contained">{t('book:actions.create')}</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default observer(NewBook)
