import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route , useLocation } from 'react-router-dom';

/* hooks */
import useFetchRecipes from './hooks/useFetchRecipes';
//import useListRecipes from './hooks/useListRecipes';

/* components */
import Home from './pages/Home';
import Search from './components/common/Search';
import AddRecipe from './pages/create/AddRecipe';
import Signup from './pages/user/Signup';
import DetailRecipe from './pages/recipe/DetailRecipe';
import Login from './pages/user/Login';
import MyPage from './pages/user/MyPage';
import Research from './pages/user/Research';
import { Footer } from './components/common/Footer';
import { DragBackButton } from './components/common/DragBackButton';
import { DragHomebtn } from './components/common/DragHomebtn';
import { PlusButton } from './components/common/PlusButton';
import { HomeButton } from './components/common/HomeButton';


function App() {

  /* location: footer 렌더링 관련 */
  const location = useLocation();

  const { recipes: fetchRecipe, 
          recipeMethods, 
          isLoading: fetchRecipeLoading, 
          error: fetchError
        } = useFetchRecipes();

  /* const { recipes: listRecipe, 
          isLoading: listRecipeLoading, 
          error: listError
        } = useListRecipes(); */

  // 로딩 및 에러 상태를 통합 처리
  const isLoading = fetchRecipeLoading /* || listRecipeLoading */;
  const error = fetchError /* || listError */;

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}/> {/* Home */}
        <Route path="/recipe/search" element={<Search /* recipes={listRecipe} *//>} />
        <Route path="/recipe/:recipe_pk_id" element={<DetailRecipe recipes={fetchRecipe} recipeMethods={recipeMethods} />} /> {/* DetailRecipe */}
        <Route path="/users/login" element={<Login />} /> {/* Login */}
        <Route path="/users/signup" element={<Signup/>}/>
        <Route path="/users/mypage" element={<MyPage />} /> {/* MyPage */}
        <Route path="/users/research" element={<Research />} /> {/* Research */}
        <Route path="/recipe/add" element={<AddRecipe />} /> {/* AddRecipe */}

        {/* <Route path="/" element={<Home recipes={listRecipe}/>}/> */}
        
      </Routes>
        {location.pathname !== "/users/login" && <Footer />}
        {location.pathname !== "/users/login" && location.pathname !== "/users/signup" && location.pathname !== "/users/research" && (
          <>
            {/* <HomeButton /> */}
            <PlusButton />
            <DragBackButton/>
          </>
        )}
        <HomeButton />
        {/* <DragBackButton/> */}
        
    </div>
  );
}

export default App;
