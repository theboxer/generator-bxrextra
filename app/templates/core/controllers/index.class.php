<?php
require_once dirname(__FILE__) . '/model/<%= lowCaseName %>/<%= serviceClassName.toLowerCase() %>.class.php';
/**
 * @package <%= lowCaseName %>
 */

abstract class <%= name %>BaseManagerController extends modExtraManagerController {
    /** @var <%= name %> $<%= lowCaseName %> */
    public $<%= lowCaseName %>;
    public function initialize() {
        $this-><%= lowCaseName %> = new <%= name %>($this->modx);

        $this->addCss($this-><%= lowCaseName %>->getOption('cssUrl').'mgr.css');
        $this->addJavascript($this-><%= lowCaseName %>->getOption('jsUrl').'mgr/<%= lowCaseName %>.js');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            <%= name %>.config = '.$this->modx->toJSON($this-><%= lowCaseName %>->options).';
            <%= name %>.config.connector_url = "'.$this-><%= lowCaseName %>->getOption('connectorUrl').'";
        });
        </script>');
        
        parent::initialize();
    }
    public function getLanguageTopics() {
        return array('<%= lowCaseName %>:default');
    }
    public function checkPermissions() { return true;}
}