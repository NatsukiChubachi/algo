/*
 * デモ画面
 */
/* var _gGame;*/
/* var _gCommon;*/

CDemoScreen = function()
{
    /*
     * シーン作成
     */
    this.CreateScene = function()
    {
        var _tmp;

        // デモ画面
        var _demo = new Scene();

        // 背景画面の作成
        _tmp = _gCommon.CreateSprite( 0, 0, 960, 540 );
        _tmp.image = _gGame.assets[ _gAssetResource.sBgBackGround ];
        _demo.addChild( _tmp );

        // 文字字幕の作成
        _tmp = _gCommon.CreateSprite( 0, 0, 960, 540 );
        _tmp.image = _gGame.assets[ _gAssetResource.sIntroStage1 ];
        _tmp.tl.fadeIn( 30 );
        _demo.addChild( _tmp );

        // 「開始」ボタンの作成
        _tmp = _gCommon.CreateSprite( 480 - 200, 280, 400, 165 );
        _tmp.image = _gGame.assets[ _gAssetResource.sStartBtn ];
        _tmp.tl.moveTo( 600, 400, 10 ).and().scaleTo( 0.5, 0.5, 10 );
        _demo.addChild( _tmp );

        // 「開始」ボタンが押された時のイベント処理
        _tmp.addEventListener( "touchstart", 
        function()
        {
            // この画面を廃棄し、メイン画面へ遷移する
            _gGame.popScene();

            var _mainrobo = new CMainRoboticsScreen();
            _mainrobo.CreateScene();
            
            var _mainlogic = new CMainLogicScreen();
            _mainlogic.CreateScene();
        });

        // 作成した画面をゲームへ追加する
        _gGame.pushScene( _demo );
    };
};
