// src/components/AddRecipeForm.js
import { useState } from 'react';
import axios from 'axios';

function AddRecipeForm() {
    const [recipeName, setRecipeName] = useState('');
    const [recipeIntro, setRecipeIntro] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [servings, setServings] = useState(1);
    const [level, setLevel] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/recipes/add', {
                recipeName,
                recipeIntro,
                recipeImage,
                servings,
                level
            });
            console.log(response.data.message);
        } catch (error) {
            console.error('레시피 추가 중 오류:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="레시피 이름" required />
            <input type="text" value={recipeIntro} onChange={(e) => setRecipeIntro(e.target.value)} placeholder="레시피 소개" />
            <input type="text" value={recipeImage} onChange={(e) => setRecipeImage(e.target.value)} placeholder="이미지 URL" />
            <input type="number" value={servings} onChange={(e) => setServings(e.target.value)} placeholder="n개 분량" min="1" />
            <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="난이도" min="0" max="5" />
            <button type="submit">레시피 추가</button>
        </form>
    );
}

export default AddRecipeForm;
