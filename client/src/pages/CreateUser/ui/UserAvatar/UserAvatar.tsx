import { useRef } from 'react'
import { useFormikContext } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Stack, Box } from '@mui/material'

import { UploadImage } from 'shared/ui'

function UserAvatar() {
  const { t } = useTranslation()
  const inputRef = useRef<any>()
  const { values, setFieldValue } = useFormikContext<any>()

  return (
    <Stack sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            borderStyle: 'dashed',
            borderWidth: 1,
            borderRadius: '50%',
            p: 0.5,
          }}
        >
          <UploadImage
            width={80}
            height={80}
            handleUploadClick={(event) => setFieldValue('avatar', event.target.files[0])}
            imageUrl={values.avatar ? URL.createObjectURL(values.avatar) : ''}
          />
        </Box>
        <input
          ref={inputRef}
          id="upload-file"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={(event) => setFieldValue('avatar', event.target.files![0])}
          style={{ display: 'none' }}
        />
        <Button
          onClick={() => inputRef.current?.click()}
          variant="text"
          sx={{ color: (theme) => theme.palette.primary.contrastText }}
        >
          {t('actions.change')}
        </Button>
      </Box>
    </Stack>
  )
}

export default observer(UserAvatar)
