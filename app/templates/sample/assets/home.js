Ext.onReady(function() {
    MODx.load({ xtype: '<%= lowCaseName %>-page-home'});
});

<%= name %>.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: '<%= lowCaseName %>-panel-home'
            ,renderTo: '<%= lowCaseName %>-panel-home-div'
        }]
    });
    <%= name %>.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(<%= name %>.page.Home,MODx.Component);
Ext.reg('<%= lowCaseName %>-page-home',<%= name %>.page.Home);