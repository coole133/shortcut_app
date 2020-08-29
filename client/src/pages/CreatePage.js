import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'
import {useMessage} from "../hooks/message.hook";

export const CreatePage = () => {
    const message = useMessage()
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async (e) => {
        if (e.key === "Enter") {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link},
                    {Authorization: `Bearer ${auth.token}`})
                message(data.message)
                history.push(`/detail/${data.link._id}`)
                console.log(data)
            } catch (e) {

            }
        }
    }

    return (
        <div className="row">
            <h1>Create Page</h1>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Enter the url"
                        id="link"
                        type="text"
                        onChange={e => setLink(e.target.value)}
                        value={link}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter the url</label>
                </div>
            </div>
        </div>
    )
}