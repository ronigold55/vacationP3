import imgPageNotFound from "../../../Assets/Images/page-not-found.png"
import Menu from "../Menu/Menu";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <Menu />
            <img src={imgPageNotFound} />
        </div>
    );
}

export default PageNotFound;
