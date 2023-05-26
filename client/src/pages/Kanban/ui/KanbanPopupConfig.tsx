import { FaTrashAlt } from 'react-icons/fa'
import { BsBrushFill } from 'react-icons/bs'
import { KanbanModel } from '../model'

export const getKanbanPopupConfig = () => [
  {
    Icon: <BsBrushFill />,
    text: 'actions.clear',
    onClick: (id: number) => {
      console.log(id)
    }
  },
  {
    Icon: <FaTrashAlt />,
    text: 'actions.delete',
    onClick: (id: number) => {
      console.log('delete', id)
    }
  }
]
