/**
 * 共通
 */
var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1080;
var IMAGE_PATH = "http://" + location.host + "/images/";
var TEXT_STATE = {
    IS_TEXT: 1<<0,
    IS_BUTTON: 1<<1,
    ACTIVE: 1<<2,	// ボタンが使える状態か
    ENABLE: 1<<3,	// オブジェクトを表示するか
    CENTERX: 1<<4,
    CENTERY: 1<<5,
    HOVER: 1<<6,
    IMAGE: 1<<7,
    BG_DISABLE: 1<<8,
    HILIGHT: 1<<9,
    ADJUST_ASPECT: 1<<10,
    IMAGE_CENTERX: 1<<11,
    IMAGE_CENTERY: 1<<11,
    BG_KADOMARU: 1<<12,
    BOLD: 1<<13
};
var FONT_IKA = 'ikamodoki1_0';
var FONT_DEFAULT = 'MS PGothic';

var MODE = {
	SELECT: "mode_select",
	WEAPON_QUIZ: "mode_weapon_quiz",
	WEAPON_QUIZ_RESULT: "mode_weapon_quiz_result",
	ENEMY_QUIZ: "mode_enemy_quiz",
	NORMAL_QUIZ: "mode_normal_quiz",
	DIFFICULT_QUIZ: "mode_difficult_quiz"
};

/**
 * モード選択画面
 */
var PANEL_MODE_SELECT = {
	COMMENT: {
		NAME: "text",
		TEXT: "あそびたいモードをセンタクしてね。",
		FONT_SIZE: 48,
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 110,
		SCALEX: CANVAS_WIDTH - 200,
		SCALEY: 200,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#2D8013",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERY | TEXT_STATE.BG_KADOMARU,
		FONT: FONT_IKA
	},
	BUTTON: {
		NUM: 2,
		INDEX: {
			WEAPON_QUIZ: 1,
			NORMAL_QUIZ: 2,
		},
		NAME: [
			"mode_weapon_quiz",
			"mode_normal_quiz",
		],
		TEXT: [
			"ブキクイズ",
			"ツウジョウクイズ",
		],
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 6,
		CENTERY: 320,
		SPACEY: 200,
		SCALEX: 300,
		SCALEY: 150,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000"
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.BG_KADOMARU,
		IMAGE: "http://" + location.host + "/images/button/button_green_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		FONT: FONT_IKA
	},
	SELECT_FRAME: {
		NAME: "select_frame",
		TEXT: "出題する内容・難易度を選択してください。\\nグレーボタンになったものは出題されません。",
		FONT_SIZE: 32,
		CENTERX: 1200,
		CENTERY: 625,
		SCALEX: 1300,
		SCALEY: 750,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#2D8013",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE | TEXT_STATE.BG_KADOMARU,
		GROUP: MODE.NORMAL_QUIZ
	},
	TYPE_BUTTON: {
		INDEX: {
			NORMAL: 1,
			Trivia: 2
		},
		NAME: [
			"type_button_normal",
			"type_button_trivia"
		],
		TEXT: [
			"通常",
			"雑学"
		],
		FONT_SIZE: 50,
		CENTERX: 720,
		SPACEX: 300,
		CENTERY: 430,
		SCALEX: 300,
		SCALEY: 100,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#555555",
			HOVER: "#555555",
			HILIGHT: "#FFC000"
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.BG_KADOMARU | TEXT_STATE.HILIGHT,
		IMAGE: "http://" + location.host + "/images/button/button_black_1.png",
		HILIGHT_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		GROUP: MODE.NORMAL_QUIZ
	},
	LEVEL_BUTTON: {
		NUM: 10,
		NUMX: 5,
		NAME: "level_button",
		TEXT: "",
		FONT_SIZE: 50,
		CENTERX: 630,
		SPACEX: 120,
		CENTERY: 570,
		SPACEY: 120,
		SCALEX: 120,
		SCALEY: 120,
		TEXT_COLOR: "#FFFFFF",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.HILIGHT,
		IMAGE: "http://" + location.host + "/images/button/button_black_1.png",
		HILIGHT_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		GROUP: MODE.NORMAL_QUIZ
	},
	NORMAL_QUIZ_START_BUTTON: {
		NAME: "normal_quiz_start_button",
		TEXT: "上記内容で開始する",
		FONT_SIZE: 50,
		CENTERX: 870,
		CENTERY: 830,
		SCALEX: 600,
		SCALEY: 100,
		TEXT_COLOR: "#FFFFFF",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		DISABLE_IMAGE: "http://" + location.host + "/images/button/button_black_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		GROUP: MODE.NORMAL_QUIZ
	},
	YOKODUNA_IMAGE: {
		NAME: "yokoduna_image",
		CENTERX: 1550,
		CENTERY: 800,
		SCALEX: 800,
		SCALEY: 800,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/yokoduna.png",
	},
	KUMASAN_IMAGE: {
		NAME: "kumasan_image",
		CENTERX: 700,
		CENTERY: 1000,
		SCALEX: 400,
		SCALEY: 400,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/kumasan.png",
	},
	IKA_IMAGE: {
		NAME: "ika_image",
		CENTERX: 1000,
		CENTERY: 600,
		SCALEX: 600,
		SCALEY: 600,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/ika_4.png",
	},
	TITLE_LOGO_IMAGE: {
		NAME: "title_logo_image",
		CENTERX: 1200,
		CENTERY: 900,
		SCALEX: 600,
		SCALEY: 600,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/title_logo.png",
	},
	ZAKOSYAKE_IMAGE: {
		NAME: "zakosyake_image",
		CENTERX: 1550,
		CENTERY: 300,
		SCALEX: 500,
		SCALEY: 500,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/syake_image2.png",
	},
	INK_IMAGE: {
		NAME: "zakosyake_image",
		CENTERX: 1600,
		CENTERY: 900,
		SCALEX: 300,
		SCALEY: 300,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/ink.png",
	},
	IKURA_IMAGE: {
		NAME: "zakosyake_image",
		CENTERX: 700,
		CENTERY: 400,
		SCALEX: 200,
		SCALEY: 200,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/ikura_image.png",
	},
};

/**
 * 武器クイズ画面
 */
var PANEL_WEAPON_QUIZ = {
	ANSWER_TEXT: {
		NAME: "answer_text",
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 135,
		SCALEX: CANVAS_WIDTH - 200,
		SCALEY: 250,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#2D8013",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.BG_KADOMARU,
		IMAGE: "http://" + location.host + "/images/button/text_green_2.png",
	},
	QUESTION_SELECT_BUTTON: {
		NUM: 4,
		NAME: "question",
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 5,
		CENTERY: 350,
		SPACEY: 180,
		SCALEX: 500,
		SCALEY: 150,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000",
			DISABLE: "#555555"
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		DISABLE_IMAGE: "http://" + location.host + "/images/button/button_black_1.png"
	},
	HINT_LIST: {
		NAME: "hint_list",
		TEXT: "＜ヒント一覧＞\\n",
		FONT_SIZE: 32,
		CENTERX: 950,
		CENTERY: 600,
		SCALEX: 600,
		SCALEY: 600,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#2D8013",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.BG_KADOMARU,
		IMAGE: "http://" + location.host + "/images/button/text_green_2.png",
	},
	ANSWER_BUTTON: {
		NAME: "answer_button",
		TEXT: "回答する",
		FONT_SIZE: 24,
		CENTERX: CANVAS_WIDTH / 8 * 7,
		CENTERY: 960,
		SCALEX: 150,
		SCALEY: 100,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000",
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png"
	},
	HINT_IMAGE: {
		NAME: "hint_image",
		CENTERX: 1580,
		CENTERY: 600,
		SCALEX: 600,
		SCALEY: 600,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/" + "weapon_range_image.png"
	}
};

/**
 * 武器選択画面
 */
var PANEL_SELECT_WEAPON = {
	SELECT_FRAME: {
		NAME: "select_frame",
		TEXT: "武器を選択してください。",
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: CANVAS_HEIGHT / 2,
		SCALEX: CANVAS_WIDTH / 8 * 7,
		SCALEY: CANVAS_HEIGHT / 8 * 7,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#0070C0",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE
	},
	CANCEL: {
		NAME: "cancel",
		TEXT: "Ｘ",
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 2 + CANVAS_WIDTH / 8 * 7 / 2 - 50 / 2,
		CENTERY: CANVAS_HEIGHT / 2 - CANVAS_HEIGHT / 8 * 7 / 2 + 50 / 2,
		SCALEX: 50,
		SCALEY: 50,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#CC0000",
			HOVER: "#770000",
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY
	},
	WEAPON: {
		NUMX: 12,
		NAME: "weapon",
		CENTERX: CANVAS_WIDTH / 2 - CANVAS_WIDTH / 8 * 7 / 2 + 100,
		CENTERY: CANVAS_HEIGHT / 2 - CANVAS_HEIGHT / 8 * 7 / 2 + 150,
		SCALEX: 130,
		SCALEY: 130,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#548235",
			HOVER: "#BBBB35",
			DISABLE: "#555555"
		},
		STATE: TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.IMAGE,
		IMAGE: "http://" + location.host + "/images/"
	}
};

/**
 * 武器クイズリザルト画面
 */
var PANEL_WEAPON_QUIZ_RESULT = {
	CORRECT_IMAGE: {
		NAME: "correct_image",
		CENTERX: 500,
		CENTERY: 400,
		SCALEX: 1000,
		SCALEY: 1000,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/akuse/correct.png"
	},
	WEAPON_IMAGE: {
		NAME: "weapon_image",
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 900,
		SCALEX: 300,
		SCALEY: 300,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/"
	},
	HINT_ALL: {
		NAME: "answer_text",
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 4 * 3,
		CENTERY: 400,
		SCALEX: 700,
		SCALEY: 600,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#2D8013",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.BG_KADOMARU,
		IMAGE: "http://" + location.host + "/images/button/text_green_2.png",
	},
	MORE_BUTTON: {
		NAME: "more_button",
		TEXT: "もう一度挑戦する",
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 4 * 1,
		CENTERY: 900,
		SCALEX: 500,
		SCALEY: 150,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000",
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png"
	},
	RETURN_BUTTON: {
		NAME: "return_button",
		TEXT: "モード選択画面へ戻る",
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 4 * 3,
		CENTERY: 900,
		SCALEX: 500,
		SCALEY: 150,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000",
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png"
	},
}

/**
 * 通常クイズ画面
 */
var PANEL_NORMAL_QUIZ = {
	QUESTION_TEXT: {
		NAME: "question_text",
		FONT_SIZE: 40,
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 150,
		SCALEX: CANVAS_WIDTH - 200,
		SCALEY: 280,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#2D8013",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.BG_KADOMARU | TEXT_STATE.BOLD,
		IMAGE: "http://" + location.host + "/images/button/text_green_2.png",
	},
	QUESTION_BUTTON: {
		NUM: 4,
		NAME: "question_button",
		FONT_SIZE: 32,
		CENTERX: CANVAS_WIDTH / 5,
		CENTERY: 380,
		SPACEY: 180,
		SCALEX: 500,
		SCALEY: 150,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000",
			DISABLE: "#AA4444",
			HILIGHT: "#FFC000"
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.BOLD,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		DISABLE_IMAGE: "http://" + location.host + "/images/button/button_black_1.png",
		HILIGHT_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png"
	},
	QUESTION_IMAGE: {
		NAME: "question_image",
		CENTERX: 1050,
		CENTERY: 570,
		SCALEX: 550,
		SCALEY: 550,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.ADJUST_ASPECT,
	},
	ANSWER_IMAGE: {
		NAME: "answer_image",
		CENTERX: 1600,
		CENTERY: 520,
		SCALEX: 550,
		SCALEY: 550,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.IMAGE | TEXT_STATE.ADJUST_ASPECT,
	},
	CORRECT_IMAGE: {
		NAME: "correct_image",
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 600,
		SCALEX: 800,
		SCALEY: 800,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/akuse/correct.png"
	},
	INCORRECT_IMAGE: {
		NAME: "incorrect_image",
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 650,
		SCALEX: 800,
		SCALEY: 800,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/akuse/incorrect.png"
	},
	MORE_BUTTON: {
		NAME: "more_button",
		TEXT: "次の問題へ",
		FONT_SIZE: 32,
		CENTERX: 1100,
		CENTERY: 950,
		SCALEX: 400,
		SCALEY: 100,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000",
			DISABLE: "#555555"
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		DISABLE_IMAGE: "http://" + location.host + "/images/button/button_red_1.png",
	},
	RETURN_BUTTON: {
		NAME: "return_button",
		TEXT: "モード選択画面へ戻る",
		FONT_SIZE: 32,
		CENTERX: 1600,
		CENTERY: 950,
		SCALEX: 400,
		SCALEY: 100,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000",
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png"
	},
};