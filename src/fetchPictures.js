import axios from 'axios';

// export async function fetchPictures(query, page, per_page) {
//   const queryParams = {
//     key: '35912782-f9206aec1cfed4286d9fa7302',
//     q: inputValue,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: page,
//     per_page: 40,
//   };
//   try {
//     const response = await axios.get('https://pixabay.com/api/', {
//       params: queryParams,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }
async function fetchPictures(query, page, per_page) {
  const params = new URLSearchParams({
    key: '35912782-f9206aec1cfed4286d9fa7302',
    q: query,
    page: page,
    per_page: per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export default fetchPictures;
