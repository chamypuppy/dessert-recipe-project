/*
레시피 테이블 INSERT
    recipe_name VARCHAR(100) NOT NULL,                -- 레시피명
    recipe_intro VARCHAR(150),                        -- 레시피 소개
    recipe_image VARCHAR(100) DEFAULT 'nothing.webp' NOT NULL,  -- 레시피 사진 URL
    recipe_servings INT NOT NULL,                     -- n개 분량
    baking_level TINYINT NOT NULL,             	  -- 난이도 (0~5단계)
    category_FnB ENUM('제과', '제빵', '음료'),            -- 기능별 카테고리
    category_bakery VARCHAR(20),               		  -- 종류별 카테고리
    category_machine VARCHAR(20),             	      -- 구움별 카테고리
    ingredient1 TEXT,                     		      -- 재료1 (본재료)
    ingredient2 TEXT,                			      -- 재료2 (양념)
    tips TEXT,                                	      -- 팁
    tags VARCHAR(100),                        	      -- 태그 (쉼표로 구분된 문자열)
*/

use dessert_recipe_db;

-- 011. 무설탕 쿠키
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'세 가지 맛 저당 르뱅쿠키',
'3가지 맛의 설탕이 들어가지 않은 저당 르뱅쿠키 레시피예요~',
'recipe_img-011.webp',
6,	-- recipe_servings
2,	-- baking_level
7,	-- author_id
'제과', -- category_big
'쿠키', -- category_middle
'오븐', -- category_machine
'
[쿠키 반죽] \n\n
| 솔티드 카라멜 반죽\n
(준비1)\n
중력분 180g\n
베이킹파우더 3g\n
피칸 호두나 견과류 30g\n
로투스 쿠키\n
\n
(준비2: 카라멜 소스)\n
마스코바도 35g (다른 설탕 대체제 ok!)\n
소금 2g\n
생크림 40g\n
\n
버터 100g\n
스테비아 40g\n
계란 1개 (50-55g)\n
바닐라 익스트랙 3g\n
\n

| 쑥 단호박 반죽\n
(준비)\n
중력분 160g\n
베이킹파우더 3g\n
찐 단호박 80g\n
단호박 분말 15g\n
쑥 분말 10g\n
\n
버터 100g\n
스테비아 40g\n
계란 1개 (50-55g)\n
바닐라 익스트랙 3g\n
\n
| 얼그레이 초코칩 반죽\n
(준비)\n
중력분 170g\n
베이킹파우더 3g\n
얼그레이 찻잎 2g\n
초코칩 50g\n
\n
버터 100g\n
스테비아 40g\n
계란 1개 (50-55g)\n
바닐라 익스트랙 3g\n
',
'
[쿠키 속 크림치즈]
크림치즈 450g
스워브 45g (or 스테비아, 설탕 대체재, 슈가파우더 ok!)
\n\n
',
'
버터와 계란은 상온에서 보관한 후에 사용하여 주세요.\n
얼그레이 찻잎 대신 얼그레이 티백을 개봉하여 사용해도 괜찮아요.\n
다 구워진 쿠키는 흐물하기 때문에 조심히 식힘망에 올려주어야 해요.\n
솔티드 카라멜 쿠키는 20번 단계에 로투스 쿠키를 토핑해주면 잘 어울려요!
',
'저당,르뱅쿠키,오븐,스테비아'
);

use dessert_recipe_db;


-- 012. 요거트 케이크
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'다이어트 요거트 케이크',
'설탕을 넣지 않은 요거트 케이크예요!',
'recipe_img-012.webp',
1,	-- recipe_servings
0,	-- baking_level
7,	-- author_id
'제과', -- category_big
'케이크', -- category_middle
'오븐', -- category_machine
'
그릭요거트 450g\n
계란 3개\n
오트밀 가루 1큰술\n
알룰로스 90g
',
NULL,
'
오트밀 가루 대신 전분 가루나 아몬드가루 사용하셔도 돼요 :D',
'케이크, 요거트 케이크, 오븐, 그릭요거트, 알룰로스, 오트밀, 저당'
);

-- 013. 딸기 초코 케이크
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'스초생st 딸기 초코 케이크',
'
갑자기 딸기 초코케이크가 먹고 싶을 때 있지요! 저당으로 간단하게 즐겨볼 수 있어요♪\n
동물성 생크림을 이용해서 부드럽고 살살 녹아요😋
',
'recipe_img-013.webp',
1,	-- recipe_servings
1,	-- baking_level
4,	-- author_id
'제과', -- category_big
'케이크', -- category_middle
'노오븐', -- category_machine
'
| 초코 케이크 시트
밀가루 80g\n
카카오 파우더 20g\n
소금 약간\n
베이킹파우더 2-3g\n
알룰로스 50g\n
저지방 우유 50g\n
계란 2개\n
* 바닐라 익스트랙 조금(필수❌)\n
\n
딸기 5-6개
',
'
| 초코 생크림
다크 초콜릿 10g\n
동물성 생크림(유크림) 200ml(전부 사용❌)\n
가루 알룰로스 10g

* 동물성 생크림 200ml를 전부 사용하는 것이 아니기에 선호하는 생크림 양에 따라 50-70ml 정도 준비해주세요!
* 가루 알룰로스 역시 0.05 * 생크림ml 계산한 만큼 휘핑해주세요! 기호에 따라 더 넣어도 되어요.
',
'
생크림 팁!:\n
다크 초콜릿 %(퍼센티지)에 따라 생크림 당도가 달라지기에 생크림에 들어갈 가루 알룰로스 양을 조절해주세요.\n
에어프라이기로 구우셔도 되고, 전자레인지 사용 시 케이크 시트를 실온 보관하는 게 부드러운 식감을 유지할 수 있어요.\n
\n
케이크 시트 중간에 작은 초콜렛볼을 넣으면 더욱 스초생의 바삭한 느낌을 줄 수 있어요!
',
'케이크, 딸기 초코 케이크, 딸기, 노오븐, 전자레인지, 알룰로스, 저당'
);

-- 014. 키토 티라미수
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'노오븐 키토 티라미수',
'티라미수 만들 때 복잡하지 않으셨나요?🥴\n
크림 베이스에 달걀, 생크림, 젤라틴도 없는 노오븐 노밀가루 티라미수에요.💕',
'recipe_img-014.webp',
1,	-- recipe_servings
1,	-- baking_level
7,	-- author_id
'제과', -- category_big
'티라미수', -- category_middle
'노오븐', -- category_machine
'
| 티라미수 시트 \n
버터 35g\n
아몬드가루 50g \n
에리스리톨 10g\n
소금 한 꼬집\n
베이킹파우더 1/4t\n
계란 50g\n
생크림 25g\n
바닐라 익스트랙 1/8t\n
생크림 120g\n
\n
',
'
| 티라미수 크림\n
마스카포네 치즈 375g\n
알룰로스 3t\n
\n
| 커피 시럽\n
인스턴트 커피 1/2t\n
따뜻한 물 20ml\n
\n
토핑용 설탕없는 초코 파우더
',
'
커피 시럽은 커피 원액이나 기호에 따라 간편 커피(라떼류 ok)를 준비해도 좋아요!
',
'티라미수, 노오븐, 알룰로스, 저당'
);

-- 015. (키토) 티라미수 바치케
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'저탄수 티라미수 바스크 치즈케이크',
'이번 레시피는 커피향이 향기로운 티라미수 바스크 치즈케이크입니다 😍\n
가루가 전혀 들어가지 않아 꾸덕하고 부드러워요 :)',
'recipe_img-015.webp',
1,	-- recipe_servings
2,	-- baking_level
7,	-- author_id
'제과', -- category_big
'치즈케이크', -- category_middle
'오븐', -- category_machine
'
| 치즈케이크\n
<커피크림>
생크림 100g \n
에스프레소 25ml(커피가루 ok)\n
\n
크림치즈 200g\n
에리스리톨 70g\n
계란 2개\n
',
'
| 티라미수
마스카포네 150g\n
차가운 생크림 150g\n
에리스리톨 10g\n
바닐라 익스트랙 1t\n
카카오 파우더
',
'
티라미수 크림 팁!:
매끄러운 크림을 원한다면 80% 휘핑하시고, 단단한 크림을 원한다면 100% 휘핑해주세요!',
'바스크 티라미수 치즈케이크, 치즈케이크, 오븐, 저탄수'
);

-- 016. (비건) 비건 말차 르뱅쿠키
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'비건 말차 르뱅쿠키 (오븐/에어⭕)',
'통밀가루를 이용한 노버터, 노계란 비건 레시피를 준비했어요.\n말차를 녹차로 대체해서 만든다면 마카다미아 또는 헤이즐넛을 넣어도 좋을 것 같아요!\n저는 오븐에 조리하였지만 에어프라이어에 굽는 것도 가능하답니다😊',
'recipe_img-016.webp',
5,	-- recipe_servings
2,	-- baking_level
3,	-- author_id
'제과', -- category_big
'쿠키', -- category_middle
'오븐', -- category_machine
'
무가당 두유 - 72ml\n
 ✔대체가능 : 아몬드브리즈, 코코넛밀크 등\n\n
포도씨유 - 55g\n
 ✔대체가능 : 향이 없는 오일 모두가능\n\n
마스코바도 - 40g\n
 ✔대체가능 : 코코넛슈가추천, 외 원하는 스위트너\n\n
핑크 소금 - 1g\n
 ✔대체가능 : 일반 소금\n\n
프락토 올리고당 - 13g(1.5큰술)\n
 ✔대체가능 : 알룰로스올리고당, 메이플시럽, 아가베시럽\n\n
통밀가루 - 200g\n
 ✔대체가능 : 호밀가루(아몬드파우더, 코코넛파우더는 최대 40%까지만 변경가능)\n\n
말차가루 - 10 ~ 15g\n
 ✔녹차가루 또는 쑥가루로 대체하여 만들기 가능\n\n
옥수수전분 - 10g 또는 타피오카전분 - 7g\n
 ✔대체가능 : 감자전분(옥수수전분 동량)\n\n
무알루미늄 베이킹파우더 - 4g\n
브레드가든 베이킹소다 - 2.5g
',
'
| 토핑재료\n
다진 호두 - 60g\n
탈각 피스타치오 - 10g\n
비건 청크 초코칩 - 70g\n
비건 초코칩 - 30g
',
'
토핑은 자유롭게 해주셔도 돼요. 카카오함량이 높은 초콜릿을 함께 넣어도 좋고 비건 화이트초코, 다크커버춰나 초콜릿바를 잘라서 믹스해도 좋아요 :)\n
\n
[시트 굽는시간]\n
⏱오븐 180도 예열\n
\n
🍽보관/먹는방법\n
• 2~3일 이내에 드신다면 상온보관, 그 이상은 냉도보관 후 해동해서 드세요.\n
• 자연해동하거나 차가운 상태로 드셔보세요 :)\n
\n
🍽단맛추가\n
• 쿠키의 단맛은 보통입니다. 초코칩에 따라 당도가 결정됩니다.\n
• 취향에 따라 스위트너를 추가하거나, 카카오함량을 조절하여 본인의 입맛에 맞추어 만들어보세요.
',
'말차, 르뱅쿠키, 비건, 녹차, 노버터, 노계란, 오븐'
);

-- 017. (비건) 비건 호두파이
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'비건 호두파이',
'버터와 계란없이 만드는 호두파이 레시피를 준비했어요.\n평소 호두의 씁고 떫은 맛 때문에 드시기 어려우셨다면 오늘 저를 따라 호두 잔처리를 해보세요!',
'recipe_img-017.webp',
6,	-- recipe_servings
2,	-- baking_level
3,	-- author_id
'제과', -- category_big
'타르트', -- category_middle
'오븐', -- category_machine
'
🍽통밀파이지\n
통밀가루 - 267g\n
 ✔️대체재료 : 아몬드가루50% 대체, 박력분, 박력쌀가루 사용시 전분 10g추가\n\n
마스코바도 - 42g\n
 ✔️대체재료 : 섭취 가능한 스위트너\n\n
포도씨유 - 70g\n
 ✔️대체재료 : 식물성 오일\n\n
아몬드브리즈 - 80g\n
 ✔️대체재료 : 무첨가두유, 코코넛밀크\n\n
소금 - 1g
',
'
💛호두내용물\n
포도씨유 - 15g\n
 ✔️대체재료 : 식물성 오일\n\n
마스코바도 - 50g\n
 ✔️대체재료 : 섭취 가능한 스위트너\n\n
메이플시럽 - 70g\n
 ✔️대체재료 : 아가베시럽\n\n
아몬드브리즈 - 40g\n
 ✔️대체재료 : 무첨가두유, 코코넛밀크\n\n
아몬드가루 - 80g\n
 ✔️대체재료 : 순두부 100g + 옥수수전분 1큰술(믹서기로 충분히 갈아서 넣어주세요.)\n\n
시나몬파우더 - 2g\n
호두분태 - 150g\n
 ✔️대체재료 : 호두 잘라서 사용\n\n
토핑용 호두, 메이플시럽 소량
',
'
🗨저는 파이지를 오븐에 1차 구워주었어요.\n
이렇게 1차 구워주면 파이지 안쪽 면이 단단하여져서 파이지 식감이 바삭하고 단단해져요.\n
단단하게 싫으시다면 굽기를 생략하시고 곧바로 내용물을 채워 구워주세요. \n
굽지않고 만드시면 촉촉한 파이지를 만날 수 있답니다 :)\n
\n
🍽보관/먹는방법\n
• 2일 이내에 드신다면 상온보관, 그 이상은 냉도보관 후 해동해서 드세요.\n
• 자연해동하여 섭취하세요.\n
• 따뜻한 차나 아메리카노와 함께 먹으면 정말 맛있어요.\n
\n
🍽단맛추가\n
• 단맛의 정도는 보통입니다.
',
'비건, 노버터, 노계란, 호두파이, 비건 호두파이, 오븐'
);

-- 018. (비건) 비건 갸또쇼콜라 케이크
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'비건 갸또쇼콜라 케이크 (오븐/에어⭕)',
'글루텐프리 비건 갸또쇼콜라 케이크입니다. 초코무스케이크보다 좀 더 단단한 식감이라 갸또쇼콜라라 불러보아요.ㅎㅎ\n하루 숙성해서 먹으면 더더 맛있답니다.',
'recipe_img-018.webp',
1,	-- recipe_servings
2,	-- baking_level
3,	-- author_id
'제과', -- category_big
'케이크', -- category_middle
'오븐', -- category_machine
'
🍰케이크 시트\n
박력쌀가루 80g\n
 ✔️대체가능 : 글루텐프리 밀가루, 현미가루\n\n
아몬드가루 75g\n
 ✔️대체가능 : 해바라기씨 75g 갈아서 사용, 아몬드가루 전량 제외하고 코코넛가루 30g으로 대체\n\n
카카오파우더 27g\n
글루텐프리 베이킹파우더 3g\n
알루미늄프리 베이킹소다 1g\n
무첨가두유 130g\n
 ✔️대체가능 : 아몬드브리즈, 코코넛밀크 등\n\n
무향 코코넛오일 30g\n
 ✔️대체가능 : 섭취가능한 식물성 오일\n\n
애플사이다비니거(사과식초) 4ml\n
 ✔️대체가능 : 레몬즙 또는 일반식초\n\n
메이플시럽 40g\n
 ✔️대체가능 : 아가베시럽 또는 현미시럽\n\n
바닐라추출물 1작은술\n
 ✔️페이스트. 오일, 익스트랙 모두가능\n\n
소금 1g
',
'
🎂초코크림\n
고구마 500g\n
 ✔️삷거나 쪄준 뒤 껍질 제거하기\n\n
메이플시럽 30g\n
 ✔️대체가능 : 아가베시럽 또는 현미시럽\n\n
코코넛오일 7g\n
 ✔️생략가능하나 사용을 추천\n\n
바닐라추출물 1 작은술\n
 ✔️페이스트. 오일, 익스트랙 모두가능\n\n
무첨가두유 170g\n
 ✔️대체가능 : 아몬드브리즈, 코코넛밀크 등\n
고구마 수분이 많다면 생략 또는 가감 가능\n
고구마가 퍽퍽하다면 추가 가능\n\n
카카오파우더 2~3큰술(30g)\n
소금 1g\n
\n
🍫가나슈\n
다크초콜릿 60g\n
무첨가 두유 60g
',
'
[시트 굽는시간]\n
⏱에어프라이어 170도 15분(예열을 위해 공회전 10분 필수)\n
또는 오븐 180도 15분(예열필수)\n
\n
🍽보관/먹는방법\n
• 2~3일 냉장보관 가능\n
• 1일 냉장고에 보관해두었다가 드시면 아주 맛있어요.\n
• 냉동실(1달까지 가능)에 보관하여 자연해동 또는 저온해동\n
\n
🍽단맛추가\n
• 단맛은 적으나 카카오파우더의 다크함 덕분에 추가하지 않아도 맛있습니다.\n
• 취향에 따라 메이플시럽 1.5배 또는 시트와 크림에 과립형 스위트너를 넣어 완성합니다.
',
'비건, 갸또쇼콜라, 케이크, 초코케이크, 글루텐프리, 딸기, 오븐, 에어프레이어'
);

-- 019. 여기서부터
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'블루베리 레몬 파운드 케이크',
'레몬즙을 부어 숙성시켜 더 촉촉하고 맛있는 블루베리 레몬 파운드케이크를 만들었어요~',
'recipe_img-019.webp',
9,	-- recipe_servings
2,	-- baking_level
3,	-- author_id
'제과', -- category_big
'파운드 케이크', -- category_middle
'오븐', -- category_machine
'
| 레몬 파운드케이크\n
무염버터 130g\n
설탕 200g \n
소금 2g\n
계란(전란) 200g\n
바닐라 익스트랙 5g\n
중력분 200g\n
베이킹 파우더 2g\n
레몬제스트 1개\n
생크림 120g\n
\n
블루베리 120g\n
중력분 8g\n
\n
레몬즙 130g
',
'
| 크림치즈 크림
크림치즈 300g\n
슈가파우더 50g\n
바닐라빈 페이스트 4g\n
생크림 100g
',
'
파운드 케이크를 굽고 나서 갓 짠 레몬즙을 부어 비닐 랩을 덮고 실온에서 식힌 후, 냉장실에서 하룻밤 숙성시키면 레몬향이 가득해서 정말 맛있게 먹을 수 있어요!',
'파운드 케이크, 블루베리, 레몬, 크림치즈'
);

-- 020. 
INSERT INTO recipe(
recipe_name, 
recipe_intro, 
recipe_image, 
recipe_servings,
baking_level, 
author_id, 
category_big, 
category_middle,
category_machine, 
ingredient1, 
ingredient2, 
tips, 
tags)
VALUES(
'블루베리 레몬 파운드 케이크',
'레몬즙을 부어 숙성시켜 더 촉촉하고 맛있는 블루베리 레몬 파운드케이크를 만들었어요~',
'recipe_img-020.webp',
9,	-- recipe_servings
2,	-- baking_level
3,	-- author_id
'제과', -- category_big
'파운드 케이크', -- category_middle
'오븐', -- category_machine
'
| 레몬 파운드케이크\n
무염버터 130g\n
설탕 200g \n
소금 2g\n
계란(전란) 200g\n
바닐라 익스트랙 5g\n
중력분 200g\n
베이킹 파우더 2g\n
레몬제스트 1개\n
생크림 120g\n
\n
블루베리 120g\n
중력분 8g\n
\n
레몬즙 130g
',
'
| 크림치즈 크림
크림치즈 300g\n
슈가파우더 50g\n
바닐라빈 페이스트 4g\n
생크림 100g
',
'
파운드 케이크를 굽고 나서 갓 짠 레몬즙을 부어 비닐 랩을 덮고 실온에서 식힌 후, 냉장실에서 하룻밤 숙성시키면 레몬향이 가득해서 정말 맛있게 먹을 수 있어요!',
'파운드 케이크, 블루베리, 레몬, 크림치즈'
);