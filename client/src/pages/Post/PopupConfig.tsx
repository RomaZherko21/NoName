import { toast } from 'react-toastify'
import { TFunction } from 'react-i18next'
import ContentCopy from '@mui/icons-material/ContentCopy'

export const getPopupConfig = (url: string, t: TFunction) => [
  {
    Icon: <ContentCopy fontSize="small" />,
    text: 'actions.copyLink',
    onClick: () => {
      navigator.clipboard.writeText(url)
      toast.success(`${t('translation:actions.linkCopied')}!`)
    },
  },
]
