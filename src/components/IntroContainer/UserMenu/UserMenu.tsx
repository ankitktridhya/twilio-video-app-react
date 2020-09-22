import React, { useState, useRef, useCallback } from 'react';
import { makeStyles, Typography, Button, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAppState } from '../../../state';
import UserAvatar from './UserAvatar/UserAvatar';
import Menu from '@material-ui/core/Menu';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles({
  userContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '1em',
    display: 'flex',
    alignItems: 'center',
  },
  userButton: {
    color: 'white',
  },
});

const UserMenu: React.FC = () => {
  const classes = useStyles();
  const { user, signOut } = useAppState();
  const { localTracks } = useVideoContext();

  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleSignOut = useCallback(() => {
    localTracks.forEach(track => track.stop());
    signOut?.();
  }, [localTracks, signOut]);

  return (
    <div className={classes.userContainer}>
      <UserAvatar user={user} />
      <Button onClick={() => setMenuOpen(isOpen => !isOpen)} ref={anchorRef} className={classes.userButton}>
        {user!.displayName}
        <ExpandMoreIcon />
      </Button>
      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(isOpen => !isOpen)}
        anchorEl={anchorRef.current}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleSignOut}>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;