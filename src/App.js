import React, {useEffect, useState} from 'react';
import './App.css';
import {useSelector, useDispatch} from "react-redux";
import { Grid, Button, Menu, MenuItem, Select } from "@mui/material"
import SimpleDialogDemo from './components/dialog';
import moment from 'moment';
import CustomizedInputBase from "./components/serach"

const SEARCH_DATA_TABLE = (datas, searchText) => {
  var searchInfo = searchText.trim().toUpperCase();
  var dataSearch = [];
  if (searchInfo != "") {
      for (var i in datas) {
          var textFound = [];
          var info = datas[i];
          for (var j in info) {
              var thisText = info[j];
              if (j == "id" || j == "ID") {
                  continue;
              }
              if (thisText != null || thisText instanceof Array){
                  if (thisText.toString().toUpperCase().includes(searchInfo) == false) {
                      if(thisText.length > 0){
                          for(var k in thisText){
                              var newInfo = thisText[k]
                              for(var l in newInfo){
                                  var newText = newInfo[l]
                                  if(newText !== null){
                                      if (newText.toString().toUpperCase().includes(searchInfo) == false) {
                                          textFound.push("0");
                                      } else {
                                          textFound.push("1");
                                      }
                                  }
                              }
                          }
                      }
                  } else {
                      textFound.push("1");
                  }
              } else {
                  textFound.push("0");
              }
          }
          if (textFound.indexOf("1") == -1) {
              continue;
          }
          dataSearch.push(info);
      }
  } else {
      dataSearch = datas;
  }
  return dataSearch;
}

export default function App() {
  const dispatch= useDispatch()
  const [dataBarang, setDataBarang] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [dataImage, setDataImage] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sort, setSort] = useState(0)
  const data = useSelector((state) => state.globalReducer.data)
  const open = Boolean(anchorEl);

  const handleClick = (event, res) => {
    setDataImage(res)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDelete = (val) => {
    setAnchorEl(false)
    let newData = [...data]
    setTimeout(() => {
      dispatch({type: "ADD_DATA", payload: newData.filter(res => res.id !== dataImage.id)})
    }, 300);
  }

  const handleSearch = (e) => {
    setDataBarang(SEARCH_DATA_TABLE(data, e))
  }

  useEffect(() => {
    setDataBarang(data)
  }, [data])

  const handleSort = (e) => {
    setSort(e.target.value)
    let newData = [...data]
    if(e.target.value === 0){
      newData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      newData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    dispatch({type: "ADD_DATA", payload: newData})
  }

  return (
    <div className='App'>
      {openModal && 
        <SimpleDialogDemo open={openModal}
          close={() => {
            setDataImage(null)
            setOpenModal(false)
          }}
          data={dataImage}
        />
      }
      <div className='container'>
        <h1>My Product</h1>
        <div style={{textAlign : "right"}}>
          <CustomizedInputBase change={(e) => handleSearch(e)}/>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Age"
            onChange={handleSort}
          >
            <MenuItem value={0}>Latest</MenuItem>
            <MenuItem value={1}>Oldest</MenuItem>
          </Select>
        </div>
        <hr />
        <Button onClick={() => {
          setDataImage(null)
          setOpenModal(true)
        }}>ADD DATA</Button>
        <Grid container spacing={2} className='content'>
          {dataBarang.map((res, i) => {
            const newDate = new Date(res.date)
            return (
              <Grid item key={i} xs={12} sm={3}>
                <div className='item'>
                    <Button className='button' onClick={(e) => handleClick(e, res)}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </Button>
                    <img src={res.image}/>
                    <div className="words">
                      <h2 style={{margin: 0}}>{res.name}</h2>
                      <p>{res.description}</p>
                      <p style={{textAlign : "left", fontSize: "12px", color: "gray"}}>{moment(newDate).fromNow()}</p>
                    </div>
                </div>
              </Grid>
            )
          })}
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => {
                setAnchorEl(false)
                setOpenModal(true)
              }}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Grid>
      </div> 
    </div>
  );
}
