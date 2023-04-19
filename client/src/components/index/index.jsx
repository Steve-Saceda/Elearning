import "../../css/styles.css"
import Footer from "../global/Footer"
import ContactUs from "./ContactUs"
import Nav from "./nav"
import Content from "./Content"
import Feature from "./Feature"


export default function Index() {
    return (
        <>
            <div className="big-wrapper">
                <Nav />
                <Content />
            </div>
            <section id="Features">
                <Feature />
            </section>
            <section id="Contact">
                <ContactUs />
            </section>
            <section id="Footer">
                <Footer />
            </section>
        </>

    )
}