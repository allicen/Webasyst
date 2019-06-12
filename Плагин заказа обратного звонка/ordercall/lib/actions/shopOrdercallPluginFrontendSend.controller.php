<?php
class shopOrdercallPluginFrontendSendController extends waController
{
    public function execute()
    {
		if(wa('shop')->getPlugin('ordercall')->getSettings('subject_url')){
			$url = $main_site_domain = wa()->getRouting()->getDomain();
		}else{
			$url = '';
		}
		$name= waRequest::post('name');
		$phone = waRequest::post('phone');
		$timefrom = waRequest::post('timefrom');
		$timeto = waRequest::post('timeto');
		$comment = waRequest::post('comment');		
		$body = 'Посетитель сайта заказал обратный звонок<br><br>
					Имя: '.$name.'<br>
					Телефон: '.$phone.'<br>
					Желаемое время для звонка: c '.$timefrom.' до '.$timeto.'<br>
					Комментарий: '.$comment.'';
		$subject = wa('shop')->getPlugin('ordercall')->getSettings('subject')." ".$url;
		$mail_message = new waMailMessage($subject, $body);
		$mail_message->setTo(wa('shop')->getPlugin('ordercall')->getSettings('email_to'), '');
		$mail_message->setFrom(wa('shop')->getPlugin('ordercall')->getSettings('email_from'), '');
		
		if(isset($name) && isset($phone)){
			if(wa('shop')->getPlugin('ordercall')->getSettings('captcha')){
				if (wa()->getCaptcha()->isValid()) {
					$mail_message->send();
				}else{
					echo "Email sending failed";
				}
			}else{
				$mail_message->send();				
			}
		}else{
			echo "Email sending failed";
		}		
    }
}