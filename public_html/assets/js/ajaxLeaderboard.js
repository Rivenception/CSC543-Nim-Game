// Corwin: I wrote this file
// this performs a database hit to request statistics via ajax

let ajax = new XMLHttpRequest();

const getStatistics = async (e) => {
  return new Promise((resolve, reject) => {
    ajax.open('POST', '/leaderboard');
    ajax.setRequestHeader('Content-Type', 'text/plain');
    ajax.onload = () => {
      if (ajax.status == 200) {
        console.log(`Got Statistics: ${ajax.response}`);
        resolve(ajax.response);
      } else {
        console.log(`Error ${ajax.status}: ${ajax.response}`);
        reject(ajax.statusText);
      }
    };
    ajax.onerror = () => reject(ajax.statusText);
    ajax.send()
  });
};

export { getStatistics };
