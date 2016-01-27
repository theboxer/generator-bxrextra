<?php
/**
 * Default English Lexicon Entries for <%= name %>
 *
 * @package <%= lowCaseName %>
 * @subpackage lexicon
 */

$_lang['<%= lowCaseName %>'] = '<%= name %>';
<% if (includeSampleGrid == true) { %>
$_lang['<%= lowCaseName %>.menu.<%= lowCaseName %>'] = '<%= name %>';
$_lang['<%= lowCaseName %>.menu.<%= lowCaseName %>_desc'] = 'A sample Extra to develop from.';

$_lang['<%= lowCaseName %>.global.search'] = 'Search';

$_lang['<%= lowCaseName %>.item.items'] = 'Items';
$_lang['<%= lowCaseName %>.item.intro_msg'] = 'Manage your items.';

$_lang['<%= lowCaseName %>.item.name'] = 'Name';
$_lang['<%= lowCaseName %>.item.description'] = 'Description';
$_lang['<%= lowCaseName %>.item.position'] = 'Position';
$_lang['<%= lowCaseName %>.item.create'] = 'Create item';
$_lang['<%= lowCaseName %>.item.update'] = 'Update item';
$_lang['<%= lowCaseName %>.item.remove'] = 'Remove item';
$_lang['<%= lowCaseName %>.item.remove_confirm'] = 'Are you sure you want to remove this item?';

$_lang['<%= lowCaseName %>.err.item_name_ae'] = 'An item already exists with that name.';
$_lang['<%= lowCaseName %>.err.item_nf'] = 'Item not found.';
$_lang['<%= lowCaseName %>.err.item_name_ns'] = 'Name is not specified.';
$_lang['<%= lowCaseName %>.err.item_remove'] = 'An error occurred while trying to remove the item.';
$_lang['<%= lowCaseName %>.err.item_save'] = 'An error occurred while trying to save the item.';

<% } %>
