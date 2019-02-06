
export const testData_CodeSegments = {
  segments: [
    {
      name: 'PROJECT',
      type: 'LIST',
      displayName: 'Project',
      fixed: true,
      entries: [
        {
          name: 'LCP_0815',
          value: 'LCP_0815',
        }
      ]
    },
    {
      name: 'FACILITY',
      displayName: 'Facility Name',
      type: 'LIST',
      entries: [
        {
          name: 'K200',
          value: 'K200',
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
          name: 'G300',
          value: 'G300',
        }
      ]
    },
    {
      name: 'TYPE',
      displayName: 'Type',
      type: 'LIST',
      entries: [
        {
          name: 'Plot-Plan',
          value: '200',
        },
        {
          name: 'ISBL',
          value: '300',
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
      type: 'LIST',
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
        }
      ]
    },
    {
      name: 'FORMAT',
      displayName: 'Format',
      type: 'LIST',
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
        }
      ]
    },
    {
      name: 'STATUS',
      displayName: 'Status',
      type: 'LIST',
      entries: [
        {
          name: 'Ready for Procurement',
          value: 'RFP',
        },
        {
          name: 'Ready for Construction',
          value: 'RFC',
        },
        {
          name: 'Ready for Detail Design',
          value: 'RFD',
        },
      ]
    },
    {
      name: 'REVISION',
      displayName: 'Revision',
      type: 'LIST',
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
    },
    {
      name: 'VERSION',
      displayName: 'Version',
      type: 'FIELD',
      pattern: ''
    }
  ]
};


export const testData_Projects = {
  projects: [
    {
      name: 'LCP_1234',
      id: '1234',
      shortDescription: 'Dark Moon',
      description: 'Major plant expansion project for ABC'
    },
    {
      name: 'LCP_5678',
        id: '5678'
    },
    {
      name: 'LCP_ABCD',
        id: 'ABCD'
    }
  ]
};

