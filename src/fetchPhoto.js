import axios from 'axios';

export async function fetchPhoto(inputValue, page) {
  const queryParams = {
    key: '35912782-f9206aec1cfed4286d9fa7302',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  };
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
