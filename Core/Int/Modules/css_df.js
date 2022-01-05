class DataFrame{
  constructor(ref_name, idFile, idTable, idPagination){

    this.params = {}
    this.params["loadcfg"]={
    	delimiter: "",	// auto-detect
    	newline: "",	// auto-detect
    	quoteChar: '"',
    	escapeChar: '"',
    	header: true,
    	//dynamicTyping: true,
    	//preview: 0,
    	//worker: true,
    	//comments: false,
    	//step: undefined,
    	complete: this.recordFile,
    	//error: undefined,
    	download: false,
    	//downloadRequestHeaders: undefined,
    	//downloadRequestBody: undefined,
    	//skipEmptyLines: false,
    	//chunk: undefined,
    	//chunkSize: undefined,
    	//beforeFirstChunk: undefined,
    	//withCredentials: undefined,
    	//transform: undefined,
    	delimitersToGuess: [',', '\t', '|', ';']
    };
    this.params["display"]={
      mrow : 10,
      cpage:0,
      nbpages:1
    };
    this.params["DOM"]={
      file:idFile,
      table : idTable,
      pagination : idPagination
    };

    this.ref_name = ref_name

    this.data = [];
    this.filtered = [];
    this.filters = {};
  }

  changeParam(cfg, cat){
    for (var u in cfg){
      this.params[cat][u] = cfg[u]
    }
  }

  displayPage(){
    this.applyFilter();
    this.writeTable();
    this.writePagination();
  }
  applyFilter(){
    this.filtered = this.data // temp real filter function to be implemented
  }
  recordFile = (results) =>{
    try{
      // Store data
      this.data = results.data;
      // Get shape and columns
      this.shape = [results.data.length]
      if (this.shape[0]==0){
        this.shape.push(0);
        this.columns=[];
      }
      else{
        this.columns = Object.keys(this.data[0]);
        this.shape.push(this.columns.length);
      }
      // Update display parameters
      this.params["display"]["nbpages"] = parseInt(this.shape[0]/this.params["display"]["mrow"])
      if (this.params["display"]["nbpages"]*this.params["display"]["mrow"]<this.shape[0]){
        this.params["display"]["nbpages"] += 1
      }
      this.displayPage()

    }
    catch(error){
      console.log(error);
      document.getElementById(this.params["DOM"]["table"]).innerHTML ="";
      document.getElementById(this.params["DOM"]["pagination"]).innerHTML="";
    }
  }

  singleLoad(){
    this.params["display"]["cpage"] = 0;
    var file = document.getElementById(this.params["DOM"]["file"]).files[0];
    Papa.parse(file, this.params["loadcfg"]);

  }

  writeTable(){
    if (this.filtered.length>0){
      var start = this.params["display"]["cpage"]*this.params["display"]["mrow"];
      var end = (this.params["display"]["cpage"]+1)*this.params["display"]["mrow"]
      var arr = this.filtered.slice(start,end)
      var iHtml = "<thead><tr class='table-dark'>";
      for (var u in arr[0]){
        iHtml += "<th>"+u+"</th>"
      }
      iHtml +="</tr></thead><tbody>"
      for (var i=0;i<arr.length;i++){
        iHtml +="<tr>"
        for (var u in arr[i]){
          iHtml +="<td>"+arr[i][u]+"</td>"
        }
        iHtml+="</tr>"
      }
      iHtml += "</tbody>"
      document.getElementById(this.params["DOM"]["table"]).innerHTML=iHtml;
      document.getElementById(this.params["DOM"]["table"]).style.display="block";
    }
  }


  writePagination(){
    if (this.filtered.length>0){
      var last_page = this.params["display"]["nbpages"];
      var current_page = this.params["display"]["cpage"];
      console.log(current_page);
      var innerHTML = '<ul class="pagination justify-content-center">';
      var active = "";
      if (current_page+1 == 1){
        active = "active";
      }
      innerHTML +=`<li class="page-item ${active}"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(1)">1</a></li>`;
      if (current_page+1<=5 && last_page > 6 ){
        var page = 0 ;
        for (var i=1;i<5;i++){
          page = i+1

          var active = "";
          if (current_page+1 == page){
            active =  "active";
          }
          innerHTML +=`<li class="page-item ${active}"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${page})">${page}</a></li>`;
        }
        page += 1
        innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${page})">...</a></li>`;

      }
      else if (current_page+1<=5 && last_page <= 6 ) {
        var page = 0 ;
        for (var i=1;i<Math.min(5,last_page-1);i++){
          page = i+1

          var active = "";
          if (current_page+1 == page){
            active =  "active";
          }

          innerHTML +=`<li class="page-item ${active}"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${page})">${page}</a></li>`;
        }
      }

      else if (current_page>=last_page-2){
        var prev = last_page-5
        innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${prev})">...</a></li>`;
        for (var i=0;i<4;i++){
          var indic = last_page-4+i

          var active = "";
          if (current_page+1 == indic){
            active =  "active";
          }
          innerHTML +=`<li class="page-item ${active}"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${indic})">${indic}</a></li>`;
        }
      }
      else{
        var prev = current_page-3+1
        innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${prev})">...</a></li>`;
        var num = current_page;
        for (var i=0;i<3;i++){
          var indic = current_page-2+i+1

          var active = "";
          if (current_page+1 == indic){
            active =  "active";
          }

          innerHTML +=`<li class="page-item ${active}"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${indic})">${indic}</a></li>`;
        }
        indic +=1 ;
        innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${indic})">...</a></li>`;
      }
      var active = "";
      if (current_page+1 == last_page){
        active =  "active";
      }
      innerHTML +=`<li class="page-item ${active}"><a class="page-link" href="#" onclick="window['${this.ref_name}'].newPage(${last_page})">${last_page}</a></li>`;
      innerHTML += "</ul>";
    }
    document.getElementById(this.params["DOM"]["pagination"]).innerHTML = innerHTML;
    document.getElementById(this.params["DOM"]["pagination"]).style.display="block";
  }

  newPage(arg){
    console.log(arg);
    if (arg==null){
      this.params["display"]["cpage"] += 1;
      this.displayPage();
    }
    else if (arg==-1){
      this.params["display"]["cpage"] -= 1;
      this.displayPage();
    }
    else{
      this.params["display"]["cpage"] = arg-1;
      this.displayPage();
    }

  }


}
