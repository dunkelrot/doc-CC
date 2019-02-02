
export const testData = {
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
          name: 'K200',
          value: 'K200',
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
          name: 'G300',
          value: 'G300',
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
      displayName: 'Revision',
      entries: [
        {
          name: 'Revision A',
          value: 'A',
          id: 0
        },
        {
          name: 'Revision B',
          value: 'B',
          id: 0
        },
        {
          name: 'Revision C',
          value: 'C',
          id: 0
        },
        {
          name: 'Revision D',
          value: 'D',
          id: 0
        }
      ]
    }
  ]
};
