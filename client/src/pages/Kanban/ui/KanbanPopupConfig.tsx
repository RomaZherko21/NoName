import { FaTrashAlt } from 'react-icons/fa'
import { BsBrushFill } from 'react-icons/bs'

export const getKanbanPopupConfig = (id: number) => [
  {
    Icon: <BsBrushFill />,
    text: 'actions.clear',
    onClick: () => {
      console.log(id)
    }
  },
  {
    Icon: <FaTrashAlt />,
    text: 'actions.delete',
    onClick: () => {
      console.log(id)
    }
  }
]
