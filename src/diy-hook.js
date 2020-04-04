import { useState, useEffect } from 'react'

// diy hook to reuse
// you can also pass props.id in so we can dynamically subscribe
export function useFriendStatus(id, api) {
  const [isOnline, setIsOnline] = useState(null)
  useEffect(() => {
    function statusChangeHandller(status) {
      setIsOnline(status)
    }
    api.subscribe(id, statusChangeHandller)
    return function clean() {
      api.unsubscribe(id)
    }
  })

  return isOnline
}