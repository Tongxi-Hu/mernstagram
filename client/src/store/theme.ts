enum THEME_ACTION_TYPE {
  TOGGLE="TOGGLE",
}

type THEME_ACTION={
  type: THEME_ACTION_TYPE
}

const darkModeReducer=(state=false, action: THEME_ACTION): boolean=>{
  return !state;
};

export const toggleTheme=()=>{
  return {type: THEME_ACTION_TYPE.TOGGLE};
};

export default darkModeReducer;
