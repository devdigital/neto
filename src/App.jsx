import React, { Component } from 'react'
import { trelloAuthorize } from './services/trello-service'

class App extends Component {
  componentDidMount() {
    const authorized = window.Trello.authorized()
    console.log(authorized)
    trelloAuthorize()
      .then(() => {
        const authorized = window.Trello.authorized()
        console.log(authorized)

        window.Trello.get(
          'members/me/boards',
          { filter: 'open', fields: 'id,name' },
          function(err, boards) {
            console.log(boards) // got them!
            console.log(err) // if something went wrong, this will be non-null
          }
        )
      })
      .catch(() => console.log('error'))
  }

  render() {
    return <p>Hello</p>
  }
}

export default App
