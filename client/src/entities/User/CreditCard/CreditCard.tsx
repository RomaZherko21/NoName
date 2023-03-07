import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { getListConfig } from '../getListConfig'
import contactless from 'shared/assets/images/cards/contactless.svg'
import sim from 'shared/assets/images/cards/sim.svg'

function CreditCard(props: any) {
  const { t } = useTranslation()

  const listConfig = useMemo(() => getListConfig(props), [props])

  return (
    <Box
      sx={{
        minWidth: 550,
        p: 4,
        pt: 6,
        backgroundImage: `url(${props.background})`,
        backgroundPosition: 'center center',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <img src={contactless} />
        <img src={props.logo} />
      </Box>
      <Typography variant="h5" sx={{ mt: 6, mb: 3, letterSpacing: 4 }}>
        {listConfig[0].text}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t(listConfig[1].title)}
          </Typography>
          <Typography variant="body1">{listConfig[1].text}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t(listConfig[2].title)}
          </Typography>
          <Typography variant="body1">{listConfig[2].text}</Typography>
        </Box>
        <img src={sim} />
      </Box>
    </Box>
  )
}

export default CreditCard
