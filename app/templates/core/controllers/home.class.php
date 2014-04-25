<?php
/**
 * Loads the home page.
 *
 * @package <%= lowCaseName %>
 * @subpackage controllers
 */
class <%= name %>HomeManagerController extends <%= name %>BaseManagerController {
    public function process(array $scriptProperties = array()) {

    }
    public function getPageTitle() { return $this->modx->lexicon('<%= lowCaseName %>'); }
    public function loadCustomCssJs() {
    <% if (includeSampleGrid == true) { %>
    <% if (useDDInGrid == true) { %>
        $this->addJavascript($this-><%= lowCaseName %>->getOption('jsUrl').'mgr/extras/griddraganddrop.js');
    <% } %>
        $this->addJavascript($this-><%= lowCaseName %>->getOption('jsUrl').'mgr/widgets/items.grid.js');
        $this->addJavascript($this-><%= lowCaseName %>->getOption('jsUrl').'mgr/widgets/home.panel.js');
        $this->addLastJavascript($this-><%= lowCaseName %>->getOption('jsUrl').'mgr/sections/home.js');
    <% } %>
    }
<% if (includeSampleGrid == true) { %>
    public function getTemplateFile() { return $this-><%= lowCaseName %>->getOption('templatesPath').'home.tpl'; }<% } %>
}