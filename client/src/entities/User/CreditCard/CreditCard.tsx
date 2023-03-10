import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { getListConfig } from '../CreditCardInfo/getListConfig'
import contactless from 'shared/assets/images/cards/contactless.svg'
import sim from 'shared/assets/images/cards/sim.svg'
import { getCardNumber, getExpiryDate } from 'shared/helpers'

interface Props {
  cardNumber?: string
  nameOnCard?: string
  validThru?: string
  background: any
  logo: any
}

function CreditCard({ cardNumber, nameOnCard, validThru, background, logo }: Props) {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        minWidth: 550,
        p: 4,
        pt: 6,
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center center',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <img src={contactless} />
        <img src={logo} />
      </Box>
      <Typography variant="h5" sx={{ mt: 6, mb: 3, letterSpacing: 4 }}>
        {getCardNumber(cardNumber)}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t('user:bankCard.cardHolderName')}
          </Typography>
          <Typography variant="body1">{nameOnCard}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t('user:bankCard.expiryDate')}
          </Typography>
          <Typography variant="body1">{getExpiryDate(validThru)}</Typography>
        </Box>
        <img src={sim} />
      </Box>
    </Box>
  )
}

export default CreditCard
