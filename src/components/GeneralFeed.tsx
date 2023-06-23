import { INFINITY_SCROLLING_PAGINATION_RESULTS } from "@/config";
import PostFeed from "./PostFeed";
import { db } from "@/lib/db";

const GeneralFeed = async () => {
	const posts = await db.post.findMany({
		orderBy: { createdAt: "desc" },
		include: {
			votes: true,
			author: true,
			comments: true,
			subreddit: true,
		},
		take: INFINITY_SCROLLING_PAGINATION_RESULTS,
	});

	return <PostFeed initialPosts={posts} />;
};

export default GeneralFeed;
