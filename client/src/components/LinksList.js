import React, {useCallback, useContext, useState} from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const LinksList = ({links}) => {
    const [updatedLinks, setUpdatedLinks] = useState(links)
    const message = useMessage()
    const {token} = useContext(AuthContext)
    const {request} = useHttp()

    const handleUpdateLinks = useCallback((id) => {
        console.log(links)
        let newLinks = links.filter((link) => link._id !== id)
        console.log(newLinks)
        setUpdatedLinks(newLinks)
    }, [links])

    const handleDelete = useCallback(async (id) => {
        try {
            const data = await request('/api/link/delete', 'DELETE', {id: id},
                {Authorization: `Bearer ${token}`})
            message(data.message)
        } catch (e) { }
        handleUpdateLinks(id)
    }, [token, message, request, handleUpdateLinks])

    if (!links.length) {
        return <p className='center'>No urls</p>
    }

    console.log(updatedLinks)

    return (
        <table>
            <thead>
            <tr>
                <th>Num</th>
                <th>Original url</th>
                <th>Short url</th>
                <th>Open</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {updatedLinks.length !== 0 && updatedLinks.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                        <td>
                            <button
                                onClick={() => handleDelete(link._id)}
                                className="waves-effect waves-light btn-small red">
                                button
                            </button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}