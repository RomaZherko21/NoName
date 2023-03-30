export const getKanbanPopupConfig = (id: number) => [
    {
      text: 'actions.clear',
      onClick: () => {
        console.log(id)
      }
    },
    {
      text: 'actions.delete',
      onClick: () => {
        console.log(id)
      }
    }
  ]