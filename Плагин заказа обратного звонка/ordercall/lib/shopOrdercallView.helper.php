<?php
class shopOrdercallViewHelper extends shopOrdercallPlugin
{
    const plugin_id = "ordercall";

    public static function display()
    {
        $plugin_id = "ordercall";
        $active = wa("shop")->getPlugin(self::plugin_id)->getSettings("active");
        if($active){
            $view = wa()->getView();
            $path = wa()->getAppPath(null, "shop") . "/plugins/" . $plugin_id;

            $link = wa('shop')->getPlugin('ordercall')->getSettings('agree_link');
            $view->assign('link', $link);

            $captcha = wa('shop')->getPlugin('ordercall')->getSettings('captcha');
            $view->assign('captcha', $captcha);

            $agree = wa('shop')->getPlugin('ordercall')->getSettings('agree_check');
            $view->assign('agree', $agree);

            $content = $view->fetch($path . '/templates/actions/frontend/Form.html');
            $ordercallLink = $content.'
			<a href="#" onclick="return false;" class="ordercallink">'.wa('shop')->getPlugin('ordercall')->getSettings('link_name').'</a>';
            return $ordercallLink;
        }else{
            return false;
        }
    }
}