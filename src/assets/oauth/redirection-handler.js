document.addEventListener('DOMContentLoaded', function () {
  setTimeout(redirect, 2000);
});

function redirect() {
  const authParams = getHashQueryParams();
  if (authParams) {
    addToSessionStorage(authParams);
    window.location.hash = '';
    window.location.href = "http://localhost:4200/#/profile";
  } else {
    window.location.href = "http://localhost:4200/#/error-403";
  }
}

function getHashQueryParams() {
  if (!window.location.hash) { return null; }

  const queryParams = {};
  window.location.hash
    .substr(1)
    .split('&')
    .forEach((queryTupleStr) => {
      const keyIndex = 0;
      const valueIndex = 1;
      const tuple = queryTupleStr.split('=');
      queryParams[tuple[keyIndex]] = tuple[valueIndex];
    });

  queryParams['expires_at'] = new Date().getTime() + Number(queryParams['expires_in']) * 1000;

  return queryParams;
}

function addToSessionStorage(authParams) {
  Object.keys(authParams).forEach(paramName => {
    sessionStorage.setItem(paramName, authParams[paramName]);
  });
}
