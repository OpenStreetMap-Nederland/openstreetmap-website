export type DiscourseUser = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  trust_level: number;
};

export type DiscourseTopicList = {
  can_create_topic: boolean;
  more_topics_url: string;
  per_page: number;
  top_tags: string[];
  topics: DiscourseTopic[];
};

export type DiscourseTopic = {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url: string | null;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  archetype: string;
  unseen: boolean;
  pinned: boolean;
  unpinned: string | null;
  excerpt: string;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: string | null;
  liked: string | null;
  tags: string[];
  tags_descriptions: Record<string, string>;
  views: number;
  like_count: number;
  has_summary: boolean;
  last_poster_username: string;
  category_id: number;
  pinned_globally: boolean;
  featured_link: string | null;
  has_accepted_answer: boolean;
  can_have_answer: boolean;
  posters: DiscourseTopicPoster[];
};

export type DiscourseTopicPoster = {
  extras: string | null;
  description: string;
  user_id: number;
  primary_group_id: string | null;
  flair_group_id: string | null;
};
