import { useCallback, useRef, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Could not read "${key}" from local storage:`, error)
      return initialValue
    }
  })
  const valueRef = useRef(storedValue)

  const setValue = useCallback((value) => {
    const valueToStore = value instanceof Function ? value(valueRef.current) : value
    valueRef.current = valueToStore
    setStoredValue(valueToStore)

    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      console.error(`Could not save "${key}" to local storage:`, err)
    }
  }, [key])

  return [storedValue, setValue]
}
