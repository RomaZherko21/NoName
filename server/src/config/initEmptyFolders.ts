import {
  FILE_MANAGER_FOLDER,
  KANBAN_ATTACHMENTS_FOLDER,
  POST_FOLDER,
  USER_AVATAR_FOLDER,
} from 'shared/consts'
import { createNonExistFolder, log } from 'shared/helpers'
import { FileFormat } from 'shared/types'

export const initEmptyFolders = () => {
  try {
    createNonExistFolder(USER_AVATAR_FOLDER)

    createNonExistFolder(POST_FOLDER)

    createNonExistFolder(KANBAN_ATTACHMENTS_FOLDER)

    Object.entries(FileFormat).forEach(([key]) => {
      createNonExistFolder(`${FILE_MANAGER_FOLDER}/${key}`)
    })

    log.positive(`All folders where initialized successfully`)
  } catch (error: any) {
    log.negative(`Error while initialize empty folders: ${error.message}`)
  }
}
