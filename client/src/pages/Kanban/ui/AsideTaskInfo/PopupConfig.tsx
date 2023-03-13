import { TFunction } from 'react-i18next'

export const getPopupConfig = (t: TFunction) => [
  {
    text: 'Todo',
    onClick: () => {
      console.log('todo')
    },
  },
  {
    text: 'In progress',
    onClick: () => {
      console.log('In progress')
    },
  },
  {
    text: 'Done',
    onClick: () => {
      console.log('Done')
    },
  },
]
