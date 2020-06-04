import React from 'react'

export default function PreviewContent({ previewType, content }) {
    return (
        <div className="previewContent">
            {content.text}
        </div>
    )
}
