import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'

import { useDialog } from 'hooks'
import Pagination from 'components/Pagination'
import Spinner from 'components/Spinner/Spinner'
import CommonCard from 'components/CommonCard'
import { API_URL } from 'constants/config'

import CreateItemForm from './CreateItemForm/CreateItemForm'
import ItemsModel from './Items.model'
import { getPopupConfig } from './PopupConfig'

const ItemsList = () => {
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
      <Grid item>
        {ItemsModel.loading.has ? (
          <Spinner />
        ) : (
          ItemsModel.items.map((item) => (
            <CommonCard
              id={item.id}
              name={item.name}
              description={item.description}
              imageUrl={`${API_URL}/uploads/item/${item.image}`}
              creatorAvatarUrl={`${API_URL}/uploads/avatar/${item.creatorAvatar}`}
              createdAt={item.createdAt}
              popupConfig={popupConfig}
            />
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
