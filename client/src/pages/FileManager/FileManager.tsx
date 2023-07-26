import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { HiOutlineUpload } from 'react-icons/hi'
import { MdOutlineGridView } from 'react-icons/md'
import { BsListUl } from 'react-icons/bs'

import { PageHeader } from 'widgets'
import { AsideFiltersBar } from 'shared/ui'

import { FilesModel, sortConfig } from './model'
import { FileItemCard, FileItemRow, Storage, AsideFileInfo } from './ui'

enum ViewType {
  card = 'card',
  list = 'list'
}

const FileManager = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [view, setView] = useState<ViewType>(ViewType.card)
  const [openFileInfo, setOpenFileInfo] = useState(false)

  const sortOptions = useMemo(() => sortConfig, [])

  useEffect(() => {
    FilesModel.fetch({})
    FilesModel.fetchTags()
  }, [searchParams])

  useEffect(() => {
    return () => {
      FilesModel.cleanModel()
    }
  }, [])

  return (
    <>
      <PageHeader pageName={t('page:fileManager')} breadcrumbs={[{ text: 'page:fileManager' }]}>
        <Grid item>
          <Button variant="contained" startIcon={<HiOutlineUpload />} sx={{ ml: 4 }} size="small">
            {t('actions.upload')}
          </Button>
        </Grid>
      </PageHeader>

      <Grid container xs={12} spacing={2}>
        <Grid item xs={12} lg={8}>
          <AsideFiltersBar
            inputValue={searchParams.get('name') ?? ''}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchParams((searchParams: URLSearchParams) => {
                searchParams.set('name', e.target.value)
                return searchParams
              })
            }}
            inputPlaceholder="actions.search"
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
            isShowFilter={false}
          >
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(_, nextView: ViewType) => {
                setView(nextView)
              }}
            >
              <ToggleButton value={ViewType.card} sx={{ p: 1, fontSize: 18 }}>
                <MdOutlineGridView />
              </ToggleButton>
              <ToggleButton value={ViewType.list} sx={{ p: 1, fontSize: 18 }}>
                <BsListUl />
              </ToggleButton>
            </ToggleButtonGroup>
          </AsideFiltersBar>

          <Grid item container spacing={2} sx={{ mt: 1 }}>
            {FilesModel.folders.map((folder) =>
              view === ViewType.card ? (
                <Grid key={folder.name} item xs={12} md={6} lg={4}>
                  <FileItemCard
                    folder={folder}
                    toggleFavourite={() => {
                      FilesModel.toggleFavourite(folder.name)
                    }}
                    handleOpenFileInfo={() => {
                      setOpenFileInfo(true)
                    }}
                  />
                </Grid>
              ) : (
                <Grid key={folder.name} item xs={12}>
                  <FileItemRow
                    folder={folder}
                    toggleFavourite={() => {
                      FilesModel.toggleFavourite(folder.name)
                    }}
                    handleOpenFileInfo={() => {
                      setOpenFileInfo(true)
                    }}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Storage />
        </Grid>
      </Grid>

      <AsideFileInfo
        openFileInfo={openFileInfo}
        onCloseFileInfo={() => {
          setOpenFileInfo(false)
        }}
      />
    </>
  )
}

export default observer(FileManager)
