function getJSON(filename) {
    return new Promise(function (r) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', chrome.runtime.getURL(filename), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                r(xhr.responseText);
            }
        };
        xhr.send();
    });
}

function detection_change(database) {
    selectElement = document.querySelector(".form-control");
    selectElement.addEventListener('change', function () {
        // 選択が変更されたときに実行される処理
        setTimeout(function () {
            let currentUrl = document.URL;
            if (currentUrl = "https://g-ratings.info/ranking") {
                change_ranking(database, false);
            };
        }, 1000);
    });
}

function change_ranking(database, b) {
    if (b) {
        detection_change(database);
    };
    let namedata = document.querySelectorAll(".username");
    let imgdata = document.querySelectorAll(".pull-left");
    for (let i = 0; i < namedata.length; i++) {
        imgElement = imgdata[i].querySelector("img");
        srcurl = imgElement.getAttribute("src");
        for (let j = 0; j < database.length; j++) {
            suburl = srcurl.substring(33, 73);
            if (database[j].url == suburl) {
                namedata[i].innerText += ` (${database[j].name})`;
                break;
            };
        };
    };
}

function change_vsname(database) {
    let namedata = document.querySelectorAll(".vsname");
    let imgdata = document.querySelectorAll(".vsimg");
    console.log(namedata);
    console.log(imgdata);
    for (let i = 0; i < namedata.length; i++) {
        imgElement = imgdata[i].querySelector("img");
        srcurl = imgElement.getAttribute("src");
        for (let j = 0; j < database.length; j++) {
            suburl = srcurl.substring(33, 73);
            if (database[j].url == suburl) {
                namedata[i].childNodes[0].nodeValue += ` (${database[j].name})`;
                break;
            };
        };
    };
}

getJSON('database2.json').then(function (r) {
    //JSONファイルを読み込んだ後の処理
    var database = JSON.parse(r);
    setTimeout(function () {
        if (document.URL == "https://g-ratings.info/ranking") {
            change_ranking(database, true);
        }
        else {
            change_vsname(database);
        };

    }, 1000);
})