import { Typography, Tooltip, Button, Container, AppBar, Toolbar, styled } from "@mui/material";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { IconButton, Drawer, ModalClose, Box, } from "@mui/joy";
import { Menu, FavoriteBorder, Logout, PersonOutline, ShoppingBasketOutlined, AdminPanelSettings } from '@mui/icons-material';
import * as React from 'react';
import { NavLink } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../rtk/Store';
import { fetchUser, removeUser } from '../rtk/Slices/UserSlice';
import { removeItems } from '../rtk/Slices/CartSlice';
import { removeItemsWish } from '../rtk/Slices/wishListSlice';
import { FilterCat } from '../rtk/Slices/ProductSlice';
const pages = ['Home', 'Shop', 'Blog', 'About us', 'Contact us', 'FAQs'];
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    background: "var(--btn--main)",
    color: "white"
  },
}));
function ResponsiveAppBar() {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = React.useState(false);
  const selector: TypedUseSelectorHook<RootState> = useSelector
  let user = selector((state) => {
    return state.signInlice.user;
  })
  let wish = selector((state) => {
    return state.wishListSlice.userItems;
  })
  let cart = selector((state) => {
    return state.CartSlice.userItems;
  })
  React.useEffect(() => {
    dispatch(fetchUser(JSON.parse(localStorage.getItem('user')!)))
  }, [dispatch])
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "black", zIndex: "5000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h1"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: "27px"
            }}
          >
            <NavLink to={"/"} style={{ color: 'var(--btn--hover)', marginLeft: "auto", marginRight: "auto" }}>
              IsoTech
            </NavLink>
          </Typography>
          {/* mobile media */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton variant="outlined" color="neutral" onClick={() => setOpen(true)}>
              <Menu />
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)} >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 0.5,
                  ml: 'auto',
                  mt: "52px",
                  mr: 2,
                }}
              >

                <ModalClose id="close-icon" sx={{ position: 'initial' }} />
              </Box>

              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setOpen(false)
                    dispatch(FilterCat("all"));
                  }}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to={page}
                  >
                    {page}
                  </NavLink>
                </Button>
              ))}
            </Drawer>
          </Box>
          <Typography
            variant="h1"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              fontSize: "27px",
              textDecoration: 'none',
            }}
          >
            <NavLink to={"/"} style={{ color: 'var(--btn--hover)', marginLeft: "auto", marginRight: "auto" }}>
              IsoTech

            </NavLink>
          </Typography>
          {/*end  mobile media */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent={"center"} alignItems={"center"}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={(() => {
                  dispatch(FilterCat("all"));
                })}
              >
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={page}
                >
                  {page}
                </NavLink>
              </Button>
            ))}

          </Box>

          <Box sx={{ flexGrow: 0 }} display={"flex"} flexDirection={"row"} gap={{ md: 2, xs: 1 }}>
            {
              user ?
                (<Tooltip title="log out">
                  <NavLink to={""} onClick={() => {
                    dispatch(removeUser())
                    dispatch(removeItems())
                    dispatch(removeItemsWish())

                  }}>
                    <Logout sx={{ fontSize: "27px" }} />
                  </NavLink>
                </Tooltip>)
                :
                (<Tooltip title="Sign in">
                  <NavLink to={"signIn"}>
                    <PersonOutline sx={{ fontSize: "27px" }} />
                  </NavLink>
                </Tooltip>)
            }
            <Tooltip title="Wish list">
              <NavLink to={user ? "wishList" : "signIn"}>
                <StyledBadge badgeContent={wish.length} >
                  <FavoriteBorder sx={{ fontSize: "27px" }} />
                </StyledBadge>
              </NavLink>
            </Tooltip>
            <Tooltip title="Cart">
              <NavLink to={user ? "cart" : "signIn"}>
                <StyledBadge badgeContent={cart.length} >
                  <ShoppingBasketOutlined sx={{ fontSize: "27px" }} />
                </StyledBadge>
              </NavLink>
            </Tooltip>
            <Tooltip title="dashboard" >
              <NavLink to={"dashboard"} style={{ marginLeft: "10px" }}>
                {user && user.id === "admin" && <AdminPanelSettings sx={{ fontSize: "27px" }} />}
              </NavLink>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;