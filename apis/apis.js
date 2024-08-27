import axios from 'axios'
const URL = 'https://65e4b9363070132b3b253272.mockapi.io/users'


//get api 
const userdata = async ()=>{
    try{
        const res = await  axios.get(URL);
        return res.data;
    }catch(e){
        console.log(e);
    }
}


// add user 

const AddUser = async (newuser) =>{
    try{
        const res = await axios.post(URL, newuser);
        return res.data;
    }catch(e){
        console.log(e)
    }
}
// edit user

const EditUser = async(updateduser)=>{
    try{
        const res = await axios.put(`${URL}/${updateduser.id}`, updateduser);
        return res.data;
    }catch(e){
        console.log(e)
    }
}

//delete api

const DeleteUser = async (userid)=>{
    try{
        await axios.delete(`${URL}/${userid}`);
    }catch(e){
        console.log(e)
    }
}

export {userdata, AddUser, EditUser, DeleteUser};