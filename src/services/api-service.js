class ApiService {
  get(uri, filter, fields) {
    return new Promise((resolve, reject) => {
      window.Trello.get(uri, { filter, fields }, data => resolve(data), error => reject({
          statusCode: error.status, 
          message: error.responseText
        })) 
    })
  }
}

export default new ApiService()

