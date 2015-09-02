<%= name %>.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('<%= lowCaseName %>')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,activeTab: 0
            ,hideMode: 'offsets'
            ,items: [{
                title: _('<%= lowCaseName %>.item.items')
                ,items: [{
                    html: '<p>'+_('<%= lowCaseName %>.item.intro_msg')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: '<%= lowCaseName %>-grid-items'
                    ,preventRender: true
                    ,cls: 'main-wrapper'
                }]
            }]
        }]
    });
    <%= name %>.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(<%= name %>.panel.Home,MODx.Panel);
Ext.reg('<%= lowCaseName %>-panel-home',<%= name %>.panel.Home);
