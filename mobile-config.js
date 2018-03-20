App.info({
  id: 'com.t4teld.meteorapp',
  name: 'Truckers For Truckers',
  description: 'Truckers for Truckers',
  author: 'T4T',
  email: 'testing@example.com',
  website: 'http://t4teld.meteorapp.com'
});
App.setPreference("WebAppStartupTimeout", 100000)
App.accessRule('*');
App.setPreference('android-minSdkVersion' , 19);
 