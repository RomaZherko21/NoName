import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material'

import { BookModel } from 'pages/Book/model'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'

const BookDescription = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  useEffect(() => {
    BookModel.fetchStats()
  }, [BookModel.id])

  const percentage = 30

  return (
    <Card>
      <CardHeader subheader={BookModel.description} title={BookModel.name} />
      <Divider />
      <CardContent>
        <Typography color="textPrimary" variant="h5">
          {t('sentence:notFound.title')}
        </Typography>
        <div style={{ width: '80px', height: '80px' }}>
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              pathColor: theme.palette.success.dark,
              trailColor: theme.palette.background.default,
            })}
          >
            <Typography color="primaryText" variant="body1">
              {`${percentage}`}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Books left
            </Typography>
          </CircularProgressbarWithChildren>
        </div>
      </CardContent>
    </Card>
  )
}

export default observer(BookDescription)
