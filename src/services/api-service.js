class ApiService {
  get(uri, filter, fields) {
    return new Promise((resolve, reject) => {
      window.Trello.get(
        uri,
        { filter, fields },
        data => resolve(data),
        error =>
          reject({
            statusCode: error.status,
            message: error.responseText,
          })
      )
    })
  }

  signIn() {
    return new Promise((resolve, reject) => {
      window.Trello.authorize({
        type: 'redirect',
        name: 'neto',
        scope: {
          read: 'true',
        },
        expiration: '30days',
        success: () => resolve(),
        error: () => reject(),
      })
    })
  }
}

export default new ApiService()
