// Input.js
import React, { useEffect, useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import { isValidURL } from '../utils/validURL';

const Input = ({ index, value, onChange, removeOrigin }:{index: number, value: string, onChange: (value: string, index: number)=>void, removeOrigin: ( index: number)=>void }) => {
    const [newValue, setNewValue] = useState('')
    const [editMode, setEditMode] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setNewValue(event.target.value)
    }

    const handleBlur=()=>{
        const trimmedValue: string = newValue.trim()
        if(trimmedValue){
            setEditMode(false)
        }
        onChange(newValue, index)
    }

    const handleActivateEditMode=()=>{
        setEditMode(true)
    }

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.stopPropagation()
        removeOrigin(index)
    }

    useEffect(()=>{
        setNewValue(()=>value)
        if(!value){
            setEditMode(true)
        }
    },[value])
  return (
    <>
    <Typography sx={{width:"2.5rem"}}>{`${index+1}.`}</Typography>
    {editMode ?
    (<TextField
      fullWidth
      variant="outlined"
      name={index.toString()}
      defaultValue={value}
      value={newValue}
      placeholder="https://www.example.com"
      onBlur={handleBlur}
      onChange={handleChange}
      error={ !isValidURL(newValue)}
      helperText={
        !isValidURL(newValue) &&
        "Enter a valid url e.g. http://www.example.com"
      }
      sx={{ width: '90%' }}
    />):
    (<Typography sx={{ width: '90%', textAlign:"left" }} onClick = {handleActivateEditMode}>{newValue}</Typography>)}
    <Box sx={{width:"2.5rem"}}>
        {
        <IconButton  color="secondary" aria-label="copy apn" sx={{ mr: 1 }} onClick = {handleRemove}>
            <RemoveCircle />
        </IconButton>}
    </Box>
    </>
  );
};

export default Input;
