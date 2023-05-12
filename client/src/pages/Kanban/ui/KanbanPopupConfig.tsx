import { FaTrashAlt } from 'react-icons/fa'
import { BsBrushFill } from 'react-icons/bs'
import { KanbanModel } from '../model'

export const getKanbanPopupConfig = (id: number) => [
  //сюда приходит только одно id = 1
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
      KanbanModel.deleteColumn({ id })
      console.log(id)
      console.log('delete')
      // сюда запрос на удаление
    }
  }
]
