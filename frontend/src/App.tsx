import { Container, Paper, ThemeProvider } from '@mui/material';
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




function App() {

  const currentDate = new Date();
  const formattedDay = format(currentDate, 'dd');
  const formattedMonth = format(currentDate, 'MM');
  const formattedDayOfWeek = format(currentDate, 'EEEE');

  const [data, setData] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data)

  const initialValues = {
    _id: '',
    day: formattedDayOfWeek,
    dayNumber: formattedDay,
    month: months.find((month) => month.id === formattedMonth)?.value,
    hours: 8,
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
          <Paper elevation={3} sx={{ width: '300px', height: 'fit-content', p: 2 }}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values)
                handleAddIncome(values)
              }}
            >
              <NewIncomeForm />
            </Formik>
          </Paper>
          <IncomeTable
            fetchData={fetchData}
            setIsLoading={setIsLoading}
            data={data}
          />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
