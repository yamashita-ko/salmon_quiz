-- SQL(S)→SQLパラメータから変数を設定
select id
  from salmondb.quiz_master
 where question_image = @image_path
   or answer_image = @image_path;
