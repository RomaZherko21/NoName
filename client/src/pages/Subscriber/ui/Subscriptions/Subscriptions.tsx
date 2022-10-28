import { useMemo } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Card } from '@mui/material'

import { CommonTable } from 'shared/ui'

import { SubscriberModel } from '../../model'
import { getColumns } from './columns'

const Subscriptions = () => {
  const columns = useMemo(() => getColumns(), [getColumns])

  return (
    <Card>
      {/* <CardContent>
        <Box>
          <Typography color="textSecondary">{t('book:authorsBooks')}:</Typography>
          <List>
            {SubscriberModel.subscriptions.map((item) => (
              <ListItem
                button
                onClick={() => {
                  navigate(generatePath(ROUTES.BOOK, { id: String(item.id) }))
                }}
                key={item.id}
              >
                <ListItemAvatar>
                  <ImageAvatar src={`${GO_API_BOOK_IMAGES_URL}/${item.id}.jpg`} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.year} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent> */}

      <CommonTable data={SubscriberModel.subscriptions} columns={columns || []} />
    </Card>
  )
}

export default observer(Subscriptions)
