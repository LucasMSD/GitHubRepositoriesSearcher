var btnAdicionar = document.querySelector('#botaoUser');
var userNameInput = document.querySelector('#userName');
var divHeaderElement = document.querySelector("#divHeader");
var divReposElement = document.querySelector("#divRepos");

btnAdicionar.onclick = function() {
    newRequest("https://api.github.com/users/" + userNameInput.value + "/repos");
}

function renderizarReposInfo(reposInfo) {
    clearElements();
    divHeaderElement.appendChild(setElement("h3", "headerRepos", "Repositórios de " + userNameInput.value));
    userNameInput.value = "";
    divHeaderElement.appendChild(setElement("h2", "totalRepos", "Total: " + reposInfo.length));
    
    for (infos of reposInfo) {
        var divHeaderReposElement = setElement("div", undefined, undefined, "divHeaderRepos");
        divReposElement.appendChild(divHeaderReposElement);
        divHeaderReposElement.appendChild(setElement("h1", undefined, (reposInfo.indexOf(infos) + 1) + "º:"));
        var ulRepos = setElement("ul", undefined, undefined, "reposUser");
        divReposElement.appendChild(ulRepos);

        for (const [k,v] of Object.entries({name, html_url, languages_url, created_at, updated_at} = infos)) {
            var li;
            switch (k) {
                case "name":
                    li = setElement("li", undefined, "Nome: " + name, "liInfos");
                    ulRepos.appendChild(li);
                    break;
                case "html_url":
                    li = setElement("li", undefined, "Link do repositório: ", "liInfos");
                    var a = setElement("a", undefined, v, "linkRepos");
                    a.setAttribute("href", v);
                    a.setAttribute("target", "_blank");
                    li.appendChild(a);
                    ulRepos.appendChild(li);
                    break;
                case "languages_url":
                    li = setElement("li", undefined, "Carregando...", "liInfos");
                    ulRepos.appendChild(li);
                    getLanguages(languages_url, li);
                    break;
                case "created_at":
                    li = setElement("li", undefined, "Criado em: " + setDate(v), "liInfos");
                    ulRepos.appendChild(li);
                    break;
                case "updated_at":
                    li = setElement("li", undefined, "Último update: " + setDate(v), "liInfos");
                    ulRepos.appendChild(li);
            }
        }
    }
}

function clearElements() {
    divHeaderElement.innerHTML = "";
    divReposElement.innerHTML = "";
}

function getLanguages(url, li) {
    axios.get(url)
        .then(function(response) {
            var languages = "";
            console.log(response.data);
            for (keys in response.data) {
                languages += keys + "; ";
            }
            li.innerHTML = "";
            li.appendChild(document.createTextNode("Linguages: " + languages));
        })
        .catch(function(error) {
            alert(error);
        });
}
function setElement(tagName, idValue, textNode, className) {
    var element = document.createElement(tagName);
    if(textNode !== undefined) element.appendChild(document.createTextNode(textNode));
    if(className !== undefined) element.setAttribute("class", className);
    if(idValue !== undefined) element.setAttribute("id", idValue);
    return element;
}

function newRequest(url) {
    axios.get(url)
        .then(function(response) {
            renderizarReposInfo(response.data);
        })
        .catch(function(error) {
            alert(error);
        });
}

function setDate(date) {
    return date.substr(0,10).split("-").reverse().join("/");
}
