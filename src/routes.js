import React from 'react'
import Home from './home/Home'
import Board from './board/Board'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'board',
    path: '/boards/:boardId',
    component: Board,
  },
]

class Routes {
  constructor() {
    this.routes = []
  }

  addRange(newRoutes) {
    this.routes = this.routes.concat(newRoutes)
  }

  add(name, path, component) {
    this.routes.push({
      name,
      path,
      component,
    })
  }

  get(name) {
    if (!name) {
      return null
    }

    return this.routes.find(r => r.name === name)
  }

  getAll() {
    return this.routes
  }
}

const allRoutes = new Routes()
allRoutes.addRange(routes)
export default allRoutes
