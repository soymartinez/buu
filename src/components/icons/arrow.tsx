export default function Arrow({ className }: { className: string }) {
    return (
        <svg
            width={12}
            height={12}
            viewBox='0 0 24 24'
            fill='currentColor'
            className={className}
        >
            <path
                d="m16.23 23.58 2.24-2a.5.5 0 0 0 0-.71L10.57 12l7.93-8.87a.5.5 0 0 0 0-.71l-2.24-2a.5.5 0 0 0-.71 0L5.2 12l10.32 11.54a.5.5 0 0 0 .71.04Z"
            />
        </svg>
    )
}
