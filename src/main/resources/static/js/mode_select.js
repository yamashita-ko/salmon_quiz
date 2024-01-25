
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
 * モード選択画面作成
 */
function createModeSelect() {
	initModeSelect();
	window.objCols = drawModeSelect();
}

/**
 * モード選択画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawModeSelect() {
	var cols = [];
	var COMMENT = PANEL_MODE_SELECT.COMMENT;
	var BUTTON = PANEL_MODE_SELECT.BUTTON;
	var YOKODUNA_IMAGE = PANEL_MODE_SELECT.YOKODUNA_IMAGE;
	var KUMASAN_IMAGE = PANEL_MODE_SELECT.KUMASAN_IMAGE;
	var IKA_IMAGE = PANEL_MODE_SELECT.IKA_IMAGE;
	var TITLE_LOGO_IMAGE = PANEL_MODE_SELECT.TITLE_LOGO_IMAGE;
	var ZAKOSYAKE_IMAGE = PANEL_MODE_SELECT.ZAKOSYAKE_IMAGE;
	var INK_IMAGE = PANEL_MODE_SELECT.INK_IMAGE;
	var IKURA_IMAGE = PANEL_MODE_SELECT.IKURA_IMAGE;

	cols.push(drawText(createObject(COMMENT)));
	for(let i = 0; i < BUTTON.NUM; i++) {
		var buttonCol = createObject(BUTTON);
		buttonCol.name = BUTTON.NAME[i];
		buttonCol.text = BUTTON.TEXT[i];
		buttonCol.centerY = BUTTON.CENTERY + BUTTON.SPACEY * i;
		buttonCol.hoverImage = BUTTON.HOVER_IMAGE;
		cols.push(drawText(buttonCol));
	}
	cols.push(drawText(createObject(YOKODUNA_IMAGE)));
	cols.push(drawText(createObject(KUMASAN_IMAGE)));
	cols.push(drawText(createObject(IKA_IMAGE)));
	cols.push(drawText(createObject(TITLE_LOGO_IMAGE)));
	cols.push(drawText(createObject(ZAKOSYAKE_IMAGE)));
	cols.push(drawText(createObject(INK_IMAGE)));
	cols.push(drawText(createObject(IKURA_IMAGE)));
	return cols;
}

/**
 * モード選択画面　クリック処理
 * @param {Object} obj クリック対象
 */
function clickModeSelect(obj) {
	let modeName = obj.name;
	uninitModeSelect();
	changeMode(modeName);
}
