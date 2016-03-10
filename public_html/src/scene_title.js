/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

CreateTitleScreen = function()
{
    var _tmp;
    var _group;

    // タイトル画面
    var _title = new Scene();
    _title.backgroundColor = "#999999";

    _tmp = _gCommon.CreateSprite( 0, 0, 960, 540 );
    _tmp.image = _gGame.assets[ bgTitle ];
    _title.addChild( _tmp );

    /*
    _tmp = this._common.CreateLabel( 10, 10, "Game Title Scene." );
    _title.addChild( _tmp );

    _tmp = this._common.CreateLabel( 10, 40, "Please Touch Screen." );
    _title.addChild( _tmp );
    */

    _group = _gCommon.CreateGroup( 0, 0 );

    _tmp = _gCommon.CreateSprite( 480 - 200, 280, 400, 165 );
    _tmp.image = _gGame.assets[ startBtn ];
    _group.addChild( _tmp );

    _title.addChild( _group );

    _tmp.addEventListener( "touchstart", function(){
        //_tmp.tl.scaleTo( 1.0, 1.0, 10 ).and().scaleTo( 0.0, 0.0, 30 );
        _gGame.popScene();
        
        CreateDemoScreen();
    });

    _tmp.addEventListener( "enterframe", function(){

    });

    _title._parent = this;

    _gGame.pushScene( _title );
};