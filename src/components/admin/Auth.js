/* Validate user authorization */

export default function Auth(beforeLogin = false) {

  if(beforeLogin && localStorage.getItem('isAdminLoggedIn') === null){
    return false;
  }

  if(localStorage.getItem('isAdminLoggedIn') === null){
    window.location.href = "/admin/login";
  }
  else{
    return true;
  }
}
