import React, { useEffect, useState } from 'react'
import ProCommon from './ProCommon'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, updateProfile } from '../../action/userAction';
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_RESET } from '../../constant/userConstant';

const ProEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, isAuthenticated,user } = useSelector((state) => state.user)
    const { isUpdated} = useSelector((state) => state.profile)
    // console.log(user)
    // console.log(isAuthenticated)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile:'',
        instagram:'',
        facebook:'',
        twitter:'',
        linkedIn:'',
        portfolio:'',
        youtube:''
    })
    const [image, setImage] = useState("")

    const handleChange = (e)=>{
        if(e.target.name==="image"){
            setImage(e.target.files[0].name)
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // formData.image=image
        // console.log(formData)
        formData.image=image
        dispatch(updateProfile(formData))
        setFormData({
            name:  '',
            email: '',
            mobile: '',
            instagram:'',
            facebook: '',
            twitter: '',
            linkedIn: '',
            portfolio: '',
            youtube: ''
        });
    }


    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/admin/login");
        }else if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                mobile: user.mobile || '',
                instagram: user.instagram || '',
                facebook: user.facebook || '',
                twitter: user.twitter || '',
                linkedIn: user.linkedIn || '',
                portfolio: user.portfolio || '',
                youtube: user.youtube || ''
            });
        }
        if(isUpdated){
            toast.success("Profile updated successfully")
            // dispatch(loadUser());
            dispatch({type:UPDATE_PROFILE_RESET})
        }
      }, [isAuthenticated,isUpdated]);

    return (
        <>
            <div className="profile_container">
                <ProCommon />
            </div>
            <div className="edit_form">
                <Box
                    onSubmit={handleSubmit}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '30ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" name="name" value={formData.name} label="Name" variant="outlined" onChange={handleChange}/>
                    <TextField id="outlined-basic" name="email" disabled value={formData.email} sx={{width:"100%"}} label="Email" variant="outlined" onChange={handleChange} />
                    <TextField id="outlined-basic" name="mobile" value={formData.mobile} label="Number" variant="outlined"  onChange={handleChange}/>
                    <TextField id="outlined-basic" name="linkedIn" value={formData.linkedIn} label="linkedin" variant="outlined" onChange={handleChange}/>
                    <TextField id="outlined-basic" name="youtube" value={formData.youtube} label="youtube" variant="outlined" onChange={handleChange}/>
                    <TextField id="outlined-basic" name="facebook" value={formData.facebook} label="facebook" variant="outlined" onChange={handleChange}/>
                    <TextField id="outlined-basic" name="twitter" value={formData.twitter} label="twitter" variant="outlined" onChange={handleChange}/>
                    <TextField id="outlined-basic" name="instagram" value={formData.instagram} label="instagram" variant="outlined" onChange={handleChange}/>
                    <TextField id="outlined-basic" name="portfolio" value={formData.portfolio} label="portfolio" variant="outlined" onChange={handleChange}/>
                    <input type="file" name="image" onChange={handleChange} />
                    <button type='submit'>Save Changes</button>
                </Box>
            </div>
        </>
    )
}

export default ProEdit