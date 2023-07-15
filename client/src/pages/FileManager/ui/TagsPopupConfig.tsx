import { FilesModel } from '../model'

export const getTagsPopupConfig = () =>
  // id: number
  {
    return [
      {
        text: `${FilesModel.tags}`,
        onClick: () => {
          console.log(`${FilesModel.fetchTags}`)

          FilesModel.createTag(1, 1, FilesModel.folder?.tag)
        }
      },

      {
        id: 2,
        text: 'tag2',
        onClick: () => {
          FilesModel.createTag(1, 2, FilesModel.folder?.tag)
        }
      },

      {
        text: 'tag3',
        onClick: () => {
          FilesModel.createTag(1, 3, 'tag3')
        }
      }
    ]
  }
