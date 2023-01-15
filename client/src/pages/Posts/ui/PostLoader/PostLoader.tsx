import React from 'react'
import { Grid, Skeleton, CardHeader, Card, CardContent } from '@mui/material'

function PostLoader({ key }: { key?: number }) {
  return (
    <Grid key={key} item md={4} lg={3} sx={{ width: '100%' }}>
      <Card>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
          title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PostLoader
