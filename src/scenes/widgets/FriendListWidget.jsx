import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const res = await fetch(
      `https://sociopedia-w9i9.onrender.com/users/${userId}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (friends?.length === 0) return <div></div>;

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight={'500'}
        sx={{ mb: '1.5rem' }}
      >
        Friends list
      </Typography>
      <Box display={'flex'} flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.ocupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
