import { BaseClass } from "./base_class.js";
import { Common } from "./common.js";
import { ModeSelect } from "./mode_select.js";
export class WeaponQuizResult extends BaseClass {
	/**
	 * コンストラクタ
	 */
	constructor(weaponData, questionData, weaponQuizObj) {
		super();
		this.weaponData = weaponData;
		this.questionData = questionData;
		this.weaponQuizObj = weaponQuizObj;
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
		this.weaponData = {};
		this.questionData = {};
		this.weaponQuizObj = {};
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
		var WEAPON_IMAGE = PANEL_WEAPON_QUIZ_RESULT.WEAPON_IMAGE;
		var CORRECT_IMAGE = PANEL_WEAPON_QUIZ_RESULT.CORRECT_IMAGE;
		var HINT_ALL = PANEL_WEAPON_QUIZ_RESULT.HINT_ALL;
		var MORE_BUTTON = PANEL_WEAPON_QUIZ_RESULT.MORE_BUTTON;
		var RETURN_BUTTON = PANEL_WEAPON_QUIZ_RESULT.RETURN_BUTTON;
		
		cols.push(Common.createObject(BACKGROUND_IMAGE));
		var weaponImageObj = Common.createObject(WEAPON_IMAGE);
		weaponImageObj.image = Common.createImage(WEAPON_IMAGE.IMAGE + this.weaponData.image);
		cols.push(weaponImageObj);
		cols.push(Common.createObject(CORRECT_IMAGE));
		var hintAllObj = Common.createObject(HINT_ALL);
		// ヒントをすべてまとめた一覧を作成
		let resultHint = "";
		resultHint += "正解は「" + this.weaponData.name + "」\\n";
		resultHint += this.questionData.map((obj) => {
			return obj.answer;
		});
		// カンマ区切りで出力されるため区切り文字を変更
		resultHint = resultHint.replace(/,/g, "\\n")
		hintAllObj.text = resultHint;
		cols.push(hintAllObj);
		cols.push(Common.createObject(MORE_BUTTON));
		cols.push(Common.createObject(RETURN_BUTTON));
		return cols;
	}
	
	/**
	 * クリック処理
	 * @param {Object} obj クリック対象
	 */
	click(obj) {
		if(obj.name == PANEL_WEAPON_QUIZ_RESULT.MORE_BUTTON.NAME) {
			Common.changeMode(this.weaponQuizObj);
		} else if(obj.name == PANEL_WEAPON_QUIZ_RESULT.RETURN_BUTTON.NAME) {
			Common.changeMode(new ModeSelect());
		}
	}
	
	/**
	 * ホバー処理
	 * @param {Object} obj ホバー対象
	 */
	hover(obj) {
		
	}
}