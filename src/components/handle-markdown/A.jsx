export default function H3({ href, children }) {
  return href === '#poster-text' ?
    <span className="poster-text">{children}</span> :
    <a href={href}>{children}</a>;
}