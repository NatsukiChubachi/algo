/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * ロジックパネル穴の作成
 * @type Array
 */
CreateLogicCouplingHole = function()
{
    // 未実装
};

/**
 * ロジックパネルの作成
 * @returns {undefined}
 */
_gLogicData = [];
_gLogicData[ 0 ] = {
    name: "「歩く」",
    info: "前へ歩きます",
    func: function( e ){ e++; }
};
_gLogicData[ 1 ] = {
    name: "「走る」",
    info: "早く進みます",
    func: function( e ){ e++; }
};
_gLogicData[ 2 ] = {
    name: "「もし」",
    info: "～ならば",
    func: function( e ){ e++; }
};
_gLogicData[ 3 ] = {
    name: "「ロボット」",
    info: "ロボットを指します",
    func: function( e ){ e++; }
};

CreateLogicPanel = function( x, y, logic )
{
    var _itemGroup;
    var _itemSprite;
    var _itemLabel;
    
    // スプライトなどを管理するグループを作成する
    _itemGroup = _gCommon.CreateGroup( x, y );
    
    // ボタン下地部分の作成
    _itemSprite = _gCommon.CreateSprite( 0, 0, 100, 100 );
    _itemSprite.image = _gGame.assets[ dragButton ];
    _itemGroup.addChild( _itemSprite );

    // ロジックパネル名の作成
    _itemLabel = _gCommon.CreateLabel( 5, 10, logic.name );
    _itemGroup.addChild( _itemLabel );
    
    // ロジックパネル説明の作成
    _itemLabel = _gCommon.CreateLabel( 5, 40, logic.info );
    _itemGroup.addChild( _itemLabel );
    
    // パラメータのセット
    _itemGroup._params = [];
    _itemGroup._params._iDragOffsetX = 0;
    _itemGroup._params._iDragOffsetY = 0;
    _itemGroup._params._LogicData = logic;
    
    _itemSprite._group = _itemGroup;
    _itemSprite._params = [];
    _itemSprite._params._bDragFlag = false;
    _itemSprite._params._iDragOffsetX = 0;
    _itemSprite._params._iDragOffsetY = 0;
    
    // イベント
    _itemSprite.addEventListener("touchstart",
    function( e )
    {
        if ( this._params._iDragFlag === true ) return;
        this._params._iDragFlag = true;
        this._group._params._iDragOffsetX = this._group.x - e.x;
        this._group._params._iDragOffsetY = this._group.y - e.y;
    });
    
    _itemSprite.addEventListener("touchmove",
    function( e )
    {
        if ( this._params._iDragFlag === false ) return;
        this._group.x = e.x + this._group._params._iDragOffsetX;
        this._group.y = e.y + this._group._params._iDragOffsetY;
    });
    
    _itemSprite.addEventListener("touchend",
    function( e )
    {
        if ( this._params._iDragFlag === false ) return;
        this._params._iDragFlag = false;
    });
    
    // 管理グループを返す
    return _itemGroup;
};

CreateScene_MainLogic = function()
{
    var _tmp;
    var _group;

    // 画面
    var _scene = new Scene();

    // 背景作成
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
        if ( this._params._open === false )
        {
            this._params._open = true;
            this.tl.moveTo( -100.0, 0.0, 15 ).and().scaleTo( 0.9, 1.0, 15 );
        }
        else
        {
            this._params._open = false;
            this.tl.moveTo( -550.0, 0.0, 15 ).and().scaleTo( 0.25, 1.0, 15 );
        }
    });
    
    // ロジックパネルの作成
    var _tmp;
    
    _tmp = CreateLogicPanel( 50, 50, _gLogicData[0] );
    _scene.addChild( _tmp );
    
    _tmp = CreateLogicPanel( 170, 50, _gLogicData[1] );
    _scene.addChild( _tmp );
    
    _tmp = CreateLogicPanel( 290, 50, _gLogicData[2] );
    _scene.addChild( _tmp );
    
    _tmp = CreateLogicPanel( 410, 50, _gLogicData[3] );
    _scene.addChild( _tmp );

    // シーンを画面に挿入する
    _scene._parent = this;
    _gGame.pushScene( _scene );
};


