import { Box, Tab, Tabs as MUiTabs, Typography } from '@mui/material'
import { SyntheticEvent, useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Tabs = ({
  options,
}: {
  options: { label: string; Component: (arg: any) => JSX.Element }[]
}) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MUiTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {options.map((item, id) => (
            <Tab label={item.label} {...a11yProps(id)} />
          ))}
        </MUiTabs>
      </Box>
      {options.map((item, id) => (
        <TabPanel value={value} index={id}>
          <item.Component />
        </TabPanel>
      ))}

      {/* <TabPanel value={value} index={1}>
        <Connections />
      </TabPanel> */}
    </>
  )
}

export default Tabs
