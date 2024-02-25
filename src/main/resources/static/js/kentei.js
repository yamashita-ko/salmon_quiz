import { BaseClass } from "./base_class.js";
import { Common } from "./common.js";
import { ModeSelect } from "./mode_select.js";
export class Kentei extends BaseClass {
	/**
	 * コンストラクタ
	 */
	constructor() {
		super();
		this.quizData = {};
	}
	
	/**
	 * 初期化
	 */
	init() {
		super.init();
		this.quizData = {};
	}
	
	/**
	 * 終了
	 */
	uninit() {
		super.uninit();
		this.quizData = {};
	}
	
	/**
	 * 問題作成　画面作成
	 */
	async create() {
		this.init();
		let where = "";
		const NUMS = 2;
		where += "?nums=" + NUMS;
	    this.quizData = await fetch(HOST_PATH + "/quiz-kentei" + where).then(function(res) {
	        return res.json();
	    })
	    // 選択肢を配列にする
	    this.quizData.map((obj) => {
			obj.answerList = obj.answerList.split(", ");
			if(obj.questionImage)
				obj.questionImage = IMAGE_PATH + obj.questionImage;
			if(obj.answerImage)
				obj.answerImage = IMAGE_PATH + obj.answerImage;
		});
		if(this.quizData.length > 0) {
			this.objCols = this.createObject();
			Common.drawAll(this.objCols);
		} else {
			this.objCols.push(createObject(BACKGROUND_IMAGE));
			let textObj = createObject(PANEL_NORMAL_QUIZ.QUESTION_TEXT);
			textObj.text = "出題できる問題がありません。"
			this.objCols.push(textObj);
			let obj = createObject(PANEL_NORMAL_QUIZ.RETURN_BUTTON);
			obj.state |= TEXT_STATE.ENABLE;
			this.objCols.push(obj);
			Common.drawAll(this.objCols);
		}
	}
		
	/**
	 * オブジェクト作成
	 * @return {Object[]} 当たり判定用オブジェクトリスト
	 */
	createObject() {
		var cols = [];
		var QUESTION_TEXT = PANEL_NORMAL_QUIZ.QUESTION_TEXT;
		var ANSWER_BUTTON = PANEL_NORMAL_QUIZ.ANSWER_BUTTON;
		var QUESTION_IMAGE = PANEL_NORMAL_QUIZ.QUESTION_IMAGE;
		var ANSWER_IMAGE = PANEL_NORMAL_QUIZ.ANSWER_IMAGE;
		var CORRECT_IMAGE = PANEL_NORMAL_QUIZ.CORRECT_IMAGE;
		var INCORRECT_IMAGE = PANEL_NORMAL_QUIZ.INCORRECT_IMAGE;
		var MORE_BUTTON = PANEL_KENTEI.MORE_BUTTON;
		var RETURN_BUTTON = PANEL_KENTEI.RETURN_BUTTON;
		
		cols.push(Common.createObject(BACKGROUND_IMAGE));
		
		let quizDiff = this.createDiff();
	
		let questionTextObj = Common.createObject(QUESTION_TEXT);
		questionTextObj.text = quizDiff.text;
		cols.push(questionTextObj);
		let answerButtons = [];
		for(let i = 0; i < ANSWER_BUTTON.NUM; i++) {
			let answerButtonObj = Common.createObject(ANSWER_BUTTON);
			answerButtonObj.name = ANSWER_BUTTON.NAME + (Number(i) + 1);
			answerButtonObj.centerY = ANSWER_BUTTON.CENTERY + ANSWER_BUTTON.SPACEY * i;
			if(quizDiff.buttons[i]) {
				answerButtonObj.text = quizDiff.buttons[i].text;
				answerButtonObj.state |= TEXT_STATE.ENABLE;
				answerButtonObj.isCorrect = (i + 1 == this.quizData[0].answerIndex) ? true : false;
			}
			answerButtons.push(answerButtonObj);
		}
		// シャッフル
		this.shuffleAnswer(answerButtons);
		cols = cols.concat(answerButtons);
		
		let questionImageObj = Common.createObject(QUESTION_IMAGE);
		questionImageObj.image = Common.createImage(quizDiff.questionImage);
		cols.push(questionImageObj);
		let answerImageObj = Common.createObject(ANSWER_IMAGE);
		answerImageObj.image = Common.createImage(quizDiff.answerImage);
		cols.push(answerImageObj);
		cols.push(Common.createObject(CORRECT_IMAGE));
		cols.push(Common.createObject(INCORRECT_IMAGE));
		cols.push(Common.createObject(MORE_BUTTON));
		cols.push(Common.createObject(RETURN_BUTTON));
		return cols;
	}
	
	/**
	 * const情報との差分作成
	 * @return {Object} const情報との差分
	 */
	createDiff() {
		let ret = {};
		let type = this.quizData[0].type == 1 ? "通常" : "雑学";
		ret.text = "残り問題数：" + this.quizData.length + "　問題番号：" + this.quizData[0].id + "　種別：" + type + "\\n" + this.quizData[0].question;
		
		let buttons = [];
		for(let i = 0; i < this.quizData[0].answerList.length; i++) {
			let obj = {};
			obj.text = this.quizData[0].answerList[i];
			buttons.push(obj);
		}
		ret.buttons = buttons;
		ret.questionImage = this.quizData[0].questionImage;
		ret.answerImage = this.quizData[0].answerImage;
		console.log("問題の更新　問題番号：" + this.quizData[0].id)
		return ret;
	}
	
	/**
	 * オブジェクト更新
	 */
	updateObject() {
		var QUESTION_TEXT = PANEL_NORMAL_QUIZ.QUESTION_TEXT;
		var QUESTION_IMAGE = PANEL_NORMAL_QUIZ.QUESTION_IMAGE;
		var ANSWER_IMAGE = PANEL_NORMAL_QUIZ.ANSWER_IMAGE;
		let quizDiff = this.createDiff();
		
		Common.findNameExecFunc(this.objCols, QUESTION_TEXT.NAME, (o) => o.text = quizDiff.text);
		// ボタンの参照を取得
		let answerButtons = this.objCols.filter((o) => o.name.indexOf(PANEL_NORMAL_QUIZ.ANSWER_BUTTON.NAME) != -1);
		for(let i = 0; i < this.quizData[0].answerList.length; i++) {
			answerButtons[i].text = quizDiff.buttons[i].text;
			answerButtons[i].state |= TEXT_STATE.ENABLE;
			answerButtons[i].isCorrect = (i + 1 == this.quizData[0].answerIndex) ? true : false;
		}
		// シャッフル
		this.shuffleAnswer(answerButtons);
		Common.findNameExecFunc(this.objCols, QUESTION_IMAGE.NAME, (o) => o.image = Common.createImage(quizDiff.questionImage));
		Common.findNameExecFunc(this.objCols, ANSWER_IMAGE.NAME, (o) => o.image = Common.createImage(quizDiff.answerImage));
	}
	
	/**
	 * 回答の選択肢をシャッフル
	 */
	shuffleAnswer(answers) {
		// 問題情報のみをシャッフル
		for (let i = this.quizData[0].answerList.length - 1; i >= 0; i--) {
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
	
	/**
	 * クリック処理
	 * @param {Object} obj クリック対象
	 */
	async click(obj) {
		if(obj.name.indexOf(PANEL_NORMAL_QUIZ.ANSWER_BUTTON.NAME) != -1) {
			this.objCols.map((o) => {
				if(o.name == PANEL_NORMAL_QUIZ.QUESTION_TEXT.NAME) {
					let type = this.quizData[0].type == 1 ? "通常" : "雑学";
					o.text = "残り問題数：" + this.quizData.length + "　問題番号：" + this.quizData[0].id + "　種別：" + type + "　難易度：" + this.quizData[0].level + "/10\\n【解説】" + this.quizData[0].note;
					Common.drawText(o);
				} else if(o.name == PANEL_KENTEI.MORE_BUTTON.NAME) {
					if(this.quizData.length > 1)
						o.state ^= TEXT_STATE.ENABLE;
					Common.drawText(o);
				}else if(o.name == PANEL_KENTEI.RETURN_BUTTON.NAME) {
					if(this.quizData.length == 1) {
						o.state ^= TEXT_STATE.ENABLE;
						Common.drawText(o);
					}
				} else if(o.name.indexOf(PANEL_NORMAL_QUIZ.ANSWER_BUTTON.NAME) != -1) {
					if(o.isCorrect) {
						o.state |= TEXT_STATE.HILIGHT;
						o.state &= ~TEXT_STATE.ACTIVE;
					} else {
						o.state &= ~TEXT_STATE.ACTIVE;
					}
					Common.drawText(o);
				}else if(o.name == PANEL_NORMAL_QUIZ.CORRECT_IMAGE.NAME) {
					if(obj.isCorrect) {
						o.state ^= TEXT_STATE.ENABLE;
						Common.drawText(o);
					}
				} else if(o.name == PANEL_NORMAL_QUIZ.INCORRECT_IMAGE.NAME) {
					if(!obj.isCorrect) {
						o.state ^= TEXT_STATE.ENABLE;
						Common.drawText(o);
					}
				} else if(o.name == PANEL_NORMAL_QUIZ.QUESTION_IMAGE.NAME) {
					o.state &= ~TEXT_STATE.ENABLE;
					Common.drawAll(this.objCols);
				} else if(o.name == PANEL_NORMAL_QUIZ.ANSWER_IMAGE.NAME) {
					o.state |= TEXT_STATE.ENABLE;
					Common.drawText(o);
				}
			});
			// 集計
			this.updateCorrectAnswerCount(this.quizData[0].id, obj.isCorrect)
			this.quizData.shift();
			if(this.quizData.length == 0) {
				this.objCols.state &= ~TEXT_STATE.ACTIVE;
			}
		} else if(obj.name == PANEL_KENTEI.MORE_BUTTON.NAME) {
			Common.resetState(this.objCols);
			this.updateObject();
			Common.clear(CANVAS_WIDTH, CANVAS_HEIGHT);
			Common.drawAll(this.objCols);
		} else if(obj.name == PANEL_KENTEI.RETURN_BUTTON.NAME) {
			this.uninit();
			Common.changeMode(new ModeSelect());
		}
	}
	
	/**
	 * ホバー処理
	 * @param {Object} obj ホバー対象
	 */
	hover(obj) {
		
	}
	
	/**
	 * 集計処理
	 * @param {Integer} id クイズ番号
	 * @param {Boolean} isCorrect 正誤判定
	 */
	async updateCorrectAnswerCount(id, isCorrect) {
		let param = "";
		param += "?id=" + id;
		param += "&isCorrect=" + (isCorrect ? 1: 0);
	    await fetch(HOST_PATH + "/correct-answer-count" + param).then();
	}
}