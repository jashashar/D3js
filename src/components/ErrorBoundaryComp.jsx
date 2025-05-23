import React from 'react'

const ErrorBoundaryComp = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <p>Error is {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorBoundaryComp
