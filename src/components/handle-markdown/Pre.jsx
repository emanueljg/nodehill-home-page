export default function Pre({ children }) {

  function processPosterImage() {

    const defaults = {
      "src": "",
      "alt": "an image",
      "text": "",
      "position": [50, 50],
      "positionSmall": [50, 50],
      "textPosition": ["center", 0, 50],
      "textPositionSmall": ["center", 0, 50],
      // add in code
      "pattern": "big-odd-black",
      "patternOpacity": 0.5
    };

    const s = JSON.parse(children[0].props.children);
    s.position && (s.positionSmall = s.positionSmall || s.position);
    s.textPosition && (s.textPositionSmall = s.textPositionSmall || s.textPosition);
    const d = Object.assign(defaults, s);

    const align = { left: 'text-start', center: 'text-center', right: 'text-end' };
    const alignBig = align[d.textPosition[0]] || 'text-center';
    const alignSmall = align[d.textPositionSmall[0]] || 'text-center';

    const bigTextCss = {
      marginTop: -((100 - d.textPosition[2]) / 5 + 4) + 'vw',
      ['padding' + (d.textPosition[0] === 'right'
        || (d.textPosition[0] === 'center' && d.textPosition[1] < 0) ?
        'Right' : 'Left')]
        : Math.max(4, Math.abs(d.textPosition[1])) + 'vw'
    };
    const smallTextCss = {
      marginTop: -((100 - d.textPositionSmall[2]) / 3.333 + 16) + 'vw',
      ['padding' + (d.textPositionSmall[0] === 'right'
        || (d.textPositionSmall[0] === 'center' && d.textPositionSmall[1] < 0) ?
        'Right' : 'Left')]
        : Math.max(4, Math.abs(d.textPositionSmall[1])) + 'vw'
    };

    const patternCss = {
      opacity: d.patternOpacity,
      backgroundImage: `url("/images/patterns/${d.pattern}.png")`
    };

    return <>
      <span className={'big-poster-image ' + d.className}>
        <span className={'page-poster-holder ' + d.className}>
          <img
            src={d.src} alt={d.alt}
            style={{ objectPosition: d.position[0] + '% ' + d.position[1] + '%' }}
          />
          <div className="pseudo-filter" style={patternCss}></div>
        </span>
        {d.text && <span
          className={'poster-text ' + alignBig}
          style={bigTextCss}
        >
          {[...d.text].map(x => <span>{x}</span>)}
        </span>}
      </span>
      <span className={'small-poster-image ' + d.className}>
        <span className={'page-poster-holder ' + d.className}>
          <img
            src={d.src} alt={d.alt}
            style={{ objectPosition: d.positionSmall[0] + '% ' + d.positionSmall[1] + '%' }}
          />
          <div className="pseudo-filter" style={patternCss}></div>
        </span>
        {d.text && <span
          className={'poster-text ' + alignSmall}
          style={smallTextCss}
        >
          {[...d.text].map(x => <span>{x}</span>)}
        </span>}
      </span>
    </>;
  }

  return (children?.[0]?.props?.className || '').includes('poster-image') ?
    processPosterImage() : <pre>{children}</pre>;
}