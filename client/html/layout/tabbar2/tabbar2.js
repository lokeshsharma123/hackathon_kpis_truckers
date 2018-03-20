Template.tabbar2.onRendered(function(){
    $('ul.tabs').tabs({
    	swipeable:false,
    	onShow:function(e){
    		var selector=e.selector;
    		
    		if(selector==="#test2")
    		Session.set("active_tab","tab2")
    	else
    		if(selector==="#test3")
    		Session.set("active_tab","tab3")
    	else
    		if(selector==="#test4")
    		Session.set("active_tab","tab4")
    	
    	}
    });
   
})