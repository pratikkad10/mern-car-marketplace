import React from 'react'

const Review = ({ review }) => {
    const rating = Math.max(0, Math.min(5, Number(review.rating) || 0))
    
    return (
        <div className="bg-white/70 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-lg p-6 shadow-lg h-48 w-full flex flex-col justify-between text-gray-800 dark:text-white">
            <div>
                <div className="flex items-center mb-3">
                    <div className="text-yellow-500 text-lg">
                        {Array.from({ length: rating }).map((_, i) => (
                            <span key={i}>★</span>
                        ))}
                        {Array.from({ length: 5 - rating }).map((_, i) => (
                            <span key={`e-${i}`} className="text-gray-300">★</span>
                        ))}
                    </div>
                </div>
                
                <p className="text-gray-600 dark:text-white/70 text-sm italic line-clamp-3">
                    "{review.text}"
                </p>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center text-primary font-semibold text-sm">
                    {review.initials}
                </div>
                <div>
                    <p className="font-medium text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500 dark:text-white/60">{review.title}</p>
                </div>
            </div>
        </div>
    )
}

export default Review