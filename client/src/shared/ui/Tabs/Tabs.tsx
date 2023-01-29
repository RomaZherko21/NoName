import { Box, Tab, Tabs as MUiTabs } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'

import TabPanel from './TabPanel'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Tabs = ({
  options,
}: {
  options: { label: string; to: string; Component: (arg: any) => JSX.Element }[]
}) => {
  let location = useLocation()

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MUiTabs
          value={options.findIndex((item) => item.to === location.pathname)}
          aria-label="basic tabs example"
        >
          {options.map((item, id) => (
            <Tab to={item.to} component={Link} label={item.label} {...a11yProps(id)} />
          ))}
        </MUiTabs>
      </Box>
      {options.map((item, id) => (
        <TabPanel value={options.findIndex((item) => item.to === location.pathname)} index={id}>
          <item.Component />
        </TabPanel>
      ))}
    </>
  )
}

export default observer(Tabs)
