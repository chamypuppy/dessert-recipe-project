import React, { useState } from 'react';

const Research = () => {
  const [research, setResearch] = useState({
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
  );
};

export default Research;
