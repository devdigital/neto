import { get } from './trello-service'

class BoardsService {
  getBoards() {
    return get('members/me/boards', {
      fields: 'id,name',
      filter: 'open',
    })
  }
  s
  getBoard(boardId) {
    return get(`boards/${boardId}`, {
      fields: 'id,name',
      lists: 'open',
      ['list_fields']: 'id,name,closed,pos',
    })
  }
}

export default new BoardsService()
