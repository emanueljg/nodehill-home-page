export default function Image({ src, alt }) {
  // used for images from md/markdown:
  // for page posters set the of shown part of image in md:
  // -> src # -> left (percent), top (percent), className,[className]
  // for all other types of images in md src # -> className,[className]
  let extras = (src.split('#')[1] || '').split(',');
  alt = alt.split(':');
  while (src.includes('page-posters') && extras.length < 2) { extras.push('50%'); }
  return src.includes('page-posters') ?
    <>
      <span className={'page-poster-holder ' + extras.slice(2).join(' ')}>
        <img src={src} alt={alt.join(',text: ')}
          style={{ objectPosition: extras[0] + '% ' + extras[1] + '%' }}
        />
      </span>
      {alt[1] && <span class="poster-text">{alt[1]}</span>}
    </>
    :
    <img src={src} alt={alt} className={extras.join(' ')} />;
};