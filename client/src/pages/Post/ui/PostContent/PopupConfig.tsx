import { toast } from 'react-toastify'
import { TFunction } from 'react-i18next'
import ContentCopy from '@mui/icons-material/ContentCopy'

export const getPopupConfig = (t: TFunction) => [
  {
    Icon: <ContentCopy fontSize="small" />,
    text: 'actions.copyLink',
    onClick: () => {
      navigator.clipboard.writeText(window.location.href)
      toast.success(t('translation:actions.linkCopied'))
    }
  }
]
