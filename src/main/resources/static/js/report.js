
/**
 * 報告画面　初期設定
 */
function initReport() {
}

/**
 * 報告画面　終了処理
 */
function uninitReport() {
}

/**
 * 報告画面作成
 */
function createReport() {
	initReport();
	window.objCols = drawReport();
}


/**
 * 報告画面　初期表示・判定設定
 * @return {Object[]} 当たり判定用オブジェクトリスト
 */
function drawReport() {
	var cols = [];
	var INPUT_TEXT = PANEL_REPORT.INPUT_TEXT;
	var SEND_BUTTON = PANEL_REPORT.SEND_BUTTON;
	const div = document.getElementById("inputObj");
	const inputText = document.createElement("textarea");
	inputText.style.position = INPUT_TEXT.POSITION;
	inputText.style.fontSize = INPUT_TEXT.FONT_SIZE;
	inputText.style.top = INPUT_TEXT.TOP;
	inputText.style.left = INPUT_TEXT.LEFT;
	inputText.style.width = INPUT_TEXT.WIDTH;
	inputText.style.height = INPUT_TEXT.HEIGHT;
    div.appendChild(inputText);
    
	cols.push(drawText(createObject(SEND_BUTTON)));
	
	return cols;
}

/**
 * 報告選択画面　クリック処理
 * @param {Object} obj クリック対象
 */
function clickReport(obj) {
	if(obj.name.indexOf(PANEL_REPORT.SEND_BUTTON.NAME) != -1) {
		// 報告ボタン押下
		console.log("報告");
	}
}
