import React from 'react';

export const PreviewList = React.memo(({ items }) => {
    return (
        <div>
            {items.map(({ label, value }) => (
                <p key={label}>入力されている{label}：{value}</p>
            ))}
        </div>
    )
})