const URL = "https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc"
const repos$ = get(URL);
const $main = document.getElementById('main');

repos$.subscribe({
  onNext: res => {
    JSON.parse(res).items.forEach((repo) => {
      const url = repo.html_url;
      const name = repo.name;
      const linkText = document.createTextNode(repo.owner.login + ' - ' + name);

      let $li = document.createElement("li");
      let $a = document.createElement("a");

      $a.appendChild(linkText);
      $a.title = url;
      $a.href = url;

      $li.appendChild($a);
      $main.appendChild($li);
    })
  },
  onError: err => console.log('Error ' + err),
  onCompleted: () => console.log('Completed'),
});

function get(url) {
  return Rx.Observable.create(observer => {
    let req = new XMLHttpRequest();

    req.open('GET', url);

    req.onload = () =>
      req.status === 200 ? observer.onNext(req.response)
      : observer.onError(new Error(req.statusText));

    req.onError = () =>
      observer.onError(new Error("Unknown Error"));

    req.send();
  });
}
