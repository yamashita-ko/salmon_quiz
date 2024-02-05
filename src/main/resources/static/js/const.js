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
    BOLD: 1<<13,
    BG_NO_BORDER: 1<<14
};
var FONT_IKA = 'ikamodoki1_0';
var FONT_DEFAULT = 'MS PGothic';
var IGNORE_LOAD_PATH = "http://" + location.host + "/images/";
var MODE = {
	SELECT: "mode_select",
	WEAPON_QUIZ: "mode_weapon_quiz",
	WEAPON_QUIZ_RESULT: "mode_weapon_quiz_result",
	ENEMY_QUIZ: "mode_enemy_quiz",
	NORMAL_QUIZ: "mode_normal_quiz",
	DIFFICULT_QUIZ: "mode_difficult_quiz"
};

var GROUP = {
	SELECT: MODE.SELECT,
	WEAPON_QUIZ: MODE.WEAPON_QUIZ,
	WEAPON_SELECT: "WEAPON_SELECT",
	NORMAL_QUIZ: MODE.NORMAL_QUIZ
}

var BACKGROUND_IMAGE = {
	NAME: "background_image",
	CENTERX: CANVAS_WIDTH / 2,
	CENTERY: CANVAS_HEIGHT / 2,
	SCALEX: CANVAS_WIDTH,
	SCALEY: CANVAS_HEIGHT,
	STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
	IMAGE: "http://" + location.host + "/images/bg.png"
};
/**
 * モード選択画面
 */
var PANEL_MODE_SELECT = {
	BUTTON: {
		NUM: 4,
		INDEX: {
			WEAPON_QUIZ: 1,
			NORMAL_QUIZ: 2,
			QUIZ1: 3,
			QUIZ2: 4,
		},
		NAME: [
			"mode_weapon_quiz",
			"mode_normal_quiz",
			"mode_kari1",
			"mode_kari2",
		],
		TEXT: [
			"ブキクイズ",
			"ツウジョウクイズ",
			"クイズイチ",
			"クイズニ",
		],
		FONT_SIZE: 50,
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 450,
		SPACEY: 170,
		SCALEX: 400,
		SCALEY: 150,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "rgba(0, 112, 192, 0.7)",
			HOVER: "rgba(255, 192, 0, 0.7)",
			DISABLE: "rgba(85, 85, 85, 0.7)",
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.BG_KADOMARU,
		FONT: FONT_IKA,
		GROUP: GROUP.SELECT,
		KADOMARU_SIZE: 40
	},
	NORMAL_QUIZ_SELECT_FRAME: {
		NAME: "select_frame",
		TEXT: "ツウジョウクイズは出題された答えを選択肢から選ぶシンプルなクイズです。\\n" + 
			"出題する内容と難易度を選択し、ゲームを開始してください。\\n" +
			"色がグレーの問題は出題されません。\\n\\n" +
			"出題内容　：\\n\\n\\n" + 
			"出題難易度：",
		FONT_SIZE: 50,
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: CANVAS_HEIGHT / 2,
		SCALEX: 1800,
		SCALEY: 1000,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "rgba(45, 96, 19, 0.95)",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE,
		GROUP: MODE.NORMAL_QUIZ,
		MARGIN: 30,
		LINE_HEIGHT: 20
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
		CENTERX: 520,
		SPACEX: 300,
		CENTERY: 380,
		SCALEX: 300,
		SCALEY: 100,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#555555",
			HOVER: "#555555",
			HILIGHT: "#FFC000"
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.BG_KADOMARU | TEXT_STATE.HILIGHT,
		GROUP: GROUP.NORMAL_QUIZ
	},
	LEVEL_BUTTON: {
		NUM: 10,
		NUMX: 5,
		NAME: "level_button",
		TEXT: "",
		FONT_SIZE: 50,
		CENTERX: 430,
		SPACEX: 120,
		CENTERY: 530,
		SPACEY: 120,
		SCALEX: 120,
		SCALEY: 120,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#555555",
			HOVER: "#555555",
			HILIGHT: "#FFC000"
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.HILIGHT,
		GROUP: GROUP.NORMAL_QUIZ
	},
	NORMAL_QUIZ_START_BUTTON: {
		NAME: "normal_quiz_start_button",
		TEXT: "上記内容で開始する",
		FONT_SIZE: 50,
		CENTERX: 670,
		CENTERY: 800,
		SCALEX: 600,
		SCALEY: 100,
		TEXT_COLOR: "#FFFFFF",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		DISABLE_IMAGE: "http://" + location.host + "/images/button/button_black_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		GROUP: GROUP.NORMAL_QUIZ
	},
	NORMAL_QUIZ_CANCEL_BUTTON: {
		NAME: "cancel",
		TEXT: "Ｘ",
		FONT_SIZE: 32,
		CENTERX: 1835,
		CENTERY: 65,
		SCALEX: 50,
		SCALEY: 50,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#CC0000",
			HOVER: "#770000",
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY,
		GROUP: GROUP.NORMAL_QUIZ
	},
	YOKODUNA_IMAGE: {
		NAME: "yokoduna_image",
		CENTERX: 800,
		CENTERY: 700,
		SCALEX: 1200,
		SCALEY: 1200,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/yokoduna.png",
	},
	IKA2_IMAGE: {
		NAME: "ika_image2",
		CENTERX: 400,
		CENTERY: 700,
		SCALEX: 600,
		SCALEY: 600,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/ika_2.png",
	},
	IKA3_IMAGE: {
		NAME: "ika_image3",
		CENTERX: 1600,
		CENTERY: 600,
		SCALEX: 600,
		SCALEY: 600,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/ika_3.png",
	},
	TITLE_LOGO_IMAGE: {
		NAME: "title_logo_image",
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 200,
		SCALEX: 1400,
		SCALEY: 350,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/title_logo.png",
	},
	IKURA_IMAGE: {
		NAME: "zakosyake_image",
		CENTERX: 828,
		CENTERY: 160,
		SCALEX: 80,
		SCALEY: 80,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/ikura_image.png",
	},
	IKA4_IMAGE: {
		NAME: "ika_image4",
		CENTERX: 1400,
		CENTERY: 600,
		SCALEX: 500,
		SCALEY: 800,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/ika_4.png",
		GROUP: MODE.NORMAL_QUIZ
	},
};

/**
 * 武器クイズ画面
 */
var PANEL_WEAPON_QUIZ = {
	ANSWER_TEXT: {
		NAME: "answer_text",
		FONT_SIZE: 40,
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 135,
		SCALEX: CANVAS_WIDTH - 200,
		SCALEY: 250,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#2D8013",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.BG_KADOMARU,
		MARGIN: 20,
		LINE_HEIGHT: 10
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
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERY | TEXT_STATE.BG_KADOMARU,
		IMAGE: "http://" + location.host + "/images/button/button_blue_1.png",
		HOVER_IMAGE: "http://" + location.host + "/images/button/button_yellow_1.png",
		DISABLE_IMAGE: "http://" + location.host + "/images/button/button_black_1.png",
		GROUP: GROUP.WEAPON_QUIZ
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
		MARGIN: 20,
		LINE_HEIGHT: 10
	},
	ANSWER_BUTTON: {
		NAME: "answer_button",
		TEXT: "回答する",
		FONT_SIZE: 48,
		CENTERX: 1550,
		CENTERY: 950,
		SCALEX: 300,
		SCALEY: 150,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: {
			NORMAL: "#0070C0",
			HOVER: "#FFC000",
		},
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.BG_KADOMARU,
		GROUP: GROUP.WEAPON_QUIZ
	},
	HINT_IMAGE: {
		NAME: "hint_image",
		CENTERX: 1580,
		CENTERY: 600,
		SCALEX: 600,
		SCALEY: 600,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.IMAGE | TEXT_STATE.ENABLE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
		IMAGE: "http://" + location.host + "/images/"
	}
};

/**
 * 武器選択画面
 */
var PANEL_SELECT_WEAPON = {
	SELECT_FRAME: {
		NAME: "select_frame",
		TEXT: "武器を選択してください。",
		FONT_SIZE: 45,
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: CANVAS_HEIGHT / 2,
		SCALEX: CANVAS_WIDTH / 8 * 7,
		SCALEY: CANVAS_HEIGHT / 8 * 7,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#0070C0",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE,
		GROUP: GROUP.WEAPON_SELECT
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
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.IS_BUTTON | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY,
		GROUP: GROUP.WEAPON_SELECT
	},
	WEAPON: {
		NUMX: 12,
		NAME: "weapon_image",
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
		IMAGE: "http://" + location.host + "/images/",
		GROUP: GROUP.WEAPON_SELECT
	},
	WEAPON_NAME: {
		NAME: "weapon_name_text",
		FONT_SIZE: 50,
		CENTERX: 1325,
		CENTERY: 867,
		SCALEX: 780,
		SCALEY: 130,
		TEXT_COLOR: "#FFFFFF",
		BG_COLOR: "#0070C0",
		STATE: TEXT_STATE.IS_TEXT | TEXT_STATE.ACTIVE | TEXT_STATE.CENTERX | TEXT_STATE.CENTERY | TEXT_STATE.BG_NO_BORDER,
		GROUP: GROUP.WEAPON_SELECT
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
		NAME: "result_weapon_image",
		CENTERX: CANVAS_WIDTH / 2,
		CENTERY: 900,
		SCALEX: 300,
		SCALEY: 300,
		BG_COLOR: "#FFFFFF",
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_KADOMARU,
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
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.ENABLE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
	},
	ANSWER_IMAGE: {
		NAME: "answer_image",
		CENTERX: 1600,
		CENTERY: 520,
		SCALEX: 550,
		SCALEY: 550,
		STATE: TEXT_STATE.ACTIVE | TEXT_STATE.IMAGE | TEXT_STATE.BG_DISABLE | TEXT_STATE.ADJUST_ASPECT,
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