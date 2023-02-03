import { toast } from 'react-toastify'
import { TFunction } from 'react-i18next'
import ContentCopy from '@mui/icons-material/ContentCopy'

export const getPopupConfig = (url: string, t: TFunction) => [
  {
    Icon: <ContentCopy fontSize="small" />,
    text: 'actions.copyLink',
    onClick: (id: number) => {
      navigator.clipboard.writeText(`${url}/${id}`)
      toast.success(`${t('translation:actions.linkCopied')}!`)
    },
  },
]
