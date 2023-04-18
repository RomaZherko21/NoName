import { Button, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { AiOutlineEye } from 'react-icons/ai'
import { FiFolder } from 'react-icons/fi'

function MainSection() {
  const { t } = useTranslation()
  return (
    <Box sx={{ maxWidth: '600px' }}>
      <Typography variant="h1">{t('home:mainTitle')}</Typography>
      <Typography sx={{ display: 'flex' }}>
        <Typography variant="h1" sx={{ mr: 1.5 }}>
          {t('home:the')}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: ({ palette }) => palette.primary.dark
          }}
        >
          {t('home:userExperience')}
        </Typography>
        <Typography variant="h1">{t('home:comma')}</Typography>
      </Typography>
      <Typography variant="h1" sx={{ mb: 2 }}>
        {t('home:focus')}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: ({ palette }) => palette.text.secondary,
          mb: 3
        }}
      >
        {t('home:mainSubtitle')}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Rating
          name="half-rating-read"
          defaultValue={4.7}
          precision={0.05}
          readOnly
          sx={{
            color: ({ palette }) => palette.warning.main,
            mb: 3
          }}
        />

        <Typography variant="subtitle2">4.7/5 </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: ({ palette }) => palette.text.secondary
          }}
        >
          {t('home:basedOn', { count: 70 })}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2.5 }}>
        <Button
          startIcon={<AiOutlineEye />}
          sx={{
            background: ({ palette }) => palette.grey[100],
            color: ({ palette }) => palette.grey[900],
            '&:hover': {
              backgroundColor: '#D1D5DB'
            }
          }}
        >
          {t('home:liveDemo')}
        </Button>
        <Button color="inherit" startIcon={<FiFolder />}>
          {t('home:components')}
        </Button>
      </Box>
    </Box>
  )
}
export default MainSection
