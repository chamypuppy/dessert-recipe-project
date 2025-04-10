import { useState, useEffect } from 'react';
// import axios from 'axios';
//import AddRecipeForm from './components/AddRecipeForm';
import { BrowserRouter as Router, Routes, Route , useLocation } from 'react-router-dom';

/* hooks */
import useFetchRecipes from './hooks/useFetchRecipes';
import useListRecipes from './hooks/useListRecipes';

/* components */
import Home from './components/Main/Home';
import DetailRecipe from './components/Recipe/DetailRecipe';
import Login from './components/Users/Login';
import MyPage from './components/Users/MyPage';
import Research from './components/Users/Research';
import { Footer } from './components/Main/Footer';
import { DragBackbtn } from './components/Main/DragBackbtn';
import { DragHomebtn } from './components/Main/DragHomebtn';



function App() {

  /* location: footer 렌더링 관련 */
  const location = useLocation();

  const { recipes: fetchRecipe, 
          recipeMethods, 
          isLoading: fetchRecipeLoading, 
          error: fetchError
        } = useFetchRecipes();

  const { recipes: listRecipe, 
          isLoading: listRecipeLoading, 
          error: listError
        } = useListRecipes();

  // 로딩 및 에러 상태를 통합 처리
  const isLoading = fetchRecipeLoading || listRecipeLoading;
  const error = fetchError || listError;

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home recipes={listRecipe}/>}/> {/* Home */}
        <Route path="/recipe/:recipe_pk_id" element={<DetailRecipe recipes={fetchRecipe} recipeMethods={recipeMethods} />} /> {/* DetailRecipe */}
        <Route path="/users/login" element={<Login />} /> {/* Login */}
        <Route path="/users/mypage" element={<MyPage />} /> {/* MyPage */}
        <Route path="/users/research" element={<Research />} /> {/* Research */}
      </Routes>
        {location.pathname !== "/users/login" && <Footer />}
        <DragBackbtn/>
    </div>
  );
}

export default App;
