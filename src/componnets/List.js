import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, DeleteData, InsertData, EditeData, UpdateData } from '../Redux/Reducer'

const List = () => {
    const [projectname, setProjectName] = useState("")
    const [status, setStatus] = useState("")
    const [id, setId] = useState("")
    const dispatch = useDispatch()
    const list = useSelector((state) => state?.list?.data)
    const getBuId = useSelector((state) => state.list.getByData)

    useEffect(() => {
        if (getBuId) {
            setProjectName(getBuId.ProjectName)
            setStatus(getBuId.Status)
            setId(getBuId.Id)
        }
    }, [getBuId])
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    const handleDelete = async (id) => {
        dispatch(DeleteData(id))
    }
    const handleSubmit = () => {
        dispatch(InsertData({ projectname, status }))
    }
    const handleEdit = (id) => {
        dispatch(EditeData(id))
    }
    const handleUpdate = () => {
        dispatch(UpdateData({ projectname, status,id }))
    }
    return (
        <div>
            {/* <button onClick={() => { dispatch(fetchData()) }}>GET DATA</button> */}
            <div>
                <label>ProjectName</label>
                <input type='text' value={projectname} onChange={(event) => { setProjectName(event.target.value) }} />
            </div>
            <div>
                <label>Status</label>
                <input type='text' value={status} onChange={(event) => { setStatus(event.target.value) }} />
            </div>
            <div>

                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleUpdate}>Update</button>
            </div>
            <table>
                <tr>
                    <td>ProjectName</td>
                    <td>Status</td>
                </tr>
                {
                    list?.map((display) => {
                        return (
                            <tr >
                                <td>{display.ProjectName}</td>
                                <td>{display.Description}</td>
                                <td><button onClick={() => { handleEdit(display.Id) }}>EDIT</button></td>
                                <td><button onClick={() => { handleDelete(display.Id) }}>DELETE</button></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default List