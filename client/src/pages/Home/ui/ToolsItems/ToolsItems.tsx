import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'

function ToolsItems() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)

  return (
    <Box
      sx={{
        mt: 12,
        background: `linear-gradient(337deg, rgba(54, 72, 87, 0.5) 35%, rgba(50, 90, 112, 0.7) 71%, rgba(3, 213, 213, 0.1) 100%)`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        py: 12
      }}
    >
      <Typography variant="h3" textAlign="center">
        {t('home:toolsItems.title')}
      </Typography>
      <Typography variant="subtitle1" textAlign="center" sx={{ mt: 2, mb: 8 }}>
        {t('home:toolsItems.subtitle')}
      </Typography>
      <Box>
        {[
          {
            title: 'Built by experts',
            text: 'All of the code follows MUI best practices, it’s written by our in-house team of experts.'
          },
          {
            title: 'Design Files',
            text: "We've included the source Figma files to Plus & Extended licenses so you can get creative! Build layouts with confidence."
          },
          {
            title: 'Built with modern technologies',
            text: 'Each template is a well-structured CRA & Next.js project, giving you a codebase that’s productive and enjoyable to work in.'
          },
          {
            title: 'Easy to customize',
            text: 'Everything is styled using global theme overrides, just open the theme file in your editor and change whatever you want.'
          },
          {
            title: 'Built with CRA & Next.js',
            text: 'Well-structured, thoughtfully componentized CRA & Next.js project, giving you a codebase that’s productive and enjoyable to work in.'
          }
        ].map((item, index) => (
          <Box
            onClick={() => setActive(index)}
            key={index}
            sx={{
              p: 3,
              my: 1,
              cursor: 'pointer',
              border: 1,
              borderRadius: 2,
              borderColor: active === index ? 'primary.dark' : 'transparent',
              color: active === index ? 'text.primary' : 'text.secondary',
              background: active === index ? 'rgba(75, 78, 245, 0.068)' : '',
              maxWidth: '720px',
              '&:hover': {
                transition: '0.5s',
                background: active === index ? 'rgba(75, 78, 245, 0.068)' : 'rgba(0, 0, 0, 0.07)',
                border: 1,
                borderColor: 'primary.dark',
                color: 'text.primary'
              }
            }}
          >
            <Typography variant="subtitle1">{item.title}</Typography>
            <Typography variant="body2">{item.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ToolsItems
