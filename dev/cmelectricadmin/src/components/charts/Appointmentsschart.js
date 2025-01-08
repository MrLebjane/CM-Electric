import React,{useEffect,useState} from 'react';
import Chart from 'react-apexcharts';
import '../../assets/css/Overview.css';
import axios from 'axios';

const Appointmentsschart = () => {

  const [customers, setCustomers] = useState([]);
  const [monthToCount, setMonthToCount] = useState('10');
  const [yearToCount, setYearToCount] = useState('2023');
  const [dates,setDate]=useState([]);
  const [grandtotal,setGrandTotal]=useState()
 
  const gettotalclients=(data,month,year)=>{
    const filteredEntries=data.filter(entry => {
      const entryDate = new Date(entry.appointmentDate); // Assuming 'dateAdded' is the property in your data
      const entryYear = entryDate.getFullYear();
      console.log(entryYear);
      const entryMonth = (entryDate.getMonth() + 1);
      return (entryMonth == month && entryYear==year);
    });
    return (filteredEntries.length);
  };

  useEffect(() => {
    let _grandTotal=0;
    axios.get('http://localhost:8080/getallbookings', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
    
      // setCustomers(response.data);
      if(response.data!==null){
        const newDates = [...dates];
      const newCustomers = [...customers];
      let startMonth=parseInt(monthToCount)+1
        let startYear=yearToCount-1
        if(monthToCount==12){
          startMonth=1
          startYear=yearToCount
        }
      for (let i = 0; i < 12; i++) {
        
        newDates[i]=startMonth+"-"+startYear
        newCustomers[i]=gettotalclients(response.data,startMonth,startYear)
        _grandTotal+=newCustomers[i]
        startMonth++
        if(startMonth>12){
          startMonth=1
          startYear++
        }
        // console.log(gettotalclients(response.data,monthToCount,yearToCount))
      }
      setCustomers(newCustomers)
      setDate(newDates)
      setGrandTotal(_grandTotal)
      console.log(gettotalclients(response.data,monthToCount,yearToCount))
      }
    })
    .catch(error => {
      console.log(error.message);
    });
  }, []);

    const seriesLineChart = [{
        name: 'Appointments',
        data: customers
      }];
    
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
            text: 'Number of Appointments',
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
          <div ClassName="graph">
            <br></br>
            <div>
              <b>Total Number of Appointments:{grandtotal}</b>
            </div>
            <br></br>
          <Chart
            options={optionsLineChart}
            series={seriesLineChart}
            type="area"
            height={360}
          />
          </div>
      );
    };
    
    export default Appointmentsschart;