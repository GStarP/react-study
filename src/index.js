import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useFriendStatus } from './diy-hook'

function Counter() {
  /**
   * Hook can only be used in function component
   * and can only be placed here (not in if or for...)
   */

  // State Hook
  // state is only created when first rendered
  const [count, setCount] = useState(0)
  // you can declare multiple states
  const [obj, setObj] = useState({ name: 'hxw' })

  return (
    <div>
      <p>counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <p>name: {obj.name}</p>
      <button
        onClick={() => setObj({ name: 'zzn' })}
      >Rename</button>
    </div>
  )
}

function Comp() {
  const [count, setCount] = useState(0)
  // Effect Hook
  // componentDidMount & componentDidUpdate & componentWillUnmount
  // after DOM update, this func will be called
  // dont need to execute synchronously, dont block refresh screen
  // so, if you want to measure, you should use useLayoutEffect
  useEffect(() => {
    document.title = count
  })

  return (
    <div>
      <p>counter: {count}</p>
      <button onClick={() => setCount(Math.random() > 0.5 ? count + 1 : count)}>Inc</button>
    </div>
  )
}

class API {
  friends = [true, false]
  dep = []

  subscribe(id, callback) {
    this.dep[id] = callback
  }

  update(id) {
    this.friends[id] = !this.friends[id]
    if(this.dep[id] !== undefined) {
      this.dep[id](this.friends[id])
    }
  }

  unsubscribe(id) {
    this.dep[id] = undefined
  }
}
const friendAPI = new API()

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null)
  // clearable effect
  useEffect(() => {
    function statusChangeHandller(status) {
      setIsOnline(status)
    }
    // subscribe change
    friendAPI.subscribe(props.id, statusChangeHandller)
    // return a func to clear effect
    // React will execute every time rerender this component
    return function clean() {
      friendAPI.unsubscribe(props.id)
    }
  })
  return <div>{getStatus(isOnline)}</div>
}

function getStatus(isOnline) {
  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}

function randomState() {
  const idx = Math.floor(Math.random() * friendAPI.friends.length)
  friendAPI.update(idx)
}

// use diy hook to reuse dependence
// you can use diy hook in multiple components and they wont conflict
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.id, friendAPI)
  return <div>{getStatus(isOnline)}</div>
}

function Page(props) {
  return (
    <>
      <Counter />
      <hr />
      <Comp />
      <hr />
      <FriendStatus id={1} />
      <FriendListItem id={0} />
      <button
        onClick={() => randomState()}
      >Random Status</button>
    </>
  )
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)
