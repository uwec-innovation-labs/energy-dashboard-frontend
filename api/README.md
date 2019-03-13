LAUNCHING THE API:
  run 'npm' start in the directory
  navigate to http://localhost:4000/graphql
  
CREATING A QUERY
  the data is currently organized by building name. you must also supply the type of data you want to retrieve
  for example, if you want to retrieve the 'energy' data from Davies, you query wouild be as follows:

      query {
        Davies(dataType: "energy") {
          timestamp {
            year
            month
            day
            hour
            minute
            second
            date
            time
            dateTime
          }
          value
        }
      }
      
 note that there are two primary data fields you can retreive: timestamp and value. value returns a single number, 
   while timestamp is an object that can return any or all of the date parts. if you don't want one of these fields, just don't include it
   
QUERY PARAMETERS
  to limit or arrange the data retrieved, here are some parameters you can use:
    only: returns the top n commands. the second line of your query will look like this:
      Davies(dataType:"energy",only:10) {...
    sort: sorts the data by either timestamp/value starting from high/low:
      Davies(dataType:"energy",sort:"timestamp high") {...
    start: limits records to only those that begin after a specified date:
      Davies(dataType:"energy",start:"01-01-2019") {...
    end: counterpart to 'start'. Doesn't HAVE to be used along with 'start', but you can
      Davies(dataType:"energy",start:"01-01-2018",end:"01-01-2019") {...
    average: data can be averaged by month or year. you probably want to use a sort with this one since it won't be sorted by default
      be careful if you use it with start/end, since it'll only average the values that fall in that range for the month
      Davies(dataType:"energy",average:"month") {...
 
 *Note: multiple parameters must be separated with commas, and all parameter values except for 'only' must be in double-quotes
 
 VALID QUERIES
   our database is constantly getting new tables, or in other words, new building/datatype combinations.
   currently, not all buildings have all dataTypes, and it's pretty arbitrary which have which.
   as of March 13 2019, the current building/dataType pairings can be found in 'current_tables.ods'