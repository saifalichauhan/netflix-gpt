export const checkValidData = (email,password,name) =>{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
    // const isnameValid = /^[A-Za-z]+\s[A-Za-z]+$/.test(name);

    if(!isEmailValid)return"Email ID  is not valid";
    if(!isPasswordValid)return "password  is not valid";
    // if(!isnameValid)return"Name is not valid";

    return null;


}
