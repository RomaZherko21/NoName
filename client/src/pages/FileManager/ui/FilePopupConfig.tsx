import { AiOutlineLink } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'

export const getFilePopupConfig = (id: number) => [
  {
    Icon: <AiOutlineLink />,
    text: 'actions.copyLink',
    onClick: () => {
      console.log('hehe', id)
    }
  },
  {
    Icon: <MdDeleteOutline />,
    text: 'actions.delete',
    onClick: () => {}
  }
]
