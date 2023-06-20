import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Income } from '../../types/income.type';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Icon } from '@mui/material';
import { deleteIncome } from '../../utils/requests/request';

type Props = {
  data: Income[],
  setIsLoading: (val: boolean) => void,
  fetchData: () => void
}

export const IncomeTable: FC<Props> = ({ data, setIsLoading, fetchData }) => {
  const incomePerHour = 75
  const totalHours = data.reduce((acc, val) => acc += val.hours, 0)
  const totalIncome = data.reduce((acc, val) => acc += (val.hours * incomePerHour), 0)

  const handleDelete = async (_id: string) => {
    setIsLoading(true);
    try {
      await deleteIncome(_id);
      fetchData()
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Hours</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Income</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dayNumber} {row.month} - {row.day}
              </TableCell>
              <TableCell align="right">{row.hours}</TableCell>
              <TableCell align="right">{+row.dayNumber <= 15 ? 'Advance' : 'Salary'}</TableCell>
              <TableCell align="right">
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}>
                  {row.hours * incomePerHour}
                  <Icon
                    sx={{
                      '&:hover': {
                        color: 'red',
                        cursor: 'pointer'
                      }
                    }}
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteIcon fontSize='medium' />
                  </Icon>
                </Box>
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ backgroundColor: '#019a01' }}>
            <TableCell sx={{ fontWeight: 500 }} component="th" scope="row">
              Total
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">{totalHours}</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">{totalIncome}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer >
  );
}