
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
	window.questionSelect = [];
	window.questionAnswer = [];
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
	window.questionSelect = [];
	window.questionAnswer = [];
	window.answerAllText = "";
}

/**
 * 武器クイズ画面作成
 */
async function createWeaponQuiz() {
	initWeaponQuiz();
	if(window.weaponData.length == 0) {
		// 武器データ・質問データの取得は初回のみ
		await Promise.all(
			// 並行処理でリクエスト
            window.weaponData = await fetch("http://" + location.host + "/weapon").then(function(res) {
                return res.json();
            }),
            window.questionDataOrg = await fetch("http://" + location.host + "/weapon-question").then(function(res) {
                return res.json();
            })
		);
	}
	createWeaponQuizData();
	window.objCols = drawWeaponQuiz(window.weaponData);
}

/**
 * 武器クイズ画面　初期表示・判定設定
 * @param {Object[]} weaponData 武器データ
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
	hintListObj.text = HINT_LIST.TEXT + window.answerAllText;
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
	const VARIABLE_TYPE = "type";
	const VARIABLE_MAX_DAMAGE = "maxDamage";
	const VARIABLE_MIN_DAMAGE = "minDamage";
	const VARIABLE_IS_CHARGE = "isCharge";
	const VARIABLE_IS_EXPLOSION = "isExplosion";
	const VARIABLE_RANGE = "range";
	const VARIABLE_DPS = "dps";
	const VARIABLE_ACTUAL_DPS = "actualDps";
	const VARIABLE_TOTAL_DAMAGE = "totalDamage";
	const VARIABLE_INK_LOCK = "inkLock";
	const CHARGE_ENABLE_WORD = "できる";
	const CHARGE_DISABLE_WORD = "できない";
	const EXPLOSION_ENABLE_WORD = "ある";
	const EXPLOSION_DISABLE_WORD = "ない";
	
    for (let i = 0; i < questionData.length; i++) {
		switch(questionData[i].variable){
			case VARIABLE_TYPE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].type);
				break;
			case VARIABLE_MAX_DAMAGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].maxDamage);
				break;
			case VARIABLE_MIN_DAMAGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].minDamage);
				break;
			case VARIABLE_IS_CHARGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].isCharge ? CHARGE_ENABLE_WORD : CHARGE_DISABLE_WORD);
				break;
			case VARIABLE_IS_EXPLOSION:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].isExplosion ? EXPLOSION_ENABLE_WORD : EXPLOSION_DISABLE_WORD);
				break;
			case VARIABLE_RANGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].range);
				break;
			case VARIABLE_DPS:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].dps);
				break;
			case VARIABLE_ACTUAL_DPS:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].actualDps);
				break;
			case VARIABLE_TOTAL_DAMAGE:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].totalDamage);
				break;
			case VARIABLE_INK_LOCK:
				questionData[i].answer = sprintf(questionData[i].answer, weaponData[weaponAnswerIndex].inkLock);
				break;
		}
	}
	return questionData;
}

/**
 * 質問・武器関連のデータを作成
 */
function createWeaponQuizData() {
	// クローン作成
	window.questionData = JSON.parse(JSON.stringify(window.questionDataOrg));
	window.weaponAnswerIndex = getRandomInt(window.weaponData.length);
	window.questionData = replaceAnswer(window.questionData, window.weaponData, window.weaponAnswerIndex);
	window.questionAnswer.push(getRandomInt(window.questionData.length));
	window.answerAllText += window.questionData[window.questionAnswer[window.questionAnswer.length - 1]].answer;
	for(let i = 0; i < PANEL_WEAPON_QUIZ.QUESTION_SELECT_BUTTON.NUM; i++) {
		window.questionSelect.push(createQuestionSelect(window.questionData, window.questionAnswer, window.questionSelect));
	}
}

/**
 * 武器クイズ画面　クリック処理
 * @param {Object} obj クリック対象(参照型)
 */
function clickWeaponQuiz(obj) {
	if(obj.name == PANEL_WEAPON_QUIZ.ANSWER_BUTTON.NAME) {
		obj.state &= ~TEXT_STATE.HOVER;
		// 質問画面から回答画面へ判定を切り替える
		window.objCols.map((o)=>{
			// 両方の画面で使う要素はないのでenableを反転させる
			o.state ^= TEXT_STATE.ENABLE;
			if(o.state & TEXT_STATE.ENABLE) {
				drawText(o);
			}
		});
	} else if(obj.name == PANEL_SELECT_WEAPON.CANCEL.NAME) {
		clear(window.ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
		// 回答画面から質問画面へ判定を切り替える
		var func = () => {
			window.objCols.map((o)=>{
				// 両方の画面で使う要素はないのでenableを反転させる
				o.state ^= TEXT_STATE.ENABLE;
				if(o.state & TEXT_STATE.ENABLE) {
					drawText(o);
				}
			});
		}
		initDraw(func);
	} else if(obj.name.indexOf(PANEL_SELECT_WEAPON.WEAPON.NAME) != -1) {
		if(window.weaponData[weaponAnswerIndex].id == obj.name.replace(PANEL_SELECT_WEAPON.WEAPON.NAME, "")) {
			window.objCols = [];
			// 2週目に再利用するためuninitはしない
			changeMode(MODE.WEAPON_QUIZ_RESULT);
		} else {
			obj.state &= ~TEXT_STATE.ACTIVE;
			drawText(obj);
		}
	} else {
		// 質問ボタンクリック判定
		let questionSelect_button_index = obj.name.slice(-1);
		window.questionAnswer.push(questionSelect[questionSelect_button_index - 1]);
		window.answerAllText += "\\n" + window.questionData[window.questionAnswer[window.questionAnswer.length - 1]].answer;
		window.questionSelect[questionSelect_button_index - 1] = createQuestionSelect(window.questionData, window.questionAnswer, window.questionSelect);
		obj.text = (window.questionSelect[questionSelect_button_index - 1] != -1) ? window.questionData[questionSelect[questionSelect_button_index - 1]].question : "";
		if(window.questionSelect[questionSelect_button_index - 1] == -1)
			obj.state &= ~TEXT_STATE.ACTIVE;
		// ヒント・ヒント一覧・押したボタンをを更新
		window.objCols.map((o) => {
			if(o.name == PANEL_WEAPON_QUIZ.ANSWER_TEXT.NAME) {
				let answer = questionData[questionAnswer[questionAnswer.length - 1]].answer
				if(questionData[questionAnswer[questionAnswer.length - 1]].note)
					answer += questionData[questionAnswer[questionAnswer.length - 1]].note;
				o.text = answer;
				drawText(o);
			} else if(o.name == PANEL_WEAPON_QUIZ.HINT_LIST.NAME) {
				o.text = PANEL_WEAPON_QUIZ.HINT_LIST.TEXT + window.answerAllText;
				drawText(o);
			}
		});
		drawText(obj);
	}
}
