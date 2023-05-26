import { AiOutlineLink } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'

export const getFilePopupConfig = (name: string) => [
  {
    Icon: <AiOutlineLink />,
    text: 'actions.copyLink',
    onClick: () => {
      console.log('hehe', name)
    }
  },
  {
    Icon: <MdDeleteOutline />,
    text: 'actions.delete',
    onClick: () => {}
  }
]
