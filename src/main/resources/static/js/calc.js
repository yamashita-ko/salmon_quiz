
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