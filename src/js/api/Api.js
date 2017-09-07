const URL = 'http://localhost:5001'
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'fendy.jong',
}
const GET_HEADERS = {
  method: 'GET',
  headers,
}
/*
const POST_HEADERS = {
  'methods': 'POST',
  headers,
}
*/

export const getCategories = () => {
  console.log(GET_HEADERS)
  Promise((resolve) => {
    fetch(`${URL}/categories`, GET_HEADERS)
      .then(res => res.json())
      .then(data => resolve(data.categories))
  })
}

export const addCategories = () => {

}
