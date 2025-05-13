import { useState, useEffect } from 'react';
import axios from 'axios';

const useListRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const listRecipes = async () => {
      try {
        const response = await axios.get(`${REACT_APP_CLOUDTYPE_BACKEND_URL}/api/recipes`); // db 주소 제대로 쓰기
        console.log(response.data);
        setRecipes(response.data); // 레시피 데이터 저장
      } catch (err) {
        console.error(err);
        setError('💦useListRecipes 에러: 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    listRecipes();
  }, []);

  return { recipes, loading, error };
};

export default useListRecipes;
