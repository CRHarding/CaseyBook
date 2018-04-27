import { combineReducers } from 'redux';
import friends from './FriendReducer';
import profiles from './ProfileReducer';
import likes from './LikeReducer';
import posts from './PostReducer';

const rootReducer = combineReducers({
  friends,
  profiles,
  likes,
  posts,
});

export default rootReducer;
