
/**
 * モードセレクト　ボタン作成時の設定
 * @param {string} name ボタンの名前
 * @param {boolean} hover マウスがホバー状態か
 * @return {Object} 当たり判定用オブジェクト
 */
function drawModeSelectButton(name, state, image) {
	const TEXT_CENTERX = window.CANVAS_WIDTH / 2;
	const TEXT_CENTERY = 110;
	const TEXT_SCALEX = window.CANVAS_WIDTH - 200;
	const TEXT_SCALEY = 200;
	const BUTTON_CENTERX = window.CANVAS_WIDTH / 6;
	const BUTTON_CENTERY = 300;
	const BUTTON_CENTERY_SPACE = 200;
	const BUTTON_SCALEX = 300;
	const BUTTON_SCALEY = 100;
	const TEXT_COLOR = "#FFFFFF";
	const BUTTON_COLOR = "#548235";
	const BUTTON_HOVER_COLOR = "#BBBB35";
	const TEXT_MODE_SELECT = "ステージを選択してください。";
	const TEXT_WEAPON_QUIZ = "武器クイズ";
	const TEXT_ENEMY_QUIZ = "シャケクイズ";
	const TEXT_OTHER_QUIZ = "通常クイズ";
	const TEXT_DIFFICULT_QUIZ = "高難易度クイズ";
	const TEXT_FONT_SIZE = 32;
	const BUTTON_FONT_SIZE = 24;
	var obj = {};
	let color = state & window.TEXT_STATE.HOVER ? BUTTON_HOVER_COLOR : BUTTON_COLOR;
	switch(name){
		case window.MODE_SELECT:
			obj = drawText(name, TEXT_CENTERX, TEXT_CENTERY, TEXT_SCALEX, TEXT_SCALEY, TEXT_MODE_SELECT, TEXT_COLOR, color, TEXT_FONT_SIZE, state, image);
			break;
		case window.MODE_WEAPON_QUIZ:
			obj = drawText(name, BUTTON_CENTERX, BUTTON_CENTERY + BUTTON_CENTERY_SPACE * 0, BUTTON_SCALEX, BUTTON_SCALEY, TEXT_WEAPON_QUIZ, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		case window.MODE_ENEMY_QUIZ:
			obj = drawText(name, BUTTON_CENTERX, BUTTON_CENTERY + BUTTON_CENTERY_SPACE * 1, BUTTON_SCALEX, BUTTON_SCALEY, TEXT_ENEMY_QUIZ, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		case window.MODE_OTHER_QUIZ:
			obj = drawText(name, BUTTON_CENTERX, BUTTON_CENTERY + BUTTON_CENTERY_SPACE * 2, BUTTON_SCALEX, BUTTON_SCALEY, TEXT_OTHER_QUIZ, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		case window.MODE_DIFFICULT_QUIZ:
			obj = drawText(name, BUTTON_CENTERX, BUTTON_CENTERY + BUTTON_CENTERY_SPACE * 3, BUTTON_SCALEX, BUTTON_SCALEY, TEXT_DIFFICULT_QUIZ, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
	}
	return obj;
}

/**
 * モード選択画面　初期設定
 */
function initModeSelect() {
	window.obj_cols = [];
}

/**
 * モード選択画面　終了処理
 */
function uninitModeSelect() {
	window.obj_cols = [];
}

/**
 * モードセレクト画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawModeSelect() {
	var cols = [];
	const MODE_SELECT_TEXT_STATE = window.TEXT_STATE.IS_TEXT | window.TEXT_STATE.ACTIVE | window.TEXT_STATE.ENABLE | window.TEXT_STATE.CENTERY;
	const MODE_SELECT_BUTTON_STATE = window.TEXT_STATE.IS_BUTTON | window.TEXT_STATE.ACTIVE | window.TEXT_STATE.ENABLE | window.TEXT_STATE.CENTERX | window.TEXT_STATE.CENTERY;
	cols.push(drawButton(window.MODE_SELECT, MODE_SELECT_TEXT_STATE, null));
	cols.push(drawButton(window.MODE_WEAPON_QUIZ, MODE_SELECT_BUTTON_STATE, null));
	cols.push(drawButton(window.MODE_ENEMY_QUIZ, MODE_SELECT_BUTTON_STATE, null));
	cols.push(drawButton(window.MODE_OTHER_QUIZ, MODE_SELECT_BUTTON_STATE, null));
	cols.push(drawButton(window.MODE_DIFFICULT_QUIZ, MODE_SELECT_BUTTON_STATE, null));
	return cols;
}