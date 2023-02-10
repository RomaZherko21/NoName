import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Chip, Typography } from '@mui/material'

import { DeleteAccount, UserBasicDetails } from 'entities'
import { API_USER_AVATAR_URL } from 'shared/consts'
import { getInitials } from 'shared/helpers'
import { InformativeImage, Spinner } from 'shared/ui'
import { PageHeader } from 'widgets'

import { UserProfileModel } from './model'
import { Payment } from './ui'

function UserProfie() {
  const { t } = useTranslation()
  const { id } = useParams()

  useEffect(() => {
    UserProfileModel.fetchUser(Number(id))
  }, [])

  return (
    <>
      <PageHeader
        pageName={t('page:userProfile')}
        breadcrumbs={[{ text: 'page:userProfile' }, { text: 'page:sub.details' }]}
      />
      {UserProfileModel.loading.has ? (
        <Spinner />
      ) : (
        <>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}
          >
            <InformativeImage
              imgUrl={`${API_USER_AVATAR_URL}/${UserProfileModel.avatar}`}
              imgPlaceholder={getInitials(`${UserProfileModel.name} ${UserProfileModel.surname}`)}
              PrimaryText={UserProfileModel.email}
              size="large"
              PrimaryVariant="h4"
              SecondaryText={
                <Typography variant="subtitle2" color={'text.primary'}>
                  user_id:{' '}
                  <Chip
                    label={Number(id)}
                    size="small"
                    sx={{ backgroundColor: (theme) => theme.palette.grey[700] }}
                  />
                </Typography>
              }
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" size="small">
                {t('actions.edit')}
              </Button>
              <Button variant="contained" size="small">
                {t('common.actions')}
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <UserBasicDetails user={UserProfileModel} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              <Payment user={UserProfileModel} />
              <DeleteAccount onDelete={UserProfileModel.removeById} />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default observer(UserProfie)
