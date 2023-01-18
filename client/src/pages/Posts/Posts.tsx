import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useDialog } from 'shared/hooks'
import { AsideFilters, AsideFiltersBar, PageHeader, Pagination } from 'shared/ui'
import { NODE_API_POST_IMAGES_URL, NODE_API_USER_AVATAR_URL } from 'shared/consts'

import { CommonCard, CreatePostForm, getPopupConfig, PostLoader } from './ui'
import { getFiltersConfig, PostsFilters, PostsModel } from './model'

function Posts() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [filters, setFilters] = useState<PostsFilters>({})
  const [openFilter, setOpenFilter] = useState(false)

  const popupConfig = useMemo(() => getPopupConfig(navigate), [navigate])
  const filtersConfig = useMemo(() => getFiltersConfig(), [])

  useEffect(() => {
    PostsModel.fetch({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PostsModel.pagination.page, PostsModel.pagination.perPage])

  useEffect(() => {
    PostsModel.debounceFetch({ filters })
  }, [filters])

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
      <PageHeader pageName={t('page:posts')}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={showCreateItemModal}>
            {t('post:form.create')}
          </Button>
        </Grid>
      </PageHeader>

      <Grid container spacing={3} direction="column">
        <Grid item>
          <AsideFiltersBar
            filters={filters}
            onChange={(e: any) => setFilters((pre: any) => ({ ...pre, name: e.target.value }))}
            handleOpenFilter={handleOpenFilter}
            placeholder="post:actions.searchName"
            name="name"
          />
        </Grid>

        <Grid item container spacing={2}>
          {PostsModel.loading.has
            ? [1, 2, 3, 4].map((item) => {
                return <PostLoader key={item} />
              })
            : PostsModel.posts.map((post) => (
                <Grid key={post.id} item sm={6} md={4} lg={3} sx={{ width: '100%' }}>
                  <CommonCard
                    id={post.id}
                    name={post.name}
                    description={post.description}
                    likes={post.likes_count}
                    is_liked={post.is_liked}
                    toggleLike={toggleLike}
                    imageUrl={`${NODE_API_POST_IMAGES_URL}/${post.image}`}
                    creatorAvatarUrl={`${NODE_API_USER_AVATAR_URL}/${post.avatar}`}
                    createdAt={post.created_at}
                    popupConfig={popupConfig}
                  />
                </Grid>
              ))}
        </Grid>
        <Grid item>
          <Pagination paginationModel={PostsModel.pagination} />
        </Grid>
      </Grid>

      <AsideFilters
        config={filtersConfig}
        filters={filters}
        setFilters={setFilters}
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
      />
    </>
  )
}

export default observer(Posts)
