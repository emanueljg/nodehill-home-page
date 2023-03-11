import ReactMarkdown from 'react-markdown';
import Image from './Image';
import A from './A';

export default function MarkDownViewer({ mdContent, path }) {
  return <div className={path.slice(1).replace(/\//g, '-')}>
    <div className="row">
      <div className="col">
        <ReactMarkdown children={mdContent} components={{
          'img': Image,
          'a': A
        }} />
      </div>
    </div>
  </div>;
}