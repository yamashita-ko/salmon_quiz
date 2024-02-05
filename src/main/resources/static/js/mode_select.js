
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
	window.objCols = createObjectModeSelect();
	drawAll();
}

/**
 * モード選択画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function createObjectModeSelect() {
	var cols = [];
	var BUTTON = PANEL_MODE_SELECT.BUTTON;
	var YOKODUNA_IMAGE = PANEL_MODE_SELECT.YOKODUNA_IMAGE;
	var IKA2_IMAGE = PANEL_MODE_SELECT.IKA2_IMAGE;
	var IKA3_IMAGE = PANEL_MODE_SELECT.IKA3_IMAGE;
	var IKA4_IMAGE = PANEL_MODE_SELECT.IKA4_IMAGE;
	var TITLE_LOGO_IMAGE = PANEL_MODE_SELECT.TITLE_LOGO_IMAGE;
	var IKURA_IMAGE = PANEL_MODE_SELECT.IKURA_IMAGE;
	var SELECT_FRAME = PANEL_MODE_SELECT.NORMAL_QUIZ_SELECT_FRAME;
	var TYPE_BUTTON = PANEL_MODE_SELECT.TYPE_BUTTON;
	var LEVEL_BUTTON = PANEL_MODE_SELECT.LEVEL_BUTTON;
	var NORMAL_QUIZ_START_BUTTON = PANEL_MODE_SELECT.NORMAL_QUIZ_START_BUTTON;
	var NORMAL_QUIZ_CANCEL_BUTTON = PANEL_MODE_SELECT.NORMAL_QUIZ_CANCEL_BUTTON;

	var diff = createModeSelectDiff();
	cols.push(createObject(BACKGROUND_IMAGE));
	
	// メイン画面用
	cols.push(createObject(YOKODUNA_IMAGE));
	cols.push(createObject(IKA2_IMAGE));
	cols.push(createObject(IKA3_IMAGE));
	cols.push(createObject(TITLE_LOGO_IMAGE));
	cols.push(createObject(IKURA_IMAGE));
	for(let i = 0; i < BUTTON.NUM; i++) {
		let obj = createObject(BUTTON);
		obj.name = diff.buttons[i].name;
		obj.text = diff.buttons[i].text;
		obj.centerY = diff.buttons[i].centerY;
		obj.hoverImage = diff.buttons[i].image;
		cols.push(obj);
	}
	// ツウジョウクイズ選択時画面用
	cols.push(createObject(SELECT_FRAME));
	for(let i = 0; i < Object.keys(TYPE_BUTTON.INDEX).length; i++) {
		let obj = createObject(TYPE_BUTTON);
		obj.name = diff.typeButtons[i].name;
		obj.index = diff.typeButtons[i].index;
		obj.text = diff.typeButtons[i].text;
		obj.centerX = diff.typeButtons[i].centerX;
		cols.push(obj);
	}
	for(let i = 0; i < LEVEL_BUTTON.NUM; i++) {
		let obj = createObject(LEVEL_BUTTON);
		obj.name = diff.levelButtons[i].name;
		obj.index = diff.levelButtons[i].index;
		obj.text = diff.levelButtons[i].text;
		obj.centerX = diff.levelButtons[i].centerX;
		obj.centerY = diff.levelButtons[i].centerY;
		cols.push(obj);
	}
	cols.push(createObject(NORMAL_QUIZ_START_BUTTON));
	cols.push(createObject(NORMAL_QUIZ_CANCEL_BUTTON));
	cols.push(createObject(IKA4_IMAGE));
	return cols;
}

function createModeSelectDiff() {
	var BUTTON = PANEL_MODE_SELECT.BUTTON;
	var TYPE_BUTTON = PANEL_MODE_SELECT.TYPE_BUTTON;
	var LEVEL_BUTTON = PANEL_MODE_SELECT.LEVEL_BUTTON;
	let ret = {};
	let buttons = [];
	for(let i = 0; i < BUTTON.NUM; i++) {
		var obj = {};
		obj.name = BUTTON.NAME[i];
		obj.text = BUTTON.TEXT[i];
		obj.centerY = BUTTON.CENTERY + BUTTON.SPACEY * i;
		obj.hoverImage = BUTTON.HOVER_IMAGE;
		buttons.push(obj);
	}
	ret.buttons = buttons;
	let typeButtons = [];
	for(let i = 0; i < Object.keys(TYPE_BUTTON.INDEX).length; i++) {
		var obj = {};
		obj.name = TYPE_BUTTON.NAME[i];
		obj.index = (i + 1);
		obj.text = TYPE_BUTTON.TEXT[i];
		obj.centerX = TYPE_BUTTON.CENTERX + TYPE_BUTTON.SPACEX * i;
		typeButtons.push(obj);
	}
	ret.typeButtons = typeButtons;
	let levelButtons = [];
	for(let i = 0; i < LEVEL_BUTTON.NUM; i++) {
		var obj = {};
		obj.name = LEVEL_BUTTON.NAME + (i + 1);
		obj.index = (i + 1);
		obj.text = String(i + 1);
		obj.centerX = LEVEL_BUTTON.CENTERX + LEVEL_BUTTON.SPACEX * (i % LEVEL_BUTTON.NUMX);
		obj.centerY = LEVEL_BUTTON.CENTERY + LEVEL_BUTTON.SPACEY * (Math.floor((i) / LEVEL_BUTTON.NUMX));
		levelButtons.push(obj);
	}
	ret.levelButtons = levelButtons;
	return ret;
}

/**
 * モード選択画面　クリック処理
 * @param {Object} obj クリック対象
 */
function clickModeSelect(obj) {
	if(obj.name == PANEL_MODE_SELECT.BUTTON.NAME[PANEL_MODE_SELECT.BUTTON.INDEX.NORMAL_QUIZ - 1]) {
		// 通常クイズの設定画面を表示
		filterGroupExecFunc(MODE.NORMAL_QUIZ, (o) => o.state |= TEXT_STATE.ENABLE);
		filterGroupExecFunc(MODE.SELECT, (o) => o.state &= ~TEXT_STATE.ACTIVE);
		drawAll();
	}
	if(obj.name == PANEL_MODE_SELECT.NORMAL_QUIZ_CANCEL_BUTTON.NAME) {
		// 通常クイズの設定画面を閉じる
		filterGroupExecFunc(MODE.NORMAL_QUIZ, (o) => o.state &= ~TEXT_STATE.ENABLE);
		filterGroupExecFunc(MODE.SELECT, (o) => o.state |= TEXT_STATE.ACTIVE);
		drawAll();
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
	findNameExecFunc(PANEL_MODE_SELECT.NORMAL_QUIZ_START_BUTTON.NAME, (o) => {
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
