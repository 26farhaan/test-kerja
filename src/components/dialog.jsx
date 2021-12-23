import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import "./dialog.css"
import { TextField, Button } from '@mui/material/';
import {useSelector, useDispatch} from "react-redux";

function SimpleDialog(props) {
    const dataState = useSelector((state) => state.globalReducer.data)
    const { onClose, selectedValue, open, data } = props;
    const dispatch = useDispatch()
    const initialState = {
        id : null,
        name : "",
        description : "",
        image :null,
        date : new Date()

    }
    const [dataUpload, setDataUpload] = useState(props.data || initialState)

    const handleClose = () => {
    onClose(selectedValue);
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setDataUpload({...dataUpload, image : URL.createObjectURL(event.target.files[0])})
        }
    }

    const handleUpload = () => {
        props.close()
        let newData = [...dataState]
        let index = null
        setTimeout(() => {
            if(dataUpload.id !== null){
                newData.map((res, i) => {
                    if(res.id === dataUpload.id){
                        index = i
                    }
                })
                newData[index] = dataUpload
            } else {
                newData.push({...dataUpload, id : Math.floor(Math.random()*90000) + 10000})
            }
            dispatch({type: "ADD_DATA", payload: newData})
        }, 300);
    }

    return (
        <Dialog onClose={handleClose} open={open} maxWidth={"sm"} fullWidth>
            <div className='dialog'>
                <TextField
                    value={dataUpload.name}
                    id="outlined-basic" label="Nama Barang" variant="outlined" style={{width: "100%"}}
                    onChange={(e) => setDataUpload({...dataUpload, name : e.target.value})}
                />
                <TextField 
                    value={dataUpload.description}
                    id="outlined-basic" label="Deskripsi" variant="outlined" style={{width: "100%", marginTop: "10px"}}
                    onChange={(e) => setDataUpload({...dataUpload, description : e.target.value})}
                />
                <div style={{marginTop: "20px", marginBottom: "10px", alignItems: "center", display: "flex"}}>
                    <input type="file"
                        onChange={onImageChange}
                    />
                    <img src={dataUpload.image} alt="" style={{width: "100px", marginLeft: "20px"}}/>
                </div>
                <Button variant='contained' onClick={handleUpload}>Upload</Button>
            </div>
        </Dialog>
    );
}

export default function SimpleDialogDemo(props) {
    console.log(props)

  const handleClose = (value) => {
    props.close()
  };

  return (
    <div>
      <SimpleDialog
        open={props.open}
        onClose={handleClose}
        data={props.data}
        close={props.close}
      />
    </div>
  );
}