import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axiosInstance from '../appConfig/axiosConfig';
import  { UpdateAdvancedConfig } from './UpdateAdvancedConfig';



const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  alert('APN copied to clipboard');
};

export interface AdvancedConfig {
  cors_allowed_origins: string[];
  jwt_expiry_time: number;
  refresh_token_enabled: boolean;
  refresh_token_expiry_time?: number;
  allow_jwt_custom_claims: boolean;
  use_additional_properties: boolean;
}


const Settings: React.FC = () => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [apn, setApn] = useState(''); // Replace with actual APN
  const [passwords, setPasswords] = useState({oldPassword:'', newPassword: ''}); 

  const handleGenerateAPN = async() => {
    try {
      
      const result = await axiosInstance.post('/generate-apn')
      if(result.data.apn){
        setApn(result.data.apn);
      }
    } catch (error) {
      console.error('error generating apn')
    }
  };

  const getClientApn=async()=>{
    try {
      
      const result = await axiosInstance.get('/client-apn')
      if(result.data.apn){
        setApn(result.data.apn);
      }
    } catch (error) {
      console.error('error generating apn')
    }
  }


  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleSavePassword = async() => {
    try {
      await axiosInstance.post('/update-password', {
        new_password: passwords.newPassword,
        old_password: passwords.newPassword
      })
      setIsEditingPassword(false);
      
    } catch (error) {
      console.error(error)
    }
  };

  const handlePasswordChange = (name: string, value: string)=>{
    setPasswords({...passwords,[name]: value})
  }

  const handleCancelPasswordEdit = () => {
    setIsEditingPassword(false);
    setPasswords({oldPassword:"", newPassword:""})
  };



  useEffect(()=>{
    getClientApn()
  },[])

  return (
    <Box sx={{ width: 1200, margin: '0 auto', padding: 2 }}>
      <Box sx={{display:"flex", flexDirection:"column", justifyItems:"flex-start",rowGap:"20px"}}>
        <Box sx={{display:"flex"}}>
          <Typography variant="h6" sx={{borderBottom: "solid 1px", textAlign:"left", flexBasis:"20%"}}>APN:</Typography>
          <Typography variant="h6" sx={{borderBottom: "solid 1px", textAlign:"left", flexBasis:"40%"}}>{apn}</Typography>
          <IconButton onClick={() => copyToClipboard(apn)} color="primary" aria-label="copy apn" sx={{ mr: 1 }}>
            <FileCopyIcon />
          </IconButton>
        </Box>
        <Box sx={{alignSelf:"flex-start"}}>
        <Button onClick={handleGenerateAPN} variant="contained" color="primary" startIcon={<RefreshIcon />}>
            Generate New APN
          </Button>
        </Box>
      </Box>
      <Box sx={{display:"flex", flexDirection:"column", justifyItems:"flex-start",rowGap:"20px"}}>
        <Box sx={{display:"flex", justifyItems:"flex-start",rowGap:"20px", marginTop:"4rem"}}>
          <Typography variant="h6" sx={{borderBottom: "solid 1px", textAlign:"left", flexBasis:"20%"}}>Password:</Typography>
          <Typography variant="h6" sx={{borderBottom: "solid 1px", justifySelf:"center", flexBasis:"40%"}}>********</Typography>
        </Box>
          {!isEditingPassword ? (
            <Button onClick={handleEditPassword} variant="contained" color="primary" sx={{width:"13.1rem"}} startIcon={<EditIcon />}>
              Change Password
            </Button>
          ) : null}
        {isEditingPassword &&<Box sx={{flexBasis:"20%", maxWidth:"36.5rem"}}>
          <TextField
            type="password"
            label="Old Password"
            variant="outlined"
            size="small"
            name='oldPassword'
            value={passwords.oldPassword}
            onChange={(e) => handlePasswordChange(e.target.name, e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            size="small"
            name='newPassword'
            value={passwords.newPassword}
            onChange={(e) => handlePasswordChange(e.target.name, e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
      </Box>}
      {isEditingPassword && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
          <Button onClick={handleSavePassword} variant="contained" color="primary" startIcon={<SaveIcon />} sx={{ mr: 1 }}>
            Save Password
          </Button>
          <Button onClick={handleCancelPasswordEdit} variant="outlined" color="primary" startIcon={<CancelIcon />}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
    <Box>
      <UpdateAdvancedConfig/>
    </Box>

    </Box>
  );
};

export default Settings;
