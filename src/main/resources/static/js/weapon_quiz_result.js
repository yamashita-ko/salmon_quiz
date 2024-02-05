
/**
 * 武器クイズリザルト画面　初期設定
 */
function initWeaponQuizResult() {
	window.objCols = [];
	window.updateImages = [];
}

/**
 * 武器クイズリザルト画面　終了処理
 */
function uninitWeaponQuizResult() {
	window.objCols = [];
	window.updateImages = [];
}
/**
 * 武器クイズリザルト画面作成
 */
function createWeaponQuizResult() {
	initWeaponQuizResult();
	window.objCols = createWeaponQuizResultObject(window.weaponData);
	drawAll();
}

/**
 * 武器クイズリザルト画面　初期表示・判定設定
 * @param {Object[]} weaponData 武器データ
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function createWeaponQuizResultObject(weaponData) {
	var cols = [];
	var WEAPON_IMAGE = PANEL_WEAPON_QUIZ_RESULT.WEAPON_IMAGE;
	var CORRECT_IMAGE = PANEL_WEAPON_QUIZ_RESULT.CORRECT_IMAGE;
	var HINT_ALL = PANEL_WEAPON_QUIZ_RESULT.HINT_ALL;
	var MORE_BUTTON = PANEL_WEAPON_QUIZ_RESULT.MORE_BUTTON;
	var RETURN_BUTTON = PANEL_WEAPON_QUIZ_RESULT.RETURN_BUTTON;
	
	cols.push(createObject(BACKGROUND_IMAGE));
	var weaponImageObj = createObject(WEAPON_IMAGE);
	weaponImageObj.image = createImage(WEAPON_IMAGE.IMAGE + weaponData[weaponAnswerIndex].image);
	cols.push(weaponImageObj);
	cols.push(createObject(CORRECT_IMAGE));
	var hintAllObj = createObject(HINT_ALL);
	// ヒントをすべてまとめた一覧を作成
	let resultHint = "";
	resultHint += window.questionData.map((obj) => {
		return obj.answer;
	});
	// カンマ区切りで出力されるため区切り文字を変更
	resultHint = resultHint.replace(/,/g, "\\n")
	hintAllObj.text = resultHint;
	cols.push(hintAllObj);
	cols.push(createObject(MORE_BUTTON));
	cols.push(createObject(RETURN_BUTTON));
	return cols;
}

/**
 * 武器クイズリザルト画面　クリック処理
 * @param {Object} obj クリック対象
 */
function clickWeaponQuizResult(obj) {
	if(obj.name == PANEL_WEAPON_QUIZ_RESULT.MORE_BUTTON.NAME) {
		uninitWeaponQuizResult();
		changeMode(MODE.WEAPON_QUIZ);
	} else if(obj.name == PANEL_WEAPON_QUIZ_RESULT.RETURN_BUTTON.NAME) {
		uninitWeaponQuizResult();
		uninitWeaponQuiz();
		changeMode(MODE.SELECT);
	}
}