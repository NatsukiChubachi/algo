/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


CreateDemoScreen = function()
{
    this.demoCount = 0;

    var _tmp;

    // デモ画面
    var _demo = new Scene();
    //_demo.backgroundColor = "#66FF66";

    _tmp = _gCommon.CreateSprite( 0, 0, 960, 540 );
    _tmp.image = _gGame.assets[ bgBackGround ];
    _demo.addChild( _tmp );

    /*
    _tmp = this._common.CreateLabel( 10, 10, "DEMO_SCREEN." );
    _demo.addChild( _tmp );
    */

    _tmp = _gCommon.CreateSprite( 0, 0, 960, 540 );
    _tmp.image = _gGame.assets[ introStage1 ];
    _tmp.tl.fadeIn( 30 );
    _demo.addChild( _tmp );

    /*
    _tmp = new Sprite(960, 540);
    _tmp.image = game.assets[introStage1];
    _tmp.x = 0;
    _tmp.y = 0;
    _demo.addChild( _tmp );
    */

    _tmp = _gCommon.CreateSprite( 480 - 200, 280, 400, 165 );
    _tmp.image = _gGame.assets[ startBtn ];
    _tmp.tl.moveTo( 600, 400, 10 ).and().scaleTo( 0.5, 0.5, 10 );
    _demo.addChild( _tmp );

    _tmp.addEventListener( "touchstart", function(){
        /*
        if ( this.demoCount === 0 )
        {
            _tmp = this._common.CreateLabel( 10, 50, "幕間１" );
            _demo.addChild( _tmp );
        }
        else if ( this.demoCount === 1 )
        {
            _tmp = this._common.CreateLabel( 10, 80, "ロボットとの会話がここで入ります。" );
            _demo.addChild( _tmp );
        }
        else if ( this.demoCount === 2 )
        {
            _tmp = this._common.CreateLabel( 10, 110, "会話１「そうだねそうだね」" );
            _demo.addChild( _tmp );
        }
        else if ( this.demoCount === 3 )
        {
            _tmp = this._common.CreateLabel( 10, 140, "会話２「こんにちわ」" );
            _demo.addChild( _tmp );
        }
        else if ( this.demoCount === 4 )
        {
            _tmp = this._common.CreateLabel( 10, 170, "「ゲームが始まりますよ！」" );
            _demo.addChild( _tmp );
        }

        if ( this.demoCount === 5 )
        {
            game.popScene();
        }
        */
        _gGame.popScene();
        this.demoCount++;
        
//        CreateScene_MainLogic();
    });

    _demo.demoCount = 0;
    _demo._common = this._common;

    _gGame.pushScene( _demo );
};

