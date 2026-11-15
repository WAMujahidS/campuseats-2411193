/*import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Could not save data:', error)
    }
  }, [key, value])

  return [value, setValue]
}
*/

import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    if (key === null) {
      return { key, value: initialValue }
    }

    try {
      const saved = localStorage.getItem(key)
      return {
        key,
        value: saved !== null ? JSON.parse(saved) : initialValue,
      }
    } catch {
      return { key, value: initialValue }
    }
  })

  // Load the correct value whenever the key changes
  useEffect(() => {
    if (key === null) {
      setStored({ key, value: initialValue })
      return
    }

    try {
      const saved = localStorage.getItem(key)
      setStored({
        key,
        value: saved !== null ? JSON.parse(saved) : initialValue,
      })
    } catch {
      setStored({ key, value: initialValue })
    }
  }, [key])

  // Save only when a valid key belongs to the current user
  useEffect(() => {
    if (key === null || stored.key !== key) return

    try {
      localStorage.setItem(key, JSON.stringify(stored.value))
    } catch (error) {
      console.error('Could not save data:', error)
    }
  }, [key, stored])

  function setValue(newValue) {
    setStored((previous) => {
      const currentValue =
        previous.key === key ? previous.value : initialValue

      const value =
        typeof newValue === 'function'
          ? newValue(currentValue)
          : newValue

      return { key, value }
    })
  }

  return [
    stored.key === key ? stored.value : initialValue,
    setValue,
  ]
}
