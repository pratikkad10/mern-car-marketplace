import { review } from '../lib/review'
import React from 'react'

const Review = () => {
    return (
        <div className="py-12 flex flex-row gap-2 px-4">
            <div className="bg-card text-card-foreground p-4 rounded shadow mb-4 max-w-md mx-auto">
                {/* Stars */}
                <div className="text-yellow-500 mb-2">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>

                {/* Review text */}
                <p className="text-muted-foreground mb-3 italic">"{review.text}"</p>

                {/* Author info */}
                <div className="flex items-center">
                    <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center mr-2 text-foreground">
                        {review.initials}
                    </div>
                    <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review