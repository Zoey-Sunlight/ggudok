export const setFilterTag = (filterTag) => {
  return {
    type: 'SET_FILTER_TAG',
    payload: filterTag,
  };
};

export const setSelectedPrice = (selectedPrice) => {
  return {
    type: 'SET_SELECTED_PRICE',
    payload: selectedPrice,
  };
};

export const setSelectedRating = (selectedRating) => {
  return {
    type: 'SET_SELECTED_RATING',
    payload: selectedRating,
  };
};

export const setSelectedTag = (selectedTag) => {
  return {
    type: 'SET_SELECTED_TAG',
    payload: selectedTag,
  };
};

export const setHideMenu = (section, value) => {
  return {
    type: 'SET_HIDE_MENU',
    payload: {section, value},
  };
};