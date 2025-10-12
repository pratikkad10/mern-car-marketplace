import React from 'react'

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-muted-foreground text-sm">Loading cars...</p>
    </div>
  )
}

export default Loader