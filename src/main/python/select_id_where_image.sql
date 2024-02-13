-- SQL(S)¨SQLƒpƒ‰ƒ[ƒ^‚©‚ç•Ï”‚ğİ’è
select id
  from salmondb.quiz_master
 where question_image = @image_path
   or answer_image = @image_path;
