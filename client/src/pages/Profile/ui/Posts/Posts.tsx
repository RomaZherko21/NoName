import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Grid } from '@mui/material'

import { useRootStore } from 'stores'
import { PostCard, PostCardSceleton, BasicInfo } from 'entities'
import { LeaveComment } from 'shared/ui'
import { API_USER_AVATAR_URL } from 'shared/consts'
import { ProfileModel } from 'pages/Profile/model'

const Posts = () => {
  const { user } = useRootStore()

  useEffect(() => {
    ProfileModel.fetchPosts({})
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <BasicInfo user={ProfileModel} />
      </Grid>

      <Grid item xs={12} md={8}>
        {user.isAuthorizedUser(ProfileModel.id) && (
          <LeaveComment
            inputValue=""
            onInputChange={() => {}}
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
                  key={post.id}
                  post={post}
                  toggleLike={async () => {
                    await ProfileModel.toggleLike({ postId: post.id })
                  }}
                />
              ))}
        </Box>
      </Grid>
    </Grid>
  )
}

export default observer(Posts)
