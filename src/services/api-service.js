class ApiService {
  get(uri, filter, fields) {
    return new Promise((resolve, reject) => {
      window.Trello.get(uri, { filter, fields }, function(err, data) {
        if (err) {
          reject(err)
          return
        }

        resolve(data)
      })
    })
  }
}

export default new ApiService()

