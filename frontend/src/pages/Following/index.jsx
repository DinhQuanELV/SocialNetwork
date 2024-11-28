import { useContext } from 'react';
import FollowingPost from '~/components/FollowingPost';
import { UserContext } from '~/App';
import FollowUsersToSee from '~/components/Pages/FollowUsersToSee';

const Following = () => {
  const { state } = useContext(UserContext);
  console.log(state);

  return (
    <div>
      {state && state.following && state.following.length > 0 ? (
        <FollowingPost />
      ) : (
        <FollowUsersToSee />
      )}
    </div>
  );
};

export default Following;
