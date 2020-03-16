const fetch = require("node-fetch");
var fs = require('fs');

(async () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function sendRequest(url, page, lastPage) {
        const urlWithPage = `${url}?page=${page}`;
        const response = await fetch(urlWithPage);
        if (response.ok) {
            const json = await response.json();
            let stringJson = JSON.stringify(json);

            const isFirst = page === 0;
            stringJson = isFirst ? `{"shows":${stringJson}` : stringJson.slice(1 - stringJson.length, stringJson.length);

            const isLast = page === lastPage;
            stringJson = isLast ? `${stringJson}}` : `${stringJson.slice(0, -1)},`;

            fs.appendFileSync('json-db.json', stringJson, 'utf8');
        }
    }

    const countPages = 5;
    for (let i = 0; i <= countPages; i++) {
        console.log(i);
        sendRequest('http://api.tvmaze.com/shows', i, countPages);
        await (sleep(2000));
    }

})();
