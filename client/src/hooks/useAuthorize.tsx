import { useMemo } from 'react'
import rootStore from 'stores/Root'

const useAuthorize = () =>
  useMemo(
    () => rootStore.authorization.isAuthorized,
    [rootStore.authorization.isAuthorized]
  )

export default useAuthorize
