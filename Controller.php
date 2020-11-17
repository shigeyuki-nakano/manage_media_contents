<?php

// namespace yubiori\manage_media_contents\assets;

class Controller {
    private $model;
    private $views_dir_path;
    
    public function __construct() {
        $this->model = new Model();
        $this->views_dir_path = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'resource' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR;
    }
    public function top() {
        if($_SERVER["REQUEST_METHOD"] === "POST") {

        } else {
            
        }
        require_once $this->views_dir_path . 'top.php';
    }

    public function videos() {
        require_once $this->views_dir_path . 'videos.php';
    }
}