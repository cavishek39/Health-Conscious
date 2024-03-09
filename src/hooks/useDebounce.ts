/**
 * It will take a function and a delay and return a new function that will only be called after the delay has passed.
 */

import { useCallback, useRef } from 'react'

export const useDebounce = (func, timeout) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    clearTimeout(timeout)
    if (immediate && !timeout) func.apply(context, args)
    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }, wait)
  }
}
