import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownRender from "./MarkdownRender";

function MarkdownWrapper() {
  const params = useParams();
  const [markdown, setMarkdown] = useState("");
  async function fetchMarkdown() {
    const response = await fetch(process.env.PUBLIC_URL + "/blogs/" + params.path + ".txt");
    const result = await response.text();
    setMarkdown(result);
  }
  useEffect(() => {
    fetchMarkdown();
  });
  return (
    <>
      <MarkdownRender markdown={markdown} />
    </>
  );
}

export default MarkdownWrapper;
