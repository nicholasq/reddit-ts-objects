// Types are taken from https://github.com/reddit-archive/reddit/wiki/JSON

export interface Thing<T> {
  /**
   * this item's identifier, e.g. "8xwlg"
   */
  id?: string;
  /**
   * Fullname of comment, e.g. "t1_c3v7f8u"
   */
  name?: string;
  /**
   * All things have a kind. The kind is a String identifier that denotes the object's type. Some examples: Listing, more, t1, t2
   */
  kind?: string;
  /**
   * A custom data structure used to hold valuable information. This object's format will follow the data structure respective of its kind. See below for specific structures.
   */
  data?: T;
}

export interface Listing<T> {
  /**
   * The fullname of the listing that follows before this page. null if there is no previous page.
   */
  before?: string;
  /**
   * The fullname of the listing that follows after this page. null if there is no next page.
   */
  after?: string;
  /**
   * This modhash is not the same modhash provided upon login. You do not need to update your user's modhash everytime you get a new modhash. You can reuse the modhash given upon login.
   */
  modhash?: string;
  /**
   * A list of things that this Listing wraps.
   */
  children?: T[];
}

export interface Votable {
  /**
   * the number of upvotes. (includes own)
   */
  ups?: number;
  /**
   * the number of downvotes. (includes own)
   */
  downs?: number;
  /**
   * true if thing is liked by the user, false if thing is disliked, null if the user has not voted or you are not logged in. Certain languages such as Java may need to use a boolean wrapper that supports null assignment.
   */
  likes?: boolean;
}

export interface Created {
  /**
   * the time of creation in local epoch-second format. ex: 1331042771.0
   */
  created?: number;
  /**
   * the time of creation in UTC epoch-second format. Note that neither of these ever have a non-zero fraction.
   */
  created_utc?: number;
}

export interface Comment<T> extends Votable, Created {
  approved_by?: string; // who approved this comment. null if nobody or you are not a mod
  author?: string; // the account name of the poster
  author_flair_css_class?: string; // the CSS class of the author's flair. subreddit specific
  author_flair_text?: string; // the text of the author's flair. subreddit specific
  banned_by?: string; // who removed this comment. null if nobody or you are not a mod
  body?: string; // the raw text. this is the unformatted text which includes the raw markup characters such as ** for bold. <, >, and & are escaped.
  body_html?: string; // the formatted HTML text as displayed on reddit. For example, text that is emphasised by * will now have <em> tags wrapping it. Additionally, bullets and numbered lists will now be in HTML list format. NOTE: The HTML string will be escaped. You must unescape to get the raw HTML.
  edited?: boolean | number; // false if not edited, edit date in UTC epoch-seconds otherwise. NOTE: for some old edited comments on reddit.com, this will be set to true instead of edit date.
  gilded?: boolean; // the number of times this comment received reddit gold
  link_author?: string; // present if the comment is being displayed outside its thread (user pages, /r/subreddit/comments/.json, etc.). Contains the author of the parent link
  link_id?: string; // ID of the link this comment is in
  link_title?: string; // present if the comment is being displayed outside its thread (user pages, /r/subreddit/comments/.json, etc.). Contains the title of the parent link
  link_url?: string; // present if the comment is being displayed outside its thread (user pages, /r/subreddit/comments/.json, etc.). Contains the URL of the parent link
  num_reports?: number; // how many times this comment has been reported, null if not a mod
  parent_id?: string; // ID of the thing this comment is a reply to, either the link or a comment in it
  replies?: Thing<T>[]; // A list of replies to this comment
  saved?: boolean; // true if this post is saved by the logged in user
  score?: number; // the net-score of the comment
  score_hidden?: boolean; // Whether the comment's score is currently hidden.
  subreddit?: string; // subreddit of thing excluding the /r/ prefix. "pics"
  subreddit_id?: string; // the id of the subreddit in which the thing is located
  distinguished?: string; // to allow determining whether they have been distinguished by moderators/admins. null = not distinguished. moderator = the green [M]. admin = the red [A]. special = various other special distinguishes http://redd.it/19ak1b
}

export interface Link extends Votable, Created {
  author?: string; // 	the account name of the poster. null if this is a promotional link
  author_flair_css_class?: string; // 	the CSS class of the author's flair. subreddit specific
  author_flair_text?: string; // 	the text of the author's flair. subreddit specific
  clicked?: boolean; // 	probably always returns false
  domain?: string; // 	the domain of this link. Self posts will be self.<subreddit> while other examples include en.wikipedia.org and s3.amazon.com
  hidden?: boolean; // 	true if the post is hidden by the logged in user. false if not logged in or not hidden.
  is_self?: boolean; // 	true if this link is a selfpost
  link_flair_css_class?: string; // 	the CSS class of the link's flair.
  link_flair_text?: string; // 	the text of the link's flair.
  locked?: boolean; // 	whether the link is locked (closed to new comments) or not.
  media?: object; // 	used for streaming video. detailed information about the video and it's origins are placed here
  media_embed?: object; // 	used for streaming video. technical embed specific information is found here.
  num_comments?: number; // 	the number of comments that belong to this link. includes removed comments.
  over_18?: boolean; // 	true if the post is tagged as NSFW. False if otherwise
  permalink?: string; // 	relative URL of the permanent link for this link
  saved?: boolean; // 	true if this post is saved by the logged in user
  score?: number; // 	the net-score of the link. note: a submission's score is simply the number of upvotes minus the number of downvotes. if five users like the submission and three users don't it will have a score of 2. please note that the vote numbers are not "real" numbers, they have been "fuzzed" to prevent spam bots etc. so taking the above example, if five users upvoted the submission, and three users downvote it, the upvote/downvote numbers may say 23 upvotes and 21 downvotes, or 12 upvotes, and 10 downvotes. the points score is correct, but the vote totals are "fuzzed".
  selftext?: string; // 	the raw text. this is the unformatted text which includes the raw markup characters such as ** for bold. <, >, and & are escaped. empty if not present.
  selftext_html?: string; // 	the formatted escaped html text. this is the html formatted version of the marked up text. items that are boldened by ** or *** will now have <em> or *** tags on them. additionally, bullets and numbered lists will now be in html list format. note: the html string will be escaped. you must unescape to get the raw html. null if not present.
  subreddit?: string; // 	subreddit of thing excluding the /r/ prefix. "pics"
  subreddit_id?: string; // 	the id of the subreddit in which the thing is located
  thumbnail?: string; //	full url to the thumbnail for this link; "self" if this is a self post; "image" if this is a link to an image but has no thumbnail; "default" if a thumbnail is not available
  thumbnail_width?: number; //	full url to the thumbnail for this link; "self" if this is a self post; "image" if this is a link to an image but has no thumbnail; "default" if a thumbnail is not available
  thumbnail_height?: number; //	full url to the thumbnail for this link; "self" if this is a self post; "image" if this is a link to an image but has no thumbnail; "default" if a thumbnail is not available
  title?: string; //	the title of the link. may contain newlines for some reason
  url?: string; //	the link of this post. the permalink if this is a self-post
  edited?: number; // 	Indicates if link has been edited. Will be the edit timestamp if the link has been edited and return false otherwise. https://github.com/reddit/reddit/issues/581
  distinguished?: string; // 	to allow determining whether they have been distinguished by moderators/admins. null = not distinguished. moderator = the green [M]. admin = the red [A]. special = various other special distinguishes http://bit.ly/ZYI47B
  stickied?: boolean; // 	true if the post is set as the sticky in its subreddit.
}

export interface Subreddit {
  accounts_active?: number; // number of users active in last 15 minutes
  comment_score_hide_mins?: number; // number of minutes the subreddit initially hides comment scores
  description?: string; //	sidebar text
  description_html?: string; // sidebar text, escaped html format
  display_name?: string; // human name of the subreddit
  header_img?: string; // full url to the header image, or null
  header_size?: string[]; // width and height of the header image, or null
  header_title?: string; // description of header image shown on hover, or null
  over18?: boolean; // whether the subreddit is marked as nsfw
  public_description?: string; // description shown in subreddit search results?
  public_traffic?: boolean; //	whether the subreddit's traffic page is publicly-accessible
  subscribers?: number; //	the number of redditors subscribed to this subreddit
  submission_type?: string; //	the type of submissions the subreddit allows - one of "any", "link" or "self"
  submit_link_label?: string; // the subreddit's custom label for the submit link button, if any
  submit_text_label?: string; // the subreddit's custom label for the submit text button, if any
  subreddit_type?: string; // the subreddit's type - one of "public", "private", "restricted", or in very special cases "gold_restricted" or "archived"
  title?: string; // title of the main page
  url?: string; // the relative url of the subreddit. ex: "/r/pics/"
  user_is_banned?: boolean; // whether the logged-in user is banned from the subreddit
  user_is_contributor?: boolean; // whether the logged-in user is an approved submitter in the subreddit
  user_is_moderator?: boolean; // whether the logged-in user is a moderator of the subreddit
  user_is_subscriber?: boolean; // whether the logged-in user is subscribed to the subreddit
}

export interface Message extends Created {
  author?: string;
  body?: string; // the message itself
  body_html?: string; // the message itself with html formatting
  context?: string; // if the message is a comment, then the permalink to the comment with ?context=3 appended to the end, otherwise an empty string
  first_message?: string; // either null or the first message's id represented as base 10 (wtf)
  first_message_name?: string; // either null or the first message's fullname
  likes?: boolean; //how the logged-in user has voted on the message - true = upvoted, false = downvoted, null = no vote
  link_title?: string; // if the message is actually a comment, contains the title of the thread it was posted in
  name?: string; // ex: "t4_8xwlg"
  new?: boolean; // unread? not sure
  parent_id?: string; // null if no parent is attached
  replies?: string; // again, an empty string if there are no replies.
  subject?: string; // subject of message
  subreddit?: string; // null if not a comment.
  was_comment?: boolean;
}

export interface Account extends Created {
  comment_karma?: number; // user's comment karma
  has_mail?: boolean; // user has unread mail? null if not your account
  has_mod_mail?: boolean; // user has unread mod mail? null if not your account
  has_verified_email?: boolean; // user has provided an email address and got it verified?
  id?: string; // ID of the account; prepend t2_ to get fullname
  inbox_count?: number; // Number of unread messages in the inbox. Not present if not your account
  is_friend?: boolean; // whether the logged-in user has this user set as a friend
  is_gold?: boolean; // reddit gold status
  is_mod?: boolean; // whether this account moderates any subreddits
  link_karma?: number; // user's link karma
  modhash?: string; // current modhash. not present if not your account
  name?: string; // The username of the account in question. This attribute overrides the superclass's name attribute. Do not confuse an account's name which is the account's username with a thing's name which is the thing's FULLNAME. See API: Glossary for details on what FULLNAMEs are.
  over_18?: boolean; // whether this account is set to be over 18
}
