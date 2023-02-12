import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'
import { Box, Stack } from '@mui/material'

import { getSearchParamsObj } from 'shared/helpers'

import { AsideChatSelector, Header, LeaveMessage, Messages } from './ui'
import { ChatModel } from './model'

function Chat() {
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    {
      searchParams.get('name') &&
        ChatModel.debounceFetch({ searchParams: getSearchParamsObj(searchParams) })
    }

    return () => {
      ChatModel.cleanModel()
    }
  }, [searchParams])

  return (
    <Box
      display="flex"
      sx={{ display: 'flex', borderTop: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <AsideChatSelector
        inputValue={searchParams.get('name') || ''}
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchParams((searchParams: URLSearchParams) => {
            searchParams.set('name', e.target.value)
            return searchParams
          })
        }}
        contacts={ChatModel.users}
        clearContacts={() => {
          setSearchParams((searchParams: URLSearchParams) => {
            searchParams.set('name', '')
            return searchParams
          })
        }}
      />
      <Stack sx={{ width: '100%', height: '100%' }}>
        <Header />
        <Messages />
        <LeaveMessage />
      </Stack>
    </Box>
  )
}

export default observer(Chat)
