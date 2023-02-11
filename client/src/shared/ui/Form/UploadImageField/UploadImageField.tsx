import { useRef } from 'react'
import { useFormikContext } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Box, Avatar, IconButton, Typography, SxProps, Theme } from '@mui/material'

import { TfiGallery } from 'react-icons/tfi'
import { BsCamera } from 'react-icons/bs'

import s from './Styles.module.scss'

interface Props {
  field: string
  imageUrl?: string
  imgSx?: SxProps<Theme>
}

function UploadImageField({ field, imageUrl = '', imgSx }: Props) {
  const { t } = useTranslation()
  const inputRef = useRef<any>()
  const { touched, values, errors, setFieldValue } = useFormikContext<any>()

  const hasError = touched[field] && errors[field]

  function handleClick() {
    inputRef.current?.click()
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
        <Box
          sx={{
            border: ({ palette }) =>
              `1px dashed ${hasError ? palette.error.main : palette.divider}`,
            borderWidth: 1,
            borderRadius: '50%',
            p: 0.5,
          }}
          onClick={handleClick}
          className={s.image}
        >
          <Avatar
            style={{ cursor: 'pointer' }}
            alt="Upload"
            src={values[field] ? URL.createObjectURL(values[field]) : imageUrl}
            sx={{ width: 100, height: 100, ...imgSx }}
            className={s.imageHover}
          >
            <IconButton
              sx={{
                color: ({ palette }) => palette.text.primary,
              }}
              size="large"
            >
              <TfiGallery />
            </IconButton>
          </Avatar>

          <Box className={s.cameraIcon}>
            <BsCamera />
            <Typography variant="subtitle2">{t('actions.select')}</Typography>
          </Box>
        </Box>

        <Button
          onClick={handleClick}
          sx={{
            color: ({ palette }) => (hasError ? palette.error.main : palette.text.secondary),
          }}
        >
          {hasError ? errors[field] : t('actions.change')}
        </Button>
      </Box>

      <input
        ref={inputRef}
        id="upload-file"
        name={field}
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue(field, e.target.files?.[0])
        }
        style={{ display: 'none' }}
      />
    </>
  )
}

export default observer(UploadImageField)
