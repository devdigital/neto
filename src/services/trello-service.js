export const trelloAuthorize = () => {
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
