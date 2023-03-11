import ReactMarkdown from 'react-markdown';
import Image from './Image';
import Pre from './Pre';

export default function MarkDownViewer({ mdContent, path }) {
  return <div className={path.slice(1).replace(/\//g, '-')}>
    <div className="row">
      <div className="col">
        <ReactMarkdown children={mdContent} components={{
          'img': Image,
          'pre': Pre
        }} />
      </div>
    </div>
  </div>;
}