import { useAtom } from 'jotai';
import { recorder } from '../atoms/logAtom'

const styles = {
    span: {
        margin: '10px',
    }
};

export const LogList = ({ supabase }) => {
    const [logs, setLogs] = useAtom(recorder);
    const deleteLog = async (id, index) => {
        const { error } = await supabase
            .from('study-record')
            .delete()
            .eq('id', id)
        if (error) {
            throw error
        }
        setLogs(() => {
            const newLogs = [...logs]
            newLogs.splice(index, 1)
            return newLogs
        })
    }

    return (
        <ul>
            {logs.map((log, index) => (
                <li key={log.id} data-index={index}>
                    <span style={styles.span}>{log.title}： {log.time}時間</span>
                    <button onClick={() => { deleteLog(log.id, index) }}>削除</button>
                </li>
            ))}
        </ul>
    )
}