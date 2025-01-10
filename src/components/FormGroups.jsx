const styles = {
    formGroup: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    label: {
        marginRight: '10px',
    },
    input: {
        width: '50%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
};

export const FormGroups = ({ items }) => {
    return (
        <div>
            {items.map(({ label, key, type, placeholder, value, onChange }) => (
                <div style={styles.formGroup} key={key}>
                    <label style={styles.label} htmlFor={key}>{label}</label>
                    <input style={styles.input} id={key} type={type} placeholder={placeholder} value={value} onChange={onChange} />
                </div>
            ))}
        </div>
    )
}