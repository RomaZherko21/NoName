import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardActions,
} from '@mui/material'
import { HiOutlineLightningBolt } from 'react-icons/hi'

import { CircleDevider } from 'shared/ui'

import pdf from 'assets/images/pdf.svg'

const Storage = () => {
  const { t } = useTranslation()

  return (
    <Grid component={Paper} elevation={16} sx={{ borderRadius: '20px' }}>
      <Card>
        <CardHeader
          sx={{ pt: 4, px: 3, pb: 2 }}
          title={t('file:storage.title')}
          titleTypographyProps={{ variant: 'h6' }}
          subheader={t('file:storage.subheader')}
          subheaderTypographyProps={{ variant: 'body2' }}
        />
        <CardContent sx={{ p: 3 }}>
          <Box></Box>
          <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' }}>
            {t('file:storage.limit')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            {t('file:storage.availableStorage')}
          </Typography>
          <List>
            <ListItem sx={{ display: 'flex', alignItems: 'center', py: 1, px: 0 }}>
              <ListItemIcon>
                <Box sx={{ mr: 2 }}>
                  <img alt="Pdf" src={pdf} />
                </Box>
              </ListItemIcon>
              <ListItemText sx={{ my: 0.75 }}>
                <Typography variant="caption">PDF</Typography>
                <Typography variant="body2" color="text.secondary">
                  412.39 MB <CircleDevider sx={{ backgroundColor: 'text.secondary' }} /> 95 items
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" size="small" endIcon={<HiOutlineLightningBolt />}>
            {t('file:actions.upgradePlan')}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Storage
