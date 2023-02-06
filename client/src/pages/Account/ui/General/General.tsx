import { observer } from 'mobx-react-lite'

import { DeleteAccount } from './DeleteAccount'
import { ProfileForm } from './ProfileForm'

const General = () => {
  return (
    <>
      <ProfileForm />
      <DeleteAccount />
    </>
  )
}

export default observer(General)
