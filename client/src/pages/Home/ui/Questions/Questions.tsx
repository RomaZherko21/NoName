import { useTranslation } from 'react-i18next'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Typography
} from '@mui/material'

import { MdKeyboardArrowDown } from 'react-icons/md'

function Questions() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={6} justifyContent="center" sx={{ py: 12 }}>
      <Grid item xs={6}>
        <Typography variant="h3">{t('home:title')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('home:subtitle')}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {[
          {
            title: 'Do you have a free demo to review the code before purchasing?',
            text: 'Yes, you can check out our open source dashboard template which should give you an overview of the code quality and folder structure. Keep in mind that some aspects may differ from this Paid version.'
          },
          {
            title: 'How many projects can I build with Devias Kit PRO?',
            text: "The license is per project (domain), but if you intend to develop an unknown number of projects feel free to contact us and we'll find a solution."
          },
          {
            title: 'How many projects can I build with this template?',
            text: 'Absolutely! If you intend to charge users for using your product Extended license is created specifically for this context.'
          },
          {
            title: 'What browsers does the template support?',
            text: "The components in MUI are designed to work in the latest, stable releases of all major browsers, including Chrome, Firefox, Safari, and Edge. We don't support Internet Explorer 11."
          }
        ].map((item) => (
          <Accordion
            disableGutters
            elevation={0}
            sx={{ p: 0, backgroundColor: 'inherit', border: 0 }}
            key={item.title}
          >
            <AccordionSummary
              expandIcon={
                <IconButton sx={{ fontSize: '20px' }}>
                  <MdKeyboardArrowDown />
                </IconButton>
              }
              sx={{ p: 0, border: 0 }}
            >
              <Typography variant="body1">{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ m: 0, p: 0, backgroundColor: 'inherit', border: 0 }}>
              <Typography variant="body2" color="text.secondary">
                {item.text}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  )
}

export default Questions
