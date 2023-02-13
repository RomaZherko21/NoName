const numberRegex = /\d/

const vectorNextInput = (event: any, deleteCallback: any) => {
  if (event.key === 'Backspace') {
    deleteCallback()
    return -1
  }
  if (event.key.length === 1) {
    return 1
  }
  return 0
}

export const focusNextInput = (nextInputId: any) => {
  const nextInput = document.getElementById(`InputCell${nextInputId}`)

  if (nextInput) {
    nextInput.focus()
  }
}

export const onPasteEvent = (inputValues: any, changeInputValue: any) => (event: any) => {
  event.preventDefault()
  const data = event.clipboardData.getData('text')

  inputValues.forEach((item: any, index: number) => {
    const value = data[index] ?? null

    const elem: any = document.getElementById(item.name)

    if (elem) {
      elem.value = value
      changeInputValue(index, value)
    }
  })
}

export const onKeyDownEvent = (changeInputValue: any) => (event: any) => {
  const currentInputId = +event.target.id.match(numberRegex)
  const currentInputValue = event.key

  const charCode = String.fromCharCode(event.keyCode).toLowerCase()
  if ((event.ctrlKey || event.metaKey) && charCode) {
    return
  }

  if (currentInputValue.length === 1) {
    changeInputValue(currentInputId, currentInputValue)

    // eslint-disable-next-line no-param-reassign,no-self-assign
    event.target.value = currentInputValue
  }
  const deleteCallback = () => {
    changeInputValue(currentInputId, '')
    // eslint-disable-next-line no-param-reassign,no-self-assign
    event.target.value = ''
  }
  const nextInputId = currentInputId + vectorNextInput(event, deleteCallback)
  focusNextInput(nextInputId)

  if (nextInputId !== currentInputId) {
    event.preventDefault()
  }
}

export const onKeyUpEvent = (changeInputValue: any) => (event: any) => {
  const currentInputValue = event.target.value

  // 'Unidentified' is for additional ios-paste button (auto paste sms-code)
  // This key is used when an implementation is unable to identify key value,
  // due to either hardware, platform, or software constraints.
  if (event.key === 'Unidentified' && currentInputValue.length === 1) {
    const currentInputId = +event.target.id.match(numberRegex)
    changeInputValue(currentInputId, currentInputValue)

    focusNextInput(currentInputId + 1)
  }
}

export const onChangeEvent = (inputValues: any, changeInputValue: any) => (event: any) => {
  const data = event.target.value || ''

  // No triggers for auto paste sms-code on ios chrome browser(keyup/keydown),
  // only *onchange* event, therefore here is the condition
  if (data.length === 6) {
    inputValues.forEach((item: any, index: any) => {
      const value = data[index] ?? null

      const elem: any = document.getElementById(item.name)

      if (elem) {
        elem.value = value
        changeInputValue(index, value)
      }
    })
  }
}
