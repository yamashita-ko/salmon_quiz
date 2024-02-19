
-- 連番作成
insert into salmondb.correct_answer_count (
       quiz_master_id,
       correct_count,
       total_count
)select @seq := @seq + 1 as value,
        0,
        0
   from salmondb.quiz_master,
       (select @seq := 0) x
