import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/system";
import Footer from "../../CommonPages/Footer/Footor";
import AdminAppBar from "../AdminAppBar/AdminAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2874f0",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#fff',
  },
}));

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5001/user/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
      <AdminAppBar />
        <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <CircularProgress size={60} />
            </Box>
          ) : orders.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
                textAlign: "center",
              }}
            >
              <LibraryBooksIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />
              <Typography variant="h5" gutterBottom fontWeight="bold">
                No Orders Yet...!!!
              </Typography>
              <Typography variant="body1">
                Dive into our library and fill it with captivating stories and knowledge waiting to be discovered!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {orders.map((order) => (
                <Grid item key={order._id} xs={12}>
                  <CustomAccordion>
                    <CustomAccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${order._id}-content`}
                      id={`panel${order._id}-header`}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ marginRight: 2 }}>
                          Order Date:
                        </Typography>
                        <Typography>
                          {new Date(order.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                    </CustomAccordionSummary>
                    <CustomAccordionDetails>
                      <Typography variant="body1" gutterBottom>
                        Total Amount: ₹{order.amount}.00
                      </Typography>
                      <Divider sx={{ marginY: 2 }} />
                      <Typography variant="h6">Products:</Typography>
                      <List>
                        {order.products.map((product) => (
                          <ListItem key={product.productId}>
                            <ListItemText
                              primary={product.title}
                              secondary={`Price: ₹${product.price}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Divider sx={{ marginY: 1 }} />
                      <Typography variant="h6">Delivery Address:</Typography>
                      <Typography variant="body1" color="textSecondary">
                        {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.postalCode}
                      </Typography>
                    </CustomAccordionDetails>
                  </CustomAccordion>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default AllOrders;
