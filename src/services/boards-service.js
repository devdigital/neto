import { get } from './trello-service'

class BoardsService {
  getBoards() {
    return get('members/me/boards', {
      fields: 'id,name',
      filter: 'open',
    })
  }

  getBoard(boardId) {
    return get(`boards/${boardId}`, {
      fields: 'id,name',
      lists: 'open',
      ['list_fields']: 'id,name,closed,pos',
    })
  }

  getList(listId) {
    const list = get(`lists/${listId}`, { fields: 'id,name' })
    const cards = get(`lists/${listId}/cards`, {
      fields: 'id,name,closed,pos',
      members: true,
      ['member_fields']: 'username,fullName,avatarHash',
    })

    return Promise.all([list, cards]).then(values => ({
      ...values[0],
      cards: values[1],
    }))
  }
}

export default new BoardsService()
