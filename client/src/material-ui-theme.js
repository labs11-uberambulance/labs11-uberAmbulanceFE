import { createMuiTheme } from '@material-ui/core/styles';
import { blue, teal, amber } from '@material-ui/core/colors';
export default createMuiTheme({
    palette: {
        primary: blue,
        secondary: { main: teal['A700'], },
        error: amber
    },
    typography: { useNextVariants: true, },
    overrides: {
        
      }
});