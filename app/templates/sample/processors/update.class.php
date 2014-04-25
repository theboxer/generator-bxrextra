<?php
/**
 * Update an Item
 * 
 * @package <%= lowCaseName %>
 * @subpackage processors
 */

class <%= name %>ItemUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = '<%= name %>Item';
    public $languageTopics = array('<%= lowCaseName %>:default');
    public $objectType = '<%= lowCaseName %>.item';

    public function beforeSet() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('<%= lowCaseName %>.err.item_name_ns'));

        } else if ($this->modx->getCount($this->classKey, array('name' => $name)) && ($this->object->name != $name)) {
            $this->addFieldError('name',$this->modx->lexicon('<%= lowCaseName %>.err.item_name_ae'));
        }
        return parent::beforeSet();
    }

}
return '<%= name %>ItemUpdateProcessor';