
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
	var SELECT_FRAME = PANEL_MODE_SELECT.SELECT_FRAME;
	var TYPE_BUTTON = PANEL_MODE_SELECT.TYPE_BUTTON;
	var LEVEL_BUTTON = PANEL_MODE_SELECT.LEVEL_BUTTON;
	var NORMAL_QUIZ_START_BUTTON = PANEL_MODE_SELECT.NORMAL_QUIZ_START_BUTTON;

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
	cols.push(drawText(createObject(SELECT_FRAME)));
	for(let i = 0; i < Object.keys(TYPE_BUTTON.INDEX).length; i++) {
		typeButtonObj = createObject(TYPE_BUTTON);
		typeButtonObj.name = TYPE_BUTTON.NAME[i];
		typeButtonObj.index = (i + 1);
		typeButtonObj.text = TYPE_BUTTON.TEXT[i];
		typeButtonObj.centerX = TYPE_BUTTON.CENTERX + TYPE_BUTTON.SPACEX * i;
		cols.push(drawText(typeButtonObj));
	}
	for(let i = 0; i < LEVEL_BUTTON.NUM; i++) {
		typeButtonObj = createObject(LEVEL_BUTTON);
		typeButtonObj.name = LEVEL_BUTTON.NAME + (i + 1);
		typeButtonObj.index = (i + 1);
		typeButtonObj.text = String(i + 1);
		typeButtonObj.centerX = LEVEL_BUTTON.CENTERX + LEVEL_BUTTON.SPACEX * (i % LEVEL_BUTTON.NUMX);
		typeButtonObj.centerY = LEVEL_BUTTON.CENTERY + LEVEL_BUTTON.SPACEY * (Math.floor((i) / LEVEL_BUTTON.NUMX));
		cols.push(drawText(typeButtonObj));
	}
	cols.push(drawText(createObject(NORMAL_QUIZ_START_BUTTON)));
	return cols;
}

/**
 * モード選択画面　クリック処理
 * @param {Object} obj クリック対象
 */
function clickModeSelect(obj) {
	if(obj.name == PANEL_MODE_SELECT.BUTTON.NAME[PANEL_MODE_SELECT.BUTTON.INDEX.NORMAL_QUIZ - 1]) {
		// 通常クイズの設定画面を表示
		window.objCols.map((o) => {
			if(o.group == MODE.NORMAL_QUIZ) {
				o.state |= TEXT_STATE.ENABLE;
				drawText(o);
			}
		});
	}
	for(let i = 0; i < Object.keys(PANEL_MODE_SELECT.TYPE_BUTTON.INDEX).length; i++) {
		if(obj.name == PANEL_MODE_SELECT.TYPE_BUTTON.NAME[i]) {
			obj.state ^= TEXT_STATE.HILIGHT;
			drawText(obj);
		}
	}
	for(let i = 0; i < PANEL_MODE_SELECT.LEVEL_BUTTON.NUM; i++) {
		if(obj.name == PANEL_MODE_SELECT.LEVEL_BUTTON.NAME + (i + 1)) {
			obj.state ^= TEXT_STATE.HILIGHT;
			drawText(obj);
		}
	}
	window.objCols.map((o) => {
		if(o.name == PANEL_MODE_SELECT.NORMAL_QUIZ_START_BUTTON.NAME) {
			// 内容・難易度のいずれかがすべてグレーの場合は開始ボタンをグレーにする
			if(o.state & TEXT_STATE.ACTIVE) {
				if(Object.keys(window.objCols.filter((o2) => PANEL_MODE_SELECT.TYPE_BUTTON.NAME.includes(o2.name) && (o2.state & TEXT_STATE.HILIGHT))).length == 0 ||
					Object.keys(window.objCols.filter((o2) => o2.name.indexOf(PANEL_MODE_SELECT.LEVEL_BUTTON.NAME) > -1 && (o2.state & TEXT_STATE.HILIGHT))).length == 0) {
					o.state &= ~TEXT_STATE.ACTIVE;
					drawText(o);
				}
			} else {
				if(Object.keys(window.objCols.filter((o2) => PANEL_MODE_SELECT.TYPE_BUTTON.NAME.includes(o2.name) && (o2.state & TEXT_STATE.HILIGHT))).length > 0 &&
					Object.keys(window.objCols.filter((o2) => o2.name.indexOf(PANEL_MODE_SELECT.LEVEL_BUTTON.NAME) > -1 && (o2.state & TEXT_STATE.HILIGHT))).length > 0) {
					o.state |= TEXT_STATE.ACTIVE;
					drawText(o);
				}
			}
		}
	})
	if(obj.name == PANEL_MODE_SELECT.NORMAL_QUIZ_START_BUTTON.NAME) {
		let typeFilterObj = window.objCols.filter((o) => PANEL_MODE_SELECT.TYPE_BUTTON.NAME.includes(o.name) && (o.state & TEXT_STATE.HILIGHT))
		window.normalQuizType = typeFilterObj.map((o) => o.index);
		let levelFilterObj = window.objCols.filter((o) => o.name.indexOf(PANEL_MODE_SELECT.LEVEL_BUTTON.NAME) > -1 && (o.state & TEXT_STATE.HILIGHT))
		window.normalQuizLevel = levelFilterObj.map((o) => o.index);
		console.log(window.normalQuizType);
		console.log(window.normalQuizLevel);
		let modeName = MODE.NORMAL_QUIZ;
		uninitModeSelect();
		changeMode(modeName);
	}
	if(obj.name == MODE.WEAPON_QUIZ) {
		let modeName = MODE.WEAPON_QUIZ;
		uninitModeSelect();
		changeMode(modeName);
	}
}
