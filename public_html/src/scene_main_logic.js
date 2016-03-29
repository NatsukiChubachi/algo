/*
 * メインロジック画面
 */
/*
var _gGame = null;
var _gScene = null;
var _gCommon = new CCommon();

var _gTotalStage = 1;
var _gCurrentStage = 1;
var _gLogicData = null;
var _gStageContents = null;
*/

//_gLogic = null;
_gLogic = [];

CMainLogicScreen = function()
{
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

        // ロジックパネル矢印
        _itemLabel = _gCommon.CreateLabel( 60, 60, "●" );
        _itemLabel.width = 960;
        _itemLabel.font = "32px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        
        if ( logic.type === 1 ) _itemLabel.color = "#FF4444";
        else _itemLabel.color = "#4444FF"
        
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
        _itemSprite._params._type = logic.type;

        _itemSprite._params._hole = this._CoupleingHole;
        _itemSprite._params._MainLogic_Group = this._MainLogic_Group;
        
        // イベント
        // ドラッグムーブのための処理
        _itemSprite.addEventListener("touchstart",
        function( e )
        {
            // 現在ドラッグムーブ状態か？
            if ( this._params._iDragFlag === true )
            {
                return;
            }
            
            // クリックしたパネルをドラッグムーブ状態にする
            this._params._iDragFlag = true;
            this._group._params._iDragOffsetX = this._group.x - e.x;
            this._group._params._iDragOffsetY = this._group.y - e.y;
        });

        // イベント
        // ドラッグムーブのための処理
        _itemSprite.addEventListener("touchmove",
        function( e )
        {
            // ドラッグムーブ状態のパネル位置の調整
            if ( this._params._iDragFlag === false ) return;
            this._group.x = e.x + this._group._params._iDragOffsetX;
            this._group.y = e.y + this._group._params._iDragOffsetY;

            // パネル穴との位置のあたり判定
            var iCount = this._params._hole.length;
            for ( var i=0; i<iCount; i++ )
            {
                if ( 
                    this._params._hole[i]._sprite._params._type === this._params._type &&
                    this._group._x > this._params._hole[i]._x - 10 &&
                    this._group._x < this._params._hole[i]._x + 110 &&
                    this._group._y > this._params._hole[i]._y - 10 &&
                    this._group._y < this._params._hole[i]._y + 110
                )
                {
                    // パネルがセット状態でなく、且つパネル穴付近の場合は
                    // そのパネル穴にセットされる
                    this._group._x = this._params._hole[i].x;
                    this._group._y = this._params._hole[i].y;
                    this._params._iDragFlag = false;

                    var _hole = this._params._hole[i];
                    _hole._sprite._params._panel = this;

                    // セットした穴番号にロジックがセットされる
                    _gLogic[i] = this._group._params._LogicData.func;
                    
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
    this.CreateLogicCouplingHole = function( x, y, pos, type )
    {
        var _itemGroup;
        var _itemSprite;

        // スプライトなどを管理するグループを作成する
        _itemGroup = _gCommon.CreateGroup( x, y );

        // ボタン下地部分の作成
        _itemSprite = _gCommon.CreateSprite( 0, 0, 100, 100 );
        
        if ( type === 0 ) _itemSprite.image = _gGame.assets[ _gAssetResource.sDragFrame_Blue ];
        else _itemSprite.image = _gGame.assets[ _gAssetResource.sDragFrame ];
        
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
        _itemSprite._params._type = type;
        
        _itemGroup._sprite = _itemSprite;
        
        // イベント（パネルのキャンセル）
        _itemSprite.addEventListener("touchstart", 
        function()
        {
            // パネルがセットされている場合
            if ( this._params._panel !== null )
            {
                // セットされているパネルを初期位置に戻す
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
        _tmp = _gCommon.CreateSprite( 200, 0, 960, 540 );
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

        // ステージ名
        _tmp = _gCommon.CreateLabel( 10+2, 10+2, "Stage : " + _gCurrentStage );
        _tmp.width = 960;
        _tmp.font = "32px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        _tmp.color = "#000000";
        _group.addChild( _tmp );
        
        _tmp = _gCommon.CreateLabel( 10, 10, "Stage : " + _gCurrentStage );
        _tmp.width = 960;
        _tmp.font = "32px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        _tmp.color = "#FFFFFF";
        _group.addChild( _tmp );

        // ロジックパネル矢印
        _tmp = _gCommon.CreateLabel( 205, 250, "→" );
        _tmp.width = 960;
        _tmp.font = "64px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        _tmp.color = "#FF0000";
        _group.addChild( _tmp );
        
        // ロジックパネルの作成
        _tmp = this.CreateLogicPanel( 50, 50, _gLogicData[0] );
        _group.addChild( _tmp );

        // ロジックパネルの作成
        _tmp = this.CreateLogicPanel( 170, 50, _gLogicData[1] );
        _group.addChild( _tmp );

        // ロジックパネルの作成
        _tmp = this.CreateLogicPanel( 290, 50, _gLogicData[2] );
        _group.addChild( _tmp );

//        // ロジックパネルの作成
//        _tmp = this.CreateLogicPanel( 410, 50, this._gLogicData[3] );
//        _group.addChild( _tmp );

        // ロジックホールの作成
        _tmp = this.CreateLogicCouplingHole( 100, 250, null, 0 );
        _group.addChild( _tmp );
        this._CoupleingHole[ 0 ] = _tmp;

        // ロジックホールの作成
        _tmp = this.CreateLogicCouplingHole( 250, 250, null, 1 );
        _group.addChild( _tmp );
        this._CoupleingHole[ 1 ] = _tmp;
        
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
        _tmp._params._enable = false;
        
        _tmp.addEventListener("enterframe", 
        function()
        {
            this._params._enable = true;
            for ( var i=0; i<this._params._hole.length; i++ )
            {
                if ( this._params._hole[i]._sprite._params._panel === null )    
                {
                    this._params._enable = false;
                }
            }
            
            if ( this._params._enable === true ) this.opacity = 1.0
            else this.opacity = 0.5;
            /*
            var _panel = this._params._hole[ 0 ]._sprite._params._panel;
            if ( _panel === null ) this.opacity = 0.5;
            else this.opacity = 1.0;
            */
        });
        
        _tmp.addEventListener("touchstart",
        function()
        {
            //if ( this._params._hole[ 0 ]._sprite._params._panel === null ) return;
            if ( this._params._enable === false ) return;
            
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
        var _tips_message = _gStageContents[_gCurrentStage-1].tips_message;
        
        for ( var i=0; i<_tips_message.length; i++ )
        {
            _tmp = _gCommon.CreateLabel( 60, 420+(20*i), _tips_message[i] );
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


