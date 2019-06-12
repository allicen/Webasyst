<?php 
return array(
    'active'  => array(
        'title'        => ('Состояние плагина'),
        'description'  => ('Для вывода плагина вставьте код {shopOrdercallViewHelper::display()} в шаблон темы дизайна'),
        'value'	=> 'Заказать обратный звонок', 
		'options' => array(
            array(
                "value" => "0",
                "title" => "Отключен",
            ),
            array(
                "value" => "1",
                "title" => "Включен",
            ),
		),
        'control_type'=> waHtmlControl::SELECT,
    ),
    'link_name'  => array(
        'title'        => ('Текст ссылки'),
        'description'  => ('Укажите текст ссылки во фронтенде'),
        'value'	=> 'Заказать обратный звонок', 
        'control_type'=> waHtmlControl::INPUT,
    ),
    'email_from'  => array(
        'title'        => ('Email отправителя'),
        'description'  => ('Укажите email отправителя'),
        'value'	=> 'no-reply@'.$main_site_domain = wa()->getRouting()->getDomain(), 
        'control_type'=> waHtmlControl::INPUT,
    ),
    'email_to'  => array(
        'title'        => ('Email получателя'),
        'description'  => ('Укажите email, на который нужно отправлять заказы обратного звонка'),
        'value'	=> $main_site_domain = wa('shop')->getConfig()->getGeneralSettings('email'), 
        'control_type'=> waHtmlControl::INPUT,
    ),
    'agree_check'  => array(
        'title'        => ('Выводить согласие с политикой'),
        'value'	=> '0', 
        'control_type'=> waHtmlControl::CHECKBOX,
    ),
    'agree_link'  => array(
        'title'        => ('Ссылка на страницу'),
        'description'  => ('Укажите ссылку на страницу с политикой обработки конфиденциальной информации'),
        'value'	=> '/sample/', 
        'control_type'=> waHtmlControl::INPUT,
    ),
    'subject'  => array(
        'title'        => ('Тема письма'),
        'description'  => ('Укажите тему письма администратору'),
        'value'	=> 'Заказ обратного звонка с сайта', 
        'control_type'=> waHtmlControl::INPUT,
    ),
    'subject_url'  => array(
        'title'        => ('Адрес сайта'),
        'description'  => ('Укажите, нужно ли проставлять адрес сайта в теме письма'),
		'value'	=> '1', 
        'control_type'=> waHtmlControl::CHECKBOX,
    ),
	'captcha'  => array(
        'title'        => ('Выводить капчу'),
        'description'  => ('Укажите, нужно ли добавлять капчу в форму'),
		'value'	=> '0', 
        'control_type'=> waHtmlControl::CHECKBOX,
    ),
);