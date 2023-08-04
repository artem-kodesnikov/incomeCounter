import { Box, Button, Container, Paper, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './index.css';
import { Formik } from 'formik';
import { months } from './values/month';
import { format } from 'date-fns';
import { IncomeTable } from './components/Table/Table';
import { Income } from './types/income.type';
import { NewIncomeForm } from './components/NewIncomeForm/NewIncomeForm';
import { createNewIncome, getIncome } from './utils/requests/request';
import { Loader } from './components/Loader/Loader';
import { theme } from './themes/font';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function App() {

  const currentDate = new Date();
  const day = currentDate.getDate();
  const formattedDay = day < 10 ? day.toString() : format(currentDate, 'dd');
  const formattedMonth = format(currentDate, 'MM');
  const formattedDayOfWeek = format(currentDate, 'EEEE');
  const currentMonth = months.find((month) => month.id === formattedMonth)?.value;

  const [data, setData] = useState<Income[]>([]);
  const [existMonth, setIsExistMonth] = useState<(string)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(currentMonth || '');
  const filteredData = selectedMonth ? data.filter((income) => income.month === selectedMonth) : data;

  const initialValues = {
    _id: '',
    day: formattedDayOfWeek,
    dayNumber: formattedDay,
    month: currentMonth || '',
    hours: 8,
    comment: ''
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const income = await getIncome();
      setData(income.data)
    } catch (error) {
      console.error('Error fetching income:', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const uniqueMonthsSet = new Set(data.map((income) => income.month));
    const uniqueMonthsArray = Array.from(uniqueMonthsSet);
    setIsExistMonth(uniqueMonthsArray);
  }, [data]);

  const handlePreviousMonth = () => {
    const currentIndex = existMonth.findIndex((month) => month === selectedMonth);
    const previousIndex = (currentIndex - 1 + existMonth.length) % existMonth.length;
    setSelectedMonth(existMonth[previousIndex]);
  };

  const handleNextMonth = () => {
    const currentIndex = existMonth.findIndex((month) => month === selectedMonth);
    const nextIndex = (currentIndex + 1) % existMonth.length;
    setSelectedMonth(existMonth[nextIndex]);
  };

  const handleAddIncome = async (income: Income) => {
    setIsLoading(true)
    try {
      await createNewIncome(income);
      fetchData();
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Loader isLoading={isLoading} />
        <Container maxWidth="xl" sx={{ height: '100vh', padding: 5, display: 'flex', gap: '20px' }}>
          <Box>
            <Paper elevation={3} sx={{ width: '300px', height: 'fit-content', p: 2, mb: 2 }}>
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  handleAddIncome(values)
                }}
              >
                <NewIncomeForm />
              </Formik>
            </Paper>
            <Paper elevation={3} sx={{ width: '300px', height: 'fit-content', p: 2 }}>
              <Typography sx={{ textAlign: 'center', mb: 1 }}>Filter by month:</Typography>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Button variant='contained' onClick={handlePreviousMonth}>
                  <NavigateBeforeIcon />
                </Button>
                <Typography>
                  {selectedMonth}
                </Typography>
                <Button variant='contained' onClick={handleNextMonth}>
                  <NavigateNextIcon />
                </Button>
              </Box>
            </Paper>
          </Box>
          <IncomeTable
            fetchData={fetchData}
            setIsLoading={setIsLoading}
            data={filteredData}
          />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
