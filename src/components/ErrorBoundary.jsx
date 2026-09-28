import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Beacia site crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#faf6ef] px-6 text-center">
          <h1 className="font-serif text-2xl font-semibold text-[#2b1a10]">
            Something went wrong
          </h1>
          <p className="max-w-sm text-sm text-[#2b1a10]/70">
            This page hit an unexpected error. Reloading usually fixes it. If it keeps
            happening after an admin panel change, your browser's saved catalogue may need to
            be cleared.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-[#2b1a10] px-6 py-2.5 text-sm font-medium text-[#faf6ef]"
            >
              Reload page
            </button>
            <button
              onClick={() => {
                window.localStorage.removeItem('beacia-products')
                window.location.reload()
              }}
              className="rounded-full border border-[#c69a3e]/50 px-6 py-2.5 text-sm text-[#2b1a10]"
            >
              Reset catalogue &amp; reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
