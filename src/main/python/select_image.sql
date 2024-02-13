-- select level, type, count(*) from salmondb.quiz_master group by level, type order by level;

-- select distinct question_image from salmondb.quiz_master;
select question_image
  from salmondb.quiz_master
 where question_image is not null
   and question_image != ''
union
select answer_image
  from salmondb.quiz_master
 where answer_image is not null
   and answer_image != '';
