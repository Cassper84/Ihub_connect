import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectLogo } from 'src/app/main/settings/users/store/settingsSlice';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {

  const logo = useSelector(selectLogo);
  console.log(logo)
  return (
    <Root className="flex items-center">
      <img className="logo-icon w-32 h-32" src={logo} alt="logo" />

      <div
        className="badge flex items-center py-4 px-8 mx-8 rounded"
        
        // style={{ backgroundColor: '#fff', color: '#fff' }}
      >
        
        <Typography className="text-11 font-medium capitalize" color="text.secondary">
        iHub Connect 1.0.0
          </Typography>
      
      </div>
    </Root>
  );
}

export default Logo;