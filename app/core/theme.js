import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// COPIED FROM _colors.scss
export const colors = {
  $white: '#ffffff',
  $hwBlue: '#0259a8',
  $secBlue: '#6797fb',
  $grapefruit: '#ff5252',
  $charcoalGrey: '#3f404f',
  $silver: '#e6e7e8',
  $secGreen: '#2cecbd',
  $greenOpacity: '#d7f5ef',
  $mainGreen: '#02c39a',
  $lightGrey: '#fafafa',
  $black: '#000000'
};

export const theme = {
  spacing: spacing,
  fontFamily: 'Open Sans',
  palette: {
    primary1Color: colors.$mainGreen,
    primary2Color: colors.$mainGreen,
    primary3Color: colors.$charcoalGrey,
    accent1Color: colors.$secBlue,
    accent2Color: colors.$hwBlue,
    accent3Color: colors.$hwBlue,
    textColor: colors.$charcoalGrey,
    alternateTextColor: colors.$white,
    canvasColor: colors.$white,
    borderColor: colors.$silver,
    disabledColor: fade(colors.$charcoalGrey, 0.3),
    pickerHeaderColor: colors.$silver,
    clockCircleColor: fade(colors.$charcoalGrey, 0.07),
    shadowColor: colors.$charcoalGrey,
    backgroundColor: colors.$lightGrey
  }
};

export const muiTheme = getMuiTheme(theme);
