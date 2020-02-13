export function fetchData() {
  return fetch("http://localhost:8080/github-dataset.json")
    .then(response => response.json())
}
