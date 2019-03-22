import { createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
export default createMuiTheme({
    palette: {
        primary: blue,
        error: red,
    },
    typography: {
        useNextVariants: true,
      },
      overrides: {
        
      }
});