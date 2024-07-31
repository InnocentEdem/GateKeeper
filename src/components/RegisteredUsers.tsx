import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../appConfig/axiosConfig';


interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

const RegisteredUsers: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Set initial rows per page to 10
  const [users, setUsers] = useState<User[]>([])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async(user: User) => {
    try {
      await axiosInstance.post('/delete-user',{user_id: user.id})
      getUsers()
    } catch (error) {
      console.error("error deleting user")
    }
  };

  const getUsers = async()=>{
    try{

      const response = await axiosInstance.get<User[]>('/all-users')
      setUsers(response.data || [])
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <Paper sx={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
      {!!users?.length && 
      <TableContainer >
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Serial No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={user.email}>
                <TableCell sx={{ fontSize: '1rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{user.firstname}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{user.lastname}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(user)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      {!!users?.length && 
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
      {!users?.length && 
      <Typography sx={{padding: "1rem"}}>
        You have not registered any user yet!
      </Typography>}
    </Paper>
  );
};

export default RegisteredUsers;

