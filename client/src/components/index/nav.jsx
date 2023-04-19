import "../../css/styles.css"
export default function Nav(props) {
    return (
        <>
            <header>
                <div className="container-nav" style={{height: props.height }}>
                    <div className="logo" style={{marginLeft: props.margin}}>
                        <img src='/images/logo.png' alt="logo" style={{ height: "50px", width: "50px" }} />
                        <h3>Math</h3>
                        <h2>Flix</h2>
                    </div>
                    <div className="links" style={{display: props.display}}>
                        <li><a href="#Home">Home</a></li>
                        <li><a href="#Features">Features</a></li>
                        <li><a href="#Contact">Contact Us</a></li>
                    </div>
                </div>
            </header>
        </>
    )
}