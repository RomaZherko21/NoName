import { BsCalendar2Event, BsCreditCard2Back } from 'react-icons/bs'
import { BiUser, BiLockAlt } from 'react-icons/bi'

export const getListConfig = ({ cardNumber, nameOnCard, validThru, cvv }: any) => [
  {
    Icon: BsCreditCard2Back,
    title: 'user:bankCard.number',
    text: cardNumber.replace(/(\d{4}(?!\s))/g, '$1 '),
  },
  {
    Icon: BiUser,
    title: 'user:bankCard.cardHolderName',
    text: nameOnCard,
  },
  {
    Icon: BsCalendar2Event,
    title: 'user:bankCard.expiryDate',
    text: validThru.split('/').join(' / '),
  },

  {
    Icon: BiLockAlt,
    title: 'user:bankCard.cvv',
    text: cvv,
  },
]
