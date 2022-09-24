import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'

interface Props {
  config: {
    key: string
    Control: (arg: any) => JSX.Element
    placeholder: string
  }[]
  setFilters: (pre: any) => void
}

const Filters = ({ config, setFilters }: Props) => {
  const [expanded, setExpanded] = useState(false)

  const onExpand = () => setExpanded((pre) => !pre)

  return (
    <Accordion expanded={expanded} onChange={onExpand}>
      <AccordionSummary>
        <IconButton aria-label="delete" color="primary">
          <TuneIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {config.map((item) => (
            <Grid item>
              <item.Control
                placeholder={item.placeholder}
                onChange={(e: any) => {
                  setFilters((pre: any) => ({ ...pre, [item.key]: e.target.value }))
                }}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default observer(Filters)
