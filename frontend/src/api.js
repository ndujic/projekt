function odjava() {
  localStorage.removeItem("authToken");
  window.location.href = "/";
}

export function customFetch(resource, init = {}, auth = true) {
  console.log(resource, auth, localStorage.getItem("authToken"));
  return fetch("http://localhost:3001" + resource, {
    ...init,
    ...(auth
      ? {
          headers: {
            ...(init.headers ? init.headers : {}),
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      : {}),
  }).then((res) => {
    if (res.status === 401) {
      odjava();
    }
    return res.json();
  });
}
