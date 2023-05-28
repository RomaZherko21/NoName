import { AiOutlineLink } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import { FilesModel } from '../model'
// import { useState } from 'react'
// import { ConfirmDialog } from 'entities/User'

export const getFilePopupConfig = (id: number) => {
  // const [isOpenModal, setIsOpenModal] = useState(false)

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
        // setIsOpenModal(true)
        FilesModel.fetchDeleteFolder({ id: id })
      }
    }

    // <ConfirmDialog
    //   open={isOpenModal}
    //   handleClose={() => {
    //     setIsOpenModal(false)
    //   }}
    //   onDelete={async () => await FilesModel.fetchDeleteFolder({ id: id })}
    // />
  ]
}
