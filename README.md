# Document Coding - client description

## For what is it good for?

The DC-Client provides a simple UI to generate document codes (or document names) for 
documents (or files). It is a pretty common requirement in large captial projects to 
generate consistent document/file names which follow certain rules. This application helps
the user to accomplish this task. 

The DC-Client is a generic UI which requires a rules-server that provides a JSON structure 
which describes how the document code is generated. 
 
![Picture](./image.png)

## How to use it?

The client application expects a certain response from the server to work correct.

The client URL is:

http://server.com/project/id

where 'id' is the project identifier which is provided to the content server via a GET call.``
 
Example of the expected JSON response:

    {
      segments: [
        {
          name: 'PROJECT',
          displayName: 'Project',
          fixed: true,
          entries: [
            {
              name: 'LCP_0815',
              value: 'LCP_0815',
              id: 0
            }
          ]
        },
        {
          name: 'FACILITY',
          displayName: 'Facility Name',
          entries: [
            {
              name: 'K-200',
              value: 'K-200',
              id: 0,
              filters: [
                {
                  segment: 'TYPE',
                  allowedIds: [1]
                },
                {
                  segment: 'DISCIPLINE',
                  allowedIds: [3]
                }
              ]
            },
            {
              name: 'G-300',
              value: 'G-300',
              id: 0
            }
          ]
        },
        {
          name: 'TYPE',
          displayName: 'Type',
          entries: [
            {
              name: 'Plot-Plan',
              value: '200',
              id: 0,
            },
            {
              name: 'ISBL',
              value: '300',
              id: 0
            },
            {
              name: 'Steelworks',
              value: '320',
              id: 1,
              filters: [
                {
                  segment: 'DISCIPLINE',
                  allowedIds: [1]
                }
              ]
            },
            {
              name: 'Powergrids',
              value: '400',
              id: 2,
              filters: [
                {
                  segment: 'DISCIPLINE',
                  allowedIds: [2]
                }
              ]
            }
          ]
        },
        {
          name: 'DISCIPLINE',
          displayName: 'Discipline',
          entries: [
            {
              name: 'Civil',
              value: 'CI',
              id: 1
            },
            {
              name: 'Electrical',
              value: 'EI',
              id: 2
            },
            {
              name: 'Construction',
              value: 'CO',
              id: 1
            },
            {
              name: 'Project Management',
              value: 'PM',
              id: 0
            }
          ]
        },
        {
          name: 'FORMAT',
          displayName: 'Format',
          entries: [
            {
              name: 'PDF',
              value: 'PDF',
              id: 3
            },
            {
              name: 'XML',
              value: 'XML',
              id: 3
            },
            {
              name: 'ISO',
              value: 'ISO',
              id: 1
            },
            {
              name: 'XLS',
              value: 'XLS',
              id: 0
            }
          ]
        },
        {
          name: 'STATUS',
          displayName: 'Status',
          entries: [
            {
              name: 'Ready for Procurement',
              value: 'RFP',
              id: 0
            },
            {
              name: 'Ready for Construction',
              value: 'RFC',
              id: 0
            },
            {
              name: 'Ready for Detail Design',
              value: 'RFD',
              id: 0
            },
          ]
        },
        {
          name: 'REVISION',
          displayName: 'REVISION',
          entries: [
            {
              name: 'Revision A',
              value: 'A',
            },
            {
              name: 'Revision B',
              value: 'B',
            },
            {
              name: 'Revision C',
              value: 'C',
            },
            {
              name: 'Revision D',
              value: 'D',
            }
          ]
        }
      ]
    };


Basically the structure describes a set of code segments from which the overall 
document code is derived. Each code segment has a set of entries. Each entry can hold a 
filter which limits the available entries at subsequent segments.

The filter works more or less like this:

* entries with an ID of 0 pass a filter always
* otherwise only those values which match all filters are displayed

Which segment a filters modifies is defined via the "segment" attribute of a filter.
The array "allowedIds" contains all allowed IDs for the entries within the referenced segment.

The filter mechanism is flexible but can lead to unexpected results :D

Note that the ID of an entry has NO special meaning for the client besides: 

* an ID of 0 passes a filter always
* the ID should match with the filter definitions
* the ID should be an integer value.

__Note that entries without an ID get the default ID value of 0.__

To a add a code segment with a fixed value to all generated document codes just add the
attribute "fixed:true" to the segment.

To improve performance for large entry lists you can disable filtering by 
setting the attribute "filtered:false" at the segment.

To further improve performance you can set the attribute "filtering:false" at the segment. 
This will stop the segment to cause any filter updates on subsequent segments. 
__Should not be set on a segments which contain at least on entry with a filter.__ 

### Worth to know

The client can send a "beacon" (= a http GET request) to a configured endpoint to enable to 
usage statistics of the service. Besides the standard HTTP information no other information is
provided to the beacon server. 

Most of the configuration is done in the 'environments' folder.

## Versions

* 1.0.0 - initial version
* 1.0.1 - add better filter management

 
