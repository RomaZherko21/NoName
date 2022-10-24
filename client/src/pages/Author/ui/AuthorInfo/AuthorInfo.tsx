import { observer } from 'mobx-react-lite'
import { Box, Card, CardContent, Typography } from '@mui/material'

import { Spinner, UploadImage } from 'shared/ui'

import { AuthorModel } from '../../model'

const AuthorInfo = () => {
  // const handleUploadClick = async (event: any) => {
  //   await user.uploadPhoto(event.target.files[0])
  // }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {AuthorModel.loading.has ? (
            <Spinner />
          ) : (
            <UploadImage handleUploadClick={() => {}} imageUrl="" />
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
