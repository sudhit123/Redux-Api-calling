import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://www.taxfilecrm.taxfile.co.in'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKdGVjaCIsIkdJRCI6IjAxNzc2MjczLTlhYjItNDI0Zi05YzRiLTU0MTFkNzk5MGEzMyIsImp0aSI6IjM3Mzg2MGNjLTc0N2ItNGFlMS04MDkwLTE4ODZhMWE1ZWU2MiIsImlkIjoiNjA0IiwiUmVnaWQiOiI4IiwicGFja2FnZWlkIjoiIiwiY3VzdGlkIjoiSlRFNDY5IiwiZmlyc3RuYW1lIjoianRlY2giLCJsYXN0bmFtZSI6IlB2dCIsIm1vYmlsZSI6IjkxNDQ0NDQ0NDQ0NCIsImVtYWlsIjoiSnRlY2hAZ21haWwuY29tIiwidXNlcm5hbWUiOiJKdGVjaCIsInJvbGUiOiJBZG1pbiIsImxvZ2ludGltZSI6IjAyLTAyLTIwMjQgMTI6NDc6MTMiLCJJUEFkZHJlc3MiOiIxMDMuMjUxLjE5LjcxIiwiZXhwIjoxNzA5MzYzODMzLCJpc3MiOiJodHRwOi8vVGF4ZmlsZUNybUdTVC5jb20iLCJhdWQiOiJodHRwOi8vVGF4ZmlsZUNybUdTVC5jb20ifQ.OaEiMgGLKJU3pvGnsR2Qn_OsZRpJa2hgfP-8tyaGo1Y'

//get API
export const fetchData = createAsyncThunk('fetchData', async () => {
    try {
        const res = await axios.get(URL + `/api/Master/ProjectList?CompanyId=881`, {
            headers: { Authorization: `bearer ${token}` }
        })
        return res.data
    } catch (error) {

    }
})

//Insert API
export const InsertData = createAsyncThunk("InsertData", async (data, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
        const res = await axios.post(URL + '/api/Master/CreateProject', {
            ProjectName: data.projectname,
            Status: data.status,
            CompanyId: 881,
            UserId: 604,
            UserName: 'Jtech',
            IPAddress: '103.251.19.63',
        }, {
            headers: { Authorization: `bearer ${token}` }
        })
        if (res.data.Success == true) {
            dispatch(fetchData())
        }
    } catch (error) {
        console.log(error)
    }
})

//Get By Id API
export const EditeData = createAsyncThunk("EditeData", async (id) => {
    try {
        const res = await axios.get(URL + `/api/Master/ProjectById?Id=${id}`, {
            headers: { Authorization: `bearer ${token}` }
        })
        return res.data
    } catch (error) {

    }
})

//Update Data API
export const UpdateData = createAsyncThunk("Update-data", async (data, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
        const res = await axios.post(URL + '/api/Master/CreateProject', {
            Id: data.id,
            ProjectName: data.projectname,
            Status: data.status,
            CompanyId: 881,
            UserId: 604,
            UserName: 'Jtech',
            IPAddress: '103.251.19.63',
        }, {
            headers: { Authorization: `bearer ${token}` }
        })
        if (res.data.Success == true) {
            dispatch(fetchData())
        }
    } catch (error) {
        console.log(error)
    }
})
//Delete Data
export const DeleteData = createAsyncThunk("DeleteData", async (id, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
        const res = await axios.get(URL + `/api/Master/DeletProject?Id=${id}`, {
            headers: { Authorization: `bearer ${token}` }
        })
        if (res.data.Success == true) {
            dispatch(fetchData());
        }
    } catch (error) {

    }
})
export const apicalled = createSlice({
    name: "api called",
    initialState: {
        data: null,
        getByData: null,
        isloading: false,
        IsError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.isloading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.IsError = action.payload
        })
        builder.addCase(EditeData.fulfilled, (state, action) => {
            state.getByData = action.payload
        })
    }
})

export default apicalled.reducer