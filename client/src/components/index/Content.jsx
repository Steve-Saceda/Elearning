import "../../css/styles.css"
import { useNavigate } from "react-router-dom"

export default function Content() {
    const navigate = useNavigate();
    return (
        <>
            <div className="showcase-area">
                <div className="big-image">

                </div>
                <div className="big-title">
                    <img className="m-content" src="/images/landing_pic.png" alt="pic" />
                    <h1>"The Only Way to Learn Mathematics is to do Mathematics"</h1>
                </div>
                <div className="text">
                    <p>MATHFLIX is a web-based system that gives interactive
                        teaching in the basic mathematics operation for grade 1 students.
                        This system aims to help students learn the basic grade 1
                        mathematics operation level with the guide of using the dialect
                        language which is Cebuano and providing games for their learning entertainment
                        with interactive reading.

                    </p>
                </div>
                <div className="cta">
                    <button onClick={() => navigate("/auth")}><a href="#" className="btn">Get Started</a></button>
                </div>
            </div>
        </>
    )
}