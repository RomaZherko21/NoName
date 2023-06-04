import { generatePath } from 'react-router-dom'

import { ROUTES } from 'shared/consts'

import { BsEnvelopeOpen } from 'react-icons/bs'
import { BsFileText } from 'react-icons/bs'
import { BsLayoutTextSidebar } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { VscError } from 'react-icons/vsc'
import { FiLogOut } from 'react-icons/fi'

export const getPagesPopUpConfig = () => [
  {
    Icon: <RxDashboard />,
    text: 'home:pagesBtn.dashboard'
  },
  {
    Icon: <BsLayoutTextSidebar />,
    text: 'home:pagesBtn.fileManager',
    to: generatePath(ROUTES.FILE_MANAGER)
  },
  {
    Icon: <BsLayoutTextSidebar />,
    text: 'home:pagesBtn.blog'
  },
  {
    Icon: <BsFileText />,
    text: 'home:pagesBtn.pricing'
  },
  {
    Icon: <BsEnvelopeOpen />,
    text: 'home:pagesBtn.contact'
  },
  {
    Icon: <FiLogOut />,
    text: 'home:pagesBtn.checkout'
  },
  {
    Icon: <VscError />,
    text: 'home:pagesBtn.error'
  }
]
