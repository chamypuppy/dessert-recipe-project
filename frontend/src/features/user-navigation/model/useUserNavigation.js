import { useNavigate } from "react-router-dom";

export const useUserNavigation = (userPkId) => {
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    console.log();

    userPkId 
    ? navigate('/users/mypage') 
    : navigate('/users/login');

  };
  return {
    handleUserIconClick
  }
};