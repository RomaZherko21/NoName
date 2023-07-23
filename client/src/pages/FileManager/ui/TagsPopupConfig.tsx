import { FilesModel } from '../model'

export const getTagsPopupConfig = () => {
  return FilesModel.tags.map((tag) => {
    let isDisabled = Boolean(FilesModel.folder?.tags.find((item) => item.id === tag.id))

    return {
      key: tag.name,
      text: tag.name,
      disabled: isDisabled,
      onClick: () => {
        if (FilesModel.folder) {
          FilesModel.createTag(FilesModel.folder.id, tag.id)
        }
      }
    }
  })
}
