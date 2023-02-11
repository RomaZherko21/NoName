import { observer } from 'mobx-react-lite'
import { Box, Grid } from '@mui/material'

import { PostCard, PostCardSceleton, UserBasicDetails } from 'entities'
import { LeaveComment } from 'shared/ui'
import { API_USER_AVATAR_URL } from 'shared/consts'
import { ProfileModel } from 'pages/Profile/model'
import { useEffect } from 'react'
import { useRootStore } from 'stores'

const Posts = () => {
  const { user } = useRootStore()

  useEffect(() => {
    ProfileModel.fetchPosts({})
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <UserBasicDetails user={ProfileModel} />
      </Grid>
      <Grid item xs={12} md={8}>
        {user.isAuthorizedUser(ProfileModel.id) && (
          <LeaveComment
            inputValue=""
            onInputChange={(e: any) => {}}
            onSend={() => {}}
            avatarUrl={`${API_USER_AVATAR_URL}/${ProfileModel.avatar}`}
            label="user:whatsOnYourMind"
            filledBackground
          />
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ProfileModel.loading.has
            ? [1, 2].map((item) => (
                <Box key={item}>
                  {' '}
                  <PostCardSceleton />
                </Box>
              ))
            : ProfileModel.posts.map((post) => (
                <PostCard
                  post={post}
                  toggleLike={() => ProfileModel.toggleLike({ post_id: post.id })}
                />
              ))}
        </Box>
      </Grid>
    </Grid>
  )
}

export default observer(Posts)
