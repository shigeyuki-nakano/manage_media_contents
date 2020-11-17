<?php

class Router {
    private $controller;

    public function __construct() {
        $this->controller = new Controller();
    }

    public function routing() {
        add_action('admin_menu', [$this, 'top']);
        add_action('admin_menu', [$this, 'videos']);
    }

    public function top() {
        add_submenu_page(
            'upload.php',
            '画像メディア管理',
            'TOP',
            'level_7',
            'TOP', 
            [$this->controller, 'TOP']
        );
    }

    public function videos() {
        add_submenu_page(
            'upload.php',
            '動画メディア管理',
            'VIDEOS',
            'level_7',
            'videos', 
            [$this->controller, 'videos']
        );
    }
}