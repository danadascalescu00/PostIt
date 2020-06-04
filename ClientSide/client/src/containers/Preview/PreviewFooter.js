import React from 'react'

function getFooter(previewType, content) {
    if (previewType === 'facebook')
        return <span className="facebookFooter">
            <span>
                <img className="reaction" src="/images/like.png" />
                {content.reactions.likes}
            </span>

            <span className="rightAlign">
                {content.reactions.comments} comments
            </span>
        </span>
    if (previewType === 'twitter')
        return <span >
            {content.reactions.retweets} Retweets {content.reactions.likes} Likes
        </span>
    return <>previewType not found: {previewType}</>
}

export default function PreviewFooter({ previewType, content }) {
    return (
        <div className="previewFooter">
            {getFooter(previewType, content)}
        </div>
    )
}
