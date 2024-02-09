
var normalQuizData = {};
var normalQuizType = [];
var normalQuizLevel = [];
var normalQuizIsUnreasonable = true;
var normalQuizIsRankaku = true;

/**
 * 通常クイズ画面　初期設定
 */
function initNormalQuiz() {
	window.objCols = [];
	normalQuizData = {};
}

/**
 * 通常クイズ画面　終了処理
 */
function uninitNormalQuiz() {
	window.objCols = [];
	normalQuizData = {};
	normalQuizType = [];
	normalQuizLevel = [];
	normalQuizIsUnreasonable = true;
	normalQuizIsRankaku = true;
}

/**
 * 通常クイズ画面作成
 */
async function createNormalQuiz() {
	initNormalQuiz();
    window.normalQuizData = await fetch("http://" + location.host + "/quiz?type=0").then(function(res) {
        return res.json();
    })
    window.normalQuizData = window.normalQuizData.filter((obj) => window.normalQuizType.includes(obj.type));
    if(!window.normalQuizIsUnreasonable) {
    	window.normalQuizData = window.normalQuizData.filter((obj) => obj.isUnreasonable == 0);
    }
    if(!window.normalQuizIsRankaku) {
    	window.normalQuizData = window.normalQuizData.filter((obj) => obj.isRankaku == 0);
    }
    window.normalQuizData = window.normalQuizData.filter((obj) => window.normalQuizLevel.includes(obj.level));
    
    window.normalQuizData.map((obj) => {
    	// 選択肢を配列にする
		obj.answerList = obj.answerList.split(", ");
		if(obj.questionImage)
			obj.questionImage = IMAGE_PATH + obj.questionImage;
		if(obj.answerImage)
			obj.answerImage = IMAGE_PATH + obj.answerImage;
	});
    // 乱数でソート
    if(window.normalQuizData.length > 1) {
		const cloneArray = JSON.parse(JSON.stringify(window.normalQuizData));
		window.normalQuizData = cloneArray.reduce((prev, cur, idx) => {
			let rand = getRandomInt(idx + 1);
			cloneArray[idx] = cloneArray[rand];
			cloneArray[rand] = cur;
			return cloneArray;
		});
	}
	if(window.normalQuizData.length > 0) {
		window.objCols = createObjectNormalQuiz();
		drawAll();
	} else {
		window.objCols.push(createObject(BACKGROUND_IMAGE));
		let textObj = createObject(PANEL_NORMAL_QUIZ.QUESTION_TEXT);
		textObj.text = "出題できる問題がありません。"
		window.objCols.push(textObj);
		let obj = createObject(PANEL_NORMAL_QUIZ.RETURN_BUTTON);
		obj.state |= TEXT_STATE.ENABLE;
		window.objCols.push(obj);
		drawAll();
	}
	
}

/**
 * 通常クイズ画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function createObjectNormalQuiz() {
	var cols = [];
	var QUESTION_TEXT = PANEL_NORMAL_QUIZ.QUESTION_TEXT;
	var ANSWER_BUTTON = PANEL_NORMAL_QUIZ.ANSWER_BUTTON;
	var QUESTION_IMAGE = PANEL_NORMAL_QUIZ.QUESTION_IMAGE;
	var ANSWER_IMAGE = PANEL_NORMAL_QUIZ.ANSWER_IMAGE;
	var CORRECT_IMAGE = PANEL_NORMAL_QUIZ.CORRECT_IMAGE;
	var INCORRECT_IMAGE = PANEL_NORMAL_QUIZ.INCORRECT_IMAGE;
	var MORE_BUTTON = PANEL_NORMAL_QUIZ.MORE_BUTTON;
	var RETURN_BUTTON = PANEL_NORMAL_QUIZ.RETURN_BUTTON;
	
	cols.push(createObject(BACKGROUND_IMAGE));
	
	let quizDiff = createNormalQuizDiff();

	let questionTextObj = createObject(QUESTION_TEXT);
	questionTextObj.text = quizDiff.text;
	cols.push(questionTextObj);
	let answerButtons = [];
	for(let i = 0; i < ANSWER_BUTTON.NUM; i++) {
		let answerButtonObj = createObject(ANSWER_BUTTON);
		answerButtonObj.name = ANSWER_BUTTON.NAME + (Number(i) + 1);
		answerButtonObj.centerY = ANSWER_BUTTON.CENTERY + ANSWER_BUTTON.SPACEY * i;
		if(quizDiff.buttons[i]) {
			answerButtonObj.text = quizDiff.buttons[i].text;
			answerButtonObj.state |= TEXT_STATE.ENABLE;
			answerButtonObj.isCorrect = (i + 1 == window.normalQuizData[0].answerIndex) ? true : false;
		}
		answerButtons.push(answerButtonObj);
	}
	// シャッフル
	shuffleAnswer(answerButtons);
	cols = cols.concat(answerButtons);
	
	let questionImageObj = createObject(QUESTION_IMAGE);
	questionImageObj.image = createImage(quizDiff.questionImage);
	cols.push(questionImageObj);
	let answerImageObj = createObject(ANSWER_IMAGE);
	answerImageObj.image = createImage(quizDiff.answerImage);
	cols.push(answerImageObj);
	cols.push(createObject(CORRECT_IMAGE));
	cols.push(createObject(INCORRECT_IMAGE));
	cols.push(createObject(MORE_BUTTON));
	cols.push(createObject(RETURN_BUTTON));
	return cols;
}

function updateObjectNormalQuiz() {
	var QUESTION_TEXT = PANEL_NORMAL_QUIZ.QUESTION_TEXT;
	var QUESTION_IMAGE = PANEL_NORMAL_QUIZ.QUESTION_IMAGE;
	var ANSWER_IMAGE = PANEL_NORMAL_QUIZ.ANSWER_IMAGE;
	let quizDiff = createNormalQuizDiff();
	
	findNameExecFunc(QUESTION_TEXT.NAME, (o) => o.text = quizDiff.text);
	// ボタンの参照を取得
	let answerButtons = window.objCols.filter((o) => o.name.indexOf(PANEL_NORMAL_QUIZ.ANSWER_BUTTON.NAME) != -1);
	for(let i = 0; i < window.normalQuizData[0].answerList.length; i++) {
		answerButtons[i].text = quizDiff.buttons[i].text;
		answerButtons[i].state |= TEXT_STATE.ENABLE;
		answerButtons[i].isCorrect = (i + 1 == window.normalQuizData[0].answerIndex) ? true : false;
	}
	// シャッフル
	shuffleAnswer(answerButtons);
	findNameExecFunc(QUESTION_IMAGE.NAME, (o) => o.image = createImage(quizDiff.questionImage));
	findNameExecFunc(ANSWER_IMAGE.NAME, (o) => o.image = createImage(quizDiff.answerImage));
}
function shuffleAnswer(answers) {
	// 問題情報のみをシャッフル
	for (let i = window.normalQuizData[0].answerList.length - 1; i >= 0; i--) {
		let rand = Math.floor(Math.random() * (i + 1));
		let tmpStorage = {
			text: answers[i].text,
			state: answers[i].state,
			isCorrect: answers[i].isCorrect
		};
		answers[i].text = answers[rand].text;
		answers[i].state = answers[rand].state;
		answers[i].isCorrect = answers[rand].isCorrect;
		answers[rand].text = tmpStorage.text;
		answers[rand].state = tmpStorage.state;
		answers[rand].isCorrect = tmpStorage.isCorrect;
	}
}

function createNormalQuizDiff() {
	let ret = {};
	let type = window.normalQuizData[0].type == 1 ? "通常" : "雑学";
	ret.text = "残り問題数：" + window.normalQuizData.length + "　問題番号：" + window.normalQuizData[0].id + "　種別：" + type + "\\n" + window.normalQuizData[0].question;
	
	let buttons = [];
	for(let i = 0; i < window.normalQuizData[0].answerList.length; i++) {
		let obj = {};
		obj.text = window.normalQuizData[0].answerList[i];
		buttons.push(obj);
	}
	ret.buttons = buttons;
	ret.questionImage = window.normalQuizData[0].questionImage;
	ret.answerImage = window.normalQuizData[0].answerImage;
	return ret;
}

/**
 * 通常クイズ画面　クリック処理
 * @param {Object} obj クリック対象
 */
function clickNormalQuiz(obj) {
	if(obj.name.indexOf(PANEL_NORMAL_QUIZ.ANSWER_BUTTON.NAME) != -1) {
		window.objCols.map((o) => {
			if(o.name == PANEL_NORMAL_QUIZ.QUESTION_TEXT.NAME) {
				let type = window.normalQuizData[0].type == 1 ? "通常" : "雑学";
				o.text = "残り問題数：" + window.normalQuizData.length + "　問題番号：" + window.normalQuizData[0].id + "　種別：" + type + "　難易度：" + window.normalQuizData[0].level + "/10\\n【解説】" + window.normalQuizData[0].note;
				drawText(o);
			} else if(o.name == PANEL_NORMAL_QUIZ.MORE_BUTTON.NAME) {
				if(window.normalQuizData.length > 1)
					o.state ^= TEXT_STATE.ENABLE;
				drawText(o);
			}else if(o.name == PANEL_NORMAL_QUIZ.RETURN_BUTTON.NAME) {
				o.state ^= TEXT_STATE.ENABLE;
				drawText(o);
			} else if(o.name.indexOf(PANEL_NORMAL_QUIZ.ANSWER_BUTTON.NAME) != -1) {
				if(o.isCorrect) {
					o.state |= TEXT_STATE.HILIGHT;
					o.state &= ~TEXT_STATE.ACTIVE;
				} else {
					o.state &= ~TEXT_STATE.ACTIVE;
				}
				drawText(o);
			}else if(o.name == PANEL_NORMAL_QUIZ.CORRECT_IMAGE.NAME) {
				if(obj.isCorrect) {
					o.state ^= TEXT_STATE.ENABLE;
					drawText(o);
				}
			} else if(o.name == PANEL_NORMAL_QUIZ.INCORRECT_IMAGE.NAME) {
				if(!obj.isCorrect) {
					o.state ^= TEXT_STATE.ENABLE;
					drawText(o);
				}
			} else if(o.name == PANEL_NORMAL_QUIZ.QUESTION_IMAGE.NAME) {
				o.state &= ~TEXT_STATE.ENABLE;
				drawAll();
			} else if(o.name == PANEL_NORMAL_QUIZ.ANSWER_IMAGE.NAME) {
				o.state |= TEXT_STATE.ENABLE;
				drawText(o);
			}
		});
		window.normalQuizData.shift();
		if(window.normalQuizData.length == 0) {
			window.objCols.state &= ~TEXT_STATE.ACTIVE;
		}
	} else if(obj.name == PANEL_NORMAL_QUIZ.MORE_BUTTON.NAME) {
		resetState();
		updateObjectNormalQuiz();
		clear(window.ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
		drawAll();
	} else if(obj.name == PANEL_NORMAL_QUIZ.RETURN_BUTTON.NAME) {
		uninitNormalQuiz();
		changeMode(MODE.SELECT);
	}
}
