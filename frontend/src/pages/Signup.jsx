import React, { useEffect, useState, useRef } from "react";
//import { DayPicker } from "react-day-picker";
//import 'react-day-picker/dist/style.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Signup () {
  const [formData, setFormData] = useState({
    form_id: "",
    form_pwd1: "",
    form_name: "",
    form_tel: "",
    form_birthday: "",
    form_email: ""
  });
  
  const [date, setDate] = useState(new Date());
  const [emailIValue, setInputEmailValue] = useState("");
  const [savedEmailList, setSavedEmailList] = useState([]);
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [pwdCheck, setPwdCheck] = useState(true);
  const [pwdCheckText, setPwdCheckText] = useState("");

  //const formatDate = 'YYYY-MM-DD';
  //const [pwd, setPwd] = useState("");
  //const originPwdRef = useRef();

  const onClickFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("form_id", formData.form_id);
    data.append("form_pwd1", formData.form_pwd1);
    data.append("form_name", formData.form_name);
    data.append("form_tel", formData.form_tel);
    data.append("form_birthday", formData.form_birthday);
    data.append("form_email", formData.form_email);
    
    // try {
    //   const res = await axios.post("https://localhost:5000/api/");
    // }
    // catch {}
    
  }

  const onChangeForm = (e) => {
    const { name, value, date } = e.target; // 구조분해할당
    //if(name === 'email') savedInputEmail(value);
    
    setFormData(target => {
      const newData = {...target};
      if(name == 'form_birthday') newData.form_birthday = date;
      else newData[name] = value;
      return newData;
      //return console.log(newData);
    }); // ({}): 객체 리턴을 위해
  }
  console.log(formData);

  function clickDate(e) {
    const currentDate = e.target.value;
    setDate(currentDate);
  }

  function typingBirthday(e) {
    const dateStr = e.target.value;
    // console.log(dateStr);
    const year = dateStr.split("-");
    console.log(year);
    if (year[0].length == 4 && Number(year[0]) < 1900) {
      alert("연도는 1900년 이상부터 선택 가능합니다.");
      return setDate("");
    }
    else setDate(dateStr);
  }

    /* 생년월일 input custom */
  const CustomDateInput = React.forwardRef(({value, onClick, onChange}, ref) => (
    <>
      <label for="birthday" class="form-label">* 생년월일</label>
      <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">birthday</span>
          <input type="text" class="form-control" placeholder="생년월일" aria-label="생년월일" aria-describedby="basic-addon1"
          id="birthday" name="form_birthday"
          onClick={onClick} onChange={onChange} value={value} ref={ref}/>
      </div>
    </>
  ));


  /* 비밀번호 실시간 일치 Check */
  useEffect(() => {
    setPwdCheck(pwd1 == pwd2);

    /* if(pwd2 && !pwdCheck) setPwdCheckText("비밀번호가 일치하지 않습니다");
    else if(pwd2 && pwdCheck) setPwdCheckText("비밀번호가 일치합니다😄");
    else if(!pwd2) setPwdCheckText(""); */

    console.log(pwd1, pwd2);
    
  }, [pwd1, pwd2]);

  /* const ChangePwdCheck = () => {
    if(!isSamePwd) setPwdErrorText("비밀번호가 일치하지 않습니다");
    else setPwdErrorText("비밀번호가 일치합니다😄");
  } */


  const recommEmailList = [
    "@gmail.com",
    "@naver.com",
    "@daum.net",
    "@hanmail.net",
    "@yahoo.com",
    "@outlook.com",
    "@nate.com",
    "@kakao.com"
  ];

  function savedInputEmail(emailInputValue) {
    console.log(emailInputValue);
    setInputEmailValue(emailInputValue);
    const userEmail = recommEmailList.map((email) => 
      emailInputValue.includes("@")
      ? emailInputValue.split("@")[0] + email
      : emailInputValue + email
    );
    setSavedEmailList(userEmail);
  }

  return(
    <form onSubmit={onClickFormSubmit} id="form_signup">
      <h2 style={{fontWeight: "500"}}>기본정보</h2>
      <hr style={{margin: "10px 30px", color:"lightgray"}}/>

      <label for="id" class="form-label">* 아이디</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">ID</span>
        <input type="text" class="form-control" placeholder="아이디" aria-label="아이디" aria-describedby="basic-addon1" 
        id="id" name="form_id" required
        onChange={onChangeForm}/>
      </div>

      <label label for="pwd" class="form-label">* 비밀번호</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">PWD</span>
        <input type="password" class="form-control" placeholder="비밀번호" aria-label="비밀번호" aria-describedby="basic-addon1" 
        id="pwd" name="form_pwd1" required
        // onChange={(e) => setPwd1(e.target.value)}
        onChange={onChangeForm}/>
      </div>

      <label for="pwdcheck" class="form-label">* 비밀번호 확인</label>
      <div style={{}}>{pwdCheckText}</div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">PWD</span>
        <input type="password" class="form-control" placeholder="비밀번호 확인" aria-label="비밀번호 확인" aria-describedby="basic-addon1" 
        id="pwdcheck" name="form_pwd2" required 
        // onChange={(e) => {
        //   setPwd2(e.target.value);
        //   setPwdCheckText (
        //     pwdCheck
        //     ? "비밀번호가 일치합니다😄"
        //     : "비밀번호가 일치하지 않습니다."
        //     );
        //   }}
        onChange={onChangeForm}
          />
      </div>
        
      <label for="name" class="form-label">* 이름</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="text" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" 
        id="name" name="form_name" required
        onChange={onChangeForm}/>
      </div>

      <label for="tel" class="form-label">* 휴대전화</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Tel</span>
        <input type="text" class="form-control" placeholder="전화번호" aria-label="휴대전화" aria-describedby="basic-addon1" 
        id="tel" name="form_tel" required
        onChange={onChangeForm}/>
      </div>

      

      <DatePicker 
        selected={date} 
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        yearDropdownItemNumber={105}
        showMonthDropdown
        scrollableYearDropdown
        locale={ko}
        // showYearPicker // 비활성화

        // onChange={(selectDate)=>{
        //   //console.log(selectDate);
        //   setDate(selectDate);
        // }}
        // onKeyDown={(e) => {
        //   console.log(e.target.value);
          
        // }}
        onChange={(date) => setDate(date.toISOString().slice(0, 10))}
        // onClick={console.log(date)}
        customInput={<CustomDateInput/>}
      />
      <br/>

      {/* <DayPicker animate mode="single" selected={date} onSelect={setDate}/> */}

      <label for="email" class="form-label">* 이메일</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="email" class="form-control" placeholder="ooo@gmail.com" aria-label="이메일" aria-describedby="basic-addon1"
        list="emails"
        id="email" name="form_email" required
        // onChange={(e) => savedInputEmail(e.target.value)}
        onChange={(e) => {
          savedInputEmail(e.target.value);
          onChangeForm(e);
        }} />
        <datalist id="emails">
          {savedEmailList != null 
          ? savedEmailList.map((email, index) => <option value={email} key={index} />)
          : null }
        </datalist>
      </div>

      

      {/* <h3 style={{fontWeight: "500", marginTop: "30px"}}>추가정보</h3>
      <hr style={{margin: "10px 30px", color:"lightgray"}}/>

      <label for="users_intro" class="form-label">나의 소개</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">intro</span>
        <input type="email" id="users_intro" class="form-control" placeholder="한줄 소개" aria-label="한줄 소개" aria-describedby="basic-addon1" required/>
      </div> */}

      


      {/* <div class="mb-3">
        <label for="formFile" class="form-label">프로필 사진</label>
        <input class="form-control" type="file" id="formFile" />
      </div> */}
      
      {/* <button type="submit" customInput={<CustomSubmitButton/>}>가입하기</button>   */}
      <div className="d-grid gap-2">
      <Button variant="secondary" size="lg" type="submit" style={{backgroundColor: "var(--color-strawberry3)", border: "var(--color-drak--strawberry)"}}>
        가입하기
      </Button>
      </div>
    </form>
  )
}

export default Signup;