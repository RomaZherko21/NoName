import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button, Grid, ToggleButton, ToggleButtonGroup, Typography, Paper } from '@mui/material'
import { HiOutlineUpload } from 'react-icons/hi'
import { MdOutlineGridView } from 'react-icons/md'
import { BsListUl } from 'react-icons/bs'

import { AsideFiltersBar } from 'shared/ui'
import { getSearchParamsObj } from 'shared/helpers'

import { FilesModel, sortConfig } from './model'
import { FileItem, FileItemRow, Storage } from './ui'

const FileManager = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState('module')

  const sortOptions = useMemo(() => sortConfig, [])

  useEffect(() => {
    FilesModel.debounceFetch({ searchParams: getSearchParamsObj(searchParams) })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FilesModel.pagination.currentPage, FilesModel.pagination.limit, searchParams])

  useEffect(() => {
    return () => {
      FilesModel.cleanModel()
    }
  }, [])

  const handleChange = (e: any, nextView: string) => {
    setView(nextView)
  }

  class FileModel {
    id: number
    name: string
    type: string
    size: string
    count?: number
    created_at: string
    is_favourite: boolean
    constructor(
      id: number,
      name: string,
      type: string,
      size: string,
      count: number,
      created_at: string,
      is_favourite: boolean
    ) {
      this.id = id
      this.name = name
      this.type = type
      this.size = size
      this.count = count
      this.created_at = created_at
      this.is_favourite = is_favourite
    }

    toggleFavourite(id: number) {
      files[id].is_favourite = !files[id].is_favourite
    }
  }

  let files: FileModel[] = []
  files.push(new FileModel(0, 'AWS Credentials', 'folder', '503.9 MB', 12, 'Feb 13, 2023', false))
  files.push(new FileModel(1, 'dev 2022', 'folder', '495.04 MB', 5, 'Feb 13, 2023', false))
  files.push(new FileModel(2, 'Personal-cv.pdf', 'pdf', '450.38 MB', 0, 'Feb 11, 2023', false))

  return (
    <Grid container spacing={3}>
      <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h4">{t('file:fileManager')}</Typography>
        <Button variant="contained" startIcon={<HiOutlineUpload />} sx={{ ml: 4 }}>
          {t('file:actions.upload')}
        </Button>
      </Grid>
      <Grid container xs={12}>
        <Grid xs={8} sx={{ p: 2 }}>
          <Grid component={Paper} elevation={16}>
            <AsideFiltersBar
              inputValue={searchParams.get('name') || ''}
              onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchParams((searchParams: URLSearchParams) => {
                  searchParams.set('name', e.target.value)
                  return searchParams
                })
              }}
              inputPlaceholder="file:actions.search"
              selectValue={
                `${searchParams.get('order_by')} ${searchParams.get('order_type')}` || ''
              }
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
              <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
                <ToggleButton value="module" sx={{ p: 1 }}>
                  <MdOutlineGridView size="18px" />
                </ToggleButton>
                <ToggleButton value="list" sx={{ p: 1 }}>
                  <BsListUl size="18px" />
                </ToggleButton>
              </ToggleButtonGroup>
            </AsideFiltersBar>
          </Grid>
          <Grid container sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {files.map((file) =>
              view === 'module' ? (
                <FileItem file={file} toggleFavourite={() => file.toggleFavourite(file.id)} />
              ) : (
                <FileItemRow file={file} toggleFavourite={() => file.toggleFavourite(file.id)} />
              )
            )}
          </Grid>
        </Grid>
        <Grid xs={4} sx={{ p: 2 }}>
          <Storage />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default observer(FileManager)
