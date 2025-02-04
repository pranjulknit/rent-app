export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'http://localhost:4050/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }