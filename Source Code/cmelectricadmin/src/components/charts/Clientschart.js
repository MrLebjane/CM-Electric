import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import '../../assets/css/Overview.css';
import axios from 'axios';

const AppointmentsChart = () => {
  const [customers, setCustomers] = useState([]);
  const [monthToCount, setMonthToCount] = useState('10');
  const [yearToCount, setYearToCount] = useState('2023');
  const [dates, setDate] = useState([]);
  const [grandTotal, setGrandTotal] = useState(null);

  const getTotalClientsForMonthYear = (data, targetMonth, targetYear) => {
    const filteredEntries = data.filter(entry => {
      const entryDate = new Date(entry.dateAdded); // Assuming 'dateAdded' is the property in your data
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth() + 1;
      return entryMonth === targetMonth && entryYear === targetYear;
    });
    return filteredEntries.length;
  };

  useEffect(() => {
    let _grandTotal = 0;
    axios
      .get('http://localhost:8080/getclients', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(response => {
        if (response.data !== null) {
          const newDates = [...dates];
          const newCustomers = [...customers];
          let startMonth = parseInt(monthToCount) + 1;
          let startYear = yearToCount - 1;
          if (monthToCount === '12') {
            startMonth = 1;
            startYear = yearToCount;
          }
          for (let i = 0; i < 12; i++) {
            newDates[i] = startMonth + '-' + startYear;
            newCustomers[i] = getTotalClientsForMonthYear(response.data, startMonth, startYear);
            _grandTotal += newCustomers[i];
            startMonth++;
            if (startMonth > 12) {
              startMonth = 1;
              startYear++;
            }
          }
          setCustomers(newCustomers);
          setDate(newDates);
          setGrandTotal(_grandTotal);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  const seriesLineChart = [
    {
      name: 'Number of Clients',
      data: customers,
    },
  ];

  const optionsLineChart = {
    chart: {
      type: 'area',
      height: 360,
      background: '#FFFFFF',
    },
    xaxis: {
      categories: dates,
      title: {
        text: 'Month-Year',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Clients',
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        color: '#31316A',
      },
    },
    tooltip: {
      fillSeriesColor: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter',
      },
    },
  };

  return (
    <div className="graph">
      <br></br>
      <div>
        <b style={{color:'black'}}>Total Number of Clients: {grandTotal}</b>
      </div>
      <br></br>
      <Chart options={optionsLineChart} series={seriesLineChart} type="area" height={360} />
    </div>
  );
};

export default AppointmentsChart;
