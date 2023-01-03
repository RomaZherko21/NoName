import { useState, useRef } from 'react'
import {
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Box,
  Tooltip,
  InputAdornment,
  Select,
  Button,
  MenuItem,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { observer } from 'mobx-react-lite'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'

import selectFile from 'assets/svg/selectFiles.svg'

import { genres } from './model'

function NewBook() {
  const hiddenFileInput = useRef<any>(null)
  const [image, setImage] = useState<any>(null)
  const [quillValue, setQuillValue] = useState('')
  const [selectGenres, setSelectGenres] = useState<any>([])

  function handleChange(event: SelectChangeEvent<typeof selectGenres>) {
    const {
      target: { value },
    } = event
    setSelectGenres(typeof value === 'string' ? value.split(',') : value)
  }

  function handleUploadFile(event: any) {
    console.log(event.target.files[0])
    setImage(event.target.files[0])
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        New book
      </Typography>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Grid container sx={{ p: 4, pb: 8 }}>
          <Grid item md={4}>
            <Typography variant="h6">Basic details</Typography>
          </Grid>
          <Grid item md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField fullWidth type="email" label="Name of the book" sx={{ mb: 3 }} />
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Description
            </Typography>
            <ReactQuill
              theme="snow"
              value={quillValue}
              onChange={setQuillValue}
              style={{ height: 400, borderRadius: '8px' }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Grid container sx={{ p: 4 }}>
          <Grid item md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Images
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Images will appear in the store front of your website.
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
                  Select file
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Drop file browse thorough your machine
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
                    Remove
                  </Button>
                  <Button variant="contained">Upload</Button>
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
              Author
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Enter the name of the author of the book
            </Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              fullWidth
              type="text"
              size="medium"
              label="Author"
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
              Genres
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Select book genres
            </Typography>
          </Grid>
          <Grid item md={8}>
            <Select multiple value={selectGenres} onChange={handleChange} size="medium" fullWidth>
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default observer(NewBook)
