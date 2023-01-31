import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Stack, Avatar, IconButton, Button } from '@mui/material'
import { MdOutlinePhotoCameraBack } from 'react-icons/md'
import { FiLink } from 'react-icons/fi'
import { MdOutlineEmojiEmotions } from 'react-icons/md'

import { Input } from 'shared/ui'
import { useRootStore } from 'stores'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'

import { PostModel } from '../../model'

function LeaveComment() {
  const { t } = useTranslation()
  const { user } = useRootStore()

  return (
    <Stack alignItems="start" direction="row" width="100%" spacing={3}>
      <Avatar
        alt="User avatar"
        sx={{ width: 40, height: 40 }}
        src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
      />
      <Stack direction="column" spacing={3} sx={{ width: '100%' }}>
        <Input
          value={PostModel.commentInputValue}
          onChange={(e: any) => {
            PostModel.commentInputValue = e.target.value
          }}
          placeholder="user:actions.writeYourComment"
          multiline={true}
          rows={3}
        />

        <Stack direction="row" sx={{ mt: 2 }} alignItems="center" justifyContent="space-between">
          <Stack direction="row">
            <IconButton aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <MdOutlinePhotoCameraBack />
            </IconButton>
            <IconButton aria-label="link" component="label">
              <FiLink />
            </IconButton>
            <IconButton aria-label="choose emoji" component="label">
              <MdOutlineEmojiEmotions />
            </IconButton>
          </Stack>

          <Button
            onClick={() => {
              if (PostModel.isEditActive) {
                PostModel.editComment()
              } else {
                PostModel.addNewComment()
              }
            }}
            variant="contained"
          >
            {PostModel.isEditActive ? t('actions.save') : t('actions.send')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default observer(LeaveComment)
