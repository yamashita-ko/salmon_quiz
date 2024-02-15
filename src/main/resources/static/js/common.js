export class Common {
	static updateImages = [];
	static isCollision = false;
	static canvas = document.getElementById("canvas");
	static ctx = canvas.getContext("2d");
	static modeObject;
	
	/**
	 * 配列の最後の要素取得
	 * @param {Object[]} array 配列
	 * @return {Object} 配列の最後の要素
	 */
	static last(array) {
		return array[array.length - 1];
	}
	
	/**
	 * 画面削除処理
	 * @param {number} width 幅
	 * @param {number} height 高さ
	 */
	static clear(width, height) {
		this.ctx.clearRect(0, 0, width, height);
	}
	
	/**
	 * モード変更
	 * @param {Object} mode モードインスタンス
	 */
	static changeMode(mode) {
		this.clear(window.ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
		if(this.modeObject)
			this.modeObject.uninit();
		this.modeObject = mode;
		this.modeObject.create();
	}
	
	/**
	 * 判定用オブジェクト作成
	 * @param {Object} data 元データ
	 * @return {Object} 判定用オブジェクト
	 */
	static createObject(data) {
		var obj = {};
		const DEFAULT_KADOMARU_SIZE = 20;
		obj.name = data.NAME;
		obj.text = data.TEXT;
		obj.fontSize = data.FONT_SIZE;
		obj.centerX = data.CENTERX;
		obj.centerY = data.CENTERY;
		obj.scaleX = data.SCALEX;
		obj.scaleY = data.SCALEY;
		obj.textColor = data.TEXT_COLOR;
		obj.bgColor = data.BG_COLOR;
		obj.state = data.STATE;
		obj.defaultState = data.STATE;
		obj.imagePath = data.IMAGE;
		obj.hoverImagePath = data.HOVER_IMAGE;
		obj.disableImagePath = data.DISABLE_IMAGE;
		obj.hilightImagePath = data.HILIGHT_IMAGE;
		obj.image = this.createImage(data.IMAGE);
		if(data.IMAGE_OBJ)
			obj.image = data.IMAGE_OBJ;
		obj.hoverImage = this.createImage(data.HOVER_IMAGE);
		obj.disableImage = this.createImage(data.DISABLE_IMAGE);
		obj.hilightImage = this.createImage(data.HILIGHT_IMAGE);
		obj.group = data.GROUP;
		obj.font = data.FONT ? data.FONT : FONT_DEFAULT;
		if(data.MARGIN) {
			obj.marginX = data.MARGIN;
			obj.marginY = data.MARGIN;
		} else {
			obj.marginX = data.MARGINX;
			obj.marginY = data.MARGINY;
		}
		obj.lineHeight = data.LINE_HEIGHT;
		if(obj.state & TEXT_STATE.BG_KADOMARU) {
			obj.kadomaruSize = data.KADOMARU_SIZE ? data.KADOMARU_SIZE : DEFAULT_KADOMARU_SIZE;
		}
		return obj;
	}
	
	/**
	 * objColsをすべて描画
	 * @param {Object} objCols 判定用オブジェクト
	 */
	static drawAll(objCols) {
		let func = () => { 
			objCols.map((o) => {
				this.drawText(o);
			});
		}
		this.ckeckLoadImageExecFunc(func);
	}
	
	/**
	 * objColsのstateをすべてリセット
	 * @param {Object} objCols 判定用オブジェクト
	 */
	static resetState(objCols) {
		objCols.map((o) => {
			o.state = o.defaultState;
		});
	}
	
	/**
	 * Imageオブジェクト生成
	 * @param {String} path パス
	 * @return {Object} Imageオブジェクト
	 */
	static createImage(path) {
		if(!path) return;
		if(path == IGNORE_LOAD_PATH) return;
		const image = new Image();
		image.src = path;
		this.updateImages.push(image);
		return image;
	}
	
	/**
	 * Load完了チェック後にFunction実施
	 * @param {Function} func 関数
	 */
	static ckeckLoadImageExecFunc(func) {
		if(this.updateImages.length == 0) return func();
		this.isCollision = false;
		
		let loadCount = 0;
		let loadFunc = () => {
			loadCount++;
			if(loadCount == this.updateImages.length) {
				func();
				this.updateImages = [];
				this.isCollision = true;
			}
		}
		for(let i = 0; i < this.updateImages.length; i++) {
			this.updateImages[i].onload = loadFunc;
			this.updateImages[i].onerror = loadFunc;
		}
	}
	
	/**
	 * オブジェクトのグループをフィルタリングした後に関数実行
	 * @param {Object} objCols 判定用オブジェクト
	 * @param {String} group グループ名
	 * @param {Function} func 関数(第一引数にオブジェクトを選択させること)
	 */
	static filterGroupExecFunc(objCols, group, func) {
		let objs = objCols.filter((o) => o.group == group);
		objs.map((o) => {
			func(o);
		})
	}
	
	/**
	 * オブジェクトの名前を検索した後に関数実行
	 * @param {Object} objCols 判定用オブジェクト
	 * @param {String} group グループ名
	 * @param {Function} func 関数(第一引数にオブジェクトを選択させること)
	 */
	static findNameExecFunc(objCols, name, func) {
		let obj = objCols.find((o) => o.name == name);
		func(obj);
	}
	
	/**
	 * オブジェクト描画
	 * @param {Object} obj 判定用オブジェクト
	 * @return {Object} 判定用オブジェクト
	 */
	static drawText(obj) {
		if((obj.state & TEXT_STATE.ENABLE) == false)
			return obj
		this.ctxDrawBG(obj);
		var func = () => {
			this.ctxDrawText(obj);
		};
		if(obj.state & TEXT_STATE.IMAGE) {
			this.ctxDrawImage(obj, func);
		} else {
			func();
		}
		return obj;
	}
	
	/**
	 * 画像描画
	 * @param {Object} obj 判定用オブジェクト
	 * @param {Function} func 画像描画後に実行する関数
	 */
	static ctxDrawImage(obj, func) {
		if(obj.state & TEXT_STATE.IMAGE) {
			let chara;
			if(obj.state & TEXT_STATE.HILIGHT && obj.hilightImage) {
				chara = obj.hilightImage;
			} else if((obj.state & TEXT_STATE.ACTIVE) == false && obj.disableImage) {
				chara = obj.disableImage;
			} else if(obj.state & TEXT_STATE.HOVER && obj.hoverImage) {
				chara = obj.hoverImage;
			} else {
				chara = obj.image;
			}
			if(!chara) return;
			if(chara.width == 0) return;
			let imgStartX = obj.centerX - obj.scaleX / 2;
			let imgStartY = obj.centerY - obj.scaleY / 2;
			let imgScaleX = obj.scaleX;
			let imgScaleY = obj.scaleY;
			if(obj.state & TEXT_STATE.ADJUST_ASPECT) {
				if(chara.naturalWidth / chara.naturalHeight < imgScaleX / imgScaleY) {
					// Y軸を最大にしてX軸を減らす
					let oldScaleX = imgScaleX;
					imgScaleX = chara.naturalWidth * (imgScaleY / chara.naturalHeight);
					imgStartX = imgStartX + (oldScaleX - imgScaleX) / 2;
				} else {
					// X軸を最大にしてY軸を減らす
					let oldScaleY = imgScaleY;
					imgScaleY = chara.naturalHeight * (imgScaleX / chara.naturalWidth);
					imgStartY = imgStartY + (oldScaleY - imgScaleY) / 2;
				}
			}
			const PADDING = 10;
			if(obj.state & TEXT_STATE.IMAGE_CENTERX) {
				imgStartX += PADDING;
				imgScaleX -= PADDING * 2;
			}
			if(obj.state & TEXT_STATE.IMAGE_CENTERY) {
				imgStartY += PADDING;
				imgScaleY -= PADDING * 2;
			}
			this.ctx.drawImage(chara, imgStartX, imgStartY, imgScaleX, imgScaleY);
			func();
		}
	}
	
	/**
	 * 背景色描画
	 * @param {Object} obj 判定用オブジェクト
	 */
	static ctxDrawBG(obj) {
		if((obj.state & TEXT_STATE.BG_DISABLE) == false) {
 			// テキスト背景描画
			this.ctx.beginPath();
			if(obj.state & TEXT_STATE.BG_KADOMARU) {
				createRoundRectPath(this.ctx, obj.centerX - obj.scaleX / 2, obj.centerY - obj.scaleY / 2, obj.scaleX, obj.scaleY, obj.kadomaruSize)
			} else {
				this.ctx.rect(obj.centerX - obj.scaleX / 2, obj.centerY - obj.scaleY / 2, obj.scaleX, obj.scaleY)
			}
			if(typeof obj.bgColor === 'object') {
				let bgColor = obj.state & TEXT_STATE.HOVER ? obj.bgColor.HOVER : obj.bgColor.NORMAL;
				bgColor = obj.state & TEXT_STATE.ACTIVE ? bgColor : obj.bgColor.DISABLE;
				bgColor = obj.state & TEXT_STATE.HILIGHT ? obj.bgColor.HILIGHT: bgColor;
				this.ctx.fillStyle = bgColor;
			} else {
				this.ctx.fillStyle = obj.bgColor;
			}
			this.ctx.fill();
			// エッジ描画
			if((obj.state & TEXT_STATE.BG_NO_BORDER) == false) {
				this.ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
				this.ctx.stroke();
				this.ctx.closePath();
			}
		}
	}
	
	/**
	 * テキスト描画
	 * @param {Object} obj 判定用オブジェクト
	 */
	static ctxDrawText(obj) {
		if(!obj.text)
			return;
		let TEXT_MARGINX = 10;
		let TEXT_MARGINY = 10;
		let LINE_HEIGHT = 10;
		if(obj.marginX)
			TEXT_MARGINX = obj.marginX;
		if(obj.marginY)
			TEXT_MARGINY = obj.marginY;
		if(obj.lineHeight)
			LINE_HEIGHT = obj.lineHeight;
		// \nを区切り文字として分割
		if(obj.state & TEXT_STATE.IS_TEXT) {
			let font = "";
			font += obj.bold ? "bold " : "";
			font += obj.fontSize + "px ";
			font += obj.font ? obj.font + " " : FONT_DEFAULT;
			this.ctx.font = font;
			const measure = this.ctx.measureText(obj.text);
			const textHeight= measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
			const texts = obj.text.split("\\n");
			for(let i = 0; i < texts.length; i++) {
	 			var textPosX = obj.centerX - obj.scaleX / 2 + TEXT_MARGINX;
	 			var textPosY = obj.centerY - obj.scaleY / 2 + textHeight + TEXT_MARGINY;
	 			if(obj.state & TEXT_STATE.CENTERX) {
					let textWidth = this.ctx.measureText(texts[i]).width;
	 				textPosX = obj.centerX - textWidth / 2;
	 			}
	 			if(obj.state & TEXT_STATE.CENTERY) {
	 				textPosY = obj.centerY - textHeight * texts.length / 2 + textHeight * (i + 1);
	 				textPosY += -LINE_HEIGHT * (texts.length - 1) / 2 + LINE_HEIGHT * i
	 			} else {
	 				textPosY += (textHeight + LINE_HEIGHT) * i;
				 }
				this.ctx.fillStyle = obj.textColor;
				this.ctx.fillText(texts[i], textPosX, textPosY);
				//this.ctx.strokeStyle = '#000000';
				//this.ctx.lineWidth = 1.5;
				//this.ctx.strokeText(texts[i], textPosX, textPosY);
			}
		}
	}
}