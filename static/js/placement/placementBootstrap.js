////////////////////////////////////////////
// Placement templates: Bootstrap widgets //
////////////////////////////////////////////


// Requirements: bootstrap 5





// Menu Button

function placeMenuButton(targetId, mbDetails){
    mbFormat = [];
    for (let i=0; i<mbDetails.length;i++){
        let bDetail = mbDetails[i];
        let cButton = "btn btn-"+bDetail["color"];
        mbFormat.push({"item":"button","attributes":[["class",cButton],["onclick","window.location='"+bDetail["link"]+"'"],["type","button"]],"textContent":bDetail["title"]})
        if (i<mbDetails.length-1){
            mbFormat.push({"item":"a","textContent":" 🔗 "})
        }
    }
    fillTemplates(document.getElementById(targetId), mbFormat);
}



// Card



// Text 

function placeText(targetId, textDetails){
}

// Graph


// table


                                         

    
    
    
    
    
    
   
    
  





class hierarchySelectView {
    
    // Class to setup multiple dropdown (up to maxChoice) that can update their content (tIdSelect) and the content of a view (tIdView) (different viewCategory)
    // it rely on :
    // - dicoStruct : a dictionary which collects the combination of selected value the key mapping to external data
    // - extData : a dictionary which collects the data to be displayed on (tIdView) linked to dicoStruct
    // - InstanceName : used to tag the dropdowns and the onchange function
    
  constructor(dicoStruct, extData, tIdSelect, tIdView, maxChoice, arrayFuncUpdate) {
    this.dicoStruct = dicoStruct;
    this.extData = extData;
    this.tIdSelect = tIdSelect;
    this.tIdView = tIdView;
    this.naming = "";
    this.maxChoice = maxChoice;
    this.arrayFuncUpdate = arrayFuncUpdate;
  }
  
  getInstanceName(){
      for (var instance in window){
          if (window[instance]===this){
              return instance;
          }
      }
      
  }
    underSpotlightList(list, obj){
        let result = [obj];
        for (let i=0; i<list.length;i++){
            if (result.includes(list[i])){
                
            }
            else{
                result.push(list[i]);
            }
        }
        return result;
    }
    
    pushOnlyUnique(list, obj){
   
        if(list.includes(obj)){
        }
        else{
            list.push(obj);
        }
    
    }
    
    
    initSetup(){
        this.naming = this.getInstanceName();
        this.getFirstChoice();
        const firstValue = this.dicoStruct["choices"][0][0];
        this.getCascadeChoice(0, firstValue);
        this.fillDropDown();
        this.updateView();
        
        for (let i=0;i<this.arrayFuncUpdate.length;i++){
            window[this.arrayFuncUpdate[i]]();
        }
        

    }

    getFirstChoice(){
        this.dicoStruct["choices"] =  {0:[]};
        const dataChoice = this.dicoStruct["data"];
        for (let i=0;i<dataChoice.length;i++){
            this.pushOnlyUnique(this.dicoStruct["choices"][0],dataChoice[i]["label"][0]);
        }
        
    }
  
  
    // Change the dico based on the selected value
    getCascadeChoice(changeIndex, changeValue){
        const maxChoice = this.dicoStruct["maxChoice"];
        const dataChoice = this.dicoStruct["data"];
        let indexRef = changeIndex;
        let valueRef = changeValue;
        this.dicoStruct["choices"][indexRef] = this.underSpotlightList(this.dicoStruct["choices"][indexRef], valueRef);
        this.dicoStruct["spotlight"] = {};
        
        // Loop through all potential variables

        
        // Try to update indexRef +1 possibilities: initialize it at [] / check during the loop  if array has at list including indexRef +1 and with value at indexRef. if yes: add
        // for each array get the first item (spotlight) (if array has enough length)
        for (let i=0;i<maxChoice;i++){
            for (let j=0;j< dataChoice.length;j++){
                let possibilities = dataChoice[j]["label"];
                if (possibilities.length>=i+1){
                    if (i<= indexRef){
                     
                            this.dicoStruct["spotlight"][i] = this.dicoStruct["choices"][i][0];
                        
                    }
                    else {
                        
                        
                        if (possibilities[i-1]==changeValue){
                            
                            
                           
                            
                            
                            if(this.dicoStruct["spotlight"].hasOwnProperty(i)){
                                this.pushOnlyUnique(this.dicoStruct["choices"][i], possibilities[i]);
                            }
                            else{
                                this.dicoStruct["choices"][i] = [];
                                this.pushOnlyUnique(this.dicoStruct["choices"][i], possibilities[i]);
                          
                            }
                            
                             if(this.dicoStruct["spotlight"].hasOwnProperty(i)){
                            }
                            else{
                                this.dicoStruct["spotlight"][i] = possibilities[i];
                            }
                           
                            
                        }
                    }
                }
            }
            
            if(this.dicoStruct["spotlight"].hasOwnProperty(i)){
                            }
                            else{
                                if (this.dicoStruct["choices"].hasOwnProperty(i)){
                                    delete this.dicoStruct["choices"][i];
                                }
                                
                            }
        
        }
    }
    
    
    
    // Generate single dropdown
    genSingleDropDown(array, indexS){
        const nameId = "hSelect"+"_"+this.naming +"_"+indexS;
        const nameFunction = this.naming+"."+"updateHView(this)";
        let children = [];
        
        for (let i=0;i < array.length;i++){
            children.push({"item":"option", "value":array[i], "text":array[i]});
        }
      
        const template = [{'item':"select","attributes":[["class","form-select"],["id",nameId],["onchange",nameFunction]],"children":children}];
        return template;
    }
    
    // Generate multiple dropdown
    
    
    
     // Generate multiple dropdown
    genMultipleDropDown(){
        // Get number of dropdown to generate
        const nBtoPopulate = Object.keys(this.dicoStruct["choices"]).length;
        let children = [];
        for (let i=0;i < nBtoPopulate; i++){
            const c = this.genSingleDropDown(this.dicoStruct["choices"][i],i);
            children.push({'item':'div', "attributes":[["class","col-auto"]], "children":c});
        }
        
        const template = [{"item":"form", "attributes":[["class","row g-3"]], "children":children}];
        return template;
    }
    
    // Fill dropdown
    fillDropDown(){
    // Kill children
        killChildren(document.getElementById(this.tIdSelect));
     // get Template
     const template = this.genMultipleDropDown();
     fillTemplates(document.getElementById(this.tIdSelect), template)

    
    }
    
    // Update view
    updateView(){
        
        // kill children
        killChildren(document.getElementById(this.tIdView));
        // get Template
        let data = "undefined";
        let category = "undefined";
        for (let i=0;i<this.dicoStruct["data"].length;i++){
            let possibilities = this.dicoStruct["data"][i]["label"];
            let check = 1;
            for (let j=0;j<Object.keys(this.dicoStruct["spotlight"]).length;j++){
                if (this.dicoStruct["spotlight"][j] == possibilities[j]){
                  
                    check = check*1;
                }
                else{
                    check = check*0;
                }
            }
            if (check==1){
           
                data = this.extData[this.dicoStruct["data"][i]["key"]];
                category = this.dicoStruct["data"][i]["mode"];
            }
        }
        
        if (data =="undefined"){
            console.log("data could not be found under specified mapping");
        }
        else{
            if (category=="generic"){
                document.getElementById(this.tIdView).innerHTML = data;
            }
        }
        
    }
    
    updateHView(target){
        const indexS = target.id.split("_")[2];
        this.getCascadeChoice(indexS,target.value);
        this.fillDropDown();
        this.updateView();
        
        for (let i=0;i<this.arrayFuncUpdate.length;i++){
            window[this.arrayFuncUpdate[i]]();
        }
    }
}       


