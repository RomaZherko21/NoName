import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { useRootStore } from 'stores'
import { DeleteAccount, UserBasicDetails } from 'entities'
import { Spinner } from 'shared/ui'

import { default as Payment } from './Payment'
import { ProfileModel } from '../../model'

function UserInfo() {
  const { user } = useRootStore()

  return (
    <>
      {ProfileModel.loading.has ? (
        <Spinner />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <UserBasicDetails user={ProfileModel} />
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Payment user={ProfileModel} />
            {user.isAuthorizedUser(ProfileModel.id) && (
              <DeleteAccount onDelete={ProfileModel.removeById} />
            )}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default observer(UserInfo)
