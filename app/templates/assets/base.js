var <%= name %> = function(config) {
    config = config || {};
<%= name %>.superclass.constructor.call(this,config);
};
Ext.extend(<%= name %>,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {}
});
Ext.reg('<%= lowCaseName %>',<%= name %>);
<%= name %> = new <%= name %>();