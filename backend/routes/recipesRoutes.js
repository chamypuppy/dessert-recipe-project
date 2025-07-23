const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ✅ 레시피 목록 불러오기 */
/* router
  .route('/')
  
});  */

/* 레시피 방법 불러오기 + recipe와 recipe_method 테이블의 공통된 recipe_pk_id랑 매칭되어야 함 */
router
  .route('/method')
  .get((req, res) => {
  const query = 
  `
  select r.*, m.* from recipe r
  LEFT JOIN recipe_method m ON r.recipe_pk_id = m.recipe_pk_id;  
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('💦recipe_method API 처리 시 에러가 발생하였습니다!: \n', err);
      res.status(500).send('서버 오류');
      return;
    } 

    const recipe_table_result = [];
    const recipe_method_results = [];

    results.forEach((row) => {
      if (row.recipe_pk_id) {
        const existingRecipe = recipe_table_result.find(r => r.recipe_pk_id === row.recipe_pk_id);
        if (!existingRecipe) {
          recipe_table_result.push({
            recipe_pk_id: row.recipe_pk_id,
            recipe_name: row.recipe_name,
            recipe_intro: row.recipe_intro,
            recipe_image: row.recipe_image,
            recipe_servings: row.recipe_servings,
            baking_level: row.baking_level,
            tags: row.tags,
            scrap_count: row.scrap_count,
            ingredient1: row.ingredient1,
            ingredient2: row.ingredient2,
            author_id: row.author_id,
            tips: row.tips,
          });
        }
      }

      if (row.method) {
        recipe_method_results.push({
          method_pk_id: row.method_pk_id,
          recipe_pk_id: row.recipe_pk_id,
          method: row.method,
          method_number: row.method_number,
        });
      }
    });

    res.json({
      recipeResult: recipe_table_result,
      recipeMethodResult: recipe_method_results,
    });
  });
});

// recipe 가져오기, 수정하기, 삭제하기, 등록하기
router
  .route("/") /* 세미콜론 x 체이닝 */
  .get((req, res) => {
    const query = `
      SELECT 
        r.recipe_pk_id, 
        r.recipe_name, 
        r.recipe_image,
        r.scrap_count, 
        u.nickname AS author_name
      FROM recipe r
      LEFT JOIN users u ON r.author_id = u.users_pk_id;
    `;

    db.query(query, (err, results) => {
      if(err) {
        console.error('💦recipes API의 DB 쿼리에 에러가 발생했습니다!: \n', err);
        res.status(500).send('recipes API 오류');
      } else {
        res.json(results);
      }
    });
  })
  .put((req, res) => { /* UPDATE recipe 세미콜론 x */ }) 
  .post((req, res) => { /* INSERT recipe */
    const { recipe_name, recipe_intro, recipe_servings, baking_level } = req.body;
    const query = `INSERT INTO recipe (
      recipe_name, recipe_intro, recipe_image, recipe_servings, 
      baking_level, author_id, category_big, category_middle, 
      category_machine, ingredient1, ingredient2, tips, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [recipe_name, recipe_intro, recipe_image, recipe_servings, 
      baking_level, author_id, category_big, category_middle, 
      category_machine, ingredient1, ingredient2, tips, tags], (err, results) => {
      if (err) {
        console.error('💦add_recipe API 처리 시 에러가 발생하였습니다!: \n', err);
        res.status(500).send('레시피 추가에 실패: add_recipe API 오류');
      } else {
        res.status(201).send('레시피가 추가되었습니다.');
      }
    });
  })
  .delete((req, res) => { /* DELETE recipe 세미콜론 x */})



module.exports = router;