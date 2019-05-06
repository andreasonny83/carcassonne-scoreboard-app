import { withStyles, WithStyles, Theme } from '@material-ui/core';
import { PlayerItem } from './PlayerItem';
import { mapColor } from '../../Icons';

const styles = ({ palette }: Theme) => ({
    meeple: {
      stroke: 'black',
      strokeWidth: '4px',
      'stroke-opacity': '0.75',
    },
    listItemSelected: {
      backgroundColor: `${palette.grey[300]}!important`,
    },
    listItemText: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap',
    },
    listItemIcon: {
      minWidth: '68px',
      justifyContent: 'center',
    },
    avatarWrapper: {
      borderRadius: '50%',
      background: (props: any) => mapColor.get(props.player.color),
      overflow: 'hidden',
      padding: '4px 2px 0',
    },
    avatar: {
      position: 'relative' as 'relative',
      '& svg': {
          filter: 'drop-shadow(1px -1px 1px rgba(0,0,0,0.3))',
      }
    },
  }) as any;

export type PlayerItemStylesProps = WithStyles<typeof styles>;

export const PlayerItemWithStyles = withStyles(styles)(PlayerItem);
