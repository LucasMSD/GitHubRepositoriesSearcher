var btnAdicionar = document.querySelector('#botaoUser');
var userNameInput = document.querySelector('#userName');
var divHeaderElement = document.querySelector("#divHeader");
var divReposElement = document.querySelector("#divRepos");

btnAdicionar.onclick = function() {
    newRequest("https://api.github.com/users/" + userNameInput.value + "/repos");
    userNameInput.value = "";
}

function renderizarReposInfo(reposInfo) {
    divHeaderElement.innerHTML = "";
    divReposElement.innerHTML = "";
    var headerText = "Repositórios de " + userNameInput.value;
    divHeaderElement.appendChild(setElement("h3", "headerRepos", headerText));
    divHeaderElement.appendChild(setElement("h2", "totalRepos", "Total: " + reposInfo.length));
    
    for (infos of reposInfo) {
        var divHeaderReposElement = setElement("div", undefined, undefined, "divHeaderRepos");
        divReposElement.appendChild(divHeaderReposElement);
        divHeaderReposElement.appendChild(setElement("h1", undefined, (reposInfo.indexOf(infos) + 1) + "º:"));
        var ulRepos = setElement("ul", "reposUser");
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
                    //var responseText = newRequest(v);
                    var languages = "Teste";
                    //for (const m of Object.keys(responseText)) languages += m + ";";
                    li = setElement("li", undefined, "Linguagens: " + languages, "liInfos");
                    ulRepos.appendChild(li);
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

function setElement(tagName, idValue, textNode, className) {
    var element = document.createElement(tagName);
    if(textNode !== undefined) element.appendChild(document.createTextNode(textNode));
    if(className !== undefined) element.setAttribute("class", className);
    if(idValue !== undefined) element.setAttribute("id", idValue);
    return element;
}

function newRequest(url) {
    axios.get(url)
        .then(function(response){
            renderizarReposInfo(response.data);
        })
        .catch(function(error) {
            console.warn(error);
        });
}

function setDate(date) {
    return date.substr(0,10).split("-").reverse().join("/");
}