import Image from "next/image";

export default function Toplogo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Image
        src="https://github.com/user-attachments/assets/efc098f8-1883-494f-9489-8e633eb20587"
        alt="zdjęcie nagłówka"
        sizes="90vw"
        width={1536}
        height={1024}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '1000px',
          marginBottom: '12px',
        }} />
      <Image
        src="/img/logos/podkarpackie.jpg"
        alt="logo"
        sizes="90vw"
        width={1200}
        height={100}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '1000px',
        }} />

    </div>
  );
}
