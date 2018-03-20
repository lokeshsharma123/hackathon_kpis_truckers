Router.configure({
    layoutTemplate: 'layout'
});
Router.configure({
    onAfterAction: function() {
        return window.scrollTo(0, 0);
    },
   /* onBeforeAction: function(pause) {
 
        var current_route = Router.current().route.getName();
        var allowed = false;
        var arr = allowed_path_array;
        if (_.indexOf(arr, current_route) > -1)
            allowed = true;
		 
         if ((Meteor.user() || Session.get("login_user")) && allowed) {
	   
            Router.go('/dashboard');
            this.next();
        } else if (!Meteor.user() && !allowed) {
            Router.go('/');
            this.next();
        } else
            this.next();
    }
	*/

});

 
Router.route('/', {
    name: 'login_screen',
    template: 'login_screen'
});
 Router.route('/view-notifications-list', {
    name: 'view_notifications_list_screen',
    template: 'view_notifications_list_screen'
});
 Router.route('/view-notifications', {
    name: 'view_notifications_screen',
    template: 'view_notifications_screen'
});

 
Router.route('/add-driver', {
    name: 'add_driver_screen',
    template: 'add_driver_screen'
});
Router.route('/edit-driver', {

    name: "edit_driver_screen",
 template: 'edit_driver_screen',
    path: '/edit-driver/:driver_id',
    data: function() {
        return {
            driver_id: this.params.driver_id
        };
    }
});
Router.route('/view-driver', {

    name: "view_driver_screen",
 template: 'view_driver_screen',
    path: '/view-driver/:driver_id',
    data: function() {
        return {
            driver_id: this.params.driver_id
        };
    }
});
 
Router.route('/view-drivers', {
    name: 'view_drivers_screen',
    template: 'view_drivers_screen'
});
Router.route('/register', {
    name: 'register_screen',
    template: 'register_screen'
});
Router.route('/register-mode', {
    name: 'register_mode_screen',
    template: 'register_mode_screen'
});
Router.route('/register-company', {
    name: 'register_company_screen',
    template: 'register_company_screen'
});
Router.route('/dashboard', {
    name: 'dashboard_screen',
    template: 'dashboard_screen'
});
Router.route('/forgot-password', {
    name: 'forgot_password_screen',
    template: 'forgot_password_screen'
});
Router.route('/change-password', {
    name: 'change_password_screen',
    template: 'change_password_screen'
});

Router.route('/form', {

    name: "form_screen",
 template: 'form_screen',
    path: '/form/:company_id',
    data: function() {
        return {
            company_id: this.params.company_id
        };
    },
	 waitOn: function () {
    // return one handle, a function, or an array
    return Session.set("company_id_to_subscribe",this.params.company_id);
  }

});
Router.route('/cycle-rules', {
    name: 'cycle_rules_screen',
    template: 'cycle_rules_screen'
});
/*Router.route('/', {
    name: 'home',
    template: 'home'
});
*/

Router.route('/vehicle-defects-list', {
    name: 'vehicle_defects_list',
    template: 'vehicle_defects_list'
});
Router.route('/create-new-signature', {
    name: 'create_new_signature',
    template: 'create_new_signature'
});

Router.route('/upload-shipping-documents', {
    name: 'upload_shipping_documents',
    template: 'upload_shipping_documents'
});
Router.route('/document-manager', {
    name: 'document_manager',
    template: 'document_manager'
});
Router.route('/trailer-defects-list', {
    name: 'trailer_defects_list',
    template: 'trailer_defects_list'
});

Router.route('/sign-log', {
    name: 'sign_log',
    template: 'sign_log'
});
Router.route('/profile', {
    name: 'edit_profile_screen',
    template: 'edit_profile_screen'
});
Router.route('/un-authorize-access', {
    name: 'un_authorize_access',
    template: 'un_authorize_access'
});
Router.route('/reports',function() {
   this.render('dashboard_screen')
});

Router.route('/reports', {

    name: "reports_screen",
 template: 'reports_screen',
    path: '/reports/:company_id',
    data: function() {
        return {
            company_id: this.params.company_id
        };
    },
	 waitOn: function () {
    // return one handle, a function, or an array
    return Session.set("company_id_to_subscribe",this.params.company_id);
  }

});
Router.route('/view-company-driver', {

    name: " view_company_driver",
 template: 'view_company_driver',
    path: '/view-company-driver/:company_driver_id',
    data: function() {
        return {
            company_driver_id: this.params.company_driver_id
        };
    } 

});
 

Router.route('/add-truck', {
    name: 'add_truck_screen',
    template: 'add_truck_screen'
});
Router.route('/view-trucks', {
    name: 'view_trucks_screen',
    template: 'view_trucks_screen'
});
Router.route('/events', {
    name: 'events_screen',
    template: 'events_screen'
});
 
 
Router.route('/csv', {
    name: 'csv_screen',
    template: 'csv_screen'
});
Router.route('/bluetooth', {
    name: 'bluetooth_screen',
    template: 'bluetooth_screen'
});
 
 

Router.route('/un_authorize_driver', {
    name: 'un_authorize_driver',
    template: 'un_authorize_driver'
});


Router.route('/Warn_Unauthorizer', {
    name: 'Warn_Unauthorizer',
    template: 'Warn_Unauthorizer'
});

Router.route('/company_log_screen', {
    name: 'company_log_screen',
    template: 'company_log_screen'
});



Router.route('/view-truck', {

    name: "view_truck_screen",
 template: 'view_truck_screen',
    path: '/view-truck/:truck_id',
    data: function() {
        return {
            truck_id: this.params.truck_id
        };
    }
});