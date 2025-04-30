type ButtonProps = {
    id: string;
    label: string;
    onClick?: () => void;
}

export default function Button({id, label, onClick}: ButtonProps){
    return (
        <button id = {id} onClick={onClick}>{label}</button>
    )
}