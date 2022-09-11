import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';
import default_image from '../logo/default_user.jpg';
import { FaStar, FaComments } from 'react-icons/fa';
const Post = ({ post, showUsername, fromFavoritePostPage }) => {
  if (!post) {return}
  // Get author image & name
  let authorImage = '';
  let author = '';

  if (showUsername) {
    authorImage = fromFavoritePostPage ?
                    <img src={ post.post.author && post.post.author.image ? post.post.author.image : default_image } alt = '' className='author-small-image' />
                    :
                    <img src={ post.author && post.author.image ? post.author.image : default_image } alt = '' className='author-small-image' />;
    author = fromFavoritePostPage ?
              post.post.author ? ` ${post.post.author.firstName} ${post.post.author.lastName} - ` : ''
              :
              post.author? ` ${post.author.firstName} ${post.author.lastName} - ` : '';
  }

  const postId = fromFavoritePostPage ? post.post._id : post._id;
  const title = fromFavoritePostPage ? post.post.title : post.title;
  const image = fromFavoritePostPage ? post.post.image : post.image;
  
  const postDate = post.updatedAt ? ` ${formatDistance(new Date(post.updatedAt), new Date())}` : '';
  const starIcon = < FaStar className='star-color' />;
  // Get total of comments and average rating for the post
  const commentCounts = post.comment && post.comment[0] ? `${post.comment[0].count} ` : '';
  const avgRating = post.comment && post.comment[0] && post.comment[0].avgRating > 0 ? ` ~ ${parseFloat(post.comment[0].avgRating).toFixed(1)} ` : '';
  return (
    <Card className='mb-2'>
      <Link to={`/postDetail/${postId}`}>
        {image ? <Card.Img src = {image} alt={title} className="w-100" /> : ''}
      </Link>

      <Card.Body>
        <Link to={`/postDetail/${postId}`}>
          <Card.Title>{title}</Card.Title>
        </Link>
        <div className='post-subtitle'>
          <div>
            {authorImage}
            {author}
            {postDate}
          </div>
          <div>
            {commentCounts} {commentCounts? < FaComments /> : null}
            {avgRating} {avgRating? starIcon : null}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
// Define proptypes for post, showUsername, fromFavoritePostPage
Post.propTypes = {
  post: PropTypes.object.isRequired,
  showUsername: PropTypes.bool.isRequired,
  fromFavoritePostPage: PropTypes.bool.isRequired,
}

export default Post
