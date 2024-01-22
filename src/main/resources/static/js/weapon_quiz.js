
var weaponData = [];
var weaponAnswerIndex;
var questionDataOrg = [];
var questionData = [];
var questionSelect = [];	// 4択の質問
var questionAnswer = [];	// 回答済みの質問
var answerAllText = "";

/**
 * 武器クイズ画面　初期設定
 */
function initWeaponQuiz() {
	window.objCols = [];
	window.weaponAnswerIndex = -1;
	window.questionData = [];
	window.questionSelect = [];	// 4択の質問
	window.questionAnswer = [];	// 回答済みの質問
	window.answerAllText = "";
}

/**
 * 武器クイズ画面　終了処理
 */
function uninitWeaponQuiz() {
	window.objCols = [];
	window.weaponData = [];
	window.questionDataOrg = [];
	window.weaponAnswerIndex = -1;
	window.questionData = [];
	window.questionSelect = [];	// 4択の質問
	window.questionAnswer = [];	// 回答済みの質問
	window.answerAllText = "";
}

/**
 * 武器クイズ画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawWeaponQuiz(weaponData) {
	var cols = [];
	var ANSWER_TEXT = PANEL_WEAPON_QUIZ.ANSWER_TEXT;
	var QUESTION_BUTTON = PANEL_WEAPON_QUIZ.QUESTION_SELECT_BUTTON;
	var HINT_LIST = PANEL_WEAPON_QUIZ.HINT_LIST;
	var ANSWER_BUTTON = PANEL_WEAPON_QUIZ.ANSWER_BUTTON;
	var SELECT_FRAME = PANEL_SELECT_WEAPON.SELECT_FRAME;
	var CANCEL_BUTTON = PANEL_SELECT_WEAPON.CANCEL;
	var WEAPON_BUTTON = PANEL_SELECT_WEAPON.WEAPON;
	
	let answerObj = createObject(ANSWER_TEXT);
	let answer = window.questionData[questionAnswer[questionAnswer.length - 1]].answer;
	if(window.questionData[questionAnswer[questionAnswer.length - 1]].note)
		answer += questionData[questionAnswer[questionAnswer.length - 1]].note;
	answerObj.text = answer;
	cols.push(drawText(answerObj));
	
	for(let i = 0; i < QUESTION_BUTTON.NUM; i++) {
		let questionObj = createObject(QUESTION_BUTTON);
		questionObj.name = QUESTION_BUTTON.NAME + (Number(i) + 1);
		questionObj.text = (window.questionSelect[i] != -1) ? window.questionData[questionSelect[i]].question : "";
		questionObj.centerY = QUESTION_BUTTON.CENTERY + QUESTION_BUTTON.SPACEY * i;
		cols.push(drawText(questionObj));
	}
	
	let hintListObj = createObject(HINT_LIST);
	hintListObj.text = window.answerAllText;
	cols.push(drawText(hintListObj));
	cols.push(drawText(createObject(ANSWER_BUTTON)));
	cols.push(drawText(createObject(SELECT_FRAME)));
	cols.push(drawText(createObject(CANCEL_BUTTON)));
	
	for(let i = 0; i < weaponData.length; i++) {
		var weaponObj = createObject(WEAPON_BUTTON);
		weaponObj.name = WEAPON_BUTTON.NAME + (Number(i) + 1);
		weaponObj.centerX = WEAPON_BUTTON.CENTERX + WEAPON_BUTTON.SCALEX * (i % WEAPON_BUTTON.NUMX);
		weaponObj.centerY = WEAPON_BUTTON.CENTERY + WEAPON_BUTTON.SCALEY * (Math.floor((i) / WEAPON_BUTTON.NUMX));
		weaponObj.image = WEAPON_BUTTON.IMAGE + weaponData[i].image;
		cols.push(drawText(weaponObj));
	}
	
	return cols;
}
/**
 * 武器クイズリザルト画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawWeaponQuizResult() {
	var cols = [];
	var WEAPON_IMAGE = PANEL_WEAPON_QUIZ_RESULT.WEAPON_IMAGE;
	var CORRECT_IMAGE = PANEL_WEAPON_QUIZ_RESULT.CORRECT_IMAGE;
	var HINT_ALL = PANEL_WEAPON_QUIZ_RESULT.HINT_ALL;
	var MORE_BUTTON = PANEL_WEAPON_QUIZ_RESULT.MORE_BUTTON;
	var RETURN_BUTTON = PANEL_WEAPON_QUIZ_RESULT.RETURN_BUTTON;
	
	var weaponImageObj = createObject(WEAPON_IMAGE);
	weaponImageObj.image = WEAPON_IMAGE.IMAGE + window.weaponData[weaponAnswerIndex].image;
	cols.push(drawText(weaponImageObj));
	cols.push(drawText(createObject(CORRECT_IMAGE)));
	var hintAllObj = createObject(HINT_ALL);
	// ヒントをすべてまとめた一覧を作成
	let resultHint = "";
	resultHint += window.questionData.map((obj) => {
		return obj.answer;
	});
	// カンマ区切りで出力されるため区切り文字を変更
	resultHint = resultHint.replace(/,/g, "\\n")
	hintAllObj.text = resultHint;
	cols.push(drawText(hintAllObj));
	cols.push(drawText(createObject(MORE_BUTTON)));
	cols.push(drawText(createObject(RETURN_BUTTON)));
	return cols;
}

/**
 * 選択肢作成
 * @param {Object[]} questionData 質問データ
 * @param {number[]} questionAnswer 質問回答済みindexリスト
 * @param {number[]} questionSelect 質問可能indexリスト
 * @return {number} ヒントを出していない質問の乱数index
 */
function createQuestionSelect(questionData, questionAnswer, questionSelect) {
	// ヒントを出していない質問と出した質問の差分のindex配列を取得し選択肢のindexを選定
	let question_choices = forRange(0, questionData.length - 1);
	question_choices = question_choices.filter(i => questionAnswer.indexOf(i) == -1);
	question_choices = question_choices.filter(i => questionSelect.indexOf(i) == -1);
	if(question_choices.length == 0) {
		// 質問がなくなった場合
		return -1;
	}
	return question_choices[getRandomInt(question_choices.length)];
}

/**
 * 武器クイズの質問の変数部分を実数に置き換え
 * @param {Object[]} questionData 質問データ
 * @param {Object[]} weaponData 武器データ
 * @param {number} weaponAnswerIndex 質問対象武器index
 * @return {Object[]} 質問データ　参照渡しのため必要ないが可読性の観点から記載
 */
function replaceAnswer(questionData, weaponData, weaponAnswerIndex) {
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
	
    for (let i = 0; i < questionData.length; i++) {
		switch(questionData[i].variable){
			case VARIBALE_TYPE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].type);
				break;
			case VARIBALE_MAX_DAMAGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].maxDamage);
				break;
			case VARIBALE_MIN_DAMAGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].minDamage);
				break;
			case VARIBALE_IS_CHARGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].isCharge ? CHARGE_ENABLE_WORD : CHARGE_DISABLE_WORD);
				break;
			case VARIBALE_IS_EXPLOSION:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].isExplosion ? EXPLOSION_ENABLE_WORD : EXPLOSION_DISABLE_WORD);
				break;
			case VARIBALE_RANGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].range);
				break;
			case VARIBALE_DPS:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].dps);
				break;
			case VARIBALE_ACTUAL_DPS:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].actualDps);
				break;
			case VARIBALE_TOTAL_DAMAGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].totalDamage);
				break;
			case VARIBALE_INK_LOCK:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].inkLock);
				break;
		}
	}
	return questionData;
}

/**
 * 質問・武器関連のデータを作成
 */
function createWeaponQuiz() {
	// 質問を値渡しでクローン作成
	window.questionData = JSON.parse(JSON.stringify(window.questionDataOrg));
	window.weaponAnswerIndex = getRandomInt(window.weaponData.length);
	window.questionData = replaceAnswer(window.questionData, window.weaponData, window.weaponAnswerIndex);
	window.questionAnswer.push(getRandomInt(window.questionData.length));
	window.answerAllText += window.questionData[window.questionAnswer[window.questionAnswer.length - 1]].answer;
	for(let i = 0; i < PANEL_WEAPON_QUIZ.QUESTION_SELECT_BUTTON.NUM; i++) {
		window.questionSelect.push(createQuestionSelect(window.questionData, window.questionAnswer, window.questionSelect));
	}
}
