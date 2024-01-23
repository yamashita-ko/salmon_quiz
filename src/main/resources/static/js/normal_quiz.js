
var normalQuizData = {};

/**
 * 通常クイズ画面　初期設定
 */
function initNormalQuiz() {
	window.objCols = [];
}

/**
 * 通常クイズ画面　終了処理
 */
function uninitNormalQuiz() {
	window.objCols = [];
}

/**
 * 通常クイズ画面作成
 */
async function createNormalQuiz() {
	initNormalQuiz();
    window.normalQuizData = await fetch("http://" + location.host + "/quiz?type=0").then(function(res) {
        return res.json();
    })
    
    window.normalQuizData.map((obj) => {
    	// 選択肢を配列にする
		obj.answerList = obj.answerList.split(", ");
		if(obj.questionImage)
			obj.questionImage = IMAGE_PATH + obj.questionImage;
		if(obj.answerImage)
			obj.answerImage = IMAGE_PATH + obj.answerImage;
	});
    // 乱数でソート
	const cloneArray = JSON.parse(JSON.stringify(window.normalQuizData));
	window.normalQuizData = cloneArray.reduce((prev, cur, idx) => {
		let rand = getRandomInt(idx + 1);
		cloneArray[idx] = cloneArray[rand];
		cloneArray[rand] = cur;
		return cloneArray;
	});
	window.objCols = drawNormalQuiz();
}

/**
 * 通常クイズ画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawNormalQuiz() {
	var cols = [];
	var QUESTION_TEXT = PANEL_NORMAL_QUIZ.QUESTION_TEXT;
	var QUESTION_BUTTON = PANEL_NORMAL_QUIZ.QUESTION_BUTTON;
	var QUESTION_IMAGE = PANEL_NORMAL_QUIZ.QUESTION_IMAGE;
	var ANSWER_IMAGE = PANEL_NORMAL_QUIZ.ANSWER_IMAGE;
	var CORRECT_IMAGE = PANEL_NORMAL_QUIZ.CORRECT_IMAGE;
	var INCORRECT_IMAGE = PANEL_NORMAL_QUIZ.INCORRECT_IMAGE;
	var MORE_BUTTON = PANEL_NORMAL_QUIZ.MORE_BUTTON;
	var RETURN_BUTTON = PANEL_NORMAL_QUIZ.RETURN_BUTTON;

	let questionTextObj = createObject(QUESTION_TEXT);
	let type = window.normalQuizData[0].type == 1 ? "通常" : "雑学";
	questionTextObj.text = "問題番号：" + window.normalQuizData[0].id + "　種別：" + type + "　難易度：" + window.normalQuizData[0].level + "/10\\n" + window.normalQuizData[0].question;
	cols.push(drawText(questionTextObj));
	for(let i = 0; i < window.normalQuizData[0].answerList.length; i++) {
		let questionButtonObj = createObject(QUESTION_BUTTON);
		questionButtonObj.name = QUESTION_BUTTON.NAME + (Number(i) + 1);
		questionButtonObj.text = window.normalQuizData[0].answerList[i];
		questionButtonObj.centerY = QUESTION_BUTTON.CENTERY + QUESTION_BUTTON.SPACEY * i;
		cols.push(drawText(questionButtonObj));
	}
	if(window.normalQuizData[0].questionImage) {
		let questionImageObj = createObject(QUESTION_IMAGE);
		questionImageObj.image = window.normalQuizData[0].questionImage;
		cols.push(drawText(questionImageObj));
	}
	if(window.normalQuizData[0].answerImage) {
		let answerImageObj = createObject(ANSWER_IMAGE);
		answerImageObj.image = window.normalQuizData[0].answerImage;
		cols.push(drawText(answerImageObj));
	}
	cols.push(drawText(createObject(CORRECT_IMAGE)));
	cols.push(drawText(createObject(INCORRECT_IMAGE)));
	cols.push(drawText(createObject(MORE_BUTTON)));
	cols.push(drawText(createObject(RETURN_BUTTON)));
	return cols;
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
				o.text = window.normalQuizData[0].note;
				drawText(o);
			} else if(o.name == PANEL_NORMAL_QUIZ.MORE_BUTTON.NAME) {
				if(window.normalQuizData.length <= 1)
					o.state &= ~TEXT_STATE.ACTIVE;
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
			
		//uninitNoramlQuiz();
		//changeMode(MODE.SELECT);
	} else if(obj.name == PANEL_NORMAL_QUIZ.MORE_BUTTON.NAME) {
		console.log("次へ");
		let func = () => {
			initNormalQuiz();
			window.objCols = drawNormalQuiz();
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
