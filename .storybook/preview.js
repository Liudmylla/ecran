
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['SIGMR', 
      ['Maintenance', 
        ['TDB',
          ['ModeViewSelector','GridDossier','GridSignalements','GridInterventions','MaintenanceViewer']
        ]
      ], 
      
      'EXAMPLE'],
    },
  }
}