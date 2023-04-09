import { Divider, Rating, Card, CardContent, Typography } from '@mui/material'

interface Props {
  id: number
  content: string
  author: string
}

function Review({ review }: { review: Props }) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        p: 1.5
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2
        }}
      >
        <Rating
          value={5}
          readOnly
          sx={{
            color: ({ palette }) => palette.secondary.main
          }}
        />

        <Typography variant="body1" sx={{ height: '180px' }}>
          {review.content}
        </Typography>

        <Divider />

        <Typography variant="body1" color="text.secondary">
          {review.author}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Review
