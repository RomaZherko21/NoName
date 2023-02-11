import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { useRootStore } from 'stores'
import { DeleteAccount, UserBasicInfo, UserCreditCardInfo } from 'entities'
import { Spinner } from 'shared/ui'

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
            <UserBasicInfo user={ProfileModel} />
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <UserCreditCardInfo
              cardNumber={ProfileModel.card_number}
              nameOnCard={ProfileModel.name_on_card}
              validThru={ProfileModel.valid_thru}
              cvv={ProfileModel.cvv}
            />

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
