var totalPage = $('#totalPageId').val();
	function prevPage(){
		var currentPage = $('#currentPage').val();
		currentPage = parseInt(currentPage);
			if(isNaN(currentPage)){
				return;
			}
			if(parseInt(currentPage<1)){
				return;
			}
			$('#currentPage').val(parseInt(currentPage)-1) ;
			$('form:first').submit();
	}
	
	function nextPage(){
		var currentPage = $('#currentPage').val();
		currentPage = parseInt(currentPage);
		if(isNaN(currentPage)){
			return;
		}
		if(parseInt(currentPage >= totalPage)){
				return;
			}
			$('#currentPage').val(parseInt(currentPage)+1);
			$('form:first').submit();
	}
	
	
	function goPage(pageNO){
		var page = parseInt(pageNO);
		if(isNaN(page)){
			return;
		}
		
		totalPage = $('#totalPageId').val();
		if(isNaN(totalPage)){
			totalPage = 1;
		}
		totalPage = parseInt(totalPage);
		if(page > totalPage){
			page = totalPage;
		}else if(page<1){
			page = 1;
		}
		$('#currentPage').val(page);
		$('form:first').submit();
	}
	
	function initPage(){
		$('#currentPage').val(1);
	}