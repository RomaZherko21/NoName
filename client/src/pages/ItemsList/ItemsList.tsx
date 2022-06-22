import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'

import { useDialog } from 'shared/hooks'
import { CommonCard, Pagination, Spinner } from 'shared/ui'
import { API_URL } from 'shared/consts'

import { CreateItemForm, getPopupConfig } from './ui'
import { ItemsModel } from './model'

function ItemsList() {
  const { t } = useTranslation()

  const popupConfig = useMemo(() => getPopupConfig(), [])

  useEffect(() => {
    ItemsModel.fetch()
  }, [ItemsModel.pagination.page, ItemsModel.pagination.perPage])

  const [showCreateItemModal] = useDialog('item:form.create', (hideModal) => (
    <CreateItemForm hideModal={hideModal} />
  ))

  return (
    <Grid spacing={2} container direction="column">
      <Grid item alignSelf="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={showCreateItemModal}
        >
          {t('item:form.create')}
        </Button>
      </Grid>
      <Grid container spacing={0.5}>
        {ItemsModel.loading.has ? (
          <Spinner />
        ) : (
          ItemsModel.items.map((item) => (
            <Grid item sm={6} md={4} lg={3} sx={{ width: '100%' }}>
              <CommonCard
                id={item.id}
                name={item.name}
                description={item.description}
                imageUrl={`${API_URL}/uploads/item/${item.image}`}
                creatorAvatarUrl={`${API_URL}/uploads/avatar/${item.creatorAvatar}`}
                createdAt={item.createdAt}
                popupConfig={popupConfig}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Grid item>
        <Pagination paginationModel={ItemsModel.pagination} />
      </Grid>
    </Grid>
  )
}

export default observer(ItemsList)
