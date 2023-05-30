import { generatePath } from 'react-router-dom'

import { BsBoxArrowInRight } from 'react-icons/bs'
import { BsEnvelopeOpen } from 'react-icons/bs'
import { BsFileText } from 'react-icons/bs'
import { BsLayoutTextSidebar } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { VscError } from 'react-icons/vsc'

export const getPagesPopUpConfig = (name: string) => [
  {
    Icon: <RxDashboard />,
    text: 'actions.copyLink'
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    // Icon: <BsLayoutTextSidebar />,
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    Icon: <BsLayoutTextSidebar />
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    Icon: <BsFileText />
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    Icon: <BsEnvelopeOpen />
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    Icon: <BsBoxArrowInRight />
    // text: 'actions.delete',
    // to: generatePath()
  },
  {
    Icon: <VscError />
    // text: 'actions.delete',
    // to: generatePath()
  }
]
