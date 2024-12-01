export const initState = null;

export const reducer = (state, action) => {
  switch (action.type) {
    case 'USER':
      return action.payload;
    case 'CLEAR':
      return null;
    case 'UPDATE':
      return {
        ...state,
        followers: action.payload.followers,
        following: action.payload.following,
      };
    case 'UPDATE_AVATAR':
      return {
        ...state,
        avatar: action.payload,
      };
    default:
      return state;
  }
};
