LAUNCHING THE API:
  run 'npm' start in the directory
  navigate to http://localhost:4000/graphql
  
CREATING A QUERY
  the data is currently organized by building name. you must also supply the type of data you want to retrieve
  for example, if you want to retrieve the 'energy' data from Davies, you query wouild be as follows:

      { query(dataType:"energy", building:"Davies") {
          timestamp
          value
        }
      }
      
 note that there are two primary data fields you can retreive: timestamp and value. value returns a single number, 
   while timestamp returns the date/time in milliseconds (epoch time)
   
QUERY PARAMETERS
  to limit or arrange the data retrieved, here are some parameters you can use:
    only: returns the top n commands. the second line of your query will look like this:
      query(dataType:"energy", building:"Davies",only:10) {...
    sort: sorts the data by either timestamp/value starting from high/low:
      query(dataType:"energy", building:"Davies", sort:"timestamp high") {...
    start: limits records to only those that begin after a specified date:
      query(dataType:"energy", building:"Davies", start:"01-01-2019") {...
    end: counterpart to 'start'. Doesn't HAVE to be used along with 'start', but you can
      query(dataType:"energy", building:"Davies", start:"01-01-2018",end:"01-01-2019") {...
    baseIndex: restricts records to those at or after the base index. can be used with 'only' to get 'pages' of data
      query(dataType:"energy", building:"Davies", baseIndex:100, only:50) will retrieve records #100-#149
    endIndex: counterpart of 'baseIndex'
    average: data can be averaged by hour, day, week, month, or year. you probably want to use a sort parameter with this one since it won't be sorted by default
      be careful if you use it with start/end, since it'll only average the values that fall in that range for the month
      query(dataType:"energy", building:"Davies", average:"month") {...
      time values returned are approximate, and will default to the first month/day/hour. Month and day are approximated when averaging by week. 
    percentChange: this is the only parameter that can NOT be used with other parameters, as it is only used to measure the percent of change over the 
      past day, week, month, or year. It returns one record with one field ('value'), which represents the percent change.
      query(dataType:"energy", building:"Davies", percentChange:"day") {...
 
 *Note: multiple parameters must be separated with commas, and all parameter values except for 'only' must be in double-quotes
 
 VALID QUERIES
   our database is constantly getting new tables, or in other words, new building/datatype combinations.
   currently, not all buildings have all dataTypes, and it's pretty arbitrary which have which.
   as of March 13 2019, the current building/dataType pairings can be found in 'current_tables.ods'