<?php namespace plugins\instascan\controllers;

class Main extends \Controller
{
    private $s;

    public function __create()
    {
//        $this->dmap('|', 'path');

        $this->s = $this->s('|', [
            'camera' => 0
        ]);
    }

    public function open()
    {
        $this->app->html->addContainer($this->_nodeId(), $this->view());

        $this->widget(':|', [
            'camera' => $this->s['camera'],
            '.r'     => [
                'close'     => $this->_p('>xhr:close|'),
                'setCamera' => $this->_p('>xhr:setCamera|')
            ]
        ]);
    }

    public function close()
    {
        $this->app->html->removeContainer($this->_nodeId());
    }

    public function reload()
    {
        $this->jquery('|')->replace($this->view());
    }

    private function view()
    {
        $v = $this->v('|');

        $v->assign([
                       'CONTENT' => false
                   ]);

        $this->css();

        $this->js('instascan.min');

        return $v;
    }
}
