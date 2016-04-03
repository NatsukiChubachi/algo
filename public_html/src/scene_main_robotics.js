/* 
 * ロボ動作部分
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

CMainRoboticsScreen = function()
{
    this.CreateScene = function()
    {
        // 画面
        var _scene = new Scene();
        _scene.backgroundColor = "#999999";
        
        /**
         * Sprite.image {Object}
         * Core#preload で指定されたファイルは、Core.assets のプロパティとして格納される。
         * Sprite.image にこれを代入することで、画像を表示することができる
         */
        backgroundR = new Sprite(960, 540);
        backgroundR.x = 0;
        backgroundR.y = 0;    // Sprite の左上の x, y 座標を指定
        backgroundR.image = _gGame.assets[ _gAssetResource.sBgBackGround ];

        goal = new Sprite(150, 125);
        goal.x = 960 - goal.width;
        goal.y = (640 / 2) - (goal.height / 2);    // Sprite の左上の x, y 座標を指定
        goal.image = _gGame.assets[ _gAssetResource.sGoalPath ];

        //// BGMの再生
        //bgm = game.assets[bgmPath];
        //game.rootScene.addEventListener("enterframe", function(){
        //  bgm.play();
        //});

        // ロボット
        var robot = new Sprite(150, 200);

        /**
         * Sprite.image {Object}
         * Core#preload で指定されたファイルは、Core.assets のプロパティとして格納される。
         * Sprite.image にこれを代入することで、画像を表示することができる
         */
        robot.image = _gGame.assets[ _gAssetResource.sRobotWork ];
        robot.x = 150;
        robot.y = 150;
        
        robot._params = [];
        robot._params._scene = _scene;
        
        /**
         * Group#addChild(node) {Function}
         * オブジェクトをノードツリーに追加するメソッド。
         * ここでは、クマの画像を表示するスプライトオブジェクトを、rootScene に追加している。
         * Core.rootScene は Group を継承した Scene クラスのインスタンスで、描画ツリーのルートになる特別な Scene オブジェクト。
         * この rootScene に描画したいオブジェクトを子として追加する (addChild) ことで、毎フレーム描画されるようになる。
         * 引数には enchant.Node を継承したクラス (Entity, Group, Scene, Label, Sprite..) を指定する。
         */
        _scene.addChild( backgroundR );
        _scene.addChild( goal );
        _scene.addChild( robot );

        /**
         * EventTarget#addEventListener(event, listener)
         * イベントに対するリスナを登録する。
         * リスナとして登録された関数は、指定されたイベントの発行時に実行される。
         * よく使うイベントには、以下のようなものがある。
         * - "touchstart" : タッチ/クリックされたとき
         * - "touchmove" : タッチ座標が動いた/ドラッグされたとき
         * - "touchend" : タッチ/クリックが離されたとき
         * - "enterframe" : 新しいフレームが描画される前
         * - "exitframe" : 新しいフレームが描画された後
         * enchant.js やプラグインに組み込まれたイベントは、それぞれのタイミングで自動で発行されるが、
         * EventTarget#dispatchEvent で任意のイベントを発行することもできる。
         *
         * ここでは、右に向かって走っていくアニメーションを表現するために、
         * 新しいフレームが描画される前に、毎回クマの画像を切り替え、x座標を1増やすという処理をリスナとして追加する。
         */
        robot.addEventListener("enterframe", 
        function()
        {
            this.frame = (this.age / 4) % 8 + 1;
            if(isGoal)
            {
                var func_goal = _gStageContents[ _gCurrentStage-1 ].func_goal;
                
                //if(this.x >= 775)
                if ( func_goal(this) === true )
                {
                    var _scene = this._params._scene;
                    
                    clearBg = new Sprite(960, 540);
                    clearBg.x = 0;
                    clearBg.y = 0;    // Sprite の左上の x, y 座標を指定
                    clearBg.image = _gGame.assets[ _gAssetResource.sClearBgPath ];
                    _scene.addChild( clearBg );
                
                    var _tmp;
                    for ( var j=0; j<2; j++ )
                    {
                        for ( var i=0; i<10; i++ )
                        {
                            _tmp = _gCommon.CreateLabel( 100+(1*j), 150+(20*i)+(1*j), _gStageClearMessages[i] );
                            _tmp.width = 750;
                        
                            _tmp.font = "18px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
                            
                            if ( j === 0 ) _tmp.color = "#000000";
                            else _tmp.color = "#ffffff";
                        
                            _tmp.scale( 1.0, 0.0 );
                            _tmp.tl.delay( i*5 ).scaleTo( 1.0, 1.0, 15 );
                            _scene.addChild( _tmp );
                        }
                    }
                    
                    // ロボットエンティティの削除
                    _scene.removeChild( robot );
                
                    // スタートボタンの設定
                    _tmp = _gCommon.CreateSprite( 600, 400, 400, 165 );
                    _tmp.image = _gGame.assets[ _gAssetResource.sStartBtn ];
                    _tmp.scale( 0.35, 0.35 );
                    _scene.addChild( _tmp );

                    _tmp._params = [];
                    _tmp._params._MainLogic_Group = this._MainLogic_Group;

                    _tmp.addEventListener("touchstart",
                    function()
                    {
                        // 今の画面の廃棄
                        _gGame.popScene();

                        _gCurrentStage++;
                        if ( _gTotalStage < _gCurrentStage )
                        {
                            // タイトル画面に戻る
                            var _title = new CTitleScreen;
                            _title.CreateScene();
                        }
                        else
                        {
                            var _demo = new CDemoScreen;
                            _demo.CreateScene();
                        }
                    });
                }
                else
                {
                    // this.x += 3;
                    
                    // ※
                    // パネルロジックがセットされているとき、その処理を用いで
                    // 動作に追加処理する
                    if ( 
                        _gLogic[0] !== null &&
                        _gLogic[1] !== null 
                        )
                    {
                        var _target = _gLogic[0]( this );   // 一つ目のロジックで「対象」を決定する
                        _gLogic[1]( _target );              // 二つ目のロジックで「行動」を決定する
                    }
                }
            }
        });
        
        _gGame.pushScene( _scene );
        
        isGoal = true;
    };
};



