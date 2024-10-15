const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
  SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  // Filter types
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_FILTER_LANGUAGE: "SET_FILTER_LANGUAGE",
  SET_FILTER_ARTIST: "SET_FILTER_ARTIST",
  SET_FILTER_ALBUM: "SET_FILTER_ALBUM",
};

const reducer = (state, action) => {
    console.log("Action: ", action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case actionType.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists,
      };

    case actionType.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };
    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };

    //   Fitler cases 
    case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };

    case actionType.SET_FILTER_LANGUAGE:
        return {
            ...state,
            languageFilter: action.languageFilter,
        };

    case actionType.SET_FILTER_ARTIST:
        return {
            ...state,
            artistFilter: action.artistFilter,
        };

    case actionType.SET_FILTER_ALBUM:
        return {
            ...state,
            albumFilter: action.albumFilter,
        };

    default:
      return state;
  }
};

export default reducer;
export { actionType };
