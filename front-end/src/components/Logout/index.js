import fire from '../../firebase';

const handleLogout = () => {
   fire.auth().signOut();
   window.location.href = '/';
 };

export default handleLogout;
