import { writeFileSync, readFileSync } from "fs";

const data = JSON.parse(readFileSync("./data/posts.json", "utf8"));
data.posts.forEach((post) => {
  if (post.visible === "public") {
    const path = `./public/posts/content/${post.permalink}.html`;
    writeFileSync(path, post.p_es, "utf8");
    console.info("wrote", path);
  }
});
