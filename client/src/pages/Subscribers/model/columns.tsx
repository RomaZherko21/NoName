import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import i18next from 'i18next'
import { IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InfoIcon from '@mui/icons-material/Info'

import { useDialog } from 'shared/hooks'
import { Subscriber, TableColumn } from 'shared/types'
import { getFullName, reformatDates } from 'shared/helpers'

import SubscribersModel from './Subscribers.model'
import { SubscriberForm, DeleteSubscriberDialog } from '../ui'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from 'shared/consts'

const ActionButtons = observer(({ subscriber }: { subscriber: Subscriber }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const showMoreInfo = () => {
    navigate(generatePath(ROUTES.SUBSCRIBER, { id: String(subscriber.id) }))
  }

  const [showUpdateUserModal] = useDialog('user:form.updateUser', (hideModal) => (
    <SubscriberForm
      user={subscriber}
      onSubmit={(value: Subscriber) => {
        if (subscriber.id) {
          SubscribersModel.update(value, subscriber.id)
          hideModal()
        }
      }}
    />
  ))

  const removeUser = useCallback(
    () => subscriber.id && SubscribersModel.remove(subscriber.id),
    [subscriber.id]
  )

  const [showConfirmationModal] = useDialog(
    'notification:removeConfirm',
    (onClose) => <DeleteSubscriberDialog onSubmit={removeUser} onClose={onClose} />,
    true
  )

  return (
    <>
      <Tooltip title={t('actions.edit') || 'edit'} placement="top">
        <IconButton aria-label="edit" size="small" onClick={showUpdateUserModal}>
          <EditOutlinedIcon color="secondary" fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('actions.delete') || 'delete'} placement="top">
        <IconButton aria-label="delete" size="small" onClick={showConfirmationModal}>
          <DeleteIcon color="error" fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('actions.info') || 'info'} placement="top">
        <IconButton aria-label="info" size="small" onClick={() => showMoreInfo()}>
          <InfoIcon color="warning" fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  )
})

export const getColumns = (): TableColumn[] => [
  {
    key: 'id',
    title: 'id',
  },
  {
    key: 'name',
    title: i18next.t('fields.fullName'),
    getValue: ({ name, surname, middle_name }: Subscriber) => (
      <Typography color="textPrimary" variant="body1">
        {getFullName(name, surname, middle_name)}
      </Typography>
    ),
  },
  {
    key: 'date_of_birth',
    title: i18next.t('fields.dateOfBirth'),
    getValue: (row: Subscriber) => reformatDates(row.date_of_birth || ''),
  },
  {
    key: 'tel_number',
    title: i18next.t('fields.telNumber'),
  },
  {
    key: 'actions',
    title: i18next.t('common.actions'),
    align: 'right',
    getValue: (row: Subscriber) => <ActionButtons subscriber={row} />,
  },
]
