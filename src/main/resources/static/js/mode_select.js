
/**
 * モード選択画面　初期設定
 */
function initModeSelect() {
	window.objCols = [];
}

/**
 * モード選択画面　終了処理
 */
function uninitModeSelect() {
	window.objCols = [];
}

/**
 * モードセレクト画面作成
 */
function createModeSelect() {
	initModeSelect();
	window.objCols = drawModeSelect();
}

/**
 * モードセレクト画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawModeSelect() {
	var cols = [];
	var COMMENT = PANEL_MODE_SELECT.COMMENT;
	var BUTTON = PANEL_MODE_SELECT.BUTTON;

	cols.push(drawText(createObject(COMMENT)));
	for(let i = 0; i < BUTTON.NUM; i++) {
		var buttonCol = createObject(BUTTON);
		buttonCol.name = BUTTON.NAME[i];
		buttonCol.text = BUTTON.TEXT[i];
		buttonCol.centerY = BUTTON.CENTERY + BUTTON.SPACEY * i;
		cols.push(drawText(buttonCol));
	}
	return cols;
}

/**
 * モードセレクト画面　クリック処理
 * @param {Object} obj クリック対象
 */
function clickModeSelect(obj) {
	const WEAPON_QUIZ_NUM = PANEL_MODE_SELECT.BUTTON.INDEX.WEAPON_QUIZ ;
	if(obj.name == PANEL_MODE_SELECT.BUTTON.NAME[WEAPON_QUIZ_NUM - 1]) {
		let modeName = obj.name;
		uninitModeSelect();
		changeMode(modeName);
	}
}
