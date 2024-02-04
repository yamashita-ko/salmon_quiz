
var normalQuizData = {};
var normalQuizType = [];
var normalQuizLevel = [];

/**
 * 通常クイズ画面　初期設定
 */
function initNormalQuiz() {
	window.objCols = [];
	normalQuizData = {};
	updateImages = [];
}

/**
 * 通常クイズ画面　終了処理
 */
function uninitNormalQuiz() {
	window.objCols = [];
	normalQuizData = {};
	normalQuizType = [];
	normalQuizLevel = [];
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
    window.normalQuizData = window.normalQuizData.filter((obj) => window.normalQuizLevel.includes(obj.level));
    
    let num = forRange(1, 5);
    window.normalQuizData = window.normalQuizData.filter((obj) => num.includes(obj.id));
    
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
	window.objCols = createObjectNormalQuiz();
	ckeckLoadImageExecFunc(drawAll);
}

/**
 * 通常クイズ画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function createObjectNormalQuiz() {
	var cols = [];
	var QUESTION_TEXT = PANEL_NORMAL_QUIZ.QUESTION_TEXT;
	var QUESTION_BUTTON = PANEL_NORMAL_QUIZ.QUESTION_BUTTON;
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
	for(let i = 0; i < window.normalQuizData[0].answerList.length; i++) {
		let questionButtonObj = createObject(QUESTION_BUTTON);
		questionButtonObj.name = quizDiff.buttons[i].name;
		questionButtonObj.text = quizDiff.buttons[i].text;
		questionButtonObj.centerY = quizDiff.buttons[i].centerY;
		cols.push(questionButtonObj);
	}
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
	var QUESTION_BUTTON = PANEL_NORMAL_QUIZ.QUESTION_BUTTON;
	var QUESTION_IMAGE = PANEL_NORMAL_QUIZ.QUESTION_IMAGE;
	var ANSWER_IMAGE = PANEL_NORMAL_QUIZ.ANSWER_IMAGE;
	let quizDiff = createNormalQuizDiff();
	window.objCols.find((o) => o.name == QUESTION_TEXT.NAME).text =  quizDiff.text;
	for(let i = 0; i < window.normalQuizData[0].answerList.length; i++) {
		window.objCols.find((o) => o.name == QUESTION_BUTTON.NAME + (Number(i) + 1)).text =  quizDiff.buttons[i].text;
	}
	window.objCols.find((o) => o.name == QUESTION_IMAGE.NAME).image = createImage(quizDiff.questionImage);
	window.objCols.find((o) => o.name == ANSWER_IMAGE.NAME).image = createImage(quizDiff.answerImage);
}


function createNormalQuizDiff() {
	let ret = {};
	let type = window.normalQuizData[0].type == 1 ? "通常" : "雑学";
	ret.text = "残り問題数：" + window.normalQuizData.length + "　問題番号：" + window.normalQuizData[0].id + "　種別：" + type + "\\n" + window.normalQuizData[0].question;
	
	var QUESTION_BUTTON = PANEL_NORMAL_QUIZ.QUESTION_BUTTON;
	// 連番を作りシャッフル 選択肢をシャッフルするためのＹ座標の計算に使用
	let buttonOrder = forRange(0, window.normalQuizData[0].answerList.length - 1);
	let buttons = [];
	buttonOrder = arrayShuffle(buttonOrder);
	for(let i = 0; i < window.normalQuizData[0].answerList.length; i++) {
		let obj = {};
		obj.name = QUESTION_BUTTON.NAME + (Number(i) + 1);
		obj.text = window.normalQuizData[0].answerList[i];
		obj.centerY = QUESTION_BUTTON.CENTERY + QUESTION_BUTTON.SPACEY * buttonOrder[i];
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
	if(obj.name.indexOf(PANEL_NORMAL_QUIZ.QUESTION_BUTTON.NAME) != -1) {
		let isCorrect = window.normalQuizData[0].answerIndex == obj.name.replace(PANEL_NORMAL_QUIZ.QUESTION_BUTTON.NAME, "");
		
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
			} else if(o.name.indexOf(PANEL_NORMAL_QUIZ.QUESTION_BUTTON.NAME) != -1) {
				if(window.normalQuizData[0].answerIndex == o.name.replace(PANEL_NORMAL_QUIZ.QUESTION_BUTTON.NAME, "")) {
					o.state |= TEXT_STATE.HILIGHT;
					o.state &= ~TEXT_STATE.ACTIVE;
				} else {
					o.state &= ~TEXT_STATE.ACTIVE;
				}
				drawText(o);
			}else if(o.name == PANEL_NORMAL_QUIZ.CORRECT_IMAGE.NAME) {
				if(isCorrect) {
					o.state ^= TEXT_STATE.ENABLE;
					drawText(o);
				}
			} else if(o.name == PANEL_NORMAL_QUIZ.INCORRECT_IMAGE.NAME) {
				if(!isCorrect) {
					o.state ^= TEXT_STATE.ENABLE;
					drawText(o);
				}
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
		let func = () => {
			updateImages = [];
			updateObjectNormalQuiz();
			clear(window.ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
			resetState();
			ckeckLoadImageExecFunc(drawAll);
		}
		initDraw(func);
	} else if(obj.name == PANEL_NORMAL_QUIZ.RETURN_BUTTON.NAME) {
		let func = () => {
			uninitNormalQuiz();
			changeMode(MODE.SELECT);
		}
		initDraw(func);
	}
}
