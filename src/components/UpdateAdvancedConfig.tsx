import React, { useEffect, useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { AdvancedConfig } from './Settings';
import axiosInstance from '../appConfig/axiosConfig';

export const UpdateAdvancedConfig = () => {
    const [config, setConfig] = useState<AdvancedConfig>({
      cors_allowed_origins: [""],
      jwt_expiry_time:  0,
      refresh_token_enabled: false,
      refresh_token_expiry_time:  0,
      allow_jwt_custom_claims:  false,
      use_additional_properties: false,
    });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const handleSave = async() =>{

        try {
          const res = await axiosInstance.put("/config",{...config})
          console.log(res.data)
          setConfig({...res.data});
        } catch (error) {
          console.error(error)
        }
      
        } 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let newValue: string|number|boolean = value;
    if(type === 'checkbox') newValue = checked;
    if(type=== 'number') newValue = parseInt(value, 10)
    setConfig({
      ...config,
      [name]: newValue
    });
  };
  const getClientConfig=async()=>{
    try {
      
      const result = await axiosInstance.get('/config')
      if(result.data){
        setConfig({...result.data});
      }
    } catch (error) {
      console.error('error generating apn')
    }
  }

  useEffect(()=>{
    getClientConfig()
  },[])

  return (
    <Box sx={{maxWidth:"36.5rem", display:"flex", flexDirection: "column", alignItems:"flex-start", marginTop:'4rem'}}>

      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="CORS Allowed Origins"
              variant="outlined"
              name="corsAllowedOrigins"
              value={config.corsAllowedOrigins.join(',')}
              onChange={(e) =>
                setConfig({
                  ...config,
                  corsAllowedOrigins: e.target.value.split(','),
                })
              }
              placeholder="Enter origins separated by commas"
            />
          </Grid> */}
        <Grid item xs={12}  sx={{display:"flex", alignItems:"flex-start"}}>
        <FormControlLabel
            control={
            <Checkbox
                checked={config?.use_additional_properties}
                onChange={handleChange}
                name="use_additional_properties"
            />
            }
            label="Use Additional Profile Properties"
        />
          </Grid>
          <Grid item xs={12} sx={{display:"flex", alignItems:"flex-start"}}>
            <TextField
              fullWidth
              label="JWT Expiry Time (in seconds)"
              variant="outlined"
              inputProps={{ max: 1800 }}
              type="number"
              name="jwt_expiry_time"
              value={config?.jwt_expiry_time}
              onChange={handleChange}
              error = {+config?.jwt_expiry_time > 1800}
              helperText={+config?.jwt_expiry_time > 1800 && "Value should be less than 1800 or equal to 1800"}
            />
          </Grid>
          <Grid item xs={12} sx={{display:"flex", alignItems:"flex-start"}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={config.refresh_token_enabled}
                  onChange={handleChange}
                  name="refresh_token_enabled"
                />
              }
              label="Use Refresh Token"
            />
          </Grid>
          {config.refresh_token_enabled && (
            <Grid item xs={12} sx={{display:"flex", alignItems:"flex-start"}}>
              <TextField
                fullWidth
                label="Refresh Token Expiry Time (in seconds)"
                variant="outlined"
                type="number"
                name="refresh_token_expiry_time"
                value={config.refresh_token_expiry_time}
                onChange={handleChange}
                error = {( config?.jwt_expiry_time >= (config?.refresh_token_expiry_time as number)  )}
                helperText={(config.refresh_token_expiry_time && (+config?.refresh_token_expiry_time < +config?.jwt_expiry_time )) && "Refresh token expiry should be more than login token expiry"}
              />
            </Grid>
          )}
          <Grid item xs={12} sx={{display:"flex", alignItems:"flex-start"}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={config.allow_jwt_custom_claims}
                  onChange={handleChange}
                  name="allow_jwt_custom_claims"
                />
              }
              label="Use JWT Custom Claims"
            />
          </Grid>
          <Grid item xs={12}>
            <Button sx={{padding:"1rem 4rem", marginBottom:"5rem"}} variant="contained" color="primary" onClick={handleSave} disabled={config.jwt_expiry_time > 1800}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateAdvancedConfig;
