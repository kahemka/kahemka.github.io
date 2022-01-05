class KanbanCard{
	constructor(id_board, ref_name){
		this.id_board = id_board;
		this.record = {};
		this.ref_name = ref_name;
		this.drake = window.dragula();
	}

	upload(record){
		this.record = record;
		this.display();
	}

	display(){
		var id_c = 0;
		var innerHTML = "";
		// Populate lanes
		var lanes = [];
		for (var l in this.record){
			// Populate cards

			var innerCards = "";
			for (var i=0;i< this.record[l].length;i++){
				var title = this.record[l][i]["title"];
				var project = this.record[l][i]["project"];
				var status = this.record[l][i]["status"];
				var desc = this.record[l][i]["desc"];
				var progress = this.record[l][i]["progress"];

				var core_id =project+"_"+title+"_"+id_c;
				id_c += 1;
				innerCards += `<div class="card mb-3 cursor-grab">
								  <div class="card-body">
								  <h5>${project} <div class="btn btn-light btn-block btn-sm">📝</div></h5>
									<span class="badge bg-primary text-white mb-2">${title}</span>
									<span class="badge bg-danger text-white mb-2">${status}</span>
									<p class="mb-0">${desc}</p>
									<div class="text-right">
									  <small class="text-muted mb-1 d-inline-block">${progress}%</small>
									</div>
									<div class="progress" style="height: 5px;">
									  <div class="progress-bar" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								  </div>
								</div>`

			}



			innerHTML += `<div class="col-12 col-lg-4">
							  <div class="card mb-3">
									<div class="card-header bg-light">
									  <h3 class="card-title h5 mb-1">
										${l}
									  </h3>
									 </div>
									<div class="card-body">
									<div class="tasks" id="id_${l}">
									${innerCards}
									</div>
									<div class="btn btn-primary btn-block" onclick="window['${this.ref_name}'].test_add()">📌</div>
									</div>
								</div>
							</div>`

		}
		document.getElementById(this.id_board).innerHTML = innerHTML;

		// Add the drag and drop functionalities from dragula
		for (var l in this.record){
			lanes.push(document.getElementById("id_"+l));
		}
		this.drake.destroy();
		this.drake = dragula(lanes);
	}

	Add(lane){
	this.record[lane] = [];
	}

	Remove(lane){
	delete this.record[lane];
	}

	test_add(){
	alert("Works");
	}
	add(lane, title, project, status,desc, progress){
		this.record[lane].push({"title":title, "project":project,"status":status,"desc":desc,"progress":progress});
		this.display();
	}


	change(card, lane){
	}

	historize(){
	}

	dump(){
	}

}
