import { AiOutlineLink } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import { FilesModel } from '../model'

export const getFilePopupConfig = (id: number) => {
  return [
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
      onClick: () => {
        console.log('delete', id)
        FilesModel.deleteFolder({ id: id })
      }
    }
  ]
}
