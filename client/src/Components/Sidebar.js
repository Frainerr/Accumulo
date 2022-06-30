import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Col} from 'react-bootstrap'

import { Link } from 'react-router-dom';


function Sidebar(props){
    return(
        <Col className="collapse d-md-block col-md-3 col-12 p-3 sidebar" id="sidebar-supported-content">
            <SidebarItems options={props.options} filterState={props.filterState} />            
        </Col>
    );
}

function SidebarItems(props){
    
    return(
        <ul className="list-group-flush p-0">
            {
                props.options.map((option) => {return (
                <li key={option.name} className="list-group-item p-0">
                    <Link to={option.path} style={{ textDecoration: 'none' }}>
                        <button className={props.filterState === option.name ? "btn-sidebar active" : "btn-sidebar"}>
                            {option.name}
                        </button>
                    </Link>
                </li>)})
            }
        </ul>
    );
}

export default Sidebar;