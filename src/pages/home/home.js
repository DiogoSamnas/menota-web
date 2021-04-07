import { NoteCards} from '../../components'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useCookies} from 'react-cookie';
import { FiPlusCircle } from "react-icons/fi";
import axios from 'axios';
import "./home.css";

function Home() {
    const [cookies, removeCookie] = useCookies(['userToken']);
    const [userIcon,setUserIcon] = useState('');
    const [Name,setName] = useState('');
    const [Email,setEmail] = useState('');
    const [Tag,setTag] = useState([]);
    const [Note,setNote] = useState([]);
    const [TagTitle,setTagTitle] = useState('');
    const [TagColor,setTagColor] = useState('');
    const [IsOpen,setIsOpen] = useState(false);
    const history = useHistory();
    const token = cookies.userToken;
    axios.defaults.headers.common['Authorization'] = token;
    function Logout() {
        axios.post('https://menota-api.herokuapp.com/api/logout').then((res) => {
            if (res.data.status_code = 200) {
                removeCookie('userToken');
                history.push("/");
                window.location.reload();
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }
    function CreateTag(e){
        e.preventDefault();
        axios.post('https://menota-api.herokuapp.com/api/tag',{title:TagTitle,color:TagColor}).then((res)=>{
        })
    }

    function hadleClick(e){
        e.preventDefault();
        setIsOpen(!IsOpen)
    }
    useEffect(()=>{
        axios.get('https://menota-api.herokuapp.com/api/perfil').then((res)=>{
            setName(res.data.name);
            setEmail(res.data.email);
            setUserIcon(res.data.name.substr(0,1)); 
        });
        axios.get('https://menota-api.herokuapp.com/api/tag').then((res)=>{
            setTag(res.data);
        });
        axios.get('https://menota-api.herokuapp.com/api/note').then((res)=>{
            setNote(res.data.notes);
            console.log(res.data.notes);
        })
    },[]);
    function getTagTitle(e){ setTagTitle(e.target.value);}
    function getTagColor(e){ setTagColor(e.target.value);}

    return (
        <>
        <div  className={IsOpen ? "create-tag" : "create-tag p-2 d-none" }>
            <div class="card-header d-flex justify-content-between">
                <p>ddwdw</p>  
                <button onClick={hadleClick}>x</button>
            </div>
            <form onSubmit={(e) => CreateTag(e) } className="m-2" action="">
                <div>
                    <input type="text" onChange={getTagTitle} placeholder="Tittle"/>
                </div>
                <div>
                    <input type="color" onChange={getTagColor} placeholder="Color"/>
                </div>
                <button type="submit"> crete tag</button>
            </form>
        </div>

        <header class="navbar navbar-light sticky-top bg-white flex-md-nowrap p-0 border-bottom">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Menota</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input class="border-0 w-100 mx-4" type="text" placeholder="Search" aria-label="Search"/>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link pointer" onClick={Logout}>Sign out</a>
                </li>
            </ul>
        </header>
        <div className="container-fluid">
            <div className="row">
                <nav id="sideBar" className="col-md-3 col-lg-2 d-md-block bg-white sidebar">
                <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                        <span data-feather="home"></span> All notes
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                        <span data-feather="home"></span> Favorites
                    </a>
                </li>
                </ul>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Tags</span>
                    <a class="link-secondary" href="#" aria-label="Add a new report">
                        <span onClick={hadleClick}><FiPlusCircle/></span>
                    </a>
                </h6>
                <ul className="nav flex-column">
                    {Tag.map((data) =>
                    <li class="nav-item">
                        <a class="nav-link active" style={{color: data.color}} aria-current="page" href="#">
                            <span data-feather="home"></span> {data.title}
                        </a>
                    </li>
                    )}
                </ul>
                <div className="user-area border-top w-100 row m-0 py-1">
                    <div className="col">
                        <p>{Name}</p>
                        {/* <p>{Email}</p> */}
                    </div>
                    <div className="col-4">config</div>
                </div>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {Note.map((data) =>
                    <>
                        <span>{data.title}</span>
                        <span>{data.body}</span>
                    </>
                )}
                </main>
            </div>
        </div>

            {/* <header id="homeNav" className="p-0 m-0">
                <div className="row h-fluid p-0 m-0">
                    <div className="col-2 nav-item">
                        <a className="" href="#">Menota</a>
                    </div>
                    <div className="col nav-item">
                        <input className="w-100 border-0 rounded-3 px-3 shadow-sm" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                    <div className="col-1 nav-item">
                        <div className="userIcon text-nowrap">
                            <a className="" href="#" onClick={Logout}>{userIcon}</a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container-fluid">
                <div id="home" className="row">
                    <div className="col">
                        <div className="container pt-3">
                            <NoteCards />
                        </div>
                    </div>
                </div>
            </div> */}


            {/* <div className="home-section container-fluid h-100 p-0 m-0 row">
                    <div className="col-2 my-nav p-0 d-flex flex-column">
                        <a className="ps-2 active">All notes</a>
                        <a href="#" className="ps-2" onClick={Logout}>Logout</a>
                        <h6 className="tags"> Tags</h6>
                    </div>
                    <div className="col card-area">
                        <div className="container">
                            <NoteCards />
                        </div>
                    </div>
                </div> */}
        </>
    )
}

export default Home;