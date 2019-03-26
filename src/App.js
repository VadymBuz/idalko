import React, { Component } from 'react'
import dotProp from 'dot-prop-immutable'
import './App.css'

const headers = new Headers({
  'X-exalate-jwt': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNTU3MDU4OmFkYTc3YTcyLTU2YTktNGExOS05YzIzLTdkNjZlNDgxMzg4MyIsImlzcyI6IkVYQUxBVEUiLCJleHAiOjE1NTM2MDg3ODg5ODd9.lkdWFPRHPmKuTzHc4oj5zkyMeZbG54MIrVORat3JMWw'
})
const apiUrlLeft = 'https://413f506d.ngrok.io/rest/issuehub/4.0/scopeparams/search'
const apiUrlRight = 'https://413f506d.ngrok.io/rest/issuehub/4.0/scopeparams/remote/search'
const searchFetchParams = {
  method: 'GET',
  headers: headers,
  cache: 'default'
}

class App extends Component {
  state = {
    leftFetchedProjects: [],
    rightFetchedProjects: [],

    leftSearch: '',
    rightSearch: '',

    leftSelected: null,
    rightSelected: null,

    projects: [],
  }

  handleSearch = (e, side) => {
    if (side === 'left') {
      this.setState({leftSearch: e.target.value}, () => this.search(side))
    } else {
      this.setState({rightSearch: e.target.value}, () => this.search(side))
    }
  }

  handleProjectSelect = (project, side) => {
    if (side === 'left') {
      this.setState({leftSearch: project.name, leftSelected: project})
    } else {
      this.setState({rightSearch: project.name, rightSelected: project})
    }
  }

  handleAdd = (side) => {
    if (side === 'left') {
      this.setState((prevState) => {
        return {
          projects: [...prevState.projects, {left: prevState.leftSelected, right: null}],
          leftSelected: null,
          leftSearch: '',
          leftFetchedProjects: []
        }
      })
    } else {
      this.setState((prevState) => {
        const lastProject = prevState.projects.length - 1
        return {
          projects: dotProp.set(prevState.projects, `${lastProject}.right`, prevState.rightSelected),
          rightSelected: null,
          rightSearch: '',
          rightFetchedProjects: []
        }
      })
    }
  }

  search (side) {
    if (side === 'left') {
      fetch(`${apiUrlLeft}?project=${this.state.leftSearch}`, searchFetchParams)
        .then(res => res.json())
        .then(res => this.setState({leftFetchedProjects: res.results}))
        .catch(err => console.log(err))
    } else {
      fetch(`${apiUrlRight}?project=${this.state.rightSearch}`, searchFetchParams)
        .then(res => res.json())
        .then(res => this.setState({rightFetchedProjects: res.results}))
        .catch(err => console.log(err))
    }
  }

  render () {
    const {leftFetchedProjects, rightFetchedProjects, projects, leftSearch, rightSearch, leftSelected, rightSelected} = this.state
    return (
      <div className="App">
        <ul style={{width: '500px'}}>
          {projects.map(proj => <li key={proj.name} style={{display: 'flex'}}>
            {proj.left.name}
            ----
            {proj.right ? proj.right.name : <div style={{width: '200px'}}>
              <input value={rightSearch} onChange={(e) => this.handleSearch(e, 'right')}/>
              {rightSelected && <button onClick={() => this.handleAdd('right')}>add</button>}
              <ul>
                {rightFetchedProjects.map((project, index) => {
                  return <li key={index} onClick={(e) => this.handleProjectSelect(project, 'right')}>{project.name}</li>
                })}
              </ul>
            </div>}
          </li>)}
        </ul>
        <div style={{width: '500px'}}>
          <input value={leftSearch} onChange={(e) => this.handleSearch(e, 'left')}/>
          {leftSelected && <button onClick={() => this.handleAdd('left')}>add</button>}
          <ul>
            {leftFetchedProjects.map((project, index) => {
              return <li key={index} onClick={(e) => this.handleProjectSelect(project, 'left')}>{project.name}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
