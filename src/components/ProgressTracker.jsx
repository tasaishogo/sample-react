import React from 'react';
import { useAtom } from 'jotai';
import { recorder } from '../atoms/logAtom'

const accumulate = (items, target_key) => {
    return items.reduce((acc, item) => acc + Number(item[target_key] || 0), 0);
}

export const ProgressTracker = React.memo(({ title, unit, max, target_key }) => {
    const [items] = useAtom(recorder);
    const total = items ? accumulate(items, target_key) : 0;

    return (
        <div>
            <p>合計{title}： {total}/{max}({unit})</p>
        </div>
    )
})