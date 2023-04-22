import { useTranslation } from 'react-i18next'
import { Container, Grid, Typography } from '@mui/material'

import Review from './Review'

const DataReviews = [
  {
    id: 1,
    content:
      "Im highly satisfied with our decision to use this template. It's actually 2 for 1 - we got a beautiful design(responsive, looks great with so many different options and components) AND we got an excellent source code with an actual project [...]",
    author: 'Oded R.'
  },
  {
    id: 2,
    content:
      'I really like the depth and quality with this template. Well constructed and a very useful source of ideas and best practices. I highly recommend it.',
    author: 'Mark S.'
  },
  {
    id: 3,
    content:
      'It comes packed with probably more components and feature samples than you will ever need in a single App. The code is well structured and the documentation covers all essential parts. They are maybe not covering [...]',
    author: 'Lorenz N.'
  },
  {
    id: 4,
    content: 'I received a kind, considerate and immediate response, thank you very much!',
    author: 'Ruthy G.'
  },
  {
    id: 5,
    content:
      'While many templates are next.js, the support is quick and AMAZING and I was able to port this to using react-router v6. Very happy with the quality of everything!!!',
    author: 'Dean H.'
  },
  {
    id: 6,
    content:
      'Great template and great customer support. Easy to customize, code is easy to read, documentation is good. Very happy!',
    author: 'Cole S.'
  }
]

function Reviews() {
  const { t } = useTranslation()

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography variant="h3">{t('home:reviewTitle')}</Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mt: 2
        }}
      >
        {t('home:reviewSubtitle')}
      </Typography>

      <Container
        sx={{
          mt: 6
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {DataReviews.map((review) => (
            <Grid item key={review.id} xs={2} sm={4} md={4}>
              <Review review={review} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  )
}

export default Reviews
