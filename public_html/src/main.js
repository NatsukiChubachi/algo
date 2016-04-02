/*
 * Project Algo
 */
enchant();

// グローバルクラス
var _gGame = null;
var _gScene = null;
var _gCommon = new CCommon();

// リソースパスの定義
var _gAssetResource = [];
_gAssetResource = {
    sGoalPath: "Resources/Textures/Items/goal.png",
    sRobotWork: "Resources/Textures/Character/robot_walk_s.png",
    sDragButton: "Resources/Textures/UI/Buttons/B_Active.png",
    sDragButtonActive: "Resources/Textures/UI/Buttons/B_NonActive.png",
    sDragFrame: "Resources/Textures/png/line.png",
    sYajirushi: "Resources/Textures/png/yajirushi.png",
    sClearBgPath: "Resources/Textures/UI/BG/background_gameclear.png",
    sStartBtn: "Resources/B_Start.png",
    sBgTitle: "Resources/background_title.png",
    sBgBackGround: "Resources/background.png",
    sIntroStage1: "Resources/intro_stage1.png",
    sBgSGJ_background_L_02: "Resources/SGJ_background_L_02.png",
    sItemAlumiCan: "Resources/CanCan/AlumiCan.png",
    sItemSteelCan: "Resources/CanCan/SteelCan.png"
};

var _gStageClearMessages = {
  0: "西暦2026年、家庭用ロボットが普及し始めた時代。",
  1: "いま流行のロボットは、決められた動きをするだけでなく",
  2: "カスタマイズして持ち主の望む行動をインプットできることが特徴だ。",
  3: "自分専用のロボを手に入れたあなたは、さっそく動かすことに成功した。",
  4: "次はどうしようか。ロボを走らせてみようか。",
  5: "しかし、路上には空き缶などのゴミが多く、",
  6: "ロボを走らせて転んだりしたら壊れてしまうかもしれない。",
  7: "どうしよう…そうだ、これを次の目標にしよう！",
  8: "あなたは、空き缶をロボに拾わせることにした。",
  9: "ロボが空き缶を拾うようにカスタマイズしよう！"
//  1: "見事、空き缶をロボに拾わせることに成功したあなた。¥n¥nしかし、捨てられている空き缶はまだまだある。¥nしかも今度は、アルミ缶とスチール缶が混在している。¥nここのゴミ箱はアルミ缶とスチール缶を分けられるようになっている。¥n¥n空き缶を集めて新しい缶にリサイクルするためには、¥nアルミ缶とスチール缶を区別する必要があるらしい。¥n¥nロボがアルミ缶とスチール缶を分けて回収するようにカスタマイズしよう！",
};

var isGoal = false;

/**
 * ページがロードされた際に実行される関数
 * このイベントでenchant.jsを初期化し、ゲームを開始する
 */
window.onload = function()
{
    // Coreクラスの初期化、画面サイズを指定する
    // ゲーム処理のFPS値（秒間の更新回数）を指定する
    var game = new Core(960, 540);
    game.fps = 30;
    _gGame = game;
    
    // preload関数でゲーム中に必要なリソースをロードする
    game.preload([
        _gAssetResource.sGoalPath,
        _gAssetResource.sRobotWork,
        _gAssetResource.sDragButton,
        _gAssetResource.sDragButtonActive,
        _gAssetResource.sDragFrame,
        _gAssetResource.sYajirushi,
        _gAssetResource.sClearBgPath,
        _gAssetResource.sStartBtn,
        _gAssetResource.sBgTitle,
        _gAssetResource.sBgBackGround,
        _gAssetResource.sIntroStage1,
        _gAssetResource.sBgSGJ_background_L_02,
        _gAssetResource.sItemAlumiCan,
        _gAssetResource.sItemSteelCan
    ]);

    /**
     * ロード完了後に実行されるイベント
     */
    game.onload = function()
    {
        _gScene = _gGame.rootScene;
        
        var _title = new CTitleScreen;
        _title.CreateScene();
    };

    // ゲームをスタートする
    game.start();
};
