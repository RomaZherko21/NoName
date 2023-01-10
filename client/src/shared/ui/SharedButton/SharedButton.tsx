import { useState } from 'react'
import { toast } from 'react-toastify'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import ContentCopy from '@mui/icons-material/ContentCopy'
import { useTranslation } from 'react-i18next'

interface Props {
  id?: number
}

function SharedButton({ id }: Props) {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  function onClick() {
    if (id) {
      navigator.clipboard.writeText(`${window.location.href}/${id}`)
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
    toast('Link copied!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
    setAnchorEl(null)
  }

  return (
    <>
      <Tooltip title={t('translation:actions.shared')} placement="right-start">
        <IconButton
          aria-label="share"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onClick}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('translation:actions.copyLink')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default SharedButton
