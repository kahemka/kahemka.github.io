


class SelectDisplayHandler {
	constructor(idSelect, listIds){
		this.idSelect = idSelect;
		this.listIds = listIds;
	}
	

	get simpleDisplay(){
		var elem = document.getElementById(this.idSelect);
	    this.itemSelected = elem.options[elem.selectedIndex].value;
		this.listIds.forEach(this.applySimpleFilter.bind(this));
	
	}
	
	applySimpleFilter(id){
		if (id==this.itemSelected){
			this.showElem(id);
		}
		else{
			this.hideElem(id);
		}
	}
	
	hideElem(id){
		try{
			document.getElementById(id).style.display='none';
		}
		catch (error){
			console.error(error)
		}
	}
	
	showElem(id){
		try{
			
		document.getElementById(id).style.display='block';
		}
		catch (error){
			console.error(error)
		}
	}
}