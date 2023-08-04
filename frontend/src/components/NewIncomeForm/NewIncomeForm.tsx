import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Field, useFormikContext } from 'formik';
import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material';
import { days, dayNumbers } from '../../values/days';
import { months } from '../../values/month';
import { format, parse } from 'date-fns';
import { red } from '@mui/material/colors';

type FormValues = {
  day: string;
  dayNumber: string;
  month: string;
  hours: string;
  comment?: string;
};


export const NewIncomeForm = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const [isChecked, setIsChecked] = useState(false);

  const handleDayNumberChange = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedDayNumber = event.target.value as string;
    setFieldValue('dayNumber', selectedDayNumber);
  };

  const handleCheckbox = () => {
    if (isChecked) {
      setFieldValue('comment', '');
      setFieldValue('hours', 8);
    } else {
      setFieldValue('hours', 0);
    }
    setIsChecked(!isChecked)
  }

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
      />
      <FormControlLabel
        label="Did you miss a day?"
        control={
          <Checkbox
            defaultChecked
            checked={isChecked}
            onChange={handleCheckbox}
            sx={{
              justifyContent: 'start',
              width: 'fit-content',
              color: red[800],
              '&.Mui-checked': {
                color: red[600],
              },
            }}
          />}
      />
      {isChecked &&
        <Field
          as={TextField}
          name="comment"
          label="Comment"
          variant="outlined"
          fullWidth
          margin="normal"
        />
      }
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Form>
  )
}