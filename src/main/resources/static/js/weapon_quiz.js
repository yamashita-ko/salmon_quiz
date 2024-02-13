
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
            window.weaponData = await fetch(HOST_PATH + "/weapon").then(function(res) {
                return res.json();
            }),
            window.questionDataOrg = await fetch(HOST_PATH + "/weapon-question").then(function(res) {
                return res.json();
            })
		);
		window.questionDataOrg.map((o) => {
			if(o.image)
				o.image = PANEL_WEAPON_QUIZ.HINT_IMAGE.IMAGE + o.image;
		})
	}
	createWeaponQuizData();
	window.objCols = createWeaponQuizObject(window.weaponData);
	drawAll();
}

/**
 * 武器クイズ画面　初期表示・判定設定
 * @param {Object[]} weaponData 武器データ
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function createWeaponQuizObject(weaponData) {
	var cols = [];
	var ANSWER_TEXT = PANEL_WEAPON_QUIZ.ANSWER_TEXT;
	var QUESTION_BUTTON = PANEL_WEAPON_QUIZ.QUESTION_SELECT_BUTTON;
	var HINT_LIST = PANEL_WEAPON_QUIZ.HINT_LIST;
	var ANSWER_BUTTON = PANEL_WEAPON_QUIZ.ANSWER_BUTTON;
	var HINT_IMAGE = PANEL_WEAPON_QUIZ.HINT_IMAGE;
	var SELECT_FRAME = PANEL_SELECT_WEAPON.SELECT_FRAME;
	var CANCEL_BUTTON = PANEL_SELECT_WEAPON.CANCEL;
	var WEAPON_NAME = PANEL_SELECT_WEAPON.WEAPON_NAME;
	var WEAPON_BUTTON = PANEL_SELECT_WEAPON.WEAPON;
	let diff = createWeaponQuizDiff();
	;
	cols.push(createObject(BACKGROUND_IMAGE));
	let answerObj = createObject(ANSWER_TEXT);
	answerObj.text = diff.answerText;
	cols.push(answerObj);
	
	for(let i = 0; i < QUESTION_BUTTON.NUM; i++) {
		let obj = createObject(QUESTION_BUTTON);
		obj.name = diff.questionButtons[i].name;
		obj.text = diff.questionButtons[i].text;
		obj.centerY = diff.questionButtons[i].centerY;
		cols.push(obj);
	}
	
	let hintListObj = createObject(HINT_LIST);
	hintListObj.text = diff.hintListText;
	cols.push(hintListObj);
	cols.push(createObject(ANSWER_BUTTON));
	let hintImageObj = createObject(HINT_IMAGE);
	if(diff.image) {
		hintImageObj.image = diff.image;
	}
	cols.push(hintImageObj);
	
	cols.push(createObject(SELECT_FRAME));
	cols.push(createObject(CANCEL_BUTTON));
	cols.push(createObject(WEAPON_NAME));
	
	for(let i = 0; i < weaponData.length; i++) {
		let obj = createObject(WEAPON_BUTTON);
		obj.name = diff.weaponButtons[i].name;
		obj.centerX = diff.weaponButtons[i].centerX;
		obj.centerY = diff.weaponButtons[i].centerY;
		obj.image = createImage(diff.weaponButtons[i].image);
		obj.weaponName = diff.weaponButtons[i].weaponName;
		cols.push(obj);
	}
	return cols;
}

function createWeaponQuizDiff() {
	var QUESTION_BUTTON = PANEL_WEAPON_QUIZ.QUESTION_SELECT_BUTTON;
	var HINT_LIST = PANEL_WEAPON_QUIZ.HINT_LIST;
	var WEAPON_BUTTON = PANEL_SELECT_WEAPON.WEAPON;
	let ret = {};
	let answer = window.questionData[questionAnswer[questionAnswer.length - 1]].answer;
	if(window.questionData[questionAnswer[questionAnswer.length - 1]].note)
		answer += questionData[questionAnswer[questionAnswer.length - 1]].note;
	ret.answerText = answer;
	let questionButtons = [];
	for(let i = 0; i < QUESTION_BUTTON.NUM; i++) {
		let obj = {};
		obj.name = QUESTION_BUTTON.NAME + (Number(i) + 1);
		obj.text = (window.questionSelect[i] != -1) ? window.questionData[questionSelect[i]].question : "";
		obj.centerY = QUESTION_BUTTON.CENTERY + QUESTION_BUTTON.SPACEY * i;
		questionButtons.push(obj);
	}
	ret.questionButtons = questionButtons;
	ret.hintListText = HINT_LIST.TEXT + window.answerAllText;
	if(window.questionData[questionAnswer[questionAnswer.length - 1]].image) 
		ret.image = createImage(window.questionData[questionAnswer[questionAnswer.length - 1]].image);
	let weaponButtons = [];
	for(let i = 0; i < weaponData.length; i++) {
		let obj = {};
		obj.name = WEAPON_BUTTON.NAME + (Number(i) + 1);
		obj.centerX = WEAPON_BUTTON.CENTERX + WEAPON_BUTTON.SCALEX * (i % WEAPON_BUTTON.NUMX);
		obj.centerY = WEAPON_BUTTON.CENTERY + WEAPON_BUTTON.SCALEY * (Math.floor((i) / WEAPON_BUTTON.NUMX));
		obj.image = WEAPON_BUTTON.IMAGE + weaponData[i].image;
		obj.weaponName = weaponData[i].name;
		weaponButtons.push(obj);
	}
	ret.weaponButtons = weaponButtons;
	return ret;
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
		window.objCols.map((o)=>{
			// 両方の画面で使う要素はないのでenableを反転させる
			o.state ^= TEXT_STATE.ENABLE;
		});
		drawAll();
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
		let selectIndex = obj.name.slice(-1);	// 選択したボタンindex(上から何番目)
		window.questionAnswer.push(questionSelect[selectIndex - 1]);
		let selectAnswerIndex = window.questionAnswer[window.questionAnswer.length - 1];	// 選択した質問のindex
		window.answerAllText += "\\n" + window.questionData[selectAnswerIndex].answer;
		window.questionSelect[selectIndex - 1] = createQuestionSelect(window.questionData, window.questionAnswer, window.questionSelect);
		obj.text = (window.questionSelect[selectIndex - 1] != -1) ? window.questionData[questionSelect[selectIndex - 1]].question : "";
		if(window.questionSelect[selectIndex - 1] == -1)
			obj.state &= ~TEXT_STATE.ACTIVE;
		
		findNameExecFunc(PANEL_WEAPON_QUIZ.ANSWER_TEXT.NAME, (o) => {
			let answer = questionData[selectAnswerIndex].answer
			if(questionData[selectAnswerIndex].note)
				answer += questionData[selectAnswerIndex].note;
			o.text = answer;
		});
		findNameExecFunc(PANEL_WEAPON_QUIZ.HINT_LIST.NAME, (o) => o.text = PANEL_WEAPON_QUIZ.HINT_LIST.TEXT + window.answerAllText);
		findNameExecFunc(PANEL_WEAPON_QUIZ.HINT_IMAGE.NAME, (o) => o.image = createImage(questionData[selectAnswerIndex].image));
		drawAll();
	}
}

function weaponQuizHoverAction(obj) {
	if(obj.name.indexOf(PANEL_SELECT_WEAPON.WEAPON.NAME) != -1) {
		findNameExecFunc(PANEL_SELECT_WEAPON.WEAPON_NAME.NAME, (o) => {
			if(o.text == obj.weaponName)
				return;
			o.text = obj.weaponName;
			drawText(o);
		})
	}
}
