import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'

import { useDialog } from 'hooks'
import Pagination from 'components/Pagination'
import Spinner from 'components/Spinner/Spinner'

import CreateItemForm from './CreateItemForm/CreateItemForm'
import ItemsModel from './Items.model'

const ItemsList = () => {
  const { t } = useTranslation()

  // useEffect(() => {
  //   ItemsModel.fetch()
  // }, [ItemsModel.pagination.page, ItemsModel.pagination.perPage])

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
      <Grid item>{ItemsModel.loading.has ? <Spinner /> : <>HELL</>}</Grid>
      <Grid item>
        <Pagination paginationModel={ItemsModel.pagination} />
      </Grid>
    </Grid>
  )
}

export default observer(ItemsList)
