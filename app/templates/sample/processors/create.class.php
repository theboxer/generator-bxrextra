<?php
/**
 * Create an Item
 * 
 * @package <%= lowCaseName %>
 * @subpackage processors
 */
class <%= name %>ItemCreateProcessor extends modObjectCreateProcessor {
    public $classKey = '<%= name %>Item';
    public $languageTopics = array('<%= lowCaseName %>:default');
    public $objectType = '<%= lowCaseName %>.item';

    public function beforeSet(){
        $items = $this->modx->getCollection($this->classKey);

        $this->setProperty('position', count($items));

        return parent::beforeSet();
    }

    public function beforeSave() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('<%= lowCaseName %>.err.item_name_ns'));
        } else if ($this->doesAlreadyExist(array('name' => $name))) {
            $this->addFieldError('name',$this->modx->lexicon('<%= lowCaseName %>.err.item_name_ae'));
        }
        return parent::beforeSave();
    }
}
return '<%= name %>ItemCreateProcessor';
