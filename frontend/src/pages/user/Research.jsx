import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

function Research() {
  const [selectedData, setSelectedData] = useState({
    level: "", habit: "", type: ""
  });
  const [researchData, setResearchData] = useState({
    level: "", habit: "", type: ""
  });
  /* const [bakingExp, setBakingExp] = useState(
    {id: 0, level: 0}, {id: 1, level: 1}, {id: 2, level: 2}, 
    {id: 3, level: 3}, {id: 4, level: 4});
  const [eatingHabit, setEatingHabit] = useState(
    {id: 0, habit: "저당"}, {id: 1, habit: "통밀"}, {id: 2, habit: "비건"}, {id: 3, habit: "없음"});
  const [recipeType, setRecipeType] = useState(
    {id: 0, type: "제과"}, {id: 1, type: "제빵"}, {id: 2, type: "음료"}, {id: 3, type: "없음"}); */

  const onClickButton = (value) => {
    setResearchData(liveData => ({
      //prevSelectedData.include(value) ? prevSelectedData : []
      ...liveData,
    }));
  };

  return(
    <div className="p-8">
      <h1 className="font-semibold text-xl">만나서 반갑습니다😄 <br/>
      나만의 맞춤 서비스를 위해 몇 가지 응답을 받고 있어요<br/>:)</h1>
      <div className="font-medium text-gray-300 text-sm pt-6 pb-3">시간 내어 응답해 주시면 더 좋은 추천 서비스로 찾아뵐게요😊</div><br/><br/>

      <span className="baking_exp font-semibold text-gray-300">홈베이킹 숙련도</span>
      <div className="d-grid gap-2">
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">0단계</div>
          <div className="text-sm text-gray-500">간단한 노오븐 디저트 만들어 본 경험이 있어요~</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">1단계</div>
          <div className="text-sm text-gray-500">종종 홈베이킹을 즐겨해서 핸드믹서 같은 기본적인 장비는 가지고 있어요~</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">2단계</div>
          <div className="text-xs text-gray-500">기본적인 장비 + 전문적인 재료를 가지고 있어요!<br/>반죽의 준비 과정이 익숙해요 :D</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">3단계</div>
          <div className="text-sm text-gray-500">반죽의 결, 숙성시간과 버터의 양 등 세밀한 밑작업까지 신경쓰고 있어요!</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">4단계</div>
          <div className="text-sm text-gray-500">제누와즈 굽기, 생크림 아이싱 작업 등 전문적인 장비 또는 노하우를 알고 있어요!</div>
        </Button>

      </div>

      <span className="baking_exp font-semibold text-gray-300">식문화 &nbsp; (중복 선택 가능)</span>
      <div className="d-grid gap-2">
        <div className="w-full flex">
          <Button variant="light" size="lg" className="w-full">
            <div className="font-semibold text-gray-800">저당</div>
          </Button>
          <Button variant="light" size="lg" className="w-full">
            <div className="font-semibold text-gray-800">통밀</div>
          </Button>
        </div>
        <div className="w-full flex">
          <Button variant="light" size="lg" className="w-full">
            <div className="font-semibold text-gray-800">비건</div>
          </Button>
          <Button variant="light" size="lg" className="w-full">
            <div className="font-semibold text-gray-800">해당 사항 없음</div>
          </Button>
        </div>
      </div>

      <span className="baking_exp font-semibold text-gray-300">관심 레시피 &nbsp; (중복 선택 가능)</span>
      <div className="d-grid gap-2">
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">제과</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">제빵</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">음료</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">둘러보고 결정할래요!</div>
        </Button>

      </div>

    {/* <label for="baking_exp" class="form-label">* 베이킹 경험여부</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="radio" id="baking_exp" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" required/>
      </div> */}


      {/* <label for="baking_service" class="form-label">* 베이킹 경험여부</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="selectBox" id="baking_service" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" required/>
      </div> */}


      {/* <label for="baking_service" class="form-label">* 베이킹 레벨</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="radioBox" id="baking_service" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" required/>
      </div> */}
      
      {/* <label for="users_intro" class="form-label">원하는 레시피</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="checkbox" id="users_intro" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" required/>
      </div> */}
      </div>

      /* const [research, setResearch] = useState({
    bakingExperience: false,
    bakingService: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 사용자 데이터를 서버로 전송
    console.log('사용자 정보 제출:', research);
  };

  return (
    <div id='all_container'>
      <h1>사용자 정보 설정</h1>
      <form onSubmit={handleSubmit}>
        <label>
          홈베이킹 경험 여부:
          <input
            type="checkbox"
            checked={research.bakingExperience}
            onChange={(e) =>
              setResearch({ ...research, bakingExperience: e.target.checked })
            }
          />
        </label>
        <label>
          원하는 서비스:
          <select
            value={research.bakingService}
            onChange={(e) =>
              setResearch({ ...research, bakingService: e.target.value })
            }
          >
            <option value="">선택하세요</option>
            <option value="제과">제과</option>
            <option value="제빵">제빵</option>
            <option value="음료">음료</option>
            <option value="모두">모두</option>
          </select>
        </label>
        <button type="submit">저장</button>
      </form>
    </div>
  ); */
  );
}

export default Research;