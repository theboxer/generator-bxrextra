<?php
/**
 * @package <%= lowCaseName %>
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/<%= lowCaseName %>item.class.php');
class <%= name %>Item_mysql extends <%= name %>Item {}
?>