import apiService from './api-service'

class BoardsService {
  getBoards() {
    return apiService.get('members/me/boards', 'open', 'id,name')
  }
}

export default new BoardsService()
