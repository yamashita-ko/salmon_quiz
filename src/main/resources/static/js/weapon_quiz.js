
var TEXT_HINT = "hint";
var TEXT_HINT_ALL = "hint_all";
var BUTTON_QUESTION_NUM = 4;
var BUTTON_QUESTION = "question";
var BUTTON_QUESTION_1 = "question1";
var BUTTON_QUESTION_2 = "question2";
var BUTTON_QUESTION_3 = "question3";
var BUTTON_QUESTION_4 = "question4";
var BUTTON_ANSWER = "answer";
var BUTTON_SELECT_FRAME = "select_frame"
var BUTTON_CANCEL = "cancel";
var BUTTON_WEAPON = "weapon_";
var RESULT_TEXT_HINT = "hint";
var RESULT_IMAGE_CORRECT = "correct_image";
var RESULT_IMAGE_WEAPON = "correct_weapon_image";
var RESULT_BUTTON_MORE = "more";
var RESULT_BUTTON_MODE_SELECT = "return";
var weapon_data = [];
var weapon_answer_index;
var question_all_org = [];
var question_all = [];
var question_select = [];	// 4択の質問
var question_answer = [];	// 回答済みの質問
var hint_all_text = "";

/**
 * 武器クイズ　ボタン作成時の設定
 * @param {string} name ボタンの名前
 * @param {boolean} hover マウスがホバー状態か
 * @param {Object[]} question_all 質問データ
 * @param {number[]} question_answer 質問回答済みindexリスト
 * @param {number[]} question_select 質問可能indexリスト
 * @return {Object} 当たり判定用オブジェクト
 */
function drawWeaponQuestionButton(name, state, question_all, question_answer, question_select, image) {
	const TEXT_CENTERX = window.CANVAS_WIDTH / 2;
	const TEXT_CENTERY = 135;
	const TEXT_SCALEX = window.CANVAS_WIDTH - 200;
	const TEXT_SCALEY = 250;
	const BUTTON_CENTERX = window.CANVAS_WIDTH / 5;
	const BUTTON_CENTERY = 350;
	const BUTTON_CENTERY_SPACE = 180;
	const BUTTON_SCALEX = 500;
	const BUTTON_SCALEY = 100;
	const TEXT_HINT_ALL_CENTERX = window.CANVAS_WIDTH / 9 * 5;
	const TEXT_HINT_ALL_CENTERY = 600;
	const TEXT_HINT_ALL_SCALEX = 700;
	const TEXT_HINT_ALL_SCALEY = 600;
	const ANSWER_CENTERX = window.CANVAS_WIDTH / 8 * 7;
	const ANSWER_CENTERY = 900;
	const ANSWER_SCALEX = 150;
	const ANSWER_SCALEY = 100;
	const SELECT_FRAME_CENTERX = window.CANVAS_WIDTH / 2;
	const SELECT_FRAME_CENTERY = window.CANVAS_HEIGHT / 2;
	const SELECT_FRAME_SCALEX = window.CANVAS_WIDTH / 8 * 7;
	const SELECT_FRAME_SCALEY = window.CANVAS_HEIGHT / 8 * 7;
	const CANCEL_SCALEX = 50;
	const CANCEL_SCALEY = 50;
	const CANCEL_CENTERX = SELECT_FRAME_CENTERX + SELECT_FRAME_SCALEX / 2 - CANCEL_SCALEX / 2;
	const CANCEL_CENTERY = SELECT_FRAME_CENTERY - SELECT_FRAME_SCALEY / 2 + CANCEL_SCALEY / 2;
	const TEXT_COLOR = "#FFFFFF";
	const BUTTON_COLOR = "#548235";
	const BUTTON_HOVER_COLOR = "#BBBB35";
	const BUTTON_DISABLE_COLOR = "#555555";
	const BUTTON_ANSWER_COLOR = "#0070C0";
	const BUTTON_ANSWER_HOVER_COLOR = "#FFC000";
	const BUTTON_CANCEL_COLOR = "#CC0000";
	const BUTTON_CANCEL_HOVER_COLOR = "#770000";
	const SELECT_FRAME_COLOR = "#0070C0";
	const TEXT_ANSWER = "回答する";
	const TEXT_SELECT_FRAME = "武器を選択してください。";
	const TEXT_CANCEL = "Ｘ";
	const TEXT_FONT_SIZE = 32;
	const BUTTON_FONT_SIZE = 24;
	var obj = {};
	let color = state & window.TEXT_STATE.HOVER ? BUTTON_HOVER_COLOR : BUTTON_COLOR;
	color = state & window.TEXT_STATE.ACTIVE ? color : BUTTON_DISABLE_COLOR;
	switch(name){
		case window.TEXT_HINT:
			let hint = question_all[question_answer[question_answer.length - 1]].answer
			if(question_all[question_answer[question_answer.length - 1]].note)
				hint += question_all[question_answer[question_answer.length - 1]].note;
			obj = drawText(name, TEXT_CENTERX, TEXT_CENTERY, TEXT_SCALEX, TEXT_SCALEY, hint, TEXT_COLOR, color, TEXT_FONT_SIZE, state, image);
			break;
		case window.BUTTON_QUESTION_1:
			var text = (question_select[0] != -1) ? question_all[question_select[0]].question : "";
			obj = drawText(name, BUTTON_CENTERX, BUTTON_CENTERY + BUTTON_CENTERY_SPACE * 0, BUTTON_SCALEX, BUTTON_SCALEY, text, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		case window.BUTTON_QUESTION_2:
			var text = (question_select[1] != -1) ? question_all[question_select[1]].question : "";
			obj = drawText(name, BUTTON_CENTERX, BUTTON_CENTERY + BUTTON_CENTERY_SPACE * 1, BUTTON_SCALEX, BUTTON_SCALEY, text, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		case window.BUTTON_QUESTION_3:
			var text = (question_select[2] != -1) ? question_all[question_select[2]].question : "";
			obj = drawText(name, BUTTON_CENTERX, BUTTON_CENTERY + BUTTON_CENTERY_SPACE * 2, BUTTON_SCALEX, BUTTON_SCALEY, text, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		case window.BUTTON_QUESTION_4:
			var text = (question_select[3] != -1) ? question_all[question_select[3]].question : "";
			obj = drawText(name, BUTTON_CENTERX, BUTTON_CENTERY + BUTTON_CENTERY_SPACE * 3, BUTTON_SCALEX, BUTTON_SCALEY, text, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		case window.TEXT_HINT_ALL:
			obj = drawText(name, TEXT_HINT_ALL_CENTERX, TEXT_HINT_ALL_CENTERY, TEXT_HINT_ALL_SCALEX, TEXT_HINT_ALL_SCALEY, window.hint_all_text, TEXT_COLOR, color, TEXT_FONT_SIZE, state, image);
			break;
		case window.BUTTON_ANSWER:
			color = state & TEXT_STATE.HOVER ? BUTTON_ANSWER_HOVER_COLOR : BUTTON_ANSWER_COLOR;
			obj = drawText(name, ANSWER_CENTERX, ANSWER_CENTERY, ANSWER_SCALEX, ANSWER_SCALEY, TEXT_ANSWER, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		case window.BUTTON_SELECT_FRAME:
			color = SELECT_FRAME_COLOR;
			obj = drawText(name, SELECT_FRAME_CENTERX, SELECT_FRAME_CENTERY, SELECT_FRAME_SCALEX, SELECT_FRAME_SCALEY, TEXT_SELECT_FRAME, TEXT_COLOR, color, TEXT_FONT_SIZE, state, image);
			break;
		case window.BUTTON_CANCEL:
			color = state & TEXT_STATE.HOVER ? BUTTON_CANCEL_HOVER_COLOR : BUTTON_CANCEL_COLOR;
			obj = drawText(name, CANCEL_CENTERX, CANCEL_CENTERY, CANCEL_SCALEX, CANCEL_SCALEY, TEXT_CANCEL, TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
		default:
			if(name.indexOf(window.BUTTON_WEAPON) == -1) {
				break;
			}
			const MAX_NUMX = 12;
			const STARTX = SELECT_FRAME_CENTERX - SELECT_FRAME_SCALEX / 2 + 100;
			const STARTY = SELECT_FRAME_CENTERY - SELECT_FRAME_SCALEY / 2 + 150;
			const SCALE = 130;
			let num = name.replace(window.BUTTON_WEAPON, "");
			var startX = STARTX + SCALE * ((num - 1) % MAX_NUMX);
			var startY = STARTY + SCALE * (Math.floor((num - 1) / MAX_NUMX));
			obj = drawText(name, startX, startY, SCALE, SCALE, "", TEXT_COLOR, color, BUTTON_FONT_SIZE, state, image);
			break;
	}
	return obj;
}
/**
 * 武器クイズリザルト　ボタン作成時の設定
 * @param {string} name ボタンの名前
 * @param {boolean} hover マウスがホバー状態か
 * @param {Object[]} question_all 質問データ
 * @param {number[]} question_answer 質問回答済みindexリスト
 * @param {number[]} question_select 質問可能indexリスト
 * @return {Object} 当たり判定用オブジェクト
 */
function drawWeaponResultButton(name, state, image) {
	const RESULT_CORRECT_IMAGE_CENTERX = window.CANVAS_WIDTH / 16 * 3;
	const RESULT_CORRECT_IMAGE_CENTERY = 250;
	const RESULT_CORRECT_IMAGE_SCALEX = 500;
	const RESULT_CORRECT_IMAGE_SCALEY = 500;
	const RESULT_CORRECT_WEAPON_IMAGE_CENTERX = window.CANVAS_WIDTH / 16 * 5;
	const RESULT_CORRECT_WEAPON_IMAGE_CENTERY = 400;
	const RESULT_CORRECT_WEAPON_IMAGE_SCALEX = 500;
	const RESULT_CORRECT_WEAPON_IMAGE_SCALEY = 500;
	const RESULT_TEXT_HINT_CENTERX = window.CANVAS_WIDTH / 4 * 3;
	const RESULT_TEXT_HINT_CENTERY = 400;
	const RESULT_TEXT_HINT_SCALEX = 700;
	const RESULT_TEXT_HINT_SCALEY = 600;
	const RESULT_BUTTON_CENTERX = window.CANVAS_WIDTH / 4 * 1;
	const RESULT_BUTTON_CENTERX_SPACE = window.CANVAS_WIDTH / 2;
	const RESULT_BUTTON_CENTERY = 900;
	const RESULT_BUTTON_SCALEX = 500;
	const RESULT_BUTTON_SCALEY = 150;
	const INFO_COLOR = "#548235";
	const TEXT_COLOR = "#FFFFFF";
	const BUTTON_COLOR = "#0070C0";
	const BUTTON_HOVER_COLOR = "#FFC000";
	const TEXT_RESULT_MORE = "もう一度挑戦する";
	const TEXT_RESULT_RETURN = "モード選択画面へ戻る";
	const FONT_SIZE = 32;
	var obj = {};
	let color = state & window.TEXT_STATE.HOVER ? BUTTON_HOVER_COLOR : BUTTON_COLOR;
	switch(name){
		case window.RESULT_TEXT_HINT:
			// ヒントをすべてまとめた一覧を作成
			let resultHint = "";
			resultHint += window.question_all.map((obj) => {
				return obj.answer;
			});
			// カンマ区切りで出力されるため区切り文字を変更
			resultHint = resultHint.replace(/,/g, "\\n")
			color = INFO_COLOR;
			obj = drawText(name, RESULT_TEXT_HINT_CENTERX, RESULT_TEXT_HINT_CENTERY, RESULT_TEXT_HINT_SCALEX, RESULT_TEXT_HINT_SCALEY, resultHint, TEXT_COLOR, color, FONT_SIZE, state, image);
			break;
		case window.RESULT_BUTTON_MORE:
			obj = drawText(name, RESULT_BUTTON_CENTERX, RESULT_BUTTON_CENTERY, RESULT_BUTTON_SCALEX, RESULT_BUTTON_SCALEY, TEXT_RESULT_MORE, TEXT_COLOR, color, FONT_SIZE, state, image);
			break;
		case window.RESULT_BUTTON_MODE_SELECT:
			obj = drawText(name, RESULT_BUTTON_CENTERX + RESULT_BUTTON_CENTERX_SPACE, RESULT_BUTTON_CENTERY, RESULT_BUTTON_SCALEX, RESULT_BUTTON_SCALEY, TEXT_RESULT_RETURN, TEXT_COLOR, color, FONT_SIZE, state, image);
			break;
		case window.RESULT_IMAGE_WEAPON:
			obj = drawText(name, RESULT_CORRECT_WEAPON_IMAGE_CENTERX, RESULT_CORRECT_WEAPON_IMAGE_CENTERY, RESULT_CORRECT_WEAPON_IMAGE_SCALEX, RESULT_CORRECT_WEAPON_IMAGE_SCALEY, "", TEXT_COLOR, color, FONT_SIZE, state, image);
			break;
		case window.RESULT_IMAGE_CORRECT:
			obj = drawText(name, RESULT_CORRECT_IMAGE_CENTERX, RESULT_CORRECT_IMAGE_CENTERY, RESULT_CORRECT_IMAGE_SCALEX, RESULT_CORRECT_IMAGE_SCALEY, "", TEXT_COLOR, color, FONT_SIZE, state, image);
			break;
	}
	return obj;
}


/**
 * 武器クイズ画面　初期設定
 */
function initWeaponQuiz() {
	window.obj_cols = [];
	window.weapon_answer_index = -1;
	window.question_all = [];
	window.question_select = [];	// 4択の質問
	window.question_answer = [];	// 回答済みの質問
	window.hint_all_text = "";
}

/**
 * 武器クイズ画面　終了処理
 */
function uninitWeaponQuiz() {
	window.obj_cols = [];
	window.weapon_data = [];
	window.question_all_org = [];
	window.weapon_answer_index = -1;
	window.question_all = [];
	window.question_select = [];	// 4択の質問
	window.question_answer = [];	// 回答済みの質問
	window.hint_all_text = "";
}

/**
 * 武器クイズ画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawWeaponQuiz(weapon_data) {
	const IMAGE_PATH = "http://localhost:8080/images/"
	var cols = [];
	const MODE_WEAPON_QUIZ_TEXT_STATE = window.TEXT_STATE.IS_TEXT | window.TEXT_STATE.ACTIVE | window.TEXT_STATE.ENABLE;
	const MODE_WEAPON_QUIZ_BUTTON_STATE = window.TEXT_STATE.IS_BUTTON | window.TEXT_STATE.ACTIVE | window.TEXT_STATE.ENABLE | window.TEXT_STATE.CENTERY;
	const MODE_ANSWER_TEXT_STATE = window.TEXT_STATE.IS_TEXT | window.TEXT_STATE.ACTIVE;
	const MODE_ANSWER_BUTTON_STATE = window.TEXT_STATE.IS_BUTTON | window.TEXT_STATE.ACTIVE | window.TEXT_STATE.CENTERX | window.TEXT_STATE.CENTERY;
	const WEAPON_BUTTON_STATE = window.TEXT_STATE.IS_BUTTON | window.TEXT_STATE.ACTIVE | window.TEXT_STATE.CENTERX | window.TEXT_STATE.CENTERY | window.TEXT_STATE.IMAGE;
	cols.push(drawButton(window.TEXT_HINT, MODE_WEAPON_QUIZ_TEXT_STATE, null));
	cols.push(drawButton(window.BUTTON_QUESTION_1, MODE_WEAPON_QUIZ_BUTTON_STATE, null));
	cols.push(drawButton(window.BUTTON_QUESTION_2, MODE_WEAPON_QUIZ_BUTTON_STATE, null));
	cols.push(drawButton(window.BUTTON_QUESTION_3, MODE_WEAPON_QUIZ_BUTTON_STATE, null));
	cols.push(drawButton(window.BUTTON_QUESTION_4, MODE_WEAPON_QUIZ_BUTTON_STATE, null));
	cols.push(drawButton(window.TEXT_HINT_ALL, MODE_WEAPON_QUIZ_TEXT_STATE, null));
	cols.push(drawButton(window.BUTTON_ANSWER, MODE_WEAPON_QUIZ_BUTTON_STATE, null));
	cols.push(drawButton(window.BUTTON_SELECT_FRAME, MODE_ANSWER_TEXT_STATE, null));
	cols.push(drawButton(window.BUTTON_CANCEL, MODE_ANSWER_BUTTON_STATE, null));
	for(let i = 0; i < weapon_data.length; i++) {
		cols.push(drawButton(window.BUTTON_WEAPON + (Number(i) + 1), WEAPON_BUTTON_STATE, IMAGE_PATH + weapon_data[i].image));
	}
	return cols;
}
/**
 * 武器クイズリザルト画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawWeaponQuizResult() {
	var cols = [];
	const RESULT_IMAGE_WEAPON_PATH = "http://localhost:8080/images/" + window.weapon_data[weapon_answer_index].image;
	const RESULT_IMAGE_CORRECT_PATH = "http://localhost:8080/images/correct.png"
	const MODE_WEAPON_QUIZ_RESULT_TEXT_STATE = window.TEXT_STATE.IS_TEXT | window.TEXT_STATE.ACTIVE | window.TEXT_STATE.ENABLE;
	const MODE_WEAPON_QUIZ_RESULT_BUTTON_STATE = window.TEXT_STATE.IS_BUTTON | window.TEXT_STATE.ACTIVE | window.TEXT_STATE.ENABLE | window.TEXT_STATE.CENTERX | window.TEXT_STATE.CENTERY;
	const MODE_WEAPON_QUIZ_RESULT_IMAGE_STATE = window.TEXT_STATE.ACTIVE | window.TEXT_STATE.ENABLE | window.TEXT_STATE.IMAGE | window.TEXT_STATE.BG_DISABLE;
	cols.push(drawButton(window.RESULT_TEXT_HINT, MODE_WEAPON_QUIZ_RESULT_TEXT_STATE, null));
	cols.push(drawButton(window.RESULT_BUTTON_MORE, MODE_WEAPON_QUIZ_RESULT_BUTTON_STATE, null));
	cols.push(drawButton(window.RESULT_BUTTON_MODE_SELECT, MODE_WEAPON_QUIZ_RESULT_BUTTON_STATE, null));
	cols.push(drawButton(window.RESULT_IMAGE_WEAPON, MODE_WEAPON_QUIZ_RESULT_IMAGE_STATE, RESULT_IMAGE_WEAPON_PATH));
	cols.push(drawButton(window.RESULT_IMAGE_CORRECT, MODE_WEAPON_QUIZ_RESULT_IMAGE_STATE, RESULT_IMAGE_CORRECT_PATH));
	console.log(RESULT_IMAGE_CORRECT_PATH);
	return cols;
}

/**
 * 選択肢作成
 * @param {Object[]} question_all 質問データ
 * @param {number[]} question_answer 質問回答済みindexリスト
 * @param {number[]} question_select 質問可能indexリスト
 * @return {number} ヒントを出していない質問の乱数index
 */
function createQuestionSelect(question_all, question_answer, question_select) {
	// ヒントを出していない質問と出した質問の差分のindex配列を取得し選択肢のindexを選定
	let question_choices = forRange(0, question_all.length - 1);
	question_choices = question_choices.filter(i => question_answer.indexOf(i) == -1);
	question_choices = question_choices.filter(i => question_select.indexOf(i) == -1);
	if(question_choices.length == 0) {
		// 質問がなくなった場合
		return -1;
	}
	return question_choices[getRandomInt(question_choices.length)];
}

/**
 * 武器クイズの質問の変数部分を実数に置き換え
 * @param {Object[]} question_all 質問データ
 * @param {Object[]} weapon_data 武器データ
 * @param {number} weapon_answer_index 質問対象武器index
 * @return {Object[]} 質問データ　参照渡しのため必要ないが可読性の観点から記載
 */
function replaceAnswer(question_all, weapon_data, weapon_answer_index) {
	const VARIBALE_TYPE = "type";
	const VARIBALE_MAX_DAMAGE = "maxDamage";
	const VARIBALE_MIN_DAMAGE = "minDamage";
	const VARIBALE_IS_CHARGE = "isCharge";
	const VARIBALE_IS_EXPLOSION = "isExplosion";
	const VARIBALE_RANGE = "range";
	const VARIBALE_DPS = "dps";
	const VARIBALE_ACTUAL_DPS = "actualDps";
	const VARIBALE_TOTAL_DAMAGE = "totalDamage";
	const VARIBALE_INK_LOCK = "inkLock";
	const CHARGE_ENABLE_WORD = "できる";
	const CHARGE_DISABLE_WORD = "できない";
	const EXPLOSION_ENABLE_WORD = "ある";
	const EXPLOSION_DISABLE_WORD = "ない";
	
    for (let i = 0; i < question_all.length; i++) {
		switch(question_all[i].variable){
			case VARIBALE_TYPE:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].type);
				break;
			case VARIBALE_MAX_DAMAGE:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].maxDamage);
				break;
			case VARIBALE_MIN_DAMAGE:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].minDamage);
				break;
			case VARIBALE_IS_CHARGE:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].isCharge ? CHARGE_ENABLE_WORD : CHARGE_DISABLE_WORD);
				break;
			case VARIBALE_IS_EXPLOSION:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].isExplosion ? EXPLOSION_ENABLE_WORD : EXPLOSION_DISABLE_WORD);
				break;
			case VARIBALE_RANGE:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].range);
				break;
			case VARIBALE_DPS:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].dps);
				break;
			case VARIBALE_ACTUAL_DPS:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].actualDps);
				break;
			case VARIBALE_TOTAL_DAMAGE:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].totalDamage);
				break;
			case VARIBALE_INK_LOCK:
				question_all[i].answer = sprintf(question_all[i].answer, weapon_data[weapon_answer_index].inkLock);
				break;
		}
	}
	return question_all;
}

/**
 * 質問・武器関連のデータを作成
 */
function createWeaponQuiz() {
	// 質問を値渡しでクローン作成
	window.question_all = JSON.parse(JSON.stringify(window.question_all_org));
	window.weapon_answer_index = getRandomInt(window.weapon_data.length);
	window.question_all = replaceAnswer(window.question_all, window.weapon_data, window.weapon_answer_index);
	window.question_answer.push(getRandomInt(window.question_all.length));
	window.hint_all_text += window.question_all[window.question_answer[window.question_answer.length - 1]].answer;
	for(let i = 0; i < window.BUTTON_QUESTION_NUM; i++) {
		window.question_select.push(createQuestionSelect(window.question_all, window.question_answer, window.question_select));
	}
}
