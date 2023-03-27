import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { HiOutlineLightningBolt } from 'react-icons/hi'

import { CircleDevider } from 'shared/ui'
import mp4 from 'shared/assets/images/fileFormat/mp4.svg'
import png from 'shared/assets/images/fileFormat/png.svg'
import pdf from 'shared/assets/images/fileFormat/pdf.svg'
import other from 'shared/assets/images/fileFormat/other.svg'

const Storage = () => {
  const { t } = useTranslation()

  return (
    <Paper elevation={16} sx={{ borderRadius: 2, p: 3 }}>
      <Box>
        <Typography variant="h6" color="text.primary">
          {t('file:storage.title')}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t('file:storage.subheader')}
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' }}>
          {t('file:storage.limit')}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {t('file:storage.availableStorage', { percent: '85%' })}
        </Typography>

        <List>
          <ListItem sx={{ display: 'flex', alignItems: 'center', py: 1, px: 0 }}>
            <ListItemIcon>
              <Box sx={{ mr: 2 }}>
                <img alt="Mp4" src={mp4} />
              </Box>
            </ListItemIcon>
            <ListItemText sx={{ my: 0.75 }}>
              <Typography variant="caption">MP4</Typography>
              <Typography variant="body2" color="text.secondary">
                22.75 GB <CircleDevider sx={{ backgroundColor: 'text.secondary' }} /> 25 items
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center', py: 1, px: 0 }}>
            <ListItemIcon>
              <Box sx={{ mr: 2 }}>
                <img alt="Png" src={png} />
              </Box>
            </ListItemIcon>
            <ListItemText sx={{ my: 0.75 }}>
              <Typography variant="caption">PNG</Typography>
              <Typography variant="body2" color="text.secondary">
                54.69 GB <CircleDevider sx={{ backgroundColor: 'text.secondary' }} /> 591 items
              </Typography>
            </ListItemText>
          </ListItem>
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
          <ListItem sx={{ display: 'flex', alignItems: 'center', py: 1, px: 0 }}>
            <ListItemIcon>
              <Box sx={{ mr: 2 }}>
                <img alt="Other" src={other} />
              </Box>
            </ListItemIcon>
            <ListItemText sx={{ my: 0.75 }}>
              <Typography variant="caption">Other</Typography>
              <Typography variant="body2" color="text.secondary">
                261.43 MB <CircleDevider sx={{ backgroundColor: 'text.secondary' }} /> 210 items
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Button variant="contained" size="small" endIcon={<HiOutlineLightningBolt />}>
        {t('file:actions.upgradePlan')}
      </Button>
    </Paper>
  )
}

export default Storage
