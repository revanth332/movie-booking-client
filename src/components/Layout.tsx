
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout({isAuthenticated,setAuthenticated}:{isAuthenticated:boolean,setAuthenticated:(isAuthenticated:boolean) => void}) {
  return (

    <div>
        <Header isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
        <Outlet />
    </div>
  )
}
