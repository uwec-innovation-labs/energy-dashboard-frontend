LAUNCHING THE API:
  run 'npm' start in the directory
  navigate to http://localhost:4000/graphql
  
CREATING A QUERY
  the data is currently organized by building name. you must also supply the type of data you want to retrieve
  below is a working example query displaying all the features at once. you can get raw sql data (in this case, the last 10 records of Hilltop's electricity and heat data). you can also get daily, weekly, monthly, and yearly stats for each building/energy type pair (in this case, just hilltop electricity). finally, you can see which types of energy data are available for which buildings (energyAvailable)

      {
        query(building: "Hilltop", only: 10) {
          electricity {
            data {
              timestamp
              value
            }
            stats {
              daily {
                present
                past
              }
              weekly {
                present
                past
              }
              monthly {
                present
                past
              }
              yearly {
                present
                past
              }
            }
          }
          heat {
            data {
              timestamp
              value
            }
          }
          energyAvailable
        }
      }

      
 note that there are two primary data fields you can retreive: timestamp and value. value returns a single number, 
   while timestamp returns the date/time in milliseconds (epoch time)
   
the energyAvailable field returns a list of energy types available for that building 
  ex. for Hilltop, it returns ["electricity", "heat", "chiller"]

QUERY PARAMETERS
  to limit or arrange the data retrieved, here are some parameters you can use:
    only: returns the top n commands. the second line of your query will look like this:
      query(building:"Hilltop", only:10) {...
    sort: sorts the data by either timestamp/value starting from high/low:
      query(building:"Hilltop", sort:"timestamp high") {...
    start: limits records to only those that begin after a specified date:
      query(building:"Hilltop", start:"01-01-2019") {...
    end: counterpart to 'start'. Doesn't HAVE to be used along with 'start', but you can
     query(building:"Hilltop", start:"01-01-2018", end:"01-01-2019") {...
    baseIndex: restricts records to those at or after the base index. can be used with 'only' to get 'pages' of data
      query(building:"Hilltop", baseIndex:100, only:50) will retrieve records #100-#149
    endIndex: counterpart of 'baseIndex'
    average: data can be averaged by hour, day, week, month, or year. you probably want to use a sort parameter with this one since it won't be sorted by default
      be careful if you use it with start/end, since it'll only average the values that fall in that range for the month
      query(building:"Hilltop", average:"month") {...
      time values returned are approximate, and will default to the first month/day/hour. Month and day are approximated when averaging by week. 
 
 *Note: multiple parameters must be separated with commas. String parameters need to be in quotes
 
VALID QUERIES
  our database is constantly getting new tables, or in other words, new building/datatype combinations.
  currently, not all buildings have all dataTypes, and it's pretty arbitrary which have which.
  as of March 13 2019, the current building/dataType pairings can be found in 'current_tables.ods'

STAT CARDS
  stat cards are not affected by the query parameters--it will return the same data for the same building/energyType combo.
  note that each 'stat' requires its own SQL query to run, for a maximum of 8 if you're grabbing every stat. so please don't include the 'stat' field unless you actually need them to save on time and efficiency.
  as of 5-13-2019, the stat card algorithm was updated. to calculate the 'daily' stat, for example, it grabs the last 96 records using SQL's 'id' field (since there are appx. 96 records generated each day) and averages them to produce the 'present' field. the same is done for the 96 records before that to produce the 
  past' field. it is then up to the front end to divide these and present it in percent or decimal format. for weekly, monthly, and yearly, it just grabs 96*7, 96*30, or 96*365 records at a time instead.

FUTURE WORK
  We could allow the user to input an array of buildings instead of a single building, in order to get data from multiple buildings at once,
  but right now the front end wouldn't utilize it so we're saving that for later