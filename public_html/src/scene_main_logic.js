/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

CreateScene_MainLogic = function()
{
    var _tmp;
    var _group;

    // タイトル画面
    var _scene = new Scene();

    
    _tmp = _gCommon.CreateSprite( 0, 0, 960, 540 );
    _tmp.image = _gGame.assets[ bgLPath ];
    
    _tmp.moveTo( 0, 0 );
    _tmp.scale( 0, 0 );
    
    _tmp.tl.moveTo( -550.0, 0.0, 0 ).and().scaleTo( 0.0, 1.0, 0 )
            .moveTo( -550.0, 0.0, 30 ).and().scaleTo( 0.25, 1.0, 30 );
    
    _tmp._params = [];
    _tmp._params._open = false;

    _scene.addChild( _tmp );
    
    _tmp.addEventListener( "touchstart", 
    function()
    {
        if ( _tmp._params._open === false )
        {
            _tmp._params._open = true;
            _tmp.tl.moveTo( -100.0, 0.0, 15 ).and().scaleTo( 0.9, 1.0, 15 );
        }
        else
        {
            _tmp._params._open = false;
            _tmp.tl.moveTo( -550.0, 0.0, 15 ).and().scaleTo( 0.25, 1.0, 15 );
        }
    });
    
/*
    _group = _gCommon.CreateGroup( 0, 0 );

    _tmp = _gCommon.CreateSprite( 480 - 200, 280, 400, 165 );
    _tmp.image = _gGame.assets[ startBtn ];
    _group.addChild( _tmp );

    _title.addChild( _group );
*/
/*
    _tmp.addEventListener( "touchstart", 
    function()
    {
        //_tmp.tl.scaleTo( 1.0, 1.0, 10 ).and().scaleTo( 0.0, 0.0, 30 );
        _gGame.popScene();
        
        CreateDemoScreen();
    });

    _tmp.addEventListener( "enterframe", 
    function()
    {

    });
*/
    _scene._parent = this;
    _gGame.pushScene( _scene );
};


