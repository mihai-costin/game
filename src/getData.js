export function transferData(data) {
    var a = document.createElement("a");
    var file = new Blob([data], {
        type: 'text/plain'
    });
    a.href = URL.createObjectURL(file);
    a.download = 'data.txt';
    a.click();
}

export function readFromFile(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0)
                var text = xhr.responseText;
        }
    }
    xhr.send(null);

    return text;
}
