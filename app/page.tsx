import Desktop from "@/components/Desktop";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return (
    <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Desktop posts={posts} />
    </main>
  );
}
