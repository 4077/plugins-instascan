<?php namespace plugins\instascan\controllers\main;

class Xhr extends \Controller
{
    public $allow = self::XHR;

    public function close()
    {
        $this->c('~:close|');
    }

    public function setCamera()
    {
        $this->s('~:camera|', $this->data('index'), RR);
    }
}
