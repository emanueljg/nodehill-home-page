export default function Pre({ children }) {

  function processPosterImage() {

    const defaults = {
      "src": "",
      "alt": "an image",
      "text": "",
      "textSmall": "",
      "position": [50, 50],
      "positionSmall": [50, 50],
      "textPosition": ["center", 0, 50],
      "textPositionSmall": ["center", 0, 50],
      "pattern": "big-odd-black",
      "patternOpacity": 0.5,
      "patternSmall": "small-odd-black",
      "patternOpacitySmall": 0.8,
      "className": ""
    };

    const s = JSON.parse(children[0].props.children);
    s.position && (s.positionSmall = s.positionSmall || s.position);
    s.text && (s.textSmall = s.textSmall || s.text);
    s.textPosition && (s.textPositionSmall = s.textPositionSmall || s.textPosition);
    s.pattern && (s.patternSmall = s.patternSmall || s.pattern.replace(/big/, 'small'));
    s.patternOpacity && (s.patternOpacitySmall = s.patternOpacitySmall || s.patternOpacity)
    s.text && !s.alt && (s.alt = s.text);
    const d = Object.assign(defaults, s);

    d.text.split(' ').length % 2 === 0 && (d.text = ' ' + d.text);

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
      marginTop: -((100 - d.textPositionSmall[2]) / 2.8 + 12) + 'vw',
      ['padding' + (d.textPositionSmall[0] === 'right'
        || (d.textPositionSmall[0] === 'center' && d.textPositionSmall[1] < 0) ?
        'Right' : 'Left')]
        : Math.max(4, Math.abs(d.textPositionSmall[1])) + 'vw'
    };

    const patternCss = {
      opacity: d.patternOpacity,
      backgroundImage: `url("/images/patterns/${d.pattern}.png")`
    };

    const smallPatternCss = {
      opacity: d.patternOpacitySmall,
      backgroundImage: `url("/images/patterns/${d.patternSmall}.png")`
    };

    return <>
      <span className={'big-poster-image ' + d.className}>
        <span className={'page-poster-holder'}>
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
          {d.text.split(' ').map(x => <span>{x.includes('\n') ? <br /> : ''}{x} </span>)}
        </span>}
      </span>
      <span className={'small-poster-image ' + d.className}>
        <span className={'page-poster-holder'}>
          <img
            src={d.src} alt={d.alt}
            style={{ objectPosition: d.positionSmall[0] + '% ' + d.positionSmall[1] + '%' }}
          />
          <div className="pseudo-filter" style={smallPatternCss}></div>
        </span>
        {d.text && <span
          className={'poster-text ' + alignSmall}
          style={smallTextCss}
        >
          {d.textSmall.split(' ').map(x => <span>{x.includes('\n') ? <br /> : ''}{x} </span>)}
          <span />{/* This empty span -> Safari center fix */}
        </span>}
      </span>
    </>;
  }

  return (children?.[0]?.props?.className || '').includes('poster-image') ?
    processPosterImage() : <pre>{children}</pre>;
}