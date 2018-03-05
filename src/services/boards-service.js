import { get } from './trello-service'

class BoardsService {
  getBoards() {
    return get('members/me/boards', {
      fields: 'id,name',
      filter: 'open',
    })
  }
}

export default new BoardsService()
