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
    const key = 'd97ebb62dc6a94fda5b7625489fe22a6'
    let redirectUri = 'http://neto.netlify.com/signed-in'
    redirectUri = 'http://localhost:1234/signed-in'
    const expiration = '30days'
    const uri = `https://trello.com/1/authorize?response_type=token&key=${key}&redirect_uri=${redirectUri}&callback_method=fragment&scope=read&expiration=${expiration}&name=neto`

    window.location = uri

    // return new Promise((resolve, reject) => {
    //   window.Trello.authorize({
    //     type: 'redirect',
    //     name: 'neto',
    //     scope: {
    //       read: 'true',
    //     },
    //     expiration: '30days',
    //     success: () => resolve(),
    //     error: () => reject(),
    //   })
    // })
  }
}

export default new ApiService()
