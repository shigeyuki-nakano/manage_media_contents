<?php

/**
* @package Hello_Plugin
* @version 1.0
*/
/*
Plugin Name: manage_media_contents
Plugin URI: 
Description: サイトの画像や動画や文章を管理するプラグイン
Author: nakano
Version: 1.0
Author URI: http://yubiori.band
*/

namespace yubiori\manage_media_contents;

use Router;

class Init {
    private $class_dirs;
    private $router;

    public function __construct() {
        $this->exec_autoload();
        $this->resource_loader();
        $this->router = new Router();
        $this->router->routing();
    }

    private function exec_autoload(): void {
        $this->register_dirs();
        spl_autoload_register(array($this, 'autoload'));
    }

    private function register_dirs(): void {
        $this->class_dirs[] = dirname(__FILE__);
    }

    private function autoload($class): void {
        $class = str_replace(__NAMESPACE__ . '\\', '', $class);
        $class = str_replace('\\', '/', $class);
        forEach($this->class_dirs as $dir) {
            $file = $dir . '/' . $class . '.php';
            if(is_readable($file)) {
                require $file;
                return;
            }
        }
    }

    private function resource_loader() {
        add_action('admin_enqueue_scripts', function() {
            // js
            wp_enqueue_script(
                'custom-gallery',
                plugins_url('/app.js', __FILE__),
            );

            // css
            wp_enqueue_style(
                'custom-gallery',
                plugins_url('/style.css', __FILE__),
            );
        });
    }
}

new Init();