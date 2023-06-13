import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import LoadingModel from 'models/Loading'
import { API } from 'services'

class NavBarModel {
  boards: any[] = []
 
  loading: LoadingModel

  constructor() {
    makeAutoObservable(this)

    this.loading = new LoadingModel()
 
  }

  async fetchBoards() {
    try {
       this.loading.begin()
      
      const data = await API.kanban.getBoards()
      this.boards = data.map((item) => ({ text: item.name, to: `/kanban/${item.id}`, }))
      
    } catch (err: any) {
      toast.error(err)
    } finally {
      this.loading.reset()
    }
  }
 
}

const model = new NavBarModel()

export default model

