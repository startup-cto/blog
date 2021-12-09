export default function Post({ title }) {
  return <div>{title}</div>
}

export async function getStaticPaths() {
  return {paths:['/test'], fallback: false}
}

export async function getStaticProps() {
  return { props: { title: 'Title' } }
}
