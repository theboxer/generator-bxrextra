<?php
/**
 * Get list Items
 *
 * @package <%= lowCaseName %>
 * @subpackage processors
 */
class <%= name %>ItemGetListProcessor extends modObjectGetListProcessor {
    public $classKey = '<%= name %>Item';
    public $languageTopics = array('<%= lowCaseName %>:default');
    public $defaultSortField = 'position';
    public $defaultSortDirection = 'ASC';
    public $objectType = '<%= lowCaseName %>.item';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                    'name:LIKE' => '%'.$query.'%',
                    'OR:description:LIKE' => '%'.$query.'%',
                ));
        }
        return $c;
    }
}
return '<%= name %>ItemGetListProcessor';