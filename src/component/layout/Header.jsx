import {Link} from 'react-router-dom'
function Header(){


    return (
<header>
    
    <nav style={{ top: 0 , left: 0 , position : 'absolute' , width: '100%' ,  display: 'flex' , justifyContent : 'space-between' }}>
        <Link to="/">Dental Kart</Link>
        <Link to="/"> Home  </Link> 
        <Link to="/products"> Products </Link>
        <Link to="/wishlist"> Wishlist </Link>
        <Link to="/cart"> Cart </Link>
    </nav>

</header>

    )
}

export default Header;