import { observer } from 'mobx-react-lite'
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material'

import { InformativeImage } from 'shared/ui'

const PostCardSceleton = () => {
  return (
    <Card sx={{ height: 470 }}>
      <Skeleton variant="rectangular" height={220} />

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <>
            <Skeleton width={100} height={20} variant="rounded" />
            <Skeleton width={40} height={20} variant="rounded" />
          </>
        </Box>

        <Typography variant="h5">
          <Skeleton variant="rounded" />
        </Typography>

        <Typography variant="body1" mt={1}>
          <Skeleton height={65} variant="rounded" />
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <InformativeImage imgUrl="" PrimaryText="" isLoaded={false} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            <Skeleton width={22} height={22} variant="circular" />

            <Typography variant="body2">
              <Skeleton width={20} />
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default observer(PostCardSceleton)
