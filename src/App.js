import './App.css';
import Navbar from "./components/navbar/navbar";
import {BrowserRouter, Route, Redirect, Switch, HashRouter} from "react-router-dom";
import Registration from "./components/registration/registration";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./api/api";
import {useEffect} from "react";
import Disk from "./components/disk/disk";
import Profile from "./components/profile/profile";


function App() {
    const isAuth = useSelector(state=>state.user.isAuth)
    const dispatch  = useDispatch()

    useEffect(()=>{
        dispatch(auth())
    },[])

    return <div>
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Navbar/>
            <div className='wrap'>

{/*                {
                    !isAuth ?
                    <div>
                        <Route path="/registration" render={()=><Registration/>}/>
                        <Route path="/login" render={()=><Login/>}/>
                        < Redirect to="/login" />
                    </div>
                        :
                        <div>
                            <Route exact path='/' render={()=><Disk/>}/>
                             тут пишем заглушку , якщо ввдодиться неправильний url то
                            редіректиця на головну
                            < Redirect to="/" />
                        </div>
                }*/}

                {!isAuth ?
                    <Switch>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/login" component={Login}/>
                        <Redirect to='/login'/>
                    </Switch>
                    :
                    <Switch>
                        <Route exact path="/" component={Disk}/>
                        <Route exact path='/profile' component={Profile}/>
                        <Redirect to="/"/>
                    </Switch>
                }
            </div>


        </HashRouter>
    </div>
}

export default App;
