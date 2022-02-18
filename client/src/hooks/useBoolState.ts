import { useCallback, useState } from 'react'

const useBoolState = (
  initialValue: boolean | (() => boolean)
): [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState(initialValue)
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggleValue = useCallback(() => setValue(!value), [value])

  return [value, setTrue, setFalse, toggleValue]
}

export default useBoolState
