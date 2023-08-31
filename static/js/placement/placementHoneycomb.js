/////////////////////////////////////////
// Placement templates: Honeycomb menu //
/////////////////////////////////////////


// Requirements: hexa.css from adamriguez (https://codepen.io/adamriguez/pen/eRaXeq)


function placeHoneycomb(targetId,hcmDetails){
    let children = []
    for (let i=0; i<hcmDetails.length;i++){
        let detail = hcmDetails[i];
        let starter ={"item":"li","attributes":[["class","hex"]]}
        let frameDiv = {"item":"div","attributes":[["class","hexIn"]]}
        // Inject link
        let aLink = {"item":"a", "attributes":[["class","hexLink"],["href",detail["link"]]],"children":[]}
        // Inject img
        let imgUrl = 'background-image:url(' + '' + detail["img"]+")"
        aLink["children"].push({"item":"div","attributes":[["class","img"],["style",imgUrl]]})
        // Inject title
        aLink["children"].push({"item":"h1","attributes":[["id","hTitle"]],"textContent":detail["title"]})
        // Inject subtitle
        aLink["children"].push({"item":"p","attributes":[["id","hDesc"],["style","color:white;font-size:160%;"]], "textContent":detail["desc"]})
        frameDiv["children"] = [aLink];
        starter["children"] = [frameDiv];
        
        children.push(starter);
    } 
    let honeyFormat = [{'item':"div","attributes":[["class","grid"]],"children":[{"item":"ul","attributes":[["id","hexGrid"]], "children":children}]}];
    fillTemplates(document.getElementById(targetId),honeyFormat);
}
