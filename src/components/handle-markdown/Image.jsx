export default function Image({ src, alt }) {
  // src # -> className,[className]
  let extras = (src.split('#')[1] || '').split(',');
  return <img src={src} alt={alt} className={extras.join(' ')} />;
};