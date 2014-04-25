<?php
/**
 * Remove an Item.
 * 
 * @package <%= lowCaseName %>
 * @subpackage processors
 */
class <%= name %>ItemRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = '<%= name %>Item';
    public $languageTopics = array('<%= lowCaseName %>:default');
    public $objectType = '<%= lowCaseName %>.item';
}
return '<%= name %>ItemRemoveProcessor';