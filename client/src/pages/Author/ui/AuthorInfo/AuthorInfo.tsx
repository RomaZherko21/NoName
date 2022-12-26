import { observer } from 'mobx-react-lite'
import { Box, Card, CardContent, Typography } from '@mui/material'

import { Spinner, UploadImage } from 'shared/ui'

import { AuthorModel } from '../../model'
import { GO_API_AUTHOR_IMAGES_URL } from 'shared/consts'

const AuthorInfo = () => {
  // const handleUploadClick = async (event: any) => {
  //   await user.uploadPhoto(event.target.files[0])
  // }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {AuthorModel.loading.has ? (
            <Spinner />
          ) : (
            <UploadImage
              handleUploadClick={() => {}}
              imageUrl={`${GO_API_AUTHOR_IMAGES_URL}/${AuthorModel.id}.jpg`}
            />
          )}
          <Typography color="textPrimary" gutterBottom textAlign="center" variant="h5">
            {AuthorModel.name} {AuthorModel.surname}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {AuthorModel.date_of_birth} - {AuthorModel.date_of_death}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {AuthorModel.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(AuthorInfo)
