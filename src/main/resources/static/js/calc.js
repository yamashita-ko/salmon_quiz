
/**
 * 連番作成
 * @param {number} a 開始の数
 * @param {number} z 終了の数
 * @return {number[]} 連番
 * @example
 * alert(forRange(1, 6));
 * // [1, 2, 3, 4, 5, 6]
 */
function forRange(a, z) {
	const ret = [];
	for (let i = a; i <= z; i++) {
		ret.push(i)
	}
	return ret;
}

/**
 * 配列シャッフル
 * @param {number} array 配列
 * @return {number[]} シャッフルされた配列
 * @example
 * alert(arrayShuffle([1, 2, 3, 4, 5]));
 * // [1, 4, 5, 2, 3]
 */
function arrayShuffle(array) {
 	for(let i = (array.length - 1); 0 < i; i--){
		// 0〜(i+1)の範囲で値を取得
		let r = Math.floor(Math.random() * (i + 1));
		// 要素の並び替えを実行
		let tmp = array[i];
		array[i] = array[r];
		array[r] = tmp;
	}
	return array;
}

/**
 * 乱数作成
 * @param {number} max 乱数の範囲
 * @return {number} 乱数
 * @example
 * alert(getRandonInt(50));
 * // 0~49
 */
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

/**
 * 矩形と点の当たり判定
 * @param {number} centerX X座標中心
 * @param {number} centerY Y座標中心
 * @param {number} scaleX X座標大きさ
 * @param {number} scaleY Y座標大きさ
 * @param {number} posX X座標点
 * @param {number} posY Y座標点
 * @return {boolean} 判定結果
 */
function collision(centerX, centerY, scaleX, scaleY, posX, posY) {
	if((centerX - scaleX / 2 > posX) ||
		(centerX + scaleX / 2 < posX) ||
		(centerY - scaleY / 2 > posY) ||
		(centerY + scaleY / 2 < posY)) {
		return false;
	}
	return true;
}

/**
 * 角が丸い四角形のパスを作成する
 * @param  {CanvasRenderingContext2D} ctx コンテキスト
 * @param  {Number} x   左上隅のX座標
 * @param  {Number} y   左上隅のY座標
 * @param  {Number} w   幅
 * @param  {Number} h   高さ
 * @param  {Number} r   半径
 */
function createRoundRectPath(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.arc(x + w - r, y + r, r, Math.PI * (3/2), 0, false);
	ctx.lineTo(x + w, y + h - r);
	ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * (1/2), false);
	ctx.lineTo(x + r, y + h);       
	ctx.arc(x + r, y + h - r, r, Math.PI * (1/2), Math.PI, false);
	ctx.lineTo(x, y + r);
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * (3/2), false);
	ctx.closePath();
}