import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { HeaderComponent } from './Header';

const styles = ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    menuItem: {
      color: palette.primary.main,
    },
  });

export type WithStylesProps = WithStyles<typeof styles>;

export const Header = withStyles(styles)(HeaderComponent);
