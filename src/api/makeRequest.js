// Méthode centralisée pour effectuer les appels API
const makeRequest = (url, method = 'GET', payload, mode = 'json') => {
  //const tokenObject = JSON.parse(localStorage.getItem('kc'))
  const request = new window.Request(url, {
    method: method,
    credentials: 'include',
    headers: new window.Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
     // Authorization: `Bearer ${tokenObject?.token}`,
     // 'Access-Control-Allow-Origin': 'http://dev-10.virtual-post.net:8081/',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
      // 'Access-Control-Allow-Methods': 'POST, GET'
    }),
    body: payload ? JSON.stringify(payload) : null,
  })

  // @formatter:off
  return window
    .fetch(request)
    .then(response => checkStatus(response, mode))
    .catch(error => window.Promise.reject(error))
  // @formatter:on
}

// Check HTTP Status and throw Error if not valid
const checkStatus = async (response, mode = 'json') => {
  if (response.status !== 0 && (response.status < 200 || response.status >= 300)) {
    const errorMessage = await response['json']()
    console.error(`Erreur ${errorMessage.statutHttp}: ${errorMessage.liberr}`, errorMessage)
    const err = new Error(`Erreur ${errorMessage.statutHttp}: ${errorMessage.liberr}`)
    err.code = errorMessage.statutHttp
    throw err
  }

  return mode && response[mode] ? response[mode]() : response
}

export default makeRequest
