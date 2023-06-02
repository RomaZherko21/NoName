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
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    text: 'home:pagesBtn.overview'
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    text: 'home:pagesBtn.customers'
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    text: 'home:pagesBtn.logistics'
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    text: 'home:pagesBtn.fileManager',
    to: generatePath(ROUTES.FILE_MANAGER)
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    text: 'home:pagesBtn.academy'
    // to: generatePath()
  },
  {
    Icon: <BsLayoutTextSidebar />,
    text: 'home:pagesBtn.blog'
    // to: generatePath()
  },
  {
    Icon: <BsFileText />,
    text: 'home:pagesBtn.pricing'
    // to: generatePath()
  },
  {
    Icon: <BsEnvelopeOpen />,
    text: 'home:pagesBtn.contact'
    // to: generatePath()
  },
  {
    Icon: <FiLogOut />,
    text: 'home:pagesBtn.checkout'
    // to: generatePath()
  },
  {
    Icon: <VscError />,
    text: 'home:pagesBtn.error'
    // to: generatePath()
  }
]
