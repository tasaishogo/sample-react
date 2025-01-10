const accumulate = (items, target_key) => {
    return items.reduce((acc, item) => acc + Number(item[target_key] || 0), 0);
}

export const ProgressTracker = ({ title, unit, max, items, target_key }) => {
    console.log(target_key);
    const total = items ? accumulate(items, target_key) : 0;

    return (
        <div>
            <p>合計{title}： {total}/{max}({unit})</p>
        </div>
    )
}