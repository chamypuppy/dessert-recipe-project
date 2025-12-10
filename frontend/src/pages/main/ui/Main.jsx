import { List } from "../../../shared/ui/List/List";
import { Header } from "../../../widget/header/Header";
import { useListRecipe } from "../../../entities/recipe/model/useListRecipe";
import { useSearch } from "../../../features/search-recipe/model/useSearch";

export const Main = () => {

  const { keyword } = useSearch();
  const { recipeList, loading, error } = useListRecipe(keyword);

  return(
    <div className="md:px-8"/* id='' */>
      <Header /* userPkId={userPkId} *//>
      
      {loading && <p>로딩 중</p>}
      {error && <p>Home 로딩에러 {error}</p>}
      
      <List
      recipeList={recipeList}
      // likeRecipes={likeRecipes}
      />
    </div>
  );
};