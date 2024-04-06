import { Link } from "react-router-dom"

function Home({ links }: { links: { title: string, path: string }[] }) {
  const linkItems = links.map((link, index) => <li key={index}><Link to={link.path}>{link.title}</Link></li>);
  return (
    <>
      <ul>{linkItems}</ul>
    </>
  );
}

export default Home;
