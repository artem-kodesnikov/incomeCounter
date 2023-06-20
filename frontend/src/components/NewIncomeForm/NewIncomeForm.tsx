import React, { ChangeEvent, useEffect } from 'react';
import { Form, Field, useFormikContext } from 'formik';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { days, dayNumbers } from '../../values/days';
import { months } from '../../values/month';
import { format, parse } from 'date-fns';

type FormValues = {
  day: string;
  dayNumber: string;
  month: string;
  hours: string;
};


export const NewIncomeForm = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();


  const handleDayNumberChange = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedDayNumber = event.target.value as string;
    setFieldValue('dayNumber', selectedDayNumber);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const selectedDate = parse(
      `${currentMonth + 1}-${values.dayNumber}-${currentYear}`,
      'MM-dd-yyyy',
      new Date()
    );
    const formattedDay = format(selectedDate, 'EEEE');
    setFieldValue('day', formattedDay);
  }, [values.dayNumber, setFieldValue]);


  return (
    <Form style={{ display: 'flex', flexDirection: 'column' }}>
      <Field
        as={TextField}
        select
        name="day"
        label="Day"
        sx={{ mb: 3 }}
      >
        {days.map((day) =>
          <MenuItem value={day.value}>
            {day.value}
          </MenuItem>
        )}
      </Field>
      <Box sx={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'row-reverse'
      }}>
        <Field
          as={TextField}
          select
          name="month"
          label="Month"
          sx={{ flexGrow: 2 }}
        >
          {months.map((month) =>
            <MenuItem key={month.id} value={month.value}>
              {month.value}
            </MenuItem>
          )}
        </Field>
        <Field
          as={TextField}
          select
          name="dayNumber"
          label="Day number"
          sx={{ flexGrow: 1 }}
          onChange={handleDayNumberChange}
        >
          {dayNumbers.map((number) =>
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          )}
        </Field>
      </Box>
      <Field
        as={TextField}
        name="hours"
        label="Hours"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ mb: 3 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Form>
  )
}