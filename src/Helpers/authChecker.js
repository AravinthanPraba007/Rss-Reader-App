
export default (history) => {
    if(!localStorage.token){
        history.push('/login');
    }
}



