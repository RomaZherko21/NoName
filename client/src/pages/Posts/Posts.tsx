import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'

import { AsideFilters, AsideFiltersBar, Pagination } from 'shared/ui'
import { getSearchParamsObj } from 'shared/helpers'
import { ROUTES } from 'shared/consts'
import { PageHeader } from 'widgets'
import { PostCard, PostCardSceleton } from 'entities'

import { getFiltersConfig, PostsModel, sortConfig } from './model'

function Posts() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [openFilter, setOpenFilter] = useState(false)

  const filtersConfig = useMemo(() => getFiltersConfig(), [])
  const sortOptions = useMemo(() => sortConfig, [])

  useEffect(() => {
    PostsModel.debounceFetch({ searchParams: getSearchParamsObj(searchParams) })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PostsModel.pagination.currentPage, PostsModel.pagination.limit, searchParams])

  useEffect(() => {
    return () => {
      PostsModel.cleanModel()
    }
  }, [])

  return (
    <>
      <PageHeader
        pageName={t('page:posts')}
        breadcrumbs={[{ text: 'page:posts' }, { text: 'page:sub.list' }]}
      >
        <Grid item>
          <Button
            component={Link}
            to={ROUTES.POSTS_NEW}
            size="small"
            variant="contained"
            color="primary"
          >
            {t('post:form.create')}
          </Button>
        </Grid>
      </PageHeader>

      <Grid container spacing={3} direction="column">
        <Grid item>
          <AsideFiltersBar
            inputValue={searchParams.get('name') || ''}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchParams((searchParams: URLSearchParams) => {
                searchParams.set('name', e.target.value)
                return searchParams
              })
            }}
            handleOpenFilter={() => {
              setOpenFilter(true)
            }}
            inputPlaceholder="post:actions.searchName"
            selectValue={`${searchParams.get('order_by')} ${searchParams.get('order_type')}` || ''}
            onSelectChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const [field, orderType] = e.target.value.split(' ')

              setSearchParams((searchParams: URLSearchParams) => {
                searchParams.set('order_by', field)
                searchParams.set('order_type', orderType)
                return searchParams
              })
            }}
            sortOptions={sortOptions}
          />
        </Grid>

        <Grid item container spacing={4}>
          {PostsModel.loading.has
            ? [1, 2, 3, 4].map((item) => (
                <Grid key={item} item xs={12} md={6} sx={{ width: '100%' }}>
                  <PostCardSceleton />
                </Grid>
              ))
            : PostsModel.posts.map((post) => (
                <Grid key={post?.id} item xs={12} md={6} sx={{ width: '100%' }}>
                  <PostCard post={post} toggleLike={() => PostsModel.toggleLike(post?.id)} />
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
        onCloseFilter={() => {
          setOpenFilter(false)
        }}
      />
    </>
  )
}

export default observer(Posts)
