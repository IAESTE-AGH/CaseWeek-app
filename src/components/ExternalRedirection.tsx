interface ExternalRedirectionProps {
    to: string
    label?: string
}

const ExternalRedirection: React.FunctionComponent<ExternalRedirectionProps> = (props) => {
    const url = props.to.startsWith("https") || props.to.startsWith("http") ? props.to : `https://${props.to}`

    return (
        <a
            href={url} //
            target="_blank"
            rel="noreferrer"
        >
            {props.label ?? props.to}
        </a>
    )
}

export default ExternalRedirection
