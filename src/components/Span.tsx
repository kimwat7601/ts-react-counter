type SpanProps = {
    id: string;
    count: number;
    className: string;
}
export default function Span({id, count, className}: SpanProps) {
    return (
        <span id={id} className={className}>{count}</span>
    )
}