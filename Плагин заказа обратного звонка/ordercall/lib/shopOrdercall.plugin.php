<?php
class shopOrdercallPlugin extends shopPlugin
{
	const plugin_id = "ordercall";
	public function frontendHead()
    {
		$active = wa("shop")->getPlugin(self::plugin_id)->getSettings("active");
		if($active){
			$this->addCss('css/ordercall.css');
			$this->addCss('css/jquery-ui.css');
			$this->addJs('js/jquery-ui.js');
			$this->addJs('js/jquery.maskedinput.min.js');
			$this->addJs('js/ordercall.js');
		}
    }
}
