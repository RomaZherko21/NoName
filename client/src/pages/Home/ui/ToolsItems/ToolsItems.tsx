/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useTranslation } from 'react-i18next'

import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'

function ToolsItems() {
  const { t } = useTranslation()
  const [active, setActive] = useState('Built by experts')

  const toggleTab = (title: string) => {
    setActive(title)
  }

  return (
    <Box
      sx={{
        mt: 12,
        // background: ({ palette }) =>
        //   `linear-gradient(45deg, ${palette.background.default} 30%, rgba(37, 69, 125, 1) 80%, rgba(3, 175, 213, 1) 100%)`,
        background: `linear-gradient(349deg, rgba(54, 72, 87) 35%, rgba(50, 90, 112, 0.7) 71%, rgba(3, 213, 213, 0.25) 100%)`
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          py: 15
        }}
      >
        <Typography variant="h3" textAlign="center">
          {t('home:toolsitams.title')}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" sx={{ mt: 2, mb: 8 }}>
          {t('home:toolsitams.subtitle')}
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
          ].map((item) => (
            <Box
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onClick={() => toggleTab(item.title)}
              key={item.title}
              sx={{
                p: 3,
                my: 1,
                cursor: 'pointer',
                border: 1,
                borderRadius: 2,
                borderColor: active === item.title ? 'primary.dark' : 'transparent',
                color: active === item.title ? 'text.primary' : 'text.secondary',
                background: active === item.title ? 'rgba(75, 78, 245, 0.068)' : '',
                maxWidth: '720px',
                '&:hover': {
                  transition: '0.5s',
                  background:
                    active === item.title ? 'rgba(75, 78, 245, 0.068)' : 'rgba(0, 0, 0, 0.07)',
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
      </Container>
    </Box>
  )
}

export default ToolsItems
