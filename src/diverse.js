const server_address = process.env.REACT_APP_SERVER_ADDRESS


function addParamInUrl(nameParam, valueParam){
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(nameParam, valueParam);
    window.history.pushState(null, '', `${window.location.pathname}?${urlParams}`);  
}

function getParamFromUrl(nameParam){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nameParam);
}
function deleteParamFromUrl(nameParam){
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(nameParam);
    window.history.pushState(null, '', `${window.location.pathname}?${urlParams}`);
}

export { 
    server_address,    
    addParamInUrl, getParamFromUrl, deleteParamFromUrl,
}