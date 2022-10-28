import { observer } from 'mobx-react-lite'
import { Box, Card, CardContent, Typography } from '@mui/material'

import { SubscriberModel } from '../../model'

const AuthorInfo = () => {
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
          <Typography color="textPrimary" gutterBottom textAlign="center" variant="h5">
            {SubscriberModel.name} {SubscriberModel.surname}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {SubscriberModel.date_of_birth}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(AuthorInfo)
