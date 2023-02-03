import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useDialog } from 'shared/hooks'
import { AsideFilters, AsideFiltersBar, Pagination } from 'shared/ui'
import { PageHeader } from 'widgets'

import { CommonCard, CreatePostForm, getPopupConfig, PostLoader } from './ui'
import { getFiltersConfig, PostsModel } from './model'

function Posts() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [openFilter, setOpenFilter] = useState(false)

  const popupConfig = useMemo(() => getPopupConfig(navigate), [navigate])
  const filtersConfig = useMemo(() => getFiltersConfig(), [])

  useEffect(() => {
    PostsModel.debounceFetch({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PostsModel.pagination.page, PostsModel.pagination.limit, searchParams])

  const [showCreateItemModal] = useDialog('post:form.create', (hideModal) => (
    <CreatePostForm hideModal={hideModal} />
  ))

  function handleOpenFilter() {
    setOpenFilter(true)
  }

  function handleCloseFilter() {
    setOpenFilter(false)
  }

  function toggleLike(id: number) {
    PostsModel.toggleLike(id)
  }

  return (
    <>
      <PageHeader
        pageName={t('page:posts')}
        breadcrumbs={[{ text: 'page:posts' }, { text: 'page:sub.list' }]}
      >
        <Grid item>
          <Button variant="contained" color="primary" onClick={showCreateItemModal}>
            {t('post:form.create')}
          </Button>
        </Grid>
      </PageHeader>

      <Grid container spacing={3} direction="column">
        <Grid item>
          <AsideFiltersBar
            value={searchParams.get('name') || ''}
            onChange={(e: any) => {
              searchParams.set('name', e.target.value)
              setSearchParams(searchParams)
            }}
            handleOpenFilter={handleOpenFilter}
            placeholder="post:actions.searchName"
          />
        </Grid>

        <Grid item container spacing={4}>
          {PostsModel.loading.has
            ? [1, 2, 3, 4].map((item) => {
                return <PostLoader key={item} />
              })
            : PostsModel.posts.map((post) => (
                <Grid key={post.id} item xs={12} md={6} sx={{ width: '100%' }}>
                  <CommonCard post={post} toggleLike={toggleLike} popupConfig={popupConfig} />
                </Grid>
              ))}
        </Grid>
        <Grid item>
          <Pagination paginationModel={PostsModel.pagination} />
        </Grid>
      </Grid>

      <AsideFilters
        config={filtersConfig}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
      />
    </>
  )
}

export default observer(Posts)
