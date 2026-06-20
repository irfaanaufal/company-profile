export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/images/logo.png"
            alt="PT Sindang Asih Makmur Logo"
            className={`${props.className || ""} object-contain`}
        />
    );
}
