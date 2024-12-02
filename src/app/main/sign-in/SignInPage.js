import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slider from 'react-slick';
import * as yup from 'yup';
import _ from '@lodash';
import jwtService from '../../auth/services/jwtService';
import PostCardCopy from './postCarddCopy';
import { fetchLatestPosts } from 'src/services/api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    email: yup
        .string()
        .email('You must enter a valid email')
        .required('You must enter an email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
    email: '',
    password: '',
    remember: true,
};

function SignInPage() {
    const [latestPosts, setLatestPosts] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const { control, formState, handleSubmit, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    // Fetch latest posts
    useEffect(() => {
        const getPosts = async () => {
            try {
                const posts = await fetchLatestPosts();
                setLatestPosts(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                dispatch(showMessage({ message: 'Failed to load posts' }));
            }
        };
        getPosts();
    }, [dispatch]);

    // Set default form values
    useEffect(() => {
        setValue('email', '', { shouldDirty: true, shouldValidate: true });
        setValue('password', '', { shouldDirty: true, shouldValidate: true });
    }, [setValue]);

    const handleTogglePassword = () => setShowPassword(!showPassword);

    function onSubmit({ email, password }) {
        jwtService
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // Handle successful sign-in
            })
            .catch((_errors) => {
                if (Array.isArray(_errors)) {
                    _errors.forEach((error) => {
                        const { message } = error;
                        dispatch(showMessage({ message }));
                    });
                } else {
                    dispatch(showMessage({ message: 'An error has occurred' }));
                }
            });
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '80px',
    };

    return (
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
            {/* Left Section - Sign In Form */}
            <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
                <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />
                    <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
                        Sign in
                    </Typography>
                    <div className="flex items-baseline mt-2 font-medium">
                        <Typography>Don't have an account?</Typography>
                        <Link className="ml-4" to="/sign-up">
                            Sign up
                        </Link>
                    </div>

                    <form
                        name="loginForm"
                        noValidate
                        className="flex flex-col justify-center w-full mt-32"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Email"
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!errors.password}
                                    helperText={errors?.password?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormControlLabel
                                            label="Remember me"
                                            control={<Checkbox size="small" {...field} />}
                                        />
                                    </FormControl>
                                )}
                            />

                            <Link className="text-md font-medium" to="/auth/forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            variant="contained"
                            color="secondary"
                            className="w-full mt-16"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            type="submit"
                            size="large"
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </Paper>

            {/* Right Section - Welcome and Slideshow */}
            <Box
                className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
                sx={{ backgroundColor: 'primary.main' }}
            >
                <div className="z-10 relative w-full max-w-2xl">
                    <Typography variant="h3" className="text-white font-bold">
                        Welcome to IZONE 5
                    </Typography>
                    <Typography variant="body1" className="text-gray-300 mt-4">
                       OUR developers build organized and well-coded dashboards full of beautiful and rich modules.
                        Join us and start building your application today.
                    </Typography>

                    {/* Recent Posts Slider */}
                  
<Box className="mt-32">
    <Typography variant="h5" gutterBottom className="text-white font-semibold">
        Recent Posts
    </Typography>
    <Slider {...sliderSettings}>
        {latestPosts.length === 0 ? (
            <Typography className="text-white">No posts available</Typography>
        ) : (
            latestPosts.map((post) => <PostCardCopy key={post._id} post={post} />)
        )}
    </Slider>
</Box>
                </div>
            </Box>
        </div>
    );
}

export default SignInPage;