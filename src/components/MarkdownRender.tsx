import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

function MarkdownRender({ markdown }: { markdown: string }) {
  return (
    <>
      <Markdown 
        className="markdown-body"
        remarkPlugins={[remarkGfm, remarkMath]} 
        rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]}
      >
        {markdown}
      </Markdown>
    </>
  );
}

export default MarkdownRender;
