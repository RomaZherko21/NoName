import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import { API } from 'services'
import { KanbanBoard } from 'shared/types'

class NavBarModel {
  boards: KanbanBoard[] = []
 
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
 
  }

  async fetchBoards() {
    try {
       this.loading.begin()
      
      this.boards = await API.kanban.getBoards()
      console.log(this.boards)
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }
 
}

const model = new NavBarModel()

export default model

