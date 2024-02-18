import { BaseClass } from "./base_class.js";
import { Common } from "./common.js";
import { WeaponQuiz } from "./weapon_quiz.js";
import { NormalQuiz } from "./normal_quiz.js";
export class ModeSelect extends BaseClass{
	/**
	 * コンストラクタ
	 */
	constructor() {
		super();
	}
	
	/**
	 * 初期化
	 */
	init() {
		super.init();
	}
	
	/**
	 * 終了
	 */
	uninit() {
		super.uninit();
	}
	
	/**
	 * 画面作成
	 */
	create() {
		this.init();
		this.objCols = this.createObject();
		Common.drawAll(this.objCols);
	}
	
	/**
	 * オブジェクト作成
	 * @return {Object[]} 当たり判定用オブジェクトリスト
	 */
	createObject() {
		var cols = [];
		var BUTTON = PANEL_MODE_SELECT.BUTTON;
		var YOKODUNA_IMAGE = PANEL_MODE_SELECT.YOKODUNA_IMAGE;
		var IKA2_IMAGE = PANEL_MODE_SELECT.IKA2_IMAGE;
		var IKA3_IMAGE = PANEL_MODE_SELECT.IKA3_IMAGE;
		var IKA4_IMAGE = PANEL_MODE_SELECT.IKA4_IMAGE;
		var TITLE_LOGO_IMAGE = PANEL_MODE_SELECT.TITLE_LOGO_IMAGE;
		var IKURA_IMAGE = PANEL_MODE_SELECT.IKURA_IMAGE;
		var WEAPON_QUIZ_SELECT_FRAME = PANEL_MODE_SELECT.WEAPON_QUIZ_SELECT_FRAME;
		var NORMAL_QUIZ_SELECT_FRAME = PANEL_MODE_SELECT.NORMAL_QUIZ_SELECT_FRAME;
		var TYPE_BUTTON = PANEL_MODE_SELECT.TYPE_BUTTON;
		var OTHER_BUTTON = PANEL_MODE_SELECT.OTHER_BUTTON;
		var LEVEL_BUTTON = PANEL_MODE_SELECT.LEVEL_BUTTON;
		var WEAPON_QUIZ_START_BUTTON = PANEL_MODE_SELECT.WEAPON_QUIZ_START_BUTTON;
		var WEAPON_QUIZ_CANCEL_BUTTON = PANEL_MODE_SELECT.WEAPON_QUIZ_CANCEL_BUTTON;
		var NORMAL_QUIZ_START_BUTTON = PANEL_MODE_SELECT.NORMAL_QUIZ_START_BUTTON;
		var NORMAL_QUIZ_CANCEL_BUTTON = PANEL_MODE_SELECT.NORMAL_QUIZ_CANCEL_BUTTON;
	
		var diff = this.createDiff();
		cols.push(Common.createObject(BACKGROUND_IMAGE));
		
		// メイン画面用
		cols.push(Common.createObject(YOKODUNA_IMAGE));
		cols.push(Common.createObject(IKA2_IMAGE));
		cols.push(Common.createObject(IKA3_IMAGE));
		cols.push(Common.createObject(TITLE_LOGO_IMAGE));
		cols.push(Common.createObject(IKURA_IMAGE));
		for(let i = 0; i < BUTTON.NUM; i++) {
			let obj = Common.createObject(BUTTON);
			obj.name = diff.buttons[i].name;
			obj.text = diff.buttons[i].text;
			obj.centerY = diff.buttons[i].centerY;
			obj.hoverImage = diff.buttons[i].image;
			cols.push(obj);
		}
		// ブキクイズ選択時説明画面用
		cols.push(Common.createObject(WEAPON_QUIZ_SELECT_FRAME));
		cols.push(Common.createObject(WEAPON_QUIZ_START_BUTTON));
		cols.push(Common.createObject(WEAPON_QUIZ_CANCEL_BUTTON));
		// ツウジョウクイズ選択時説明画面用
		cols.push(Common.createObject(NORMAL_QUIZ_SELECT_FRAME));
		for(let i = 0; i < Object.keys(TYPE_BUTTON.INDEX).length; i++) {
			let obj = Common.createObject(TYPE_BUTTON);
			obj.name = diff.typeButtons[i].name;
			obj.index = diff.typeButtons[i].index;
			obj.text = diff.typeButtons[i].text;
			obj.centerX = diff.typeButtons[i].centerX;
			obj.centerY = diff.typeButtons[i].centerY;
			cols.push(obj);
		}
		for(let i = 0; i < Object.keys(OTHER_BUTTON.INDEX).length; i++) {
			let obj = Common.createObject(TYPE_BUTTON);
			obj.name = diff.otherButtons[i].name;
			obj.index = diff.otherButtons[i].index;
			obj.text = diff.otherButtons[i].text;
			obj.centerX = diff.otherButtons[i].centerX;
			obj.centerY = diff.otherButtons[i].centerY;
			cols.push(obj);
		}
		for(let i = 0; i < LEVEL_BUTTON.NUM; i++) {
			let obj = Common.createObject(LEVEL_BUTTON);
			obj.name = diff.levelButtons[i].name;
			obj.index = diff.levelButtons[i].index;
			obj.text = diff.levelButtons[i].text;
			obj.centerX = diff.levelButtons[i].centerX;
			obj.centerY = diff.levelButtons[i].centerY;
			cols.push(obj);
		}
		cols.push(Common.createObject(NORMAL_QUIZ_START_BUTTON));
		cols.push(Common.createObject(NORMAL_QUIZ_CANCEL_BUTTON));
		cols.push(Common.createObject(IKA4_IMAGE));
		return cols;
	}
	
	/**
	 * const情報との差分作成
	 * @return {Object} const情報との差分
	 */
	createDiff() {
		var BUTTON = PANEL_MODE_SELECT.BUTTON;
		var TYPE_BUTTON = PANEL_MODE_SELECT.TYPE_BUTTON;
		var OTHER_BUTTON = PANEL_MODE_SELECT.OTHER_BUTTON;
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
			obj.centerX = TYPE_BUTTON.CENTERX + TYPE_BUTTON.SPACEX * (i % TYPE_BUTTON.NUMX);
			obj.centerY = TYPE_BUTTON.CENTERY + TYPE_BUTTON.SPACEY * (Math.floor(i / TYPE_BUTTON.NUMX));
			typeButtons.push(obj);
		}
		ret.typeButtons = typeButtons;
		let otherButtons = [];
		for(let i = 0; i < Object.keys(OTHER_BUTTON.INDEX).length; i++) {
			var obj = {};
			obj.name = OTHER_BUTTON.NAME[i];
			obj.index = (i + 1);
			obj.text = OTHER_BUTTON.TEXT[i];
			obj.centerX = OTHER_BUTTON.CENTERX + OTHER_BUTTON.SPACEX * (i % OTHER_BUTTON.NUMX);
			obj.centerY = OTHER_BUTTON.CENTERY + OTHER_BUTTON.SPACEY * (Math.floor(i / OTHER_BUTTON.NUMX));
			otherButtons.push(obj);
		}
		ret.otherButtons = otherButtons;
		let levelButtons = [];
		for(let i = 0; i < LEVEL_BUTTON.NUM; i++) {
			var obj = {};
			obj.name = LEVEL_BUTTON.NAME + (i + 1);
			obj.index = (i + 1);
			obj.text = String(i + 1);
			obj.centerX = LEVEL_BUTTON.CENTERX + LEVEL_BUTTON.SPACEX * (i % LEVEL_BUTTON.NUMX);
			obj.centerY = LEVEL_BUTTON.CENTERY + LEVEL_BUTTON.SPACEY * (Math.floor(i / LEVEL_BUTTON.NUMX));
			levelButtons.push(obj);
		}
		ret.levelButtons = levelButtons;
		return ret;
	}
	
	/**
	 * クリック処理
	 * @param {Object} obj クリック対象
	 */
	click(obj) {
		if(obj.name == PANEL_MODE_SELECT.BUTTON.NAME[PANEL_MODE_SELECT.BUTTON.INDEX.WEAPON_QUIZ - 1]) {
			// 通常クイズの設定画面を表示
			Common.filterGroupExecFunc(this.objCols, MODE.WEAPON_QUIZ, (o) => o.state |= TEXT_STATE.ENABLE);
			Common.filterGroupExecFunc(this.objCols, MODE.SELECT, (o) => o.state &= ~TEXT_STATE.ACTIVE);
			Common.drawAll(this.objCols);
		}
		if(obj.name == PANEL_MODE_SELECT.WEAPON_QUIZ_CANCEL_BUTTON.NAME) {
			// 通常クイズの設定画面を閉じる
			Common.filterGroupExecFunc(this.objCols, MODE.WEAPON_QUIZ, (o) => o.state &= ~TEXT_STATE.ENABLE);
			Common.filterGroupExecFunc(this.objCols, MODE.SELECT, (o) => o.state |= TEXT_STATE.ACTIVE);
			Common.drawAll(this.objCols);
		}
		if(obj.name == PANEL_MODE_SELECT.BUTTON.NAME[PANEL_MODE_SELECT.BUTTON.INDEX.NORMAL_QUIZ - 1]) {
			// 通常クイズの設定画面を表示
			Common.filterGroupExecFunc(this.objCols, MODE.NORMAL_QUIZ, (o) => o.state |= TEXT_STATE.ENABLE);
			Common.filterGroupExecFunc(this.objCols, MODE.SELECT, (o) => o.state &= ~TEXT_STATE.ACTIVE);
			Common.drawAll(this.objCols);
		}
		if(obj.name == PANEL_MODE_SELECT.NORMAL_QUIZ_CANCEL_BUTTON.NAME) {
			// 通常クイズの設定画面を閉じる
			Common.filterGroupExecFunc(this.objCols, MODE.NORMAL_QUIZ, (o) => o.state &= ~TEXT_STATE.ENABLE);
			Common.filterGroupExecFunc(this.objCols, MODE.SELECT, (o) => o.state |= TEXT_STATE.ACTIVE);
			Common.drawAll(this.objCols);
		}
		for(let i = 0; i < Object.keys(PANEL_MODE_SELECT.TYPE_BUTTON.INDEX).length; i++) {
			if(obj.name == PANEL_MODE_SELECT.TYPE_BUTTON.NAME[i]) {
				obj.state ^= TEXT_STATE.HILIGHT;
				Common.drawText(obj);
			}
		}
		for(let i = 0; i < Object.keys(PANEL_MODE_SELECT.OTHER_BUTTON.INDEX).length; i++) {
			if(obj.name == PANEL_MODE_SELECT.OTHER_BUTTON.NAME[i]) {
				obj.state ^= TEXT_STATE.HILIGHT;
				Common.drawText(obj);
			}
		}
		for(let i = 0; i < PANEL_MODE_SELECT.LEVEL_BUTTON.NUM; i++) {
			if(obj.name == PANEL_MODE_SELECT.LEVEL_BUTTON.NAME + (i + 1)) {
				obj.state ^= TEXT_STATE.HILIGHT;
				Common.drawText(obj);
			}
		}
		Common.findNameExecFunc(this.objCols, PANEL_MODE_SELECT.NORMAL_QUIZ_START_BUTTON.NAME, (o) => {
			// 内容・難易度のいずれかがすべてグレーの場合は開始ボタンをグレーにする
			if(o.state & TEXT_STATE.ACTIVE) {
				if(Object.keys(this.objCols.filter((o2) => PANEL_MODE_SELECT.TYPE_BUTTON.NAME.includes(o2.name) && (o2.state & TEXT_STATE.HILIGHT))).length == 0 ||
					Object.keys(this.objCols.filter((o2) => o2.name.indexOf(PANEL_MODE_SELECT.LEVEL_BUTTON.NAME) > -1 && (o2.state & TEXT_STATE.HILIGHT))).length == 0) {
					o.state &= ~TEXT_STATE.ACTIVE;
					Common.drawText(o);
				}
			} else {
				if(Object.keys(this.objCols.filter((o2) => PANEL_MODE_SELECT.TYPE_BUTTON.NAME.includes(o2.name) && (o2.state & TEXT_STATE.HILIGHT))).length > 0 &&
					Object.keys(this.objCols.filter((o2) => o2.name.indexOf(PANEL_MODE_SELECT.LEVEL_BUTTON.NAME) > -1 && (o2.state & TEXT_STATE.HILIGHT))).length > 0) {
					o.state |= TEXT_STATE.ACTIVE;
					Common.drawText(o);
				}
			}
		})
		if(obj.name == PANEL_MODE_SELECT.NORMAL_QUIZ_START_BUTTON.NAME) {
			let typeFilterObj = this.objCols.filter((o) => PANEL_MODE_SELECT.TYPE_BUTTON.NAME.includes(o.name) && (o.state & TEXT_STATE.HILIGHT))
			let types = typeFilterObj.map((o) => o.index);
			let otherFilterObj = this.objCols.filter((o) => PANEL_MODE_SELECT.OTHER_BUTTON.NAME.includes(o.name) && (o.state & TEXT_STATE.HILIGHT))
			const NANIKORE = PANEL_MODE_SELECT.OTHER_BUTTON.NAME[PANEL_MODE_SELECT.OTHER_BUTTON.INDEX.NANIKORE - 1];
			const RANKAKU = PANEL_MODE_SELECT.OTHER_BUTTON.NAME[PANEL_MODE_SELECT.OTHER_BUTTON.INDEX.RANKAKU - 1];
			let isNanikore = otherFilterObj.find((o) => o.name == NANIKORE) ? 1 : 0;
			let isRankaku = otherFilterObj.find((o) => o.name == RANKAKU) ? 1 : 0; 
			let levelFilterObj = this.objCols.filter((o) => o.name.indexOf(PANEL_MODE_SELECT.LEVEL_BUTTON.NAME) > -1 && (o.state & TEXT_STATE.HILIGHT))
			let levels = levelFilterObj.map((o) => o.index);
			let mode = new NormalQuiz(types, levels, isNanikore, isRankaku);
			Common.changeMode(mode);
		}
		if(obj.name == PANEL_MODE_SELECT.WEAPON_QUIZ_START_BUTTON.NAME) {
			Common.changeMode(new WeaponQuiz());
		}
	}
	
	/**
	 * ホバー処理
	 * @param {Object} obj ホバー対象
	 */
	hover(obj) {
		
	}
}
