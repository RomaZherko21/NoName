import { FilesModel } from '../model'

export const getTagsPopupConfig = () => {
  return FilesModel.tags.map((tag) => {
    return {
      key: tag.name,
      text: tag.name,
      onClick: () => {
        if (FilesModel.folder) {
          FilesModel.createTag(FilesModel.folder.id, tag.id)
        }
      }
    }
  })
}
