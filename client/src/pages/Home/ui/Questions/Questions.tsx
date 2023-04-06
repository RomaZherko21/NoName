import { useTranslation } from 'react-i18next'

import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'

function Questins() {
  const { t } = useTranslation()
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography>Everything you need to know</Typography>
        {/* <Typography> {t('home.title')}</Typography> */}
        <Typography>Frequently asked questions</Typography>
      </Grid>
      <Grid item xs={6}>
        <Accordion>
          <AccordionSummary>
            <Typography>Do you have a free demo to review the code before purchasing?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can check out our open source dashboard template which should give you an
              overview of the code quality and folder structure. Keep in mind that some aspects may
              differ from this Paid version.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>How many projects can I build with Devias Kit PRO?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The license is per project (domain), but if you intend to develop an unknown number of
              projects feel free to contact us and we'll find a solution.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>How many projects can I build with this template?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Absolutely! If you intend to charge users for using your product Extended license is
              created specifically for this context.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>What browsers does the template support?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The components in MUI are designed to work in the latest, stable releases of all major
              browsers, including Chrome, Firefox, Safari, and Edge. We don't support Internet
              Explorer 11.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>For what kind of projects is the Standard license intended?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The Standard license is designed for internal applications in which staff will access
              the application. An example could be the back-office dashboard of a public-facing
              e-commerce website in which staff would sign in and manage inventory, customers, etc.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  )
}

export default Questins
