import React, { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Box,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdvancedConfig } from "./Settings";
import axiosInstance from "../appConfig/axiosConfig";
import { useSnackbar } from "../hooks/useSnackbar";

enum AllowOrigins {
  allow_all_origins = "allow_all_origins",
  specify_origins = "specify_origins",
}

export const UpdateAdvancedConfig = () => {
  const [config, setConfig] = useState<AdvancedConfig>({
    cors_allowed_origins: [""],
    jwt_expiry_time: 0,
    refresh_token_enabled: false,
    refresh_token_expiry_time: 0,
    allow_jwt_custom_claims: false,
    use_additional_properties: false,
  });
  const [specifyOrigins, setSpecifyOrigins] = useState(
    AllowOrigins.allow_all_origins
  );
  const { showSnackbar } = useSnackbar();

  const handleSave = async () => {
    const data = processRequestData(config)
    try {
      const res = await axiosInstance.put("/config", { ...data });
      console.log(res.data);
      setConfig({ ...res.data });
      showSnackbar("Saved", "success");
    } catch (error) {
      console.error(error);
    }
  };

  const processRequestData=(data: AdvancedConfig)=>{
    let allowedCors = data.cors_allowed_origins;
    allowedCors = allowedCors.filter((item)=>Boolean(item)===true)
    if(!allowedCors?.length){
      allowedCors = [""]
    }
    return {...data, cors_allowed_origins: allowedCors}
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let newValue: string | number | boolean = value;
    if (type === "checkbox") newValue = checked;
    if (type === "number") newValue = parseInt(value, 10);
    setConfig({
      ...config,
      [name]: newValue,
    });
  };
  const handleAddMore =()=>{
    setConfig({
      ...config,
      cors_allowed_origins:[...config.cors_allowed_origins,""]
    })
  }

  const handleCorsChange = (value: string, index: number) => {
    const corsAllowedOrigins = config.cors_allowed_origins;
    corsAllowedOrigins[index] = value;
    setConfig({ ...config, cors_allowed_origins: corsAllowedOrigins });
  };

  const handleSetCors = (value: AllowOrigins) => {
    console.log(value)
    setSpecifyOrigins(value);
  };
  const getClientConfig = async () => {
    try {
      const result = await axiosInstance.get("/config");
      if (result.data) {
        setConfig({ ...result.data });
        setSpecifyOrigins(
          result.data?.cors_allowed_origins[0]
            ? AllowOrigins.specify_origins
            : AllowOrigins.allow_all_origins
        );
      }
    } catch (error) {
      console.error("error generating apn");
    }
  };

  useEffect(() => {
    getClientConfig();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "36.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "4rem",
      }}
    >
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start" }}>
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
          <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start" }}>
            <TextField
              fullWidth
              label="JWT Expiry Time (in seconds)"
              variant="outlined"
              inputProps={{ max: 1800 }}
              type="number"
              name="jwt_expiry_time"
              value={config?.jwt_expiry_time}
              onChange={handleChange}
              error={+config?.jwt_expiry_time > 1800}
              helperText={
                +config?.jwt_expiry_time > 1800 &&
                "Value should be less than 1800 or equal to 1800"
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start" }}>
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
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              <TextField
                fullWidth
                label="Refresh Token Expiry Time (in seconds)"
                variant="outlined"
                type="number"
                name="refresh_token_expiry_time"
                value={config.refresh_token_expiry_time}
                onChange={handleChange}
                error={
                  config?.jwt_expiry_time >=
                  (config?.refresh_token_expiry_time as number)
                }
                helperText={
                  config.refresh_token_expiry_time &&
                  +config?.refresh_token_expiry_time <
                    +config?.jwt_expiry_time &&
                  "Refresh token expiry should be more than login token expiry"
                }
              />
            </Grid>
          )}
          <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start" }}>
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
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", textAlign: "left", textDecoration:"underline" }}
            >
              Allowed Origins (CORS)
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "left" }}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="options"
                name="options"
                value={specifyOrigins}
                onChange={(e) => handleSetCors(e.target.value as AllowOrigins)}
                row
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <FormControlLabel
                  value={AllowOrigins.allow_all_origins}
                  control={<Radio />}
                  label="Allow All Origins"
                />
                <FormControlLabel
                  value={AllowOrigins.specify_origins}
                  control={<Radio />}
                  label="Specify Origins"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start",flexDirection:"column" }}>
          {config.cors_allowed_origins.length &&
           specifyOrigins===AllowOrigins.specify_origins &&
            config.cors_allowed_origins.map((value, index) => (
              <Box sx={{display:"flex", flexDirection:"row", width:"100%",margin:"0.5rem 0", alignItems:"center"}}>
              <TextField
                fullWidth
                variant="outlined"
                inputProps={{ max: 1800 }}
                type="number"
                name="jwt_expiry_time"
                value={value}
                placeholder="https://www.example.com"
                onChange={(e)=>handleCorsChange(e.target.value, index)}
                sx={{width:"75%"}}
              />
              {
                (index===config.cors_allowed_origins.length-1) && (
                  <Button onClick={handleAddMore} variant="outlined" color="primary" sx={{textWrap:"nowrap", margin:"1rem"}}>Add More</Button>
                )
              }
              </Box>
            ))}
        </Grid>
        <Grid item xs={12} sx={{marginTop:"2rem"}}>
          <Button
            sx={{ padding: "1rem 4rem", marginBottom: "5rem" }}
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={config.jwt_expiry_time > 1800}
          >
            Save
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateAdvancedConfig;
