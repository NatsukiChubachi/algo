/*
 * メインロジック画面
 */
_gSelLogicData = null;

CMainLogicScreen = function()
{
    /**
     * ロジックパネルの作成
     */
    this._gLogicData = [];
    this._gLogicData[ 0 ] = {
        name: "「歩く」",
        info: "前へ歩きます<br>(ゴミを拾う)",
        func: function( e ){ e.x = e.x + 3; }
    };
    this._gLogicData[ 1 ] = {
        name: "「走る」",
        info: "早く進みます<br>(ゴミを無視)",
        func: function( e ){ e.x = e.x + 9; }
    };
    this._gLogicData[ 2 ] = {
        name: "「もし」",
        info: "～ならば",
        func: function( e ){ e.x = e.x + 3; }
    };
    this._gLogicData[ 3 ] = {
        name: "「ロボット」",
        info: "ロボットを指します",
        func: function( e ){ e.x = e.x + 3; }
    };

    /**
     * ロジックパネルの作成
     */
    this.CreateLogicPanel = function( x, y, logic )
    {
        var _itemGroup;
        var _itemSprite;
        var _itemLabel;

        // スプライトなどを管理するグループを作成する
        _itemGroup = _gCommon.CreateGroup( x, y );

        // ボタン下地部分の作成
        _itemSprite = _gCommon.CreateSprite( 0, 0, 100, 100 );
        _itemSprite.image = _gGame.assets[ _gAssetResource.sDragButton ];
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
        _itemSprite._params._iStartPosX = x;
        _itemSprite._params._iStartPosY = y;

        _itemSprite._params._hole = this._CoupleingHole;
        _itemSprite._params._MainLogic_Group = this._MainLogic_Group;
        
        // イベント
        // ドラッグムーブのための処理
        _itemSprite.addEventListener("touchstart",
        function( e )
        {
            if ( this._params._iDragFlag === true )
            {
                return;
            }
            this._params._iDragFlag = true;
            this._group._params._iDragOffsetX = this._group.x - e.x;
            this._group._params._iDragOffsetY = this._group.y - e.y;
            
            _gSelLogicData = this._group._params._LogicData;
        });

        // イベント
        // ドラッグムーブのための処理
        _itemSprite.addEventListener("touchmove",
        function( e )
        {
            if ( this._params._iDragFlag === false ) return;
            this._group.x = e.x + this._group._params._iDragOffsetX;
            this._group.y = e.y + this._group._params._iDragOffsetY;

            var iCount = this._params._hole.length;
            for ( var i=0; i<iCount; i++ )
            {
                if ( 
                    this._group._x > this._params._hole[i]._x - 10 &&
                    this._group._x < this._params._hole[i]._x + 110 &&
                    this._group._y > this._params._hole[i]._y - 10 &&
                    this._group._y < this._params._hole[i]._y + 110
                )
                {
                    this._group._x = this._params._hole[i].x;
                    this._group._y = this._params._hole[i].y;
                    this._params._iDragFlag = false;

                    var _hole = this._params._hole[i];
                    _hole._sprite._params._panel = this;
                    break;
                }
            }
        });

        // イベント
        // ドラッグムーブのための処理
        _itemSprite.addEventListener("touchend",
        function( e )
        {
            if ( this._params._iDragFlag === false ) return;
            this._params._iDragFlag = false;
        });

        // 管理グループを返す
        return _itemGroup;
    };

    /**
     * ロジックパネル穴の作成
     */
    this.CreateLogicCouplingHole = function( x, y, pos)
    {
        var _itemGroup;
        var _itemSprite;

        // スプライトなどを管理するグループを作成する
        _itemGroup = _gCommon.CreateGroup( x, y );

        // ボタン下地部分の作成
        _itemSprite = _gCommon.CreateSprite( 0, 0, 100, 100 );
        _itemSprite.image = _gGame.assets[ _gAssetResource.sDragFrame ];
        _itemGroup.addChild( _itemSprite );

        // パラメータのセット
        _itemGroup._params = [];
        _itemGroup._params._iDragOffsetX = 0;
        _itemGroup._params._iDragOffsetY = 0;

        _itemSprite._group = _itemGroup;
        _itemSprite._params = [];
        _itemSprite._params._bDragFlag = false;
        _itemSprite._params._iDragOffsetX = 0;
        _itemSprite._params._iDragOffsetY = 0;
        _itemSprite._params._panel = null;
        
        _itemGroup._sprite = _itemSprite;
        
        // イベント（パネルのキャンセル）
        _itemSprite.addEventListener("touchstart", 
        function()
        {
            if ( this._params._panel !== null )
            {
                var _panel = this._params._panel;
                _panel._group.tl.moveTo( 
                    _panel._params._iStartPosX,
                    _panel._params._iStartPosY, 
                    10 
                    );
            
                this._params._panel = null;
            }
        });
        
        // 管理グループを返す
        return _itemGroup;
    };
    
    /*
     * シーンの作成
     */
    this.CreateScene = function()
    {
        var _tmp;
        var _group;

        this._CoupleingHole = [];
    
        // 画面
        var _scene = new Scene();

        // 画面全体を一つのグループとして管理する
        // スクロール処理などで等しく移動するようにするため
        _group = _gCommon.CreateGroup( 0, 0 );
        this._MainLogic_Group = _group;

        // 背景の作成
        _tmp = _gCommon.CreateSprite( 0, 0, 960, 540 );
        _tmp.image = _gGame.assets[ _gAssetResource.sBgSGJ_background_L_02 ];

        _group.moveTo( -5000, 0 );

        _group.tl.moveTo( -550.0, 0.0, 0 ).and().scaleTo( 0.0, 0.0, 0 )
                .scaleTo( 1.0, 1.0, 10 )
                .moveTo( 0.0, 0.0, 15 ).and().scaleTo( 1.0, 1.0, 15 );

        _tmp._params = [];
        _tmp._params._open = false;

        _tmp.tl.clear();
        _tmp.tl.moveTo( -100.0, 0.0, 15 ).and().scaleTo( 0.9, 1.0, 15 );
        
        _group.addChild( _tmp );

        // ロジックパネルの作成
        _tmp = this.CreateLogicPanel( 50, 50, this._gLogicData[0] );
        _group.addChild( _tmp );

        // ロジックパネルの作成
        _tmp = this.CreateLogicPanel( 170, 50, this._gLogicData[1] );
        _group.addChild( _tmp );

//        // ロジックパネルの作成
//        _tmp = this.CreateLogicPanel( 290, 50, this._gLogicData[2] );
//        _group.addChild( _tmp );

//        // ロジックパネルの作成
//        _tmp = this.CreateLogicPanel( 410, 50, this._gLogicData[3] );
//        _group.addChild( _tmp );

        // ロジックホールの作成
        _tmp = this.CreateLogicCouplingHole( 100, 250, null );
        _group.addChild( _tmp );
        this._CoupleingHole[ 0 ] = _tmp;

//        // ロジックホールの作成
//        _tmp = this.CreateLogicCouplingHole( 200, 250, null );
//        _group.addChild( _tmp );
//        this._CoupleingHole[ 1 ] = _tmp;

//        // ロジックホールの作成
//        _tmp = this.CreateLogicCouplingHole( 300, 250, null );
//        _group.addChild( _tmp );
//        this._CoupleingHole[ 2 ] = _tmp;

//        this._CoupleingHole[ 0 ]._sprite._params._panel;

        // スタートボタンの設定
        _tmp = _gCommon.CreateSprite( 350, 400, 400, 165 );
        _tmp.image = _gGame.assets[ _gAssetResource.sStartBtn ];
        _tmp.scale( 0.35, 0.35 );
        _group.addChild( _tmp );
        
        _tmp._params = [];
        _tmp._params._MainLogic_Group = this._MainLogic_Group;
        _tmp._params._hole = this._CoupleingHole;
        
        _tmp.addEventListener("enterframe", 
        function()
        {
            var _panel = this._params._hole[ 0 ]._sprite._params._panel;
            if ( _panel === null ) this.opacity = 0.5;
            else this.opacity = 1.0;
        });
        
        _tmp.addEventListener("touchstart",
        function()
        {
            if ( this._params._hole[ 0 ]._sprite._params._panel === null ) return;
            
            this._params._MainLogic_Group.tl
            .moveTo( -550.0, 0.0, 30 )
            .then( 
                function() {
                    _gGame.popScene();
                });
        });
        
        // TIPSフレームの追加
        _tmp = _gCommon.CreateSprite( 200, 420, 100, 100 );
        _tmp.image = _gGame.assets[ _gAssetResource.sDragButton ];
        _tmp.scale( 4.0,  1.25 );
        _group.addChild( _tmp );
        
        // TIPSメッセージの追加
        var _tips_message = [
            "TIPS: ",
            "はじめはロボットを動かすところから始めましょう。",
            "「歩く」または「走る」パネルをセットし、",
            "「スタート」を押すとロボットは動き始めます。",
            "目的地までたどり着くとゴールです！"
        ];
        
        for ( var i=0; i<_tips_message.length; i++ )
        {
            _tmp = _gCommon.CreateLabel( 80, 420+(20*i), _tips_message[i] );
            _tmp.width = 500;
            _tmp.font = "14px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
            _tmp.color = "#000000";
            _group.addChild( _tmp );
        }
        
        _scene.addChild( _group );    
        
        // シーンを画面に挿入する
        _scene._parent = this;
        _gGame.pushScene( _scene );
    };
};


