const intitalState = {
    user: null,
    isAuthenticated:false,
  };

  const userReducer = (state = intitalState, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
          isAuthenticated : true
        };
      case "CLEAR_USER":
        return {
          ...state,
          user: null,
          isAuthenticated : false
        };
      default:
        return state;
    }
  };
  
  export default userReducer;