import { observer } from 'mobx-react-lite'
import { Grid } from '@mui/material'

import { useRootStore } from 'stores'
import { DeleteAccount, BasicInfo, CreditCardInfo, CreditCard, Carousel } from 'entities'
import { Spinner } from 'shared/ui'
import { ProfileModel } from '../../model'
import masterCard from 'shared/assets/images/cards/mastercard.png'
import visa from 'shared/assets/images/cards/visa.png'
import logoMasterCard from 'shared/assets/images/cards/logoMasterCard.svg'
import logoVisa from 'shared/assets/images/cards/logoVisa.svg'

function UserInfo() {
  const { user } = useRootStore()

  return (
    <>
      {ProfileModel.loading.has ? (
        <Spinner />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BasicInfo user={ProfileModel} />
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Carousel>
              <CreditCard
                cardNumber={ProfileModel.card_number}
                nameOnCard={ProfileModel.name_on_card}
                validThru={ProfileModel.valid_thru}
                background={masterCard}
                logo={logoMasterCard}
              />
              <CreditCard
                cardNumber={ProfileModel.card_number}
                nameOnCard={ProfileModel.name_on_card}
                validThru={ProfileModel.valid_thru}
                background={visa}
                logo={logoVisa}
              />
            </Carousel>
            <CreditCardInfo
              cardNumber={ProfileModel.card_number}
              nameOnCard={ProfileModel.name_on_card}
              validThru={ProfileModel.valid_thru}
              cvv={ProfileModel.cvv}
            />

            {(user.isAuthorizedUser(ProfileModel.id) || user.permissions.deleteUsers) && (
              <DeleteAccount onDelete={ProfileModel.removeById} />
            )}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default observer(UserInfo)
