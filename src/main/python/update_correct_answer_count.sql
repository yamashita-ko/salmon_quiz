UPDATE salmondb.correct_answer_count SET correct_count = correct_count - 1, total_count = total_count + 1 WHERE quiz_master_id = 1;
