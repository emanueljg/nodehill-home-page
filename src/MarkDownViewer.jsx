import ReactMarkdown from 'react-markdown';

export default function MarkDownViewer({ content }) {
  return <ReactMarkdown children={content} />
}