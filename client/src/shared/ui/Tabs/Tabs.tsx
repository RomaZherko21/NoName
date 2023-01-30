import { Box, Tab, Tabs as MUiTabs } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import TabPanel from './TabPanel'

const Tabs = ({
  options,
  variant = 'standard',
}: {
  options: { label: string; to?: string; Component: (arg: any) => JSX.Element }[]
  variant?: 'standard' | 'scrollable' | 'fullWidth'
}) => {
  let location = useLocation()
  const navigate = useNavigate()

  const [currentTab, setCurrentTab] = useState(0)

  const onTabChange = (_: any, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MUiTabs
          value={options.findIndex((item, index) =>
            item.to ? item.to === location.pathname : currentTab === index
          )}
          variant={variant}
          aria-label="basic tabs example"
          onChange={onTabChange}
        >
          {options.map((item, id) => (
            <Tab
              onClick={() => {
                if (item.to) {
                  navigate(item.to)
                }
              }}
              label={item.label}
              {...{ [id]: `simple-tab-${id}`, 'aria-controls': `simple-tabpanel-${id}` }}
            />
          ))}
        </MUiTabs>
      </Box>
      {options.map((item, index) => (
        <TabPanel
          value={options.findIndex((item, index) =>
            item.to ? item.to === location.pathname : currentTab === index
          )}
          index={index}
        >
          <item.Component />
        </TabPanel>
      ))}
    </>
  )
}

export default observer(Tabs)
