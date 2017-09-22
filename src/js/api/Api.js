export const URL = 'http://localhost:3001'
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'fendy.jong',
}
export const GET_HEADERS = {
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
  fetch(`${URL}/categories`, GET_HEADERS)
    .then((res) => {
      res.json().then((data) => {
        console.log(data)
      })
    })
}

export const addCategories = () => {

}
