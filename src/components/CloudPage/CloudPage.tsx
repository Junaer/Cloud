import { BaseSyntheticEvent, useState, useEffect } from 'react'
import './CloudPage.css'
import Description from '../Description/Description'
import { useNavigate } from 'react-router-dom'
import { IDescription, IProps } from '../Description/type'
import { RootState } from "@reduxjs/toolkit/query"
import { useSelector, useDispatch } from 'react-redux'
import { fetchGet } from '../_rtk/slices/filesSlice'
import { jwtDecode } from "jwt-decode";



export default function CloudPage() {
    const navigate = useNavigate();
    const data = useSelector((state: RootState) => state.files.data)
    const dispatch = useDispatch()
    // const jwtToken = localStorage.getItem('token')
    let token = jwtDecode(localStorage.getItem('token'))
    console.log(token)
    
    

    useEffect(() => {
        dispatch(fetchGet())
    }, [])

    
    
    const listItems = data.map(el => {
        return (<Description data={el} key={el.id} />)
    })

    function handleLogout(element: BaseSyntheticEvent) {
        localStorage.clear()
        return navigate("/");
    }

    

    return (
        <>
            <div className='work_space'>
                <span className='work_space_files_title'>
                    <p>Files</p>
                    {listItems}
                </span>
            </div>
            <div className='work_menu'>
                <span className='work_menu_user_name'>{token.username}</span>
                <button className='work_menu_logout_button' onClick={handleLogout}>Logout</button>
            </div>
        </>        
    )
    }
