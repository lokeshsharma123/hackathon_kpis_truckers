Template.tabbar.onRendered(function(){
    $('ul.tabs').tabs({
    	swipeable:false,
    	onShow:function(e){
		 
    		var selector=e[0].id//e.selector;
			 
    		if(selector==="test1")
    		Session.set("tabbar1_active_tab","tab1")
    	else
    		if(selector==="test2")
    		Session.set("tabbar1_active_tab","tab2")
    	else
    		if(selector==="test3")
    		Session.set("tabbar1_active_tab","tab3")
    	else
    		if(selector==="test4")
    		Session.set("tabbar1_active_tab","tab4")
    	}
    });
})

Template.tabbar.helpers({
"active_tab":function(){
return Session.get("tabbar1_active_tab")
}
})
