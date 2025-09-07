// src/ScrollToTop.jsx
import { useEffect, useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  // Disable automatic browser scroll restoration so we can control it.
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual"
      } catch (e) {
        // some browsers/iframes might throw; ignore safely
      }
    }
    // optional: restore to auto on unmount
    return () => {
      if ("scrollRestoration" in window.history) {
        try {
          window.history.scrollRestoration = "auto"
        } catch (e) {}
      }
    }
  }, [])

  // Scroll to top on every location change (route, search, hash)
  useEffect(() => {
    // If you have anchor/hash behavior you want to preserve, handle it first:
    if (hash) {
      const id = hash.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        // scroll to anchor if it exists
        el.scrollIntoView({ behavior: "auto" })
        return
      }
    }

    // Use requestAnimationFrame to avoid race with browser restore on popstate
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    })
  }, [pathname, search, hash])

  // Also listen to popstate/hashchange just in case (history.back / forward)
  useEffect(() => {
    const onBack = () => requestAnimationFrame(() => window.scrollTo(0, 0))
    window.addEventListener("popstate", onBack)
    window.addEventListener("hashchange", onBack)
    return () => {
      window.removeEventListener("popstate", onBack)
      window.removeEventListener("hashchange", onBack)
    }
  }, [])

  return null
}
