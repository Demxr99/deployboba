// Source: https://stackoverflow.com/questions/8064691/how-do-i-pass-along-variables-with-xmlhttprequest
function formatParams(params) {
  return Object
    .keys(params)
    .map(function(key) {
      return key+'='+encodeURIComponent(params[key])
    })
    .join('&');
}

// params is given as a JSON
// function get(endpoint, params) {
//   const fullPath = endpoint + "?" + formatParams(params);
//   return fetch(fullPath).then(res => res.json());
// }

function get(endpoint, params, successCallback, failureCallback) {
  const xhr = new XMLHttpRequest();
  const fullPath = endpoint + '?' + formatParams(params);
  xhr.open('GET', fullPath, true);
  xhr.onload = function(err) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (successCallback)
          successCallback(JSON.parse(xhr.responseText));
      } else {
        if (failureCallback)
        failureCallback(xhr.statusText);
      }
    }
  };
  xhr.onerror = function(err) {
    failureCallback(xhr.statusText);
  }
  xhr.send(null);
}

function post(endpoint, params) {
  return fetch(endpoint, {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(params)
  }).then(res => res.json());
}