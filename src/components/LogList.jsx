export const LogList = ({ logs }) => {
    return (
        <ul>
            {logs.map((log) => (
                <li key={log.title}>
                    {log.title}： {log.time}時間
                </li>
            ))}
        </ul>
    )
}