import { Layout, Menu, } from "antd";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  
  const items = ['Home', 'User', 'Client','Notas','Login'].map((key,index) => ({
    key:index,
    label: (
      <NavLink
      className={'nav-link'}
        to={`/${key}`}
      >
        {key}
      </NavLink>
    ),
  }));

  return (
    <>

    
   <Layout>

      {/* <Menu 

      theme="darck"
      mode="horizontal">

        <Menu.Item key="home">
          <NavLink className='nav-link' to="/" >
          Home
          </NavLink>
        </Menu.Item>
        <Menu.Item key="client">
          <NavLink className='nav-link' to="/client" >
          Client
          </NavLink>
        </Menu.Item>
        <Menu.Item key="users">
          <NavLink className='nav-link' to="/user" >
            User
          </NavLink>
        </Menu.Item>
        <Menu.Item key="users">
          <NavLink className='nav-link' to="/notas" >
            Notas
          </NavLink>
        </Menu.Item>

        <Menu.Item key="login">
          <NavLink className='nav-link' to="/login">
            Login
          </NavLink>
        </Menu.Item>

      </Menu> */}
      <Menu
      mode="horizontal"
      items={items}
     
    />
  
    </Layout>

    </>

  );
};
export default Navbar;