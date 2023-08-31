////////////////////
// Fill templates //
////////////////////


// linkChild : push item to parent node
function linkChild(target, child){
    let item = document.createElement(child["item"]);
    if ("attributes" in child){
        for (let j=0;j<child["attributes"].length;j++){
            let attribute = child["attributes"][j];
            item.setAttribute(attribute[0],attribute[1]);
        }   
    }
    if ("value" in child){
        item.value = child["value"];
    }    
    if ("text" in child){
        item.text = child["text"];
    }
    if ("textContent" in child){
        item.textContent = child["textContent"];
    }
    target.appendChild(item);
    return [target,item];
}

// fillTemplates: cascade linkChild (genealogic tree)
function fillTemplates(target, template){
    for (let i=0;i<template.length;i++){
        let section = template[i];
        let linkage = linkChild(target,section);
        if (section.hasOwnProperty("children")){
            for (let j=0; j<section["children"].length;j++){
                let child = section["children"][j];
                fillTemplates(linkage[1], [child]);
            }
        }
    }
}


// killChildren : clean the floor
function killChildren(target){
    while(target.firstChild){
        target.removeChild(target.lastChild);
    }
}
