import React, { useEffect, useState } from 'react';
import Pagination from 'react-hooks-paginator';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
require('dotenv').config();

const useStyles = makeStyles({
  bullet: {
    margin: '0 2px',

    transform: 'scale(0.8)',
    minWidth: 800,
    backgroundColor: 'salmon',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    fontSize: 40,
    justify: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  items: {
    fontSize: 25,
    color: 'black'
  }
});

const Fetch = ({ url }) => {
  const classes = useStyles();
  const pageLimit = 3;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  // Using async directly in the useEffect function isn’t allowed.
  // Let’s implement a workaround, by creating a separate async function.
  /*
    const fetchData = async () => {
      const result = await axios(url);
      setData(result.data.records);
    };
  */
  // use fetch instead of axios
  const getData = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
      });
      const json = await res.json();
      setData(json.records);
    } catch (err) {
      console.log(err);
    }
  };

  // call async function from useEffect
  useEffect(() => {
    getData();
  }, []); // provide an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component.

  useEffect(() => {
    setCurrentData(data.slice(offset, offset + pageLimit));
  }, [offset, data]);

  return (
    <Container maxWidth="xl">
      <div className="App">
        <div className="row">
          <div className="col">
            <h1 className="display-4">Airtable List</h1>
            <ul className="list-unstyled">
              {currentData.map(item => (
                <Grid
                  container
                  spacing={0}
                  directions="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={10}>
                    <Card className={classes.bullet}>
                      <CardContent
                        className={classes.title}
                        key={item.fields.Id}
                      >
                        {item.fields.Books}
                        <br />
                        Author: {item.fields.Author}
                        <br />
                        Published: {item.fields.Published}
                        <br />
                        <a
                          style={{ color: 'black' }}
                          href={item.fields.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link
                        </a>
                        <hr />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              ))}
            </ul>
            <Pagination
              totalRecords={data.length}
              pageLimit={pageLimit}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Fetch;

/*
import React, { useEffect, useState } from 'react';
//import axios from 'axios';

// render list from JSON response to URL
const Airtable = ({ url }) => {
  const [data, setData] = useState([]);

  // Using async directly in the useEffect function isn’t allowed.
  // Let’s implement a workaround, by creating a separate async function.
  /*
  const fetchData = async () => {
    const result = await axios(url);
    setData(result.data.records);
  };

  // use fetch instead of axios
  const getData = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer keykY3XGInqH2LnBs'
        }
      });
      const json = await res.json();
      setData(json.records);
    } catch (err) {
      console.log(err);
    }
  };

  // call async function from useEffect
  useEffect(() => {
    getData();
  }, []); // provide an empty array as second argument to the effect hook to avoid activating it on component updates but only for the mounting of the component.

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="display-4">Airtable List</h1>
          <ul className="list-unstyled">
            {data.map(item => (
              <div key={item.Id}>
                <p>{item.Books}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Airtable;

*/
