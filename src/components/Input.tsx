type InputProps = {
    id: string;
    type: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: string | number;
}

export default function Input({id, type, name, value='1', onChange}: InputProps) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            min = '1'
        />
    )
}