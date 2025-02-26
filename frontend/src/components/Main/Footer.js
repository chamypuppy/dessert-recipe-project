import { Link } from "react-router-dom"

export const Footer = () => {
  return(
    <footer>
      <h3 className="f_title">dessert-recipe-project</h3>
      <div className="f_content">
        <div><Link to='https://github.com/chamypuppy'>개발자 깃허브</Link></div>
        <div className="">ⓒ 2025. 푸딩비 All rights reserved.</div>
      </div>
    </footer>
  )
}