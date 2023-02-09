import { observer } from 'mobx-react-lite'

import { DeleteAccount } from 'entities'
import { useRootStore } from 'stores'

import { ProfileForm } from './ProfileForm'

const General = () => {
  const { user } = useRootStore()

  return (
    <>
      <ProfileForm />
      <DeleteAccount id={user.id} />
    </>
  )
}

export default observer(General)
