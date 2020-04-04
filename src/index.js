import React from 'react'
import ReactDOM from 'react-dom'

class DataSource {
  comments = [1, 2, 3]
  users = ['hxw', 'zzn', 'lxc']
  listeners = []
  registerChangeListener = (callback) => {
    this.listeners.push(callback)
  }
  triggerChange = () => {
    this.listeners.forEach(c => {
      c()
    })
  }
}

const datasource = new DataSource()

function subscribe(WrappedComponent, getData) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: getData(datasource)
      }
    }

    componentDidMount() {
      datasource.registerChangeListener(() => {
        this.setState({
          data: getData(datasource)
        })
      })
    }

    render() {
      return <WrappedComponent {...this.props} data={this.state.data} />
    }
  }
}

function CommontList(props) {
  return (
    <ul>
      {props.data.map(c => <li key={c}>{c}</li>)}
    </ul>
  )
}

function UserList(props) {
  return (
    <div>
      {props.data.map(u => <div key={u}>{u}</div>)}
    </div>
  )
}

const CommentListWithSub = subscribe(CommontList, (source) => source.comments)
const UserListWithSub = subscribe(UserList, (source) => source.users)

class Page extends React.Component {

  changeDataSource() {
    datasource.comments[0] = datasource.comments[0] === 1 ? 5 : 1
    datasource.users[0] = datasource.users[0] === 'hxw' ? 'dyx' : 'hxw'
    datasource.triggerChange() 
  }

  render() {
    return (
      <>
        <CommentListWithSub/>
        <UserListWithSub />
        <button onClick={() => this.changeDataSource()}>Change</button>
      </>
    )
  }
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
