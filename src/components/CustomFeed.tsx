import { INFINITY_SCROLLING_PAGINATION_RESULTS } from "@/config";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const CustomFeed = async () => {
	const session = await getAuthSession();

	const followedCommunities = await db.subscription.findMany({
		where: {
			userId: session?.user.id,
		},
		include: {
			subreddit: true,
		},
	});

	const posts = await db.post.findMany({
		where: {
			subreddit: {
				name: {
					in: followedCommunities.map(({ subreddit }) => subreddit.id),
				},
			},
		},
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

export default CustomFeed;
