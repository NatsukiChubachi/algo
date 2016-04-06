/*
 * タイトル画面
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

CTitleScreen = function()
{
    /*
     * シーン作成
     */
    this.CreateScene = function()
    {
        var _tmp;
        var _group;

        // タイトル画面
        var _title = new Scene();
        _title.backgroundColor = "#999999";

        // タイトル背景画面の設定
        _tmp = _gCommon.CreateSprite( 0, 0, 960, 540 );
        _tmp.image = _gGame.assets[ _gAssetResource.sBgTitle ];
        _title.addChild( _tmp );

        // スタートボタンの設定
        _group = _gCommon.CreateGroup( 0, 0 );

        _tmp = _gCommon.CreateSprite( 480 - 200, 280, 400, 165 );
        _tmp.image = _gGame.assets[ _gAssetResource.sStartBtn ];
        _group.addChild( _tmp );

        _title.addChild( _group );

        // スタートボタンのイベント追加
        _tmp.addEventListener( "touchstart", 
        function()
        {
            // スタートボタンが押された時、このシーンを廃棄し
            // デモ画面に遷移する
            _gGame.popScene();
            
            var _demo = new CDemoScreen();
            _demo.CreateScene();
        });

        // 作成したタイトルシーンをゲームに追加する
        _title._parent = this;
        _gGame.pushScene( _title );
    };
};
