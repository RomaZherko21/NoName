import { observer } from 'mobx-react-lite'
import { Card, CardContent, CardHeader, Divider } from '@mui/material'

import { BookModel } from 'pages/Book/model'

const BookForm = () => {
  return (
    <Card>
      <CardHeader subheader={BookModel.description} title={BookModel.name} />
      <Divider />
      <CardContent></CardContent>
    </Card>
  )
}

export default observer(BookForm)