const ContactMap = ({ address }: { address: string }) => {
    const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    return (
        <div className="ratio ratio-16x9 rounded overflow-hidden shadow">
            <iframe
                src={src}
                title={`Mapa dojazdu: ${address}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
            />
        </div>
    );
};

export default ContactMap;