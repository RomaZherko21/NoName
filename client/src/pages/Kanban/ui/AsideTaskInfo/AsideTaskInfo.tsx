import { useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Drawer, IconButton, Button, InputBase } from '@mui/material'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineArchive } from 'react-icons/hi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { PopupMenu, Tabs } from 'shared/ui'

import { getPopupConfig } from './PopupConfig'
import { getTabsConfig } from './TabsConfig'
import { KanbanModel } from 'pages/Kanban/model'

interface Props {
  openTaskInfo: boolean
  onCloseTaskInfo: () => void
}

const AsideTaskInfo = ({ openTaskInfo, onCloseTaskInfo }: Props) => {
  const [isEyeActive, setIsEyeActive] = useState(true)

  const tabsConfig = useMemo(() => getTabsConfig(), [])

  return (
    <Drawer
      anchor="right"
      open={openTaskInfo}
      onClose={onCloseTaskInfo}
      PaperProps={{
        sx: {
          overflow: 'auto',
          width: 500,
          position: 'fixed',
          border: 'none'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '24px' }}>
        <Box sx={{ display: 'flex' }}>
          <Button size="small" variant="contained" sx={{ borderRadius: '12px 0 0 12px' }}>
            Submit as Progress
          </Button>
          <PopupMenu
            ActionButton={(btnProps) => (
              <Button
                {...btnProps}
                variant="contained"
                sx={{ borderRadius: '0 12px 12px 0' }}
                startIcon={<IoIosArrowDown />}
              />
            )}
            config={getPopupConfig()}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => {
              setIsEyeActive(!isEyeActive)
            }}
          >
            {isEyeActive ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </IconButton>
          <IconButton>
            <HiOutlineArchive />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ p: '8px 16px' }}>
        <InputBase
          value={KanbanModel.task?.name}
          size="small"
          fullWidth
          sx={{
            p: 0.5,
            pl: 1.5,
            color: ({ palette }) => palette.text.primary,
            '&:hover': {
              backgroundColor: ({ palette }) => palette.action.hover,
              borderRadius: '15px'
            },
            '&.Mui-focused': {
              backgroundColor: ({ palette }) => palette.action.hover,
              borderRadius: '15px'
            },
            '&fieldset': { border: 'none' }
          }}
        />
      </Box>

      <Tabs options={tabsConfig} />
    </Drawer>
  )
}

export default observer(AsideTaskInfo)
