import ruIcon from 'shared/assets/images/lang/ru.svg'
import deIcon from 'shared/assets/images/lang/de.svg'
import ukIcon from 'shared/assets/images/lang/uk.svg'

export const getPopupConfig = (changeLang: (lang: string) => void) => [
  {
    Icon: <img width="20px" alt="uk" src={ukIcon} />,
    text: 'common.english',
    onClick: () => {
      changeLang('en')
    },
    key: 'en'
  },
  {
    Icon: <img width="20px" alt="de" src={deIcon} />,
    text: 'common.german',
    onClick: () => {
      changeLang('de')
    },
    key: 'de'
  },
  {
    Icon: <img width="20px" alt="ru" src={ruIcon} />,
    text: 'common.russian',
    onClick: () => {
      changeLang('ru')
    },
    key: 'ru'
  }
]
